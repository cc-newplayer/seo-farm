"""
AI前沿 - 自动新闻更新脚本
用法: python update_news.py
功能: 抓取最新AI资讯 → Claude处理成中文摘要 → 更新 script.js 中的 newsData
"""

import os
import re
import json
import sys
import feedparser
from openai import OpenAI
from datetime import datetime
from dotenv import load_dotenv
from json_repair import repair_json

# 修复 Windows 控制台中文/emoji 输出
sys.stdout.reconfigure(encoding='utf-8')

# ===== 加载环境变量 =====
load_dotenv()
API_KEY  = os.getenv("API_KEY")
BASE_URL = os.getenv("BASE_URL", "https://aiapi.tnt-pub.com/v1")

# ===== 配置区（可自由修改） =====

# script.js 的路径（相对于本文件）
SCRIPT_JS_PATH = os.path.join(os.path.dirname(__file__), "../script.js")

# 最终保留的新闻条数
MAX_NEWS = 9

# RSS 新闻源列表
FEEDS = [
    # 中文源
    {"url": "https://36kr.com/feed",                                               "source": "36氪"},
    {"url": "https://www.qbitai.com/feed",                                         "source": "量子位"},
    # 英文权威源
    {"url": "https://openai.com/news/rss.xml",                                     "source": "OpenAI"},
    {"url": "https://deepmind.google/blog/rss.xml",                                "source": "Google DeepMind"},
    {"url": "https://www.technologyreview.com/feed/",                              "source": "MIT Technology Review"},
    {"url": "https://arstechnica.com/ai/feed",                                     "source": "Ars Technica"},
    {"url": "https://techcrunch.com/category/artificial-intelligence/feed/",       "source": "TechCrunch"},
]


# ===== 第一步：抓取RSS新闻 =====

def fetch_news():
    """从各RSS源抓取最新新闻，每个源最多取3条"""
    articles = []
    for feed_config in FEEDS:
        try:
            feed = feedparser.parse(feed_config["url"])
            count = 0
            for entry in feed.entries:
                if count >= 3:
                    break
                title = entry.get("title", "").strip()
                summary = entry.get("summary", entry.get("description", "")).strip()
                # 去掉HTML标签
                summary = re.sub(r"<[^>]+>", "", summary)
                if title:
                    articles.append({
                        "title": title,
                        "summary": summary[:400],
                        "source": feed_config["source"],
                        "link": entry.get("link", ""),
                    })
                    count += 1
            print(f"  ✓ {feed_config['source']}: 获取 {count} 条")
        except Exception as e:
            print(f"  ✗ {feed_config['source']} 失败: {e}")
    return articles


# ===== 第二步：用 Claude 处理成网站格式 =====

def process_with_claude(articles):
    """将原始文章交给 Claude，生成符合网站格式的中文新闻数据"""
    if not articles:
        print("  没有原始文章可处理")
        return []

    client = OpenAI(api_key=API_KEY, base_url=BASE_URL)

    # 拼接原始文章给 Claude（带编号和链接）
    articles_text = "\n\n".join([
        f"[{i+1}] 标题: {a['title']}\n    摘要: {a['summary']}\n    来源: {a['source']}\n    链接: {a['link']}"
        for i, a in enumerate(articles[:15])
    ])

    prompt = f"""你是"AI前沿"网站的内容编辑，请将以下英文/中文原始新闻整理为网站展示格式。

要求：
1. 从中筛选出最有价值的 {MAX_NEWS} 条
2. 标题：改写为吸引读者的中文标题，30字以内
3. 描述：用中文总结核心内容，80-120字
4. tag 只能选以下之一：model（大模型/技术）/ product（产品发布）/ research（学术研究）/ industry（行业动态）
5. time 用相对格式：今天 / 1天前 / 2天前 / 3天前（根据重要程度排序，最重要的排第一并标"今天"）
6. url 字段直接复制原文的"链接"字段，不要修改
7. 严格输出 JSON 数组，不要任何其他文字

原始新闻：
{articles_text}

输出格式（严格按此，注意是数组）：
[
  {{
    "tag": "model",
    "title": "中文标题",
    "desc": "中文描述",
    "source": "来源名称",
    "time": "今天",
    "url": "原文链接"
  }}
]"""

    print("  正在调用 Claude API...")
    response = client.chat.completions.create(
        model="claude-opus-4-6",
        max_tokens=3000,
        messages=[{"role": "user", "content": prompt}]
    )

    raw = response.choices[0].message.content.strip()

    # 提取并修复 JSON 数组
    json_match = re.search(r"\[.*\]", raw, re.DOTALL)
    if not json_match:
        print("  ✗ Claude 返回格式异常，原始内容:")
        print(raw[:500])
        return []

    try:
        repaired = repair_json(json_match.group())
        result = json.loads(repaired)
        print(f"  ✓ Claude 生成 {len(result)} 条新闻")
        return result
    except Exception as e:
        print(f"  ✗ JSON 解析失败: {e}")
        print("  原始返回内容（前800字）:")
        print(raw[:800])
        return []


# ===== 第三步：更新 script.js =====

def update_script_js(news_items):
    """将新闻数据写入 script.js 的 newsData 数组"""
    if not news_items:
        print("  没有新闻数据，跳过更新")
        return

    with open(SCRIPT_JS_PATH, "r", encoding="utf-8") as f:
        content = f.read()

    today = datetime.now().strftime("%Y-%m-%d")

    # 构建新的 newsData JS 字符串
    js_items = []
    for i, item in enumerate(news_items[:MAX_NEWS]):
        featured = "true" if i == 0 else "false"
        title  = item.get("title", "").replace("'", "\\'").replace("\n", " ")
        desc   = item.get("desc", "").replace("'", "\\'").replace("\n", " ")
        source = item.get("source", "").replace("'", "\\'")
        tag    = item.get("tag", "industry")
        time_  = item.get("time", "今天")
        url    = item.get("url", "").replace("'", "%27")

        js_items.append(
            f"  {{\n"
            f"    id: {i+1}, featured: {featured},\n"
            f"    tag: '{tag}', date: '{today}',\n"
            f"    title: '{title}',\n"
            f"    desc: '{desc}',\n"
            f"    source: '{source}', time: '{time_}',\n"
            f"    url: '{url}'\n"
            f"  }}"
        )

    new_news_data = "const newsData = [\n" + ",\n".join(js_items) + "\n];"

    # 用正则替换原有 newsData 数组
    updated = re.sub(
        r"const newsData = \[.*?\];",
        new_news_data,
        content,
        flags=re.DOTALL
    )

    with open(SCRIPT_JS_PATH, "w", encoding="utf-8") as f:
        f.write(updated)

    print(f"  ✓ script.js 已更新，共 {len(news_items[:MAX_NEWS])} 条新闻")


# ===== 主流程 =====

if __name__ == "__main__":
    print("=" * 40)
    print(f"AI前沿 新闻自动更新")
    print(f"时间: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 40)

    if not API_KEY:
        print("❌ 错误：未找到 API_KEY，请在 .env 文件中配置")
        exit(1)

    print("\n📡 第一步：抓取RSS新闻源...")
    articles = fetch_news()
    print(f"  共抓取 {len(articles)} 条原始新闻\n")

    print("🤖 第二步：Claude 处理与翻译...")
    news_items = process_with_claude(articles)
    print()

    print("📝 第三步：更新 script.js...")
    update_script_js(news_items)

    print("\n✅ 全部完成！刷新浏览器即可看到最新内容。")
