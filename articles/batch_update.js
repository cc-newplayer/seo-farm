/**
 * batch_update.js
 * Apply 6 transforms to all 38 remaining article HTML files:
 * 1. Anti-FOUC script after <meta viewport>
 * 2. Inter font + article-common.css before </head>
 * 3. Site-nav + TOC aside after <body>
 * 4. Article cover after </header> (skip if img at top of article-body)
 * 5. Site footer after page-wrapper closing </div>
 * 6. Mermaid theme-aware init + TOC/theme JS before </body>
 *
 * Run: node articles/batch_update.js
 */

const fs   = require('fs');
const path = require('path');

const ARTICLES_DIR = path.join(__dirname);

// ---------- cover data (articles without img at top) ----------
const COVER = {
  '02_coze.html':                                       { icon: '🤖', tagline: 'Coze · 扣子 AI 助手平台' },
  '03_n8n.html':                                        { icon: '⚙️', tagline: 'n8n · 可视化自动化工作流' },
  '04_mcp.html':                                        { icon: '🔌', tagline: 'MCP · AI 万能插座协议' },
  '05_agent-architecture.html':                         { icon: '🧠', tagline: 'AI Agent · 四大核心模块' },
  '06_agent-2026-protocols.html':                       { icon: '🌐', tagline: 'AI 协议 · Agent 的 TCP/IP 时刻' },
  '07_agent-platforms-guide.html':                      { icon: '🏆', tagline: 'AI Agent 平台 · 2026 横评指南' },
  '08_mas-deep-dive.html':                              { icon: '🕸️', tagline: 'MAS · 多智能体协作系统' },
  '09_gemini-31-guide.html':                            { icon: '✨', tagline: 'Gemini 3.1 · 谷歌推理旗舰' },
  '10_agent-architecture-deep-dive.html':               { icon: '⚡', tagline: 'Agent 架构 · 生产级实现拆解' },
  '11_coze-tutorial.html':                              { icon: '🤖', tagline: 'Coze · 零基础完整入门教程' },
  '12_single-agent-vs-mas.html':                        { icon: '⚖️', tagline: '单 Agent vs MAS · 架构选型' },
  '13_dify-tutorial.html':                              { icon: '🧩', tagline: 'Dify · 2026 最新零代码教程' },
  '14_agent-security-prompt-injection.html':            { icon: '🛡️', tagline: 'AI 安全 · Prompt 注入攻防' },
  '15_google-turboquant-kv-cache-compression-explained.html': { icon: '📊', tagline: '谷歌研究 · KV Cache 压缩技术' },
  '16_rag-explained.html':                              { icon: '🔍', tagline: 'RAG · 让 AI 不再瞎编' },
  '18_deerflow2-popular-science.html':                  { icon: '🦌', tagline: 'DeerFlow · 字节超级员工' },
  '19_ollama-local-llm-tutorial.html':                  { icon: '🖥️', tagline: 'Ollama · 本地部署大模型' },
  '23_kling-ai-video-tutorial.html':                    { icon: '🎬', tagline: '可灵AI · 视频生成实战' },
  '24_deerflow2-architecture-deep-dive.html':           { icon: '🏗️', tagline: 'DeerFlow 2.0 · 多智能体架构拆解' },
  '25_gemma4-open-source-explained.html':               { icon: '💎', tagline: 'Gemma 4 · 谷歌开源大模型' },
};

// ---------- HTML snippets ----------
const NAV_TOC = `<nav class="site-nav">
  <div class="site-nav-inner">
    <a href="../index.html" class="site-nav-logo">⚡ AI<span class="accent">前沿</span></a>
    <div class="site-nav-links">
      <a href="../index.html">首页</a>
      <a href="../news.html">AI资讯</a>
      <a href="../tools.html">AI工具</a>
      <a href="../articles.html">AI文章</a>
      <a href="../about.html">关于</a>
      <button id="themeToggle" class="theme-btn" aria-label="切换主题">🌙</button>
    </div>
  </div>
</nav>
<aside class="toc-sidebar" id="tocSidebar">
  <div class="toc-label">📑 本文目录</div>
  <ul class="toc-list" id="tocList"></ul>
</aside>`;

const SITE_FOOTER = `<footer class="site-footer">
  <div class="site-footer-inner">
    <span class="site-footer-logo">⚡ AI<span class="accent">前沿</span></span>
    <span>© 2026 AI前沿 · 原创内容</span>
    <div class="site-footer-links">
      <a href="../news.html">AI资讯</a>
      <a href="../articles.html">AI科普</a>
      <a href="../index.html">首页</a>
    </div>
  </div>
</footer>`;

const TOC_THEME_JS = `<script>
(function () {
  var headings = document.querySelectorAll('.article-body h2');
  var tocList  = document.getElementById('tocList');
  if (tocList && headings.length) {
    headings.forEach(function (h, i) {
      if (!h.id) h.id = 'sec-' + i;
      var li = document.createElement('li');
      li.className = 'toc-item';
      var a = document.createElement('a');
      a.href = '#' + h.id;
      a.className = 'toc-link';
      a.textContent = h.textContent;
      a.addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById(h.id).scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      li.appendChild(a);
      tocList.appendChild(li);
    });
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          tocList.querySelectorAll('.toc-link').forEach(function (l) { l.classList.remove('toc-active'); });
          var active = tocList.querySelector('a[href="#' + id + '"]');
          if (active) active.classList.add('toc-active');
        }
      });
    }, { rootMargin: '-5% 0px -75% 0px' });
    headings.forEach(function (h) { observer.observe(h); });
  }
  var btn = document.getElementById('themeToggle');
  if (btn) {
    btn.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? '☀️' : '🌙';
    btn.addEventListener('click', function () {
      var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('ai-article-theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }
})();
</script>`;

// ---------- main ----------
const files = fs.readdirSync(ARTICLES_DIR)
  .filter(f => f.endsWith('.html') && f !== '01_dify.html')
  .sort()
  .map(f => ({ name: f, full: path.join(ARTICLES_DIR, f) }));

let changed = 0, skipped = 0, errors = 0;

for (const { name, full } of files) {
  try {
    // Read and normalize line endings
    let html = fs.readFileSync(full, 'utf8').replace(/\r\n/g, '\n');

    // Skip if already transformed
    if (html.includes('article-common.css') || html.includes('class="site-nav"')) {
      console.log('SKIP (already done): ' + name);
      skipped++;
      continue;
    }

    let m = html; // working copy

    // ── 1. Anti-FOUC script ──────────────────────────────────────────────────
    m = m.replace(
      /(<meta name="viewport"[^>]*>)/,
      '$1\n  <script>document.documentElement.setAttribute(\'data-theme\',localStorage.getItem(\'ai-article-theme\')||\'light\');</script>'
    );

    // ── 2. Inter font + article-common.css before </head> ───────────────────
    m = m.replace(
      '</head>',
      '  <link rel="preconnect" href="https://fonts.googleapis.com" />\n' +
      '  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />\n' +
      '  <link rel="stylesheet" href="article-common.css" />\n' +
      '</head>'
    );

    // ── 3. Nav + TOC after <body> ────────────────────────────────────────────
    m = m.replace('<body>\n', '<body>\n' + NAV_TOC + '\n');

    // ── 4. Article cover (only if no img at top of article-body) ────────────
    const hasImgAtTop = /class="article-body"\s*>\s*\n\s*<img/.test(m);
    const coverData   = COVER[name];
    if (!hasImgAtTop && coverData) {
      const coverHtml =
        '\n  <div class="article-cover">\n' +
        '    <span class="cover-icon">' + coverData.icon + '</span>\n' +
        '    <span class="cover-tagline">' + coverData.tagline + '</span>\n' +
        '  </div>';
      m = m.replace('</header>', '</header>' + coverHtml);
    }

    // ── 5. Site footer after page-wrapper closing </div> ────────────────────
    // Strategy: find last </footer>, then find next </div>, insert after its line
    const footerIdx = m.lastIndexOf('</footer>');
    if (footerIdx !== -1) {
      const divIdx = m.indexOf('</div>', footerIdx);
      if (divIdx !== -1) {
        const divLineEnd = m.indexOf('\n', divIdx) + 1;
        m = m.slice(0, divLineEnd) + SITE_FOOTER + '\n' + m.slice(divLineEnd);
      }
    }

    // ── 6a. Mermaid theme-aware init ─────────────────────────────────────────
    if (m.includes('mermaid.initialize(')) {
      // Inject _mt variable before the mermaid.initialize call
      m = m.replace(
        'mermaid.initialize(',
        "var _mt = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default';\nmermaid.initialize("
      );
      // Replace theme: 'default' with theme: _mt
      m = m.replace("theme: 'default'", 'theme: _mt');
      // Handle multiline: theme: 'default',\n -> theme: _mt,
      m = m.replace("theme: _mt,\n  flowchart", "theme: _mt, flowchart");
    }

    // ── 6b. TOC + theme toggle JS before </body> ─────────────────────────────
    m = m.replace('</body>', TOC_THEME_JS + '\n</body>');

    // Write back
    fs.writeFileSync(full, m, 'utf8');
    console.log('OK: ' + name);
    changed++;

  } catch (err) {
    console.error('ERROR: ' + name + ' — ' + err.message);
    errors++;
  }
}

console.log('\n✓ Done. ' + changed + ' updated, ' + skipped + ' skipped, ' + errors + ' errors.');
