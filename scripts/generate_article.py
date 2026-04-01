"""
AI前沿 - 文章自动生成脚本
用法: python generate_article.py
功能: 抓取RSS热点 → Claude决定选题+风格 → 生成文章HTML → 更新articles.html
"""

import os, re, json, sys, subprocess, shutil, glob
import feedparser
from openai import OpenAI
from datetime import datetime
from dotenv import load_dotenv
from json_repair import repair_json

sys.stdout.reconfigure(encoding='utf-8')

# ===== 配置 =====
load_dotenv()
API_KEY  = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL", "https://aiapi.tnt-pub.com/v1")

SCRIPT_DIR    = os.path.dirname(os.path.abspath(__file__))
ARTICLES_DIR  = os.path.normpath(os.path.join(SCRIPT_DIR, "../articles"))
ARTICLES_HTML = os.path.normpath(os.path.join(SCRIPT_DIR, "../articles.html"))
LAST_STYLE    = os.path.join(SCRIPT_DIR, "last_article_style.txt")
DOUBAO_SCRIPT = r"C:\Users\admin\Desktop\agent st - 副本\doubao_image.js"
DOUBAO_OUT    = r"C:\Users\admin\Desktop\agent st - 副本\output"

FEEDS = [
    {"url": "https://36kr.com/feed",                                               "source": "36氪"},
    {"url": "https://www.qbitai.com/feed",                                         "source": "量子位"},
    {"url": "https://openai.com/news/rss.xml",                                     "source": "OpenAI"},
    {"url": "https://deepmind.google/blog/rss.xml",                                "source": "Google DeepMind"},
    {"url": "https://www.technologyreview.com/feed/",                              "source": "MIT Technology Review"},
    {"url": "https://arstechnica.com/ai/feed",                                     "source": "Ars Technica"},
    {"url": "https://techcrunch.com/category/artificial-intelligence/feed/",       "source": "TechCrunch"},
]

# ===== 风格规则（精简版，内嵌供 Claude 参考）=====
STYLE_RULES = {
    "A": """
【风格A 保姆级教程】目标读者：零基础小白，聚焦一个具体工具/平台。
结构：Hook（为何要用）→ 准备工作 → 步骤1~N（用<div class="steps">组件）→ 验证结果 → 总结
CSS重点：article-header（无style-b）、badge-tutorial（蓝色）、steps/step/step-num组件
图片：用 <div class="screenshot-placeholder"><span class="icon">🖼️</span>步骤描述</div> 占位
禁止：复杂JSON/Python源码、jargon堆砌、Mermaid图
必须：步骤编号用step-num圆圈、callout提示框（callout-tip）用于注意事项
""",
    "B": """
【风格B 深度科普】目标读者：开发者/技术读者，深入底层逻辑。
结构：核心数据（infobox）→ 背景变化 → 技术拆解（多个h2/h3）→ 对比/权衡 → 前景判断
CSS重点：article-header style-b（紫色顶条）、badge-deep（紫色）、可用Mermaid/Chart.js
图片：优先Mermaid流程图或架构图（内联）、Chart.js数据图；可在适合放插图的位置（如节标题下、概念说明处）加 <!-- DOUBAO_IMAGE: 图片提示词（中文，30字内，偏科技感/暗色调）--> ，1-2张即可，不要每节都放
禁止：只谈功能不谈实现、无数据支撑的观点
必须：至少1个Mermaid图或数据表、callout引用真实数据
""",
    "C": """
【风格C 大众科普】目标读者：完全不了解该概念的普通人（职场人）。
结构：开篇钩子（场景/反常识）→ 先说结果/好处 → 它到底是什么（类比）→ 为什么现在 → 影响谁 → 行动建议
CSS重点：article-header（无style-b）、badge-popular（绿色）
图片：用 <!-- DOUBAO_IMAGE: 具体图片提示词（中文，30字内）--> 标记图片位置，Python自动生成
禁止：Mermaid图、Chart.js、代码块、jargon不解释
必须：1个具体场景类比贯穿全文、1个真实数字/数据点、3+来源
""",
}

CATEGORY_MAP = {"A": "tutorial", "B": "deep", "C": "popular"}
BADGE_MAP    = {"A": "badge-tutorial", "B": "badge-deep", "C": "badge-popular"}
BADGE_LABEL  = {"A": "📘 保姆级教程", "B": "🔬 深度科普", "C": "🌟 大众科普"}

# ===== HTML 页面骨架 =====
HTML_SKELETON = """<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{meta_desc}">
  <title>{title}</title>
  <link rel="stylesheet" href="style.css">
  {mermaid_script}
</head>
<body>
<div class="page-wrapper">

{inner_html}

</div>
{mermaid_init}
</body>
</html>"""

MERMAID_SCRIPT = '<script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>'
MERMAID_INIT   = """<script>
mermaid.initialize({ startOnLoad: true, theme: 'default',
  flowchart: { curve: 'basis', useMaxWidth: true, htmlLabels: true } });
</script>"""

# ===== 工具函数 =====

def read_last_style():
    try:
        with open(LAST_STYLE, 'r', encoding='utf-8') as f:
            return f.read().strip().upper()
    except:
        return ""

def write_last_style(style):
    with open(LAST_STYLE, 'w', encoding='utf-8') as f:
        f.write(style)

def get_next_article_id():
    """扫描 articles/ 目录，返回下一个编号（最大编号+1）"""
    pattern = os.path.join(ARTICLES_DIR, "*.html")
    files = [f for f in glob.glob(pattern) if not f.endswith("style.css")]
    nums = []
    for f in files:
        m = re.match(r'(\d+)_', os.path.basename(f))
        if m:
            nums.append(int(m.group(1)))
    return max(nums, default=14) + 1

def get_existing_titles():
    """从 articles.html 读取现有文章标题，用于去重"""
    try:
        with open(ARTICLES_HTML, 'r', encoding='utf-8') as f:
            content = f.read()
        return re.findall(r"title:\s*'([^']+)'", content)
    except:
        return []


# ===== Step 1：抓取RSS =====

def fetch_rss():
    items = []
    for feed_cfg in FEEDS:
        try:
            feed = feedparser.parse(feed_cfg["url"])
            count = 0
            for entry in feed.entries:
                if count >= 3:
                    break
                title   = entry.get("title", "").strip()
                summary = entry.get("summary", entry.get("description", "")).strip()
                summary = re.sub(r"<[^>]+>", "", summary)
                if title:
                    items.append({
                        "title":   title,
                        "summary": summary[:300],
                        "source":  feed_cfg["source"],
                        "link":    entry.get("link", ""),
                    })
                    count += 1
            print(f"  ✓ {feed_cfg['source']}: {count} 条")
        except Exception as e:
            print(f"  ✗ {feed_cfg['source']} 失败: {e}")
    return items


# ===== Step 2：Claude 决定选题 + 风格 =====

def decide_topic(client, rss_items, existing_titles, last_style):
    items_text = "\n".join([
        f"[{i+1}] {a['title']} ({a['source']})\n    {a['summary'][:150]}"
        for i, a in enumerate(rss_items[:18])
    ])
    existing_text = "\n".join(existing_titles[-10:]) if existing_titles else "（无）"

    consecutive_c_note = ""
    if last_style == "C":
        consecutive_c_note = "\n⚠️ 上一篇是风格C，本次禁止选C，必须选A或B。"

    prompt = f"""你是AI前沿网站的内容编辑。请从以下RSS新闻中选出一个最适合写成深度文章的话题。

【已有文章标题（不要重复这些话题）】
{existing_text}

【今日RSS新闻】
{items_text}

【风格选择规则】
- 风格A（保姆级教程）：该话题是某个具体工具/平台，且能教读者操作步骤
- 风格B（深度科普）：该话题有技术深度，可挖底层逻辑/架构/原理
- 风格C（大众科普）：该话题是新概念/趋势，适合普通读者理解{consecutive_c_note}

请输出JSON，格式如下（严格JSON，无其他文字）：
{{
  "topic": "选定的话题（中文描述，50字内）",
  "style": "A|B|C",
  "title_zh": "文章标题（25字内，吸引人，不用术语堆砌）",
  "slug": "article-slug-in-english-kebab-case",
  "desc": "文章摘要（60字内，用于列表展示）",
  "sources": ["来源1", "来源2"],
  "reason": "选择该风格的简短理由"
}}"""

    print("  正在调用 Claude 决定选题...")
    resp = client.chat.completions.create(
        model="claude-opus-4-6",
        max_tokens=800,
        messages=[{"role": "user", "content": prompt}]
    )
    raw = resp.choices[0].message.content.strip()
    m = re.search(r"\{.*\}", raw, re.DOTALL)
    if not m:
        raise ValueError(f"Claude 返回格式异常: {raw[:300]}")
    return json.loads(repair_json(m.group()))


# ===== Step 3：Claude 生成文章 HTML =====

def generate_html(client, topic_info):
    style   = topic_info["style"]
    rules   = STYLE_RULES[style]
    badge   = BADGE_MAP[style]
    label   = BADGE_LABEL[style]
    style_b = "style-b" if style == "B" else ""

    system_prompt = f"""你是 Aitetech 首席 AI Agent 科普官，负责生成网站文章 HTML。

{rules}

【HTML组件参考】
标题块：
<header class="article-header {style_b}">
  <div class="badge-row">
    <span class="badge {badge}">{label}</span>
    <span class="badge badge-meta">⏱ 约X分钟阅读</span>
    <span class="badge badge-meta">🏷️ 话题标签</span>
  </div>
  <h1>文章标题</h1>
  <p class="article-lead {style_b}">前言（2-3句，点出核心价值）</p>
</header>

提示框：
<div class="callout callout-info"><span class="callout-icon">ℹ️</span><div class="callout-body"><strong>标题</strong>内容</div></div>
<div class="callout callout-tip"><span class="callout-icon">💡</span><div class="callout-body">内容</div></div>
<div class="callout callout-warning"><span class="callout-icon">⚠️</span><div class="callout-body">内容</div></div>

步骤（风格A用）：
<div class="steps">
  <div class="step"><div class="step-num">1</div><div class="step-content"><h3>步骤标题</h3><p>说明</p></div></div>
</div>

表格：
<div class="table-wrapper"><table><thead><tr><th>列1</th></tr></thead><tbody><tr><td>内容</td></tr></tbody></table></div>

Mermaid（风格B用）：
<div class="diagram"><div class="mermaid">graph LR; A-->B</div></div>

截图占位（风格A用）：
<div class="screenshot-placeholder"><span class="icon">🖼️</span>操作描述</div>

图片占位（风格C用，Python会自动生成）：
<!-- DOUBAO_IMAGE: 图片提示词（中文，30字内，描述画面内容）-->

延伸阅读区块：
<div class="next-steps {style_b}"><h3>延伸阅读</h3><ul><li>...</li></ul></div>

参考来源：
<footer class="article-footer"><p>参考来源：</p><ul><li><a href="URL">来源名称</a></li></ul></footer>

【输出格式】
严格按如下格式输出，不要任何其他文字：

===META_START===
{{"title": "文章标题", "desc": "60字摘要", "read_time": "约X分钟", "tag1": "话题标签1", "tag2": "话题标签2"}}
===META_END===

===HTML_START===
<header class="article-header {style_b}">
...（完整header）
</header>

<div class="article-body">
...（完整正文，2000字以上）
</div>

<div class="next-steps {style_b}">
...
</div>

<footer class="article-footer">
...
</footer>
===HTML_END==="""

    user_prompt = f"""请为以下选题生成完整文章：

话题：{topic_info['topic']}
标题：{topic_info['title_zh']}
风格：{style}（{['保姆级教程','深度科普','大众科普'][ord(style)-65]}）
摘要方向：{topic_info['desc']}
参考来源：{', '.join(topic_info.get('sources', []))}

要求：
- 正文1500字左右（含HTML标签）
- 结构清晰，善用HTML组件
- 自然融入SEO关键词
- 信息有料、可读性强
- 严格按格式输出分隔符，不要在分隔符前后加任何多余文字"""

    print("  正在调用 Claude 生成文章（需约1-2分钟）...")
    import time
    for attempt in range(3):
        try:
            resp = client.chat.completions.create(
                model="claude-sonnet-4-6",
                max_tokens=6500,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user",   "content": user_prompt},
                ]
            )
            return resp.choices[0].message.content
        except Exception as e:
            if attempt < 2:
                print(f"  ⚠ 第{attempt+1}次失败({e.__class__.__name__})，15秒后重试...")
                time.sleep(15)
            else:
                raise


# ===== Step 4：解析 Claude 输出 =====

def parse_claude_output(raw_output):
    meta_m = re.search(r"===META_START===\s*(.*?)\s*===META_END===", raw_output, re.DOTALL)
    html_m = re.search(r"===HTML_START===\s*(.*?)(?:\s*===HTML_END===|$)", raw_output, re.DOTALL)

    if not meta_m or not html_m:
        raise ValueError("Claude 输出缺少分隔符，原始内容片段:\n" + raw_output[:500])

    meta       = json.loads(repair_json(meta_m.group(1).strip()))
    inner_html = html_m.group(1).strip()
    # 若被截断，确保关键标签闭合
    if not inner_html.endswith("</footer>") and "</footer>" not in inner_html[-200:]:
        inner_html += '\n<footer class="article-footer"><p>（内容生成完毕）</p></footer>'
    return meta, inner_html


# ===== Step 5：图片生成（风格C）=====

def generate_doubao_image(prompt_text, article_id, img_index):
    """调用 doubao_image.js 生成图片，返回目标路径（相对于articles/）"""
    if not os.path.exists(DOUBAO_SCRIPT):
        print(f"  ⚠ doubao_image.js 未找到，跳过图片生成")
        return None
    try:
        doubao_dir = os.path.dirname(DOUBAO_SCRIPT)
        print(f"  🎨 生成图片: {prompt_text}")
        result = subprocess.run(
            ["node", "doubao_image.js", prompt_text],
            cwd=doubao_dir, capture_output=True, text=True, timeout=60
        )
        if result.returncode != 0:
            print(f"  ✗ doubao 失败: {result.stderr[:200]}")
            return None
        # 找最新生成的文件
        generated = sorted(glob.glob(os.path.join(DOUBAO_OUT, "doubao_*.jpg")), key=os.path.getmtime, reverse=True)
        if not generated:
            return None
        src = generated[0]
        filename = f"{article_id:02d}_img{img_index}.jpg"
        dest = os.path.join(ARTICLES_DIR, "images", filename)
        os.makedirs(os.path.dirname(dest), exist_ok=True)
        shutil.copy2(src, dest)
        print(f"  ✓ 图片保存: images/{filename}")
        return f"images/{filename}"
    except Exception as e:
        print(f"  ✗ 图片生成异常: {e}")
        return None

def process_images(inner_html, style, article_id):
    """处理 <!-- DOUBAO_IMAGE: ... --> 注释，生成或替换为占位（Style B/C）"""
    if style == "A":
        return inner_html

    img_index = 1
    def replace_image(m):
        nonlocal img_index
        prompt = m.group(1).strip()
        path = generate_doubao_image(prompt, article_id, img_index)
        img_index += 1
        if path:
            return f'<img src="{path}" alt="{prompt}" style="max-width:100%;border-radius:8px;margin:16px 0;">'
        else:
            return f'<div class="screenshot-placeholder"><span class="icon">🖼️</span>{prompt}</div>'

    return re.sub(r"<!--\s*DOUBAO_IMAGE:\s*(.+?)\s*-->", replace_image, inner_html)


# ===== Step 6：组装完整 HTML =====

def build_full_html(meta, inner_html, style):
    has_mermaid = "mermaid" in inner_html.lower() and style == "B"
    return HTML_SKELETON.format(
        title=meta.get("title", "AI前沿文章"),
        meta_desc=meta.get("desc", ""),
        mermaid_script=MERMAID_SCRIPT if has_mermaid else "",
        inner_html=inner_html,
        mermaid_init=MERMAID_INIT if has_mermaid else "",
    )


# ===== Step 7：保存文章 =====

def save_article(article_id, slug, html_content):
    filename = f"{article_id:02d}_{slug}.html"
    # 清理 slug 中的非法字符
    filename = re.sub(r'[\\/*?:"<>|]', '-', filename)
    filepath = os.path.join(ARTICLES_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(html_content)
    print(f"  ✓ 文章已保存: articles/{filename}")
    return filename


# ===== Step 8：更新 articles.html =====

def update_articles_html(article_id, filename, category, title, desc):
    with open(ARTICLES_HTML, 'r', encoding='utf-8') as f:
        content = f.read()

    # 构建新条目（转义单引号）
    safe_title = title.replace("'", "\\'").replace("\n", " ")
    safe_desc  = desc.replace("'", "\\'").replace("\n", " ")
    new_entry  = (
        f"  {{ id: {article_id},  file: '{filename}',  "
        f"category: '{category}', "
        f"title: '{safe_title}',  "
        f"desc: '{safe_desc}' }},\n"
    )

    # 在 articlesData 数组开头插入（const articlesData = [\n 后面）
    updated = re.sub(
        r"(const articlesData = \[\n)",
        r"\1" + new_entry,
        content
    )

    if updated == content:
        print("  ⚠ articles.html 未找到 articlesData，跳过更新")
        return

    # 确保 popular 类别在 tagName 和 tab 中存在
    if "'popular'" not in updated:
        updated = updated.replace(
            "const tagName = { tutorial: '教程', deep: '深度科普' };",
            "const tagName = { tutorial: '教程', deep: '深度科普', popular: '大众科普' };"
        )
    if 'data-filter="popular"' not in updated:
        updated = updated.replace(
            '<button class="tab" data-filter="deep">深度科普</button>',
            '<button class="tab" data-filter="deep">深度科普</button>\n        <button class="tab" data-filter="popular">大众科普</button>'
        )

    with open(ARTICLES_HTML, 'w', encoding='utf-8') as f:
        f.write(updated)
    print(f"  ✓ articles.html 已更新，新文章排在列表顶部")


# ===== 主流程 =====

if __name__ == "__main__":
    print("=" * 50)
    print(f"AI前沿 文章自动生成")
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    if not API_KEY:
        print("❌ 错误：未找到 API_KEY，请在 .env 文件中配置")
        sys.exit(1)

    client = OpenAI(api_key=API_KEY, base_url=BASE_URL)
    last_style = read_last_style()
    print(f"  上一篇风格: {last_style or '（无记录）'}")

    # Step 1
    print("\n📡 Step 1：抓取RSS热点...")
    rss_items = fetch_rss()
    print(f"  共抓取 {len(rss_items)} 条\n")

    # Step 2
    print("🧠 Step 2：Claude 决定选题 + 风格...")
    existing_titles = get_existing_titles()
    topic_info = decide_topic(client, rss_items, existing_titles, last_style)
    style = topic_info["style"]
    print(f"  ✓ 选题: {topic_info['topic']}")
    print(f"  ✓ 标题: {topic_info['title_zh']}")
    print(f"  ✓ 风格: {style} — {topic_info.get('reason','')}\n")

    # Step 3
    print("✍️  Step 3：Claude 生成文章HTML...")
    raw_output = generate_html(client, topic_info)

    # Step 4
    print("\n🔍 Step 4：解析输出...")
    meta, inner_html = parse_claude_output(raw_output)
    print(f"  ✓ 标题: {meta.get('title')}")
    print(f"  ✓ 阅读时长: {meta.get('read_time')}\n")

    # Step 5
    article_id = get_next_article_id()
    print(f"📷 Step 5：处理图片（文章编号 {article_id:02d}）...")
    inner_html = process_images(inner_html, style, article_id)

    # Step 6
    print("\n🏗️  Step 6：组装完整HTML...")
    full_html = build_full_html(meta, inner_html, style)

    # Step 7
    print("\n💾 Step 7：保存文件...")
    slug     = topic_info.get("slug", "ai-article")
    filename = save_article(article_id, slug, full_html)

    # Step 8
    print("\n📋 Step 8：更新 articles.html...")
    category = CATEGORY_MAP[style]
    update_articles_html(article_id, filename, category, meta.get("title", topic_info["title_zh"]), meta.get("desc", topic_info["desc"]))

    # 记录本次风格
    write_last_style(style)

    print(f"\n✅ 全部完成！新文章: articles/{filename}")
    print(f"   刷新 articles.html 即可看到新文章。")
