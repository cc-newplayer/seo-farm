/* ==============================
   AI 前沿 - script.js
   ============================== */

// ===== DATA =====

const newsData = [
  {
    id: 1, featured: true,
    tag: 'model', date: '2026-03-23',
    title: 'OpenAI发布GPT-5.4 mini和nano，更快更便宜',
    desc: 'OpenAI推出GPT-5.4的两个精简版本——mini和nano，专为编程、工具调用、多模态推理及高并发API场景优化。这两款模型在保持强大能力的同时，大幅提升了推理速度并降低了成本，适用于大规模生产环境和子智能体工作负载，为开发者提供更灵活的模型选择。',
    source: 'OpenAI', time: '今天',
    url: 'https://openai.com/index/introducing-gpt-5-4-mini-and-nano'
  },
  {
    id: 2, featured: false,
    tag: 'model', date: '2026-03-23',
    title: 'Gemini 3.1 Flash-Lite发布：谷歌最快最省的大模型',
    desc: 'Google DeepMind发布Gemini 3.1 Flash-Lite，这是Gemini 3系列中速度最快、成本效率最高的模型。该模型专为大规模智能应用场景打造，在保持出色推理能力的同时，极大降低了推理延迟和部署成本，标志着谷歌在高效AI模型领域的持续突破。',
    source: 'Google DeepMind', time: '今天',
    url: 'https://deepmind.google/blog/gemini-3-1-flash-lite-built-for-intelligence-at-scale/'
  },
  {
    id: 3, featured: false,
    tag: 'research', date: '2026-03-23',
    title: '谷歌提出AGI认知评估框架，发起Kaggle黑客松',
    desc: 'Google DeepMind发布全新认知框架，用于系统性衡量通向AGI的研究进展。该框架从多个认知维度定义了AI能力的评估标准，并在Kaggle平台发起黑客松活动，邀请全球开发者共同构建相关评估基准，推动AGI研究走向可量化、可比较的科学化方向。',
    source: 'Google DeepMind', time: '今天',
    url: 'https://deepmind.google/blog/measuring-progress-toward-agi-a-cognitive-framework/'
  },
  {
    id: 4, featured: false,
    tag: 'industry', date: '2026-03-23',
    title: 'OpenAI全力打造全自动AI研究员，挑战复杂科研任务',
    desc: 'OpenAI正集中资源投入一项全新挑战：构建全自动AI研究员系统。该系统基于智能体架构，能够独立处理大型复杂研究问题，从问题定义到实验执行全流程自主完成。这标志着OpenAI战略重心从通用对话模型转向自主科研智能体，可能深刻改变科学研究的工作方式。',
    source: 'MIT Technology Review', time: '1天前',
    url: 'https://www.technologyreview.com/2026/03/20/1134438/openai-is-throwing-everything-into-building-a-fully-automated-researcher/'
  },
  {
    id: 5, featured: false,
    tag: 'industry', date: '2026-03-23',
    title: '马斯克要自建芯片帝国！算力产能计划扩张50倍',
    desc: '马斯克宣布建设Terafab超级芯片工厂，目标是将算力产能扩大5000%，打造集芯片设计与制造于一体的垂直整合体系，直接挑战英伟达和台积电的行业地位。马斯克称Terafab补上了其AI版图的最后一块拼图，展现出对AI基础设施全链条掌控的野心。',
    source: '量子位', time: '1天前',
    url: 'https://www.qbitai.com/2026/03/391045.html'
  },
  {
    id: 6, featured: false,
    tag: 'research', date: '2026-03-23',
    title: 'OpenAI揭秘如何监控编程智能体的对齐风险',
    desc: 'OpenAI公开了其监控内部编程智能体对齐问题的方法，核心手段是思维链监控技术。团队通过分析真实部署场景中的智能体行为，检测潜在风险和不对齐信号，并据此强化安全防护措施。这是业界首次系统性披露大规模智能体部署中的安全监控实践，对AI安全研究意义重大。',
    source: 'OpenAI', time: '2天前',
    url: 'https://openai.com/index/how-we-monitor-internal-coding-agents-misalignment'
  },
  {
    id: 7, featured: false,
    tag: 'product', date: '2026-03-23',
    title: 'OpenAI收购Astral，加速Codex和Python开发生态',
    desc: 'OpenAI宣布收购开发工具公司Astral，以加速其Codex编程平台的发展，打造下一代Python开发者工具。此次收购将Astral的工程能力整合进OpenAI生态，提升AI辅助编程的效率和体验，进一步巩固OpenAI在AI编程工具市场的领先地位。',
    source: 'OpenAI', time: '2天前',
    url: 'https://openai.com/index/openai-to-acquire-astral'
  },
  {
    id: 8, featured: false,
    tag: 'product', date: '2026-03-23',
    title: '阶跃星辰接入微信生态，AI助手即插即用',
    desc: '阶跃星辰旗下StepClaw"龙虾"智能体率先完成微信生态适配，支持个人聊天场景的全面激活。用户可在微信中直接部署和使用AI助手，无需额外安装应用，实现即插即养即用的便捷体验，标志着国产AI应用在社交生态融合方面迈出重要一步。',
    source: '量子位', time: '3天前',
    url: 'https://www.qbitai.com/2026/03/391010.html'
  },
  {
    id: 9, featured: false,
    tag: 'research', date: '2026-03-23',
    title: '浙大破解多模态模型过度自信难题，登顶CVPR\'26',
    desc: '浙江大学团队提出创新方法，解决多模态大模型在输入质量极差时仍给出高置信度预测的"盲目自信"问题。研究通过先校准模型置信度、再动态分配计算资源的两阶段策略，显著提升了模型的可靠性和效率，相关成果被计算机视觉顶会CVPR 2026录用。',
    source: '量子位', time: '3天前',
    url: 'https://www.qbitai.com/2026/03/391014.html'
  }
];

const toolsData = [
  { id: 1, name: 'ChatGPT', icon: '🤖', category: 'chat', color: '#10a37f', desc: 'OpenAI 旗舰对话助手，支持 GPT-4o 多模态理解与 DALL-E 图像生成。', badge: 'freemium', stars: 5, url: 'https://chat.openai.com' },
  { id: 2, name: 'Claude', icon: '✨', category: 'chat', color: '#cc9b7a', desc: 'Anthropic 出品，擅长长文档分析、编程助手与复杂推理任务。', badge: 'freemium', stars: 5, url: 'https://claude.ai' },
  { id: 3, name: 'Gemini', icon: '💎', category: 'chat', color: '#4285f4', desc: 'Google 多模态大模型，深度整合 Google 搜索与 Workspace 办公套件。', badge: 'freemium', stars: 4, url: 'https://gemini.google.com' },
  { id: 4, name: 'DeepSeek', icon: '🔍', category: 'chat', color: '#6366f1', desc: '国产高性能大模型，推理能力出众，API 价格极具竞争力，支持深度思考模式。', badge: 'freemium', stars: 5, url: 'https://chat.deepseek.com' },
  { id: 5, name: 'Midjourney', icon: '🎨', category: 'image', color: '#9b59b6', desc: '顶级 AI 绘画工具，生成风格多样的高质量艺术图像，支持精细参数控制。', badge: 'paid', stars: 5, url: 'https://midjourney.com' },
  { id: 6, name: 'Stable Diffusion', icon: '🖼️', category: 'image', color: '#e74c3c', desc: '开源图像生成模型，支持本地部署，拥有庞大社区与丰富 LoRA 模型生态。', badge: 'free', stars: 4, url: 'https://stability.ai' },
  { id: 7, name: 'DALL-E 3', icon: '🎭', category: 'image', color: '#f39c12', desc: 'OpenAI 图像生成工具，理解自然语言指令精准，与 ChatGPT 无缝集成。', badge: 'paid', stars: 4, url: 'https://openai.com/dall-e-3' },
  { id: 8, name: 'Flux', icon: '⚡', category: 'image', color: '#1abc9c', desc: '新一代开源图像生成模型，写实风格表现卓越，细节还原度极高。', badge: 'freemium', stars: 5, url: 'https://blackforestlabs.ai' },
  { id: 9, name: 'GitHub Copilot', icon: '👨‍💻', category: 'code', color: '#24292e', desc: '微软 AI 编程助手，实时代码补全与生成，支持 VS Code 等主流 IDE。', badge: 'paid', stars: 5, url: 'https://github.com/features/copilot' },
  { id: 10, name: 'Cursor', icon: '🖱️', category: 'code', color: '#667eea', desc: 'AI 原生代码编辑器，深度集成 Claude/GPT，支持全代码库理解与重构。', badge: 'freemium', stars: 5, url: 'https://cursor.sh' },
  { id: 11, name: 'Windsurf', icon: '🏄', category: 'code', color: '#4ecdc4', desc: 'Codeium 出品的 AI IDE，Cascade 工作流支持多步骤自主代码修改。', badge: 'freemium', stars: 4, url: 'https://codeium.com/windsurf' },
  { id: 12, name: 'Sora', icon: '🎬', category: 'video', color: '#e74c3c', desc: 'OpenAI 视频生成模型，支持长达数分钟的高清连贯视频创作。', badge: 'paid', stars: 5, url: 'https://sora.com' },
  { id: 13, name: 'Runway', icon: '🎥', category: 'video', color: '#9b59b6', desc: '专业 AI 视频创作平台，提供视频生成、编辑与特效工具，广受影视从业者青睐。', badge: 'freemium', stars: 4, url: 'https://runwayml.com' },
  { id: 14, name: 'Kling', icon: '🎞️', category: 'video', color: '#e67e22', desc: '快手推出的 AI 视频生成工具，效果出众，已有大量优质案例。', badge: 'freemium', stars: 4, url: 'https://klingai.com' },
  { id: 15, name: 'ElevenLabs', icon: '🎵', category: 'audio', color: '#3498db', desc: '顶级 AI 语音合成平台，声音克隆与多语言配音，支持实时语音转换。', badge: 'freemium', stars: 5, url: 'https://elevenlabs.io' },
  { id: 16, name: 'Suno', icon: '🎶', category: 'audio', color: '#e91e63', desc: 'AI 音乐创作工具，输入歌词或描述即可生成完整歌曲，支持多种曲风。', badge: 'freemium', stars: 5, url: 'https://suno.ai' },
  { id: 17, name: 'Notion AI', icon: '📝', category: 'productivity', color: '#000000', desc: '集成在 Notion 中的 AI 助手，支持文档撰写、摘要生成与数据分析。', badge: 'paid', stars: 4, url: 'https://notion.so' },
  { id: 18, name: 'Perplexity', icon: '🔭', category: 'productivity', color: '#20b2aa', desc: 'AI 搜索引擎，实时联网检索，提供带来源引用的精准问答体验。', badge: 'freemium', stars: 5, url: 'https://perplexity.ai' },
];

const timelineData = [
  {
    date: '2025年3月',
    company: 'Anthropic',
    dotColor: 'purple',
    title: 'Claude 4 系列发布，引入扩展思考与多步 Agent 能力',
    desc: 'Claude 4 Opus 在推理、编程、数学三大维度全面领先，支持最长 200K token 上下文，并推出 Claude Code CLI 工具，深受开发者好评。',
    tags: ['大模型', 'Agent', '编程助手']
  },
  {
    date: '2025年3月',
    company: 'Meta',
    dotColor: 'green',
    title: 'Llama 4 开源：MoE 架构实现效率与性能双重突破',
    desc: 'Llama 4 Scout（109B）与 Maverick（400B）开源，商业可用，支持 10M token 上下文，是迄今开源最强模型之一。',
    tags: ['开源', 'MoE', 'Llama']
  },
  {
    date: '2025年2月',
    company: 'Google',
    dotColor: 'purple',
    title: 'Gemini 2.0 Flash 正式推出，实时多模态能力向所有用户开放',
    desc: 'Flash 版本在速度与成本上大幅优化，Project Astra 支持实时摄像头理解，Gemini Live 向免费用户开放。',
    tags: ['多模态', '实时交互', 'Gemini']
  },
  {
    date: '2025年1月',
    company: 'DeepSeek',
    dotColor: 'red',
    title: 'DeepSeek-R1 横空出世，以极低成本媲美 o1 推理能力震惊业界',
    desc: 'DeepSeek-R1 展示出与 OpenAI o1 相当的推理能力，但训练成本仅为其约 5%，引发全球 AI 社区广泛关注，开源后迅速成为 Hugging Face 最热门模型。',
    tags: ['推理模型', '开源', '成本优化']
  },
  {
    date: '2025年1月',
    company: 'OpenAI',
    dotColor: 'purple',
    title: 'OpenAI o3 发布，ARC-AGI 测试接近人类水平',
    desc: 'o3 在数学竞赛（AIME 2024）和代码竞赛（Codeforces）等专业评测中大幅超越前代，被认为是向 AGI 迈进的重要里程碑。',
    tags: ['推理', 'AGI', 'OpenAI']
  },
  {
    date: '2024年12月',
    company: 'Google',
    dotColor: 'green',
    title: 'Gemini 2.0 发布：原生 Agent 框架与工具调用能力革新',
    desc: 'Gemini 2.0 Flash Experimental 正式发布，引入内置工具调用、代码执行与网页搜索，标志 Google AI 进入 Agent 新阶段。',
    tags: ['Agent', 'Gemini 2.0', '工具调用']
  },
  {
    date: '2024年11月',
    company: 'Anthropic',
    dotColor: 'purple',
    title: 'Claude 3.5 新增 Computer Use：AI 首次直接操控电脑',
    desc: 'Anthropic 推出革命性 Computer Use 功能，允许 Claude 直接控制鼠标键盘操作电脑，开启 AI 自主完成复杂任务的新篇章。',
    tags: ['Computer Use', 'Agent', '自动化']
  },
];

const modelsData = [
  { rank: 1, name: 'Claude 4 Opus', maker: 'Anthropic', score: 98, context: '200K', params: '未公开', multimodal: true, reasoning: true, code: true, free: false },
  { rank: 2, name: 'GPT-4.5', maker: 'OpenAI', score: 96, context: '128K', params: '未公开', multimodal: true, reasoning: true, code: true, free: false },
  { rank: 3, name: 'Gemini 2.0 Ultra', maker: 'Google', score: 95, context: '1M', params: '未公开', multimodal: true, reasoning: true, code: true, free: false },
  { rank: 4, name: 'DeepSeek-V3', maker: 'DeepSeek', score: 92, context: '128K', params: '671B', multimodal: false, reasoning: true, code: true, free: true },
  { rank: 5, name: 'Llama 4 Maverick', maker: 'Meta', score: 90, context: '10M', params: '400B', multimodal: true, reasoning: true, code: true, free: true },
  { rank: 6, name: 'Grok-3', maker: 'xAI', score: 89, context: '128K', params: '未公开', multimodal: true, reasoning: true, code: true, free: false },
  { rank: 7, name: 'Qwen2.5-Max', maker: '阿里云', score: 87, context: '128K', params: '72B', multimodal: true, reasoning: true, code: true, free: true },
  { rank: 8, name: 'Mistral Large 2', maker: 'Mistral AI', score: 84, context: '128K', params: '123B', multimodal: false, reasoning: true, code: true, free: true },
];

// ===== RENDER NEWS =====
let activeNewsFilter = 'all';

function renderNews(filter) {
  const grid = document.getElementById('newsGrid');
  const filtered = filter === 'all' ? newsData : newsData.filter(n => n.tag === filter);
  grid.innerHTML = filtered.map(n => `
    <article class="news-card ${n.featured && filter === 'all' ? 'featured' : ''}" onclick="openNews('${n.url || '#'}')">
      <div class="news-meta">
        <span class="news-tag tag-${n.tag}">${tagLabel(n.tag)}</span>
        <span>${n.time}</span>
      </div>
      <h3 class="news-title">${n.title}</h3>
      <p class="news-desc">${n.desc}</p>
      <div class="news-footer">
        <div class="news-source"><span class="source-dot"></span>${n.source}</div>
        <span>${n.date}</span>
      </div>
    </article>
  `).join('');
}

function tagLabel(tag) {
  return { model: '大模型', product: '产品', research: '研究', industry: '行业' }[tag] || tag;
}

function openNews(url) {
  if (url && url !== '#') window.open(url, '_blank');
}

// ===== RENDER TOOLS =====
let activeToolFilter = 'all';

function renderTools(filter) {
  const grid = document.getElementById('toolsGrid');
  const filtered = filter === 'all' ? toolsData : toolsData.filter(t => t.category === filter);
  grid.innerHTML = filtered.map(t => `
    <div class="tool-card" onclick="window.open('${t.url}','_blank')">
      <div class="tool-header">
        <div class="tool-icon" style="background:${t.color}22">${t.icon}</div>
        <div>
          <div class="tool-name">${t.name}</div>
          <div class="tool-category">${categoryLabel(t.category)}</div>
        </div>
      </div>
      <p class="tool-desc">${t.desc}</p>
      <div class="tool-footer">
        <span class="tool-badge badge-${t.badge}">${badgeLabel(t.badge)}</span>
        <span class="tool-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</span>
      </div>
    </div>
  `).join('');
}

function categoryLabel(c) {
  return { chat: '对话助手', image: '图像生成', code: '编程辅助', video: '视频创作', audio: '音频创作', productivity: '效率工具' }[c] || c;
}

function badgeLabel(b) {
  return { free: '免费', paid: '付费', freemium: '免费/付费' }[b] || b;
}

// ===== RENDER TIMELINE =====
function renderTimeline() {
  const tl = document.getElementById('timeline');
  tl.innerHTML = timelineData.map((item, i) => `
    <div class="timeline-item">
      <div class="timeline-dot ${item.dotColor === 'green' ? 'green' : item.dotColor === 'red' ? 'red' : ''}"></div>
      <div class="timeline-date">${item.date}</div>
      <div class="timeline-card">
        <div class="timeline-company">▶ ${item.company}</div>
        <div class="timeline-title">${item.title}</div>
        <div class="timeline-desc">${item.desc}</div>
        <div class="timeline-tags">${item.tags.map(t => `<span class="t-tag">${t}</span>`).join('')}</div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER MODELS TABLE =====
function renderModels() {
  const table = document.getElementById('modelsTable');
  const maxScore = Math.max(...modelsData.map(m => m.score));
  table.innerHTML = `
    <thead>
      <tr>
        <th>排名</th>
        <th>模型</th>
        <th>厂商</th>
        <th>综合得分</th>
        <th>上下文</th>
        <th>多模态</th>
        <th>推理</th>
        <th>代码</th>
        <th>开源</th>
      </tr>
    </thead>
    <tbody>
      ${modelsData.map(m => `
        <tr>
          <td><div class="rank-badge ${m.rank <= 3 ? 'rank-' + m.rank : 'rank-n'}">${m.rank}</div></td>
          <td><div class="model-name">${m.name}</div></td>
          <td><div class="model-maker">${m.maker}</div></td>
          <td>
            <div class="score-bar-wrap">
              <div class="score-bar" style="width:${(m.score / maxScore * 100).toFixed(0)}%; min-width:8px"></div>
              <span style="font-size:0.85rem;font-weight:600">${m.score}</span>
            </div>
          </td>
          <td style="font-size:0.85rem">${m.context}</td>
          <td style="text-align:center">${m.multimodal ? '✅' : '—'}</td>
          <td style="text-align:center">${m.reasoning ? '✅' : '—'}</td>
          <td style="text-align:center">${m.code ? '✅' : '—'}</td>
          <td style="text-align:center">${m.free ? '<span style="color:var(--accent2)">开源</span>' : '—'}</td>
        </tr>
      `).join('')}
    </tbody>
  `;
}

// ===== FILTER TABS =====
function setupTabs(containerId, renderFn) {
  document.getElementById(containerId).addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    document.querySelectorAll(`#${containerId} .tab`).forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    renderFn(tab.dataset.filter);
  });
}

// ===== SEARCH =====
function doSearch() {
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if (!q) return;
  // Filter news
  const newsResult = newsData.filter(n =>
    n.title.toLowerCase().includes(q) || n.desc.toLowerCase().includes(q)
  );
  const toolResult = toolsData.filter(t =>
    t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  );
  // Show results
  document.getElementById('newsGrid').innerHTML = newsResult.length
    ? newsResult.map(n => `
        <article class="news-card">
          <div class="news-meta"><span class="news-tag tag-${n.tag}">${tagLabel(n.tag)}</span><span>${n.time}</span></div>
          <h3 class="news-title">${n.title}</h3>
          <p class="news-desc">${n.desc}</p>
          <div class="news-footer"><div class="news-source"><span class="source-dot"></span>${n.source}</div><span>${n.date}</span></div>
        </article>
      `).join('')
    : '<p style="color:var(--text-muted);padding:20px">未找到相关资讯</p>';
  document.getElementById('toolsGrid').innerHTML = toolResult.length
    ? toolResult.map(t => `
        <div class="tool-card" onclick="window.open('${t.url}','_blank')">
          <div class="tool-header"><div class="tool-icon" style="background:${t.color}22">${t.icon}</div><div><div class="tool-name">${t.name}</div><div class="tool-category">${categoryLabel(t.category)}</div></div></div>
          <p class="tool-desc">${t.desc}</p>
          <div class="tool-footer"><span class="tool-badge badge-${t.badge}">${badgeLabel(t.badge)}</span><span class="tool-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</span></div>
        </div>
      `).join('')
    : '<p style="color:var(--text-muted);padding:20px">未找到相关工具</p>';
  document.querySelector('#news').scrollIntoView({ behavior: 'smooth' });
}

// Search on Enter
document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
});

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 4 + 2;
    p.className = 'particle';
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random() * 100}%;
      animation-duration:${Math.random() * 15 + 10}s;
      animation-delay:-${Math.random() * 20}s;
      opacity:${Math.random() * 0.4 + 0.1};
      background:${Math.random() > 0.5 ? '#6c63ff' : '#00d4aa'};
    `;
    container.appendChild(p);
  }
}

// ===== MOBILE MENU =====
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ===== BACK TO TOP =====
window.addEventListener('scroll', () => {
  const btn = document.getElementById('backTop');
  btn.classList.toggle('visible', window.scrollY > 400);
});

// ===== INIT =====
renderNews('all');
renderTools('all');
renderTimeline();
renderModels();
setupTabs('newsTabs', renderNews);
setupTabs('toolTabs', renderTools);
createParticles();
