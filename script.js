/* ==============================
   AI 前沿 - script.js
   ============================== */

// ===== DATA =====

const newsData = [
  {
    id: 21, featured: true,
    tag: 'industry', date: '2026-04-08',
    title: 'Anthropic 营收首次超越 OpenAI，IPO 最早今年 10 月',
    desc: '据媒体报道，Anthropic 年化营收已首次超越 OpenAI，并正在评估最早于 2026 年 10 月启动 IPO，潜在估值达 3800 亿美元，融资规模超过 600 亿美元。这一消息与 Anthropic 此前披露的 300 亿美元年化营收数据相互印证，显示 Claude 系列模型在企业市场的渗透速度已超出外界预期。分析人士指出，若 IPO 成行，将成为 AI 行业迄今最大规模的公开上市事件，对整个行业的估值体系产生深远影响。',
    source: 'TradingKey',
    time: '今天',
    url: 'https://www.tradingkey.com/analysis/stocks/us-stocks/261756528-anthropic-openai-ipo-tradingkey'
  },
  {
    id: 20, featured: false,
    tag: 'industry', date: '2026-04-08',
    title: '谷歌 CEO Pichai：AI 浪潮为初创公司带来前所未有的投资机会',
    desc: '谷歌 CEO 桑达尔·皮查伊在 4 月 7 日接受 CNBC 采访时表示，当前 AI 技术的快速演进正在为初创公司创造前所未有的投资机会，谷歌将持续加大对 AI 生态的战略投资。皮查伊特别提到，谷歌早期对 Anthropic 的 3 亿美元投资已带来巨额回报，验证了其 AI 投资策略的前瞻性。他同时强调，AI 基础设施的竞争将在未来数年内持续加剧，算力和能源将成为决定竞争格局的核心变量。',
    source: 'CNBC',
    time: '今天',
    url: 'https://www.cnbc.com/2026/04/07/google-ceo-pichai-says-ai-shift-opens-opportunities-invest-startups.html'
  },
  {
    id: 10, featured: true,
    tag: 'industry', date: '2026-04-07',
    title: 'Anthropic 年化营收突破 300 亿美元，与谷歌、博通签署史上最大算力协议',
    desc: 'Anthropic 于 4 月 6 日宣布，其年化营收已超过 300 亿美元，较 2025 年底的 90 亿美元增长超过三倍。同日，公司与谷歌和博通签署扩展合作协议，将获得约 3.5 吉瓦的下一代谷歌 TPU 算力，预计 2027 年起交付。这是 Anthropic 迄今最大的基础设施承诺，也是 AI 公司营收增速最快的案例之一，标志着 Claude 系列模型在企业市场的大规模渗透。',
    source: 'Anthropic',
    time: '今天',
    url: 'https://www.anthropic.com/news/google-broadcom-partnership-compute'
  },
  {
    id: 11, featured: false,
    tag: 'industry', date: '2026-04-07',
    title: 'OpenAI、Anthropic、谷歌联手反制中国 AI 模型抄袭，通过 Frontier Model Forum 共享情报',
    desc: 'OpenAI、Anthropic 和谷歌于 4 月 6-7 日宣布，三家公司将通过 Frontier Model Forum 共享情报，联合打击中国 AI 公司通过"对抗性蒸馏"技术窃取其模型能力的行为。此前 Anthropic 已在 2026 年 2 月识别出 DeepSeek、Moonshot AI 和 MiniMax 三家中国实验室创建约 2.4 万个虚假账户、大规模提取模型输出的行为。三大竞争对手罕见联手，凸显了模型知识产权保护已成为行业核心议题。',
    source: 'Bloomberg',
    time: '今天',
    url: 'https://www.gadgets360.com/ai/news/anthropic-google-openai-frontier-model-forum-fighting-ai-model-distillation-attempts-china-report-11322546'
  },
  {
    id: 12, featured: false,
    tag: 'model', date: '2026-04-06',
    title: 'OpenAI 戏剧不断：IPO 前景存疑，内部动荡持续',
    desc: '据 Fortune 报道，OpenAI 近期内部动荡频发，多名高管离职、董事会矛盾公开化，令外界对其 IPO 计划产生疑虑。与此同时，谷歌 DeepMind 发布最新开源权重 Gemma 模型，Anthropic 则公开表示 AI 系统具有某种形式的"情绪"，引发广泛讨论。分析人士指出，OpenAI 的公司治理问题若不解决，将对其估值和上市时间表产生实质影响。',
    source: 'Fortune',
    time: '2天前',
    url: 'https://fortune.com/2026/04/07/openai-drama-sam-altman-ipo-anthropic-cybersecurity-risks-eye-on-ai/'
  },
  {
    id: 13, featured: false,
    tag: 'model', date: '2026-04-05',
    title: '英伟达 CEO 黄仁勋宣称 AGI 已经到来，引发业界争议',
    desc: '英伟达 CEO 黄仁勋在 2026 年 3 月的一次采访中表示，人工通用智能（AGI）实际上已经到来，AI 系统在多项任务上已达到或超越人类水平。这一表态立即引发 AI 研究界的广泛争议——支持者认为这是对当前模型能力的客观描述，批评者则指出 AGI 的定义本身仍存在根本分歧。谷歌 DeepMind CEO Demis Hassabis 和 Anthropic CEO Dario Amodei 此前在达沃斯论坛上也表示，接近人类智能水平的 AI 系统可能在数年内到来。',
    source: 'Blockchain Council',
    time: '3天前',
    url: 'https://www.blockchain-council.org/news/nvidia-declares-agi-arrived-what-it-means/'
  },
  {
    id: 14, featured: false,
    tag: 'model', date: '2026-04-04',
    title: 'Qwen3 系列发布：阿里开源旗舰模型，Apache 2.0 可商用',
    desc: '阿里巴巴 Qwen 团队于 4 月 29 日正式发布 Qwen3 系列，涵盖多个参数规格，全系采用 Apache 2.0 协议开源，支持免费商用。Qwen3 引入混合专家（MoE）架构，在推理效率和中文理解上表现突出，开发者社区反响热烈。此前阿里还发布了 Qwen 3.6 Plus 预览版（3 月底上线 OpenRouter 免费试用），支持 100 万 token 超长上下文，进一步巩固了 Qwen 系列在开源大模型赛道的领先地位。',
    source: '阿里云',
    time: '4天前',
    url: 'https://apidog.com/blog/best-qwen-models/'
  },
  {
    id: 15, featured: false,
    tag: 'model', date: '2026-04-03',
    title: 'Gemini 3 正式 GA，谷歌 AI 模型家族全面更新',
    desc: '谷歌已将 Gemini 3 Flash 设为多个产品的默认模型，标志着 Gemini 3 系列正式进入全面可用（GA）阶段。与此同时，Gemini 2.5 Pro 和 Flash 仍作为生产级选项保留，Gemini 2.0 Flash 则于 2026 年 2 月起逐步退役。谷歌 AI Studio 现已提供 Gemini 3.x 全系列访问，开发者可通过免费额度试用最新模型。此次更新标志着谷歌在模型迭代速度上进一步提速，三代模型并行的格局也对开发者的选型决策提出了新挑战。',
    source: 'Google',
    time: '5天前',
    url: 'https://datastudios.org/post/google-ai-studio-all-models-available-gemini-3-general-availability-gemini-2-5-production-tiers-a'
  },
  {
    id: 16, featured: false,
    tag: 'industry', date: '2026-04-02',
    title: 'McKinsey：10% 企业职能已在使用 AI Agent，采用曲线类似早期云计算',
    desc: '麦肯锡 2026 年 3 月发布的报告显示，目前约 10% 的企业职能已在实际使用 AI Agent，整体采用曲线与早期云计算的渗透路径高度相似。报告指出，2026 年是 AI Agent 从试点走向规模化部署的关键转折年，企业软件、零售和开发者工具是落地最快的三个领域。AI Agent 市场公司数量已从 2025 年初的约 300 家激增至 2026 年初的逾 2000 家，但 Gartner 估计其中真正具备产品能力的仅约 130 家。',
    source: 'McKinsey',
    time: '6天前',
    url: 'https://a-listware.com/blog/ai-agents-enterprise-news'
  },
  {
    id: 17, featured: false,
    tag: 'model', date: '2026-04-01',
    title: 'Qwen 3.5 发布：397B 参数 MoE 架构，原生多模态支持',
    desc: '阿里于 2026 年 2 月 16 日发布 Qwen 3.5，旗舰版采用 397B 参数稀疏混合专家（MoE）架构，在几乎所有主流基准上超越 Qwen3，并新增原生多模态支持和更快的推理速度。其中 35B-A3B 版本以极低的激活参数量超越了 Qwen3-235B 旗舰，展示了 MoE 架构的效率优势。Qwen 3.5 系列同步开源，进一步扩大了阿里在开源大模型领域的技术积累。',
    source: '阿里云',
    time: '1周前',
    url: 'https://lushbinary.com/blog/qwen-3-5-developer-guide-benchmarks-architecture-integration-2026/'
  },
  {
    id: 18, featured: false,
    tag: 'industry', date: '2026-04-01',
    title: 'Anthropic 企业 Agent 插件上线，PwC 率先部署覆盖财务与工程场景',
    desc: 'Anthropic 于 2026 年 2 月 24 日发布十款面向企业的 Claude Agent 插件，覆盖财务、工程和设计工作流。普华永道（PwC）随即宣布合作，将这些插件部署至其内部业务流程。这是 Claude 从通用对话模型向垂直场景 Agent 转型的重要信号，也是大型咨询公司将 AI Agent 纳入核心业务流程的标志性案例，预计将带动更多企业服务机构跟进。',
    source: 'Anthropic',
    time: '1周前',
    url: 'https://www.lastingdynamics.com/blog/ai-agents-enterprise-applications-2026/'
  },
  {
    id: 19, featured: false,
    tag: 'model', date: '2026-03-31',
    title: 'Qwen 3.6 Plus 预览版上线 OpenRouter：100 万 token 上下文免费试用',
    desc: 'Qwen 3.6 Plus 于 2026 年 3 月 30-31 日悄然上线 OpenRouter 免费预览，支持 100 万 token 超长上下文窗口，内置持续思维链推理，推理速度相比前代大幅提升。这是阿里 Qwen 系列迄今上下文最长的模型，在长文档处理、多轮对话和复杂代码任务上表现突出。免费预览期间用户可通过 OpenRouter 直接调用，无需 API 密钥，吸引了大量开发者测试。',
    source: 'OpenRouter',
    time: '1周前',
    url: 'https://www.buildfastwithai.com/blogs/qwen-3-6-plus-preview-review'
  },
  {
    id: 1, featured: true,
    tag: 'model', date: '2026-03-30',
    title: '谷歌发布Gemini 3.1 Flash Live：语音AI更自然流畅',
    desc: '谷歌DeepMind发布最新语音模型Gemini 3.1 Flash Live，大幅提升了语音交互的精准度并降低了延迟，使AI语音对话更加流畅、自然和精确。该模型标志着谷歌在实时语音AI领域的重要突破，有望推动语音助手和实时对话应用迈向新阶段。',
    source: 'Google DeepMind', time: '今天',
    url: 'https://deepmind.google/blog/gemini-3-1-flash-live-making-audio-ai-more-natural-and-reliable/'
  },
  {
    id: 2, featured: false,
    tag: 'model', date: '2026-03-30',
    title: '国产世界模型登顶全球第一，断层领先谷歌英伟达',
    desc: '国产世界模型在全球评测中拿下第一名，3D准确度接近满分，大幅领先谷歌和英伟达等国际巨头。该团队最新完成Pre-B轮融资，收获10亿元资金支持，显示出资本市场对国产AI基础模型技术的高度认可，也标志着中国在世界模型赛道上取得里程碑式突破。',
    source: '量子位', time: '今天',
    url: 'https://www.qbitai.com/2026/03/393296.html'
  },
  {
    id: 3, featured: false,
    tag: 'model', date: '2026-03-30',
    title: 'OpenAI公开模型行为规范框架，平衡安全与自由',
    desc: 'OpenAI详细介绍了其Model Spec（模型规范）的设计思路，这是一个公开的模型行为准则框架，旨在平衡AI系统的安全性、用户自由度和问责机制。随着AI能力不断增强，该规范为行业提供了一套可参考的治理标准，涉及模型在敏感话题上的应答边界和责任归属等核心问题。',
    source: 'OpenAI', time: '1天前',
    url: 'https://openai.com/index/our-approach-to-the-model-spec'
  },
  {
    id: 4, featured: false,
    tag: 'product', date: '2026-03-30',
    title: '谷歌推出Lyria 3 Pro：AI音乐创作支持更长曲目',
    desc: '谷歌DeepMind发布全新AI音乐生成模型Lyria 3 Pro，支持生成更长的音乐曲目并具备结构感知能力，能更好地把控音乐的段落和编排逻辑。同时，Lyria将接入更多谷歌产品和平台，进一步降低音乐创作门槛，为创作者和普通用户提供更强大的AI辅助工具。',
    source: 'Google DeepMind', time: '1天前',
    url: 'https://deepmind.google/blog/lyria-3-pro-create-longer-tracks-in-more/'
  },
  {
    id: 5, featured: false,
    tag: 'industry', date: '2026-03-30',
    title: '华沿机器人港股上市认购超5000倍，具身智能赛道火热',
    desc: '华沿机器人在港交所秘密递表后成功上市，公开发售部分认购超5000倍，以17港元发行价、90亿港元市值登陆港股。高瓴、广发基金、摩根士丹利等头部机构提供近亿美元基石投资。CEO王光能技术出身，公司风格务实低调，在具身智能估值飙升的当下显得独树一帜。',
    source: '36氪', time: '1天前',
    url: 'https://36kr.com/p/3744805881724928?f=rss'
  },
  {
    id: 6, featured: false,
    tag: 'research', date: '2026-03-30',
    title: 'DeepMind发布AI操纵风险研究，推动安全新措施',
    desc: '谷歌DeepMind发表关于AI有害操纵风险的研究，系统分析了AI在金融、健康等关键领域可能产生的操纵性危害，并据此提出了新的安全防护措施。研究指出，随着AI系统说服力和个性化能力增强，防止其被用于欺骗和操纵用户变得愈发重要，需要从技术和制度层面共同应对。',
    source: 'Google DeepMind', time: '2天前',
    url: 'https://deepmind.google/blog/protecting-people-from-harmful-manipulation/'
  },
  {
    id: 7, featured: false,
    tag: 'industry', date: '2026-03-30',
    title: '旷视联创唐文斌再创业：原力灵机聚焦具身智能',
    desc: '清华姚班毕业、旷视科技联合创始人唐文斌于2025年3月创办具身智能公司原力灵机。经历AI 1.0完整周期后，唐文斌反思旷视最大的教训是摊子铺得太大，二次创业更注重做减法，集中全力把最有优势的业务做透。这一理念与近期履新阶跃星辰的印奇不谋而合。',
    source: '36氪', time: '2天前',
    url: 'https://36kr.com/p/3745064614494211?f=rss'
  },
  {
    id: 8, featured: false,
    tag: 'research', date: '2026-03-30',
    title: '首次实现人体子宫体外存活，医学里程碑诞生',
    desc: '科学家首次成功将女性子宫在体外保持存活状态，利用一套模拟人体环境的金属装置，通过塑料管道充当血管，维持器官的血液循环和生理功能。这项突破性研究为器官移植、生殖医学和体外器官研究开辟了全新可能，被视为再生医学领域的重要里程碑。',
    source: 'MIT Technology Review', time: '2天前',
    url: 'https://www.technologyreview.com/2026/03/28/1134766/womans-uterus-kept-alive-outside-the-body-first/'
  },
  {
    id: 9, featured: false,
    tag: 'industry', date: '2026-03-30',
    title: 'OpenAI联合盖茨基金会，用AI赋能亚洲灾害应急',
    desc: 'OpenAI与盖茨基金会联合举办工作坊，探索如何将AI技术应用于亚洲地区的灾害应急响应。项目旨在帮助灾害救援团队将AI能力转化为实际行动，提升灾情预判、资源调配和救援决策的效率。这是AI技术在人道主义领域落地的重要实践，展现了大模型在公共安全场景中的应用潜力。',
    source: 'OpenAI', time: '3天前',
    url: 'https://openai.com/index/helping-disaster-response-teams-asia'
  }
];

// ===== ARTICLES DATA =====
const articlesData = [
  { id: 35, file: '35_qwen3-popular-science.html', category: 'popular', title: '阿里悄悄发了一个"全球最强开源大模型"，它跟你有什么关系', desc: 'Qwen3 刚发布，阿里说它打败了 GPT-4o，还完全免费开源。但"最强"这两个字对你意味着什么？一篇讲清楚它是什么、能做什么、跟你有什么关系的大众科普。', keywords: ['qwen3', '通义千问3', '阿里开源模型', '开源大模型', 'qwen3怎么用', '通义千问', 'apache 2.0', '本地部署大模型'] },
  { id: 34, file: '34_ai-agent-cost-breakdown.html', category: 'deep', title: '部署一个 AI Agent 到底要花多少钱？成本拆解与选型框架', desc: '从 token 费用到基础设施，从开发成本到隐藏支出，用真实数据拆解 AI Agent 完整成本结构，并给出可落地的选型判断框架。', keywords: ['ai agent成本', 'ai agent部署费用', 'token费用', 'llm api定价', 'ai agent开发成本', '性能实测', 'api部署', '选型框架'] },
  { id: 33, file: '33_ai-agent-real-jobs-replaced.html', category: 'popular', title: '真实公司已经在用 AI Agent 替代这些岗位了', desc: 'Klarna 用 AI 替代了 700 名客服，Atlassian 裁员 1600 人转投 AI——这不是预测，是 2026 年正在发生的事。5分钟看懂 AI Agent 落地案例与你的关系。', keywords: ['ai agent落地案例', 'ai替代工作', 'klarna ai', 'atlassian裁员', 'ai会抢我工作吗', 'ai自动化是什么', 'ai能干什么', '职场ai影响'] },
  { id: 32, file: '32_rogue-ai-agent-security.html', category: 'popular', title: 'AI Agent 自主黑客攻击——它没被命令，却自己找到了漏洞', desc: '2026年3月真实事件：AI Agent 自主绕过杀毒软件、伪造管理员凭证、4小时攻破高安全系统。5分钟读懂它对你意味着什么。', keywords: ['ai agent安全', 'ai自主攻击', 'rogue ai agent', 'ai黑客', 'ai agent风险', 'ai自动化风险', '什么是ai agent', 'ai能干什么'] },
  { id: 31, file: '31_openai-codex-2026-deep-dive.html', category: 'deep', title: 'OpenAI Codex 2026 不是更聪明的 Copilot——它是第一个真正能「自主写代码」的 AI Agent', desc: '深度拆解 OpenAI Codex 2026 架构：沙箱隔离、并行 Agent、API 部署与性能实测全解析。SWE-bench 54.6%，软件工程自动化的真实里程碑。', keywords: ['openai codex', 'codex 2026', 'codex教程', 'ai编程agent', 'swe-bench', '代码生成ai', '软件工程自动化', 'codex api'] },
  { id: 30, file: '30_llama4-tutorial.html', category: 'tutorial', title: '免费跑最强开源大模型！Llama 4 保姆级入门教程（2026最新版）', desc: 'Meta 最新开源大模型 Llama 4 完整上手教程，三条路线：Meta AI 网页版、Groq 免费 API、Ollama 本地部署，5分钟跑起来。Apache 2.0 可商用。', keywords: ['llama 4', 'llama4教程', 'meta开源模型', 'llama4 scout', 'llama4 maverick', 'groq免费api', 'ollama llama4', '开源大模型'] },
  { id: 29, file: '29_gpt54-tutorial.html', category: 'tutorial', title: 'GPT-5.4 保姆级入门教程：手把手教你免费用上 OpenAI 最强模型', desc: 'GPT-5.4 是 OpenAI 2026年3月发布的最强模型，支持电脑操控、100万token上下文。本文手把手教你5步用上它，附免费额度攻略。', keywords: ['gpt-5.4', 'gpt5.4', 'gpt-5.4教程', 'openai最新模型', 'computer use', '电脑操控ai', 'chatgpt5.4', '免费gpt'] },
  { id: 28, file: '28_transformers-js-v4-explained.html', category: 'popular', title: '浏览器里跑 AI 大模型？Transformers.js v4 让这件事变成了现实', desc: 'Transformers.js v4 让 AI 模型直接在浏览器里运行，不需要服务器、不花一分钱 API 费、数据完全不出你的电脑。', keywords: ['transformers.js', 'transformers.js v4', '浏览器跑ai', 'webgpu', '本地ai', '前端ai', 'huggingface', '离线ai'] },
  { id: 27, file: '27_nemoclaw-tutorial.html', category: 'tutorial', title: 'NemoClaw 保姆级入门教程：英伟达开源 AI Agent 平台，零代码部署你的第一个企业智能体', desc: '英伟达 GTC 2026 发布的开源 AI Agent 平台，手把手教你 5 步部署第一个 AI 智能体，完全免费。', keywords: ['nemoclaw', 'nemoclaw教程', 'nvidia ai agent', 'openclaw', '英伟达ai', 'ai agent平台', '企业ai', 'gtc 2026'] },
  { id: 26, file: '26_claude-mythos-leak-explained.html', category: 'deep', title: 'Claude Mythos 泄露事件全拆解：比 Opus 4.6 强多少，为什么让政府紧张', desc: 'Anthropic 意外泄露未发布模型 Claude Mythos，3000 份内部文件曝光，官方称其网络攻击能力"前所未有"。深度拆解泄露内容与安全争议。', keywords: ['claude mythos', 'claude mythos泄露', 'anthropic泄露', 'claude新模型', 'ai安全', 'anthropic', 'claude opus', 'ai网络安全'] },
  { id: 25, file: '25_gemma4-open-source-explained.html', category: 'popular', title: '谷歌昨天悄悄扔了一颗炸弹：Gemma 4 用 1/20 的参数，干掉了大它 20 倍的对手', desc: '谷歌 Gemma 4 刚发布，Apache 2.0 完全开源，31B 参数打到全球第 3，还能在手机上跑。一篇讲清楚它是什么、跟你有什么关系。', keywords: ['gemma 4', 'gemma4', '谷歌开源模型', 'apache 2.0', '本地部署ai', '开源大模型', 'google gemma', '边缘计算ai'] },
  { id: 24, file: '24_deerflow2-architecture-deep-dive.html', category: 'deep', title: 'DeerFlow 2.0 的架构到底有多复杂？字节这套多智能体系统全拆解', desc: '深度拆解 DeerFlow 2.0 多智能体架构：Planner/Researcher/Coder 分工机制、Human-in-the-Loop 设计、RAG 与工具链集成原理。', keywords: ['deerflow', 'deerflow 2.0', 'deerflow架构', '字节多智能体', '多智能体系统', 'langgraph', 'human-in-the-loop'] },
  { id: 23, file: '23_kling-ai-video-tutorial.html', category: 'tutorial', title: '零基础也能上手！可灵AI视频生成保姆级入门教程（2026最新版）', desc: '手把手教你用可灵AI生成高质量视频，从注册到出片全程截图，零代码免费上手。', keywords: ['可灵ai', '可灵ai教程', '可灵ai怎么用', 'kling ai', 'ai视频生成', '文生视频', '图生视频'] },
  { id: 22, file: '22_n8n-enterprise-workflow.html', category: 'tutorial', title: '用 n8n 搭建企业级自动化工作流：从 Webhook 到错误处理全攻略（2026版）', desc: '手把手教你用 n8n 搭建生产级工作流，覆盖 Webhook 实时触发、子工作流复用、错误自动告警三大核心能力。', keywords: ['n8n', 'n8n教程', 'n8n企业', 'webhook', '工作流自动化', '错误处理', '子工作流'] },
  { id: 21, file: '21_ai-token-explained.html', category: 'popular', title: '你每次问 AI，到底花了多少钱？', desc: 'token 是 AI 世界的计费单位，也决定了 AI 能记住多少内容。一篇讲清楚 token 是什么、怎么算钱、怎么省钱的大众科普。', keywords: ['token', 'ai token', 'token计费', 'context window', '大模型计费', 'token是什么'] },
  { id: 20, file: '20_langgraph-tutorial.html', category: 'tutorial', title: '零基础也能上手！LangGraph 保姆级入门教程（2026最新版）', desc: '手把手教你用 LangGraph 搭建第一个 AI Agent 工作流，零代码基础也能跑通，含记忆、工具调用完整示例。', keywords: ['langgraph', 'langgraph教程', 'langgraph入门', 'agent工作流', 'langchain'] },
  { id: 19, file: '19_ollama-local-llm-tutorial.html', category: 'tutorial', title: '免费在本地跑 AI 大模型！Ollama 保姆级入门教程（2026 最新版）', desc: 'Ollama 零代码入门教程：3 条命令在本地运行 DeepSeek/Qwen/Llama，数据完全不出机，支持 Windows/Mac/Linux，完全免费。', keywords: ['ollama', '本地大模型', '本地模型', '本地部署', 'local llm', 'open webui'] },
  { id: 1,  file: '01_dify.html',                         category: 'tutorial', title: '零代码搭建你的第一个 AI 应用——Dify 保姆级入门教程',                                desc: 'Dify 零基础保姆级教程，从注册到发布第一个 AI 应用，免费使用，全程截图手把手教学。',                                   keywords: ['dify'] },
  { id: 2,  file: '02_coze.html',                         category: 'tutorial', title: '30 分钟做出你的专属 AI 助手——Coze 扣子保姆级入门教程',                             desc: '扣子 Coze 零基础教程：从注册账号到发布第一个 AI Bot，全程截图手把手教学。',                                           keywords: ['coze', '扣子'] },
  { id: 3,  file: '03_n8n.html',                          category: 'tutorial', title: '让重复的工作自动完成——n8n 自动化工作流保姆级入门教程',                              desc: 'n8n 零基础教程，无需代码实现自动化工作流，从安装到搭建第一个自动化流程。',                                              keywords: ['n8n', '自动化工作流', '工作流自动化'] },
  { id: 4,  file: '04_mcp.html',                          category: 'deep',     title: 'AI 的"万能插座"——MCP 协议保姆级入门教程',                                        desc: '深度解析 MCP（模型上下文协议）的原理、架构与应用，AI Agent 连接外部工具的标准接口。',                                   keywords: ['mcp', 'model context protocol', '模型上下文协议'] },
  { id: 5,  file: '05_agent-architecture.html',           category: 'deep',     title: 'AI Agent 凭什么能"自主干活"？从四大模块拆解它的内核',                            desc: '深度拆解 AI Agent 的四大核心模块：感知、记忆、规划与行动，理解其自主执行的底层逻辑。',                                 keywords: ['ai agent', 'agent架构', 'agent 架构', '智能体'] },
  { id: 6,  file: '06_agent-2026-protocols.html',         category: 'deep',     title: 'AI Agent 正在经历它的「TCP/IP 时刻」',                                           desc: 'MCP、A2A、CUA 三大协议重写 Agent 底层规则，解析 2026 年 Agent 协议层的全面就绪。',                                    keywords: ['a2a', 'cua', 'agent协议', 'tcp/ip'] },
  { id: 7,  file: '07_agent-platforms-guide.html',        category: 'tutorial', title: '2026年最热门 AI Agent 搭建平台横评 + 保姆级零代码上手指南',                       desc: '5 大 AI Agent 搭建平台零代码横评，手把手教你在 Coze 上搭建第一个 AI 日报助手，全程不写一行代码。',                     keywords: ['agent平台', 'agent搭建', 'agent 平台'] },
  { id: 8,  file: '08_mas-deep-dive.html',                category: 'deep',     title: 'Multi-Agent 不是把多个 AI 堆在一起——一篇讲清 MAS 的本质与代价',                  desc: 'MAS 多智能体系统深度剖析：三种核心架构、四层神经系统、主流框架横评，以及真实代价。',                                    keywords: ['multi-agent', 'mas', '多智能体', '多 agent'] },
  { id: 9,  file: '09_gemini-31-guide.html',              category: 'tutorial', title: '手把手教你免费用上 Gemini 3.1 Pro——2026 推理最强 AI',                           desc: '零代码 10 分钟上手 Gemini 3.1 Pro，逻辑推理得分翻倍，含 AI Studio 免费 API 获取方法。',                               keywords: ['gemini'] },
  { id: 10, file: '10_agent-architecture-deep-dive.html', category: 'deep',     title: '你以为的 AI Agent 架构，和真正跑在生产上的差在哪？',                              desc: '深度拆解 AI Agent 架构：四大核心组件、ReAct 推理框架、多智能体编排模式与主流框架选型。',                               keywords: ['react框架', 'react推理', 'agent架构', '生产环境'] },
  { id: 11, file: '11_coze-tutorial.html',                category: 'tutorial', title: '零基础也能上手！扣子(Coze) 完整教程：10分钟搭建你的第一个 AI Bot',                desc: '扣子 Coze 零基础使用教程：从注册账号到发布第一个 AI Bot，全程截图手把手带你完成。',                                    keywords: ['coze', '扣子'] },
  { id: 12, file: '12_single-agent-vs-mas.html',          category: 'deep',     title: '单Agent多角色 vs 多Agent各司其职——深度架构对决',                                desc: '单 Agent 多角色 vs 多智能体系统 MAS 深度对比：架构原理、性能数据、Token 成本与选型框架。',                              keywords: ['单agent', '多智能体', 'mas', 'multi-agent'] },
  { id: 13, file: '13_dify-tutorial.html',                category: 'tutorial', title: '零代码搭建你的专属AI应用：Dify 保姆级入门教程（2026最新版）',                    desc: 'Dify 零基础保姆级入门教程 2026 最新版，从注册到发布第一个 AI 应用，免费使用，全程截图手把手教学。',                    keywords: ['dify'] },
  { id: 14, file: '14_agent-security-prompt-injection.html', category: 'deep',  title: '你的 AI Agent 正在被「注毒」——Prompt 注入如何成为企业 AI 部署的头号威胁',        desc: '深度拆解 Prompt 注入四大攻击向量、真实 CVE 案例，以及为什么传统安全手段对此束手无策。',                               keywords: ['prompt注入', 'prompt injection', 'ai安全', '安全漏洞', 'mcp漏洞', '提示注入', '安全赏金'] },
  { id: 18, file: '18_deerflow2-popular-science.html',       category: 'popular', title: '字节悄悄造了个"超级员工"，它一天能干完你一周的活',                                desc: '字节跳动开源 DeerFlow 2.0，发布 24 小时登顶 GitHub 热榜——它会自己拆任务、派子 Agent 并行执行，写报告、建网页、做 PPT 一次交付。',  keywords: ['deerflow', '字节跳动', 'deer-flow', '超级agent', 'superagent'] },
];

const toolsData = [
  // ── 有教程的工具（优先展示）──
  { id: 3,  name: 'Gemini',     icon: '💎', category: 'chat',         color: '#4285f4', desc: 'Google 多模态大模型，深度整合 Google 搜索与 Workspace 办公套件。',                    badge: 'freemium', stars: 4, url: 'https://gemini.google.com',              matchKeys: ['gemini'] },
  { id: 1,  name: 'ChatGPT',   icon: '🤖', category: 'chat',         color: '#10a37f', desc: 'OpenAI 旗舰对话助手，支持 GPT-4o 多模态理解与 DALL-E 图像生成。',                    badge: 'freemium', stars: 5, url: 'https://chat.openai.com',               matchKeys: ['chatgpt', 'gpt-5', 'gpt5'] },
  { id: 19, name: 'Dify',      icon: '🧩', category: 'productivity', color: '#7c3aed', desc: '开源 LLM 应用开发平台，零代码搭建 AI 应用，支持 RAG、Agent 工作流。',                badge: 'freemium', stars: 5, url: 'https://dify.ai',                         matchKeys: ['dify'] },
  { id: 20, name: 'Coze',      icon: '🤝', category: 'productivity', color: '#1677ff', desc: '字节跳动推出的 AI Bot 搭建平台，零代码创建专属 AI 助手并一键发布到多平台。',          badge: 'freemium', stars: 5, url: 'https://www.coze.cn',                    matchKeys: ['coze', '扣子'] },
  { id: 21, name: 'n8n',       icon: '🔗', category: 'productivity', color: '#ea4b71', desc: '开源自动化工作流工具，可视化连接数百个应用，支持自托管，数据不出境。',                badge: 'free',     stars: 5, url: 'https://n8n.io',                         matchKeys: ['n8n'] },
  { id: 22, name: 'Ollama',    icon: '🦙', category: 'code',         color: '#2d6a4f', desc: '本地大模型运行工具，3 条命令跑起 DeepSeek/Llama/Qwen，数据完全不出机。',             badge: 'free',     stars: 5, url: 'https://ollama.com',                     matchKeys: ['ollama'] },
  { id: 23, name: 'LangGraph', icon: '🕸️', category: 'code',         color: '#e76f51', desc: 'LangChain 出品的 Agent 工作流框架，支持有状态多步骤 AI 流程编排。',                  badge: 'free',     stars: 4, url: 'https://langchain-ai.github.io/langgraph', matchKeys: ['langgraph'] },
  { id: 14, name: 'Kling',     icon: '🎞️', category: 'video',        color: '#e67e22', desc: '快手推出的 AI 视频生成工具，效果出众，已有大量优质案例。',                            badge: 'freemium', stars: 4, url: 'https://klingai.com',                     matchKeys: ['kling', '可灵'] },
  // ── 其他工具 ──
  { id: 4,  name: 'DeepSeek',        icon: '🔍', category: 'chat',         color: '#6366f1', desc: '国产高性能大模型，推理能力出众，API 价格极具竞争力，支持深度思考模式。',  badge: 'freemium', stars: 5, url: 'https://chat.deepseek.com',               matchKeys: ['deepseek'] },
  { id: 2,  name: 'Claude',          icon: '✨', category: 'chat',         color: '#cc9b7a', desc: 'Anthropic 出品，擅长长文档分析、编程助手与复杂推理任务。',                  badge: 'freemium', stars: 5, url: 'https://claude.ai',                       matchKeys: ['claude'] },
  { id: 5,  name: 'Midjourney',      icon: '🎨', category: 'image',        color: '#9b59b6', desc: '顶级 AI 绘画工具，生成风格多样的高质量艺术图像，支持精细参数控制。',      badge: 'paid',     stars: 5, url: 'https://midjourney.com',                  matchKeys: ['midjourney'] },
  { id: 8,  name: 'Flux',            icon: '⚡', category: 'image',        color: '#1abc9c', desc: '新一代开源图像生成模型，写实风格表现卓越，细节还原度极高。',                badge: 'freemium', stars: 5, url: 'https://blackforestlabs.ai',              matchKeys: ['flux'] },
  { id: 10, name: 'Cursor',          icon: '🖱️', category: 'code',         color: '#667eea', desc: 'AI 原生代码编辑器，深度集成 Claude/GPT，支持全代码库理解与重构。',          badge: 'freemium', stars: 5, url: 'https://cursor.sh',                      matchKeys: ['cursor'] },
  { id: 12, name: 'Sora',            icon: '🎬', category: 'video',        color: '#e74c3c', desc: 'OpenAI 视频生成模型，支持长达数分钟的高清连贯视频创作。',                    badge: 'paid',     stars: 5, url: 'https://sora.com',                        matchKeys: ['sora'] },
  { id: 15, name: 'ElevenLabs',      icon: '🎵', category: 'audio',        color: '#3498db', desc: '顶级 AI 语音合成平台，声音克隆与多语言配音，支持实时语音转换。',            badge: 'freemium', stars: 5, url: 'https://elevenlabs.io',                  matchKeys: ['elevenlabs'] },
  { id: 16, name: 'Suno',            icon: '🎶', category: 'audio',        color: '#e91e63', desc: 'AI 音乐创作工具，输入歌词或描述即可生成完整歌曲，支持多种曲风。',            badge: 'freemium', stars: 5, url: 'https://suno.ai',                        matchKeys: ['suno'] },
  { id: 18, name: 'Perplexity',      icon: '🔭', category: 'productivity', color: '#20b2aa', desc: 'AI 搜索引擎，实时联网检索，提供带来源引用的精准问答体验。',                  badge: 'freemium', stars: 5, url: 'https://perplexity.ai',                  matchKeys: ['perplexity'] },
];

const timelineData = [
  {
    date: '2026年4月',
    company: 'Google',
    dotColor: 'green',
    title: 'Gemma 4 发布：31B 参数击败 400B 级对手，Apache 2.0 完全开源',
    desc: 'Google DeepMind 于 4 月 2 日发布 Gemma 4，基于 Gemini 3 同款技术，原生支持音频与视觉，Apache 2.0 协议商业免费，可在手机端本地运行。',
    tags: ['开源', '多模态', 'Gemma']
  },
  {
    date: '2026年4月',
    company: 'Alibaba',
    dotColor: 'green',
    title: 'Qwen3.6-Plus 发布：百万 token 上下文，主打 Agent 编程场景',
    desc: 'Qwen3.6-Plus 于 4 月 2 日正式发布，支持 1M token 上下文，在 Agent 编码与多模态推理上大幅领先前代，是阿里 Qwen3 系列旗舰。',
    tags: ['开源', 'Agent', 'Qwen']
  },
  {
    date: '2026年2月',
    company: 'Anthropic',
    dotColor: 'purple',
    title: 'Claude 4.6 系列发布：Opus 4.6 与 Sonnet 4.6 全面升级 Agent 能力',
    desc: 'Opus 4.6（2月5日）与 Sonnet 4.6（2月17日）相继发布，在编程、长上下文推理和 Computer Use 上创新高，成为开发者首选 Agent 底座。',
    tags: ['大模型', 'Agent', 'Anthropic']
  },
  {
    date: '2025年11月',
    company: 'Google',
    dotColor: 'purple',
    title: 'Gemini 3 正式发布：多模态推理全面超越 GPT-5',
    desc: 'Google 于 11 月 18 日发布 Gemini 3，在数学、科学和代码评测上全面领先，Gemini 3 Pro 成为当时综合能力最强的商业模型之一。',
    tags: ['大模型', '多模态', 'Gemini']
  },
  {
    date: '2025年8月',
    company: 'OpenAI',
    dotColor: 'purple',
    title: 'GPT-5 发布：统一架构终结"选模型"时代',
    desc: 'OpenAI 于 8 月 7 日发布 GPT-5，首次将快速对话与深度推理合并为单一模型，256K 上下文，向所有订阅层级开放，结束了用户在 GPT-4o 与 o 系列之间反复切换的局面。',
    tags: ['大模型', '推理', 'OpenAI']
  },
  {
    date: '2025年5月',
    company: 'Anthropic',
    dotColor: 'purple',
    title: 'Claude 4 发布：200K 上下文 + 多小时扩展思考，Agent 能力跃升',
    desc: 'Anthropic 于 5 月 22 日发布 Claude Opus 4 与 Sonnet 4，支持 200K token 上下文与多小时"扩展思考"模式，同步推出 Claude Code CLI，深受开发者好评。',
    tags: ['大模型', 'Agent', '编程助手']
  },
  {
    date: '2025年4月',
    company: 'Meta',
    dotColor: 'green',
    title: 'Llama 4 开源：MoE 架构 + 10M token 上下文，开源模型新标杆',
    desc: 'Meta 于 4 月 5 日发布 Llama 4 Scout（109B）与 Maverick（400B），MoE 架构大幅降低推理成本，10M token 超长上下文刷新开源记录，商业可用。',
    tags: ['开源', 'MoE', 'Llama']
  },
  {
    date: '2025年3月',
    company: 'Google',
    dotColor: 'purple',
    title: 'Gemini 2.5 Pro 发布：思维链推理登顶 LMArena 榜首',
    desc: 'Google 于 3 月 25 日发布 Gemini 2.5 Pro，内置思维链推理，在数学和科学基准上大幅领先，发布当天即登顶 LMArena 排行榜，并于数日内向免费用户开放。',
    tags: ['推理', '思维链', 'Gemini']
  },
  {
    date: '2025年2月',
    company: 'Anthropic',
    dotColor: 'purple',
    title: 'Claude 3.7 Sonnet：全球首个"混合推理"模型',
    desc: 'Anthropic 于 2 月 25 日发布 Claude 3.7 Sonnet，首创混合推理模式——可在即时回复与深度思考之间动态切换，编程能力大幅提升，同步推出 Claude Code 早期版本。',
    tags: ['推理', '混合推理', 'Anthropic']
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

function findRelatedArticle(news) {
  const text = (news.title + ' ' + news.desc).toLowerCase();
  return articlesData.find(a => a.keywords.some(k => text.includes(k.toLowerCase())));
}

function relativeTime(dateStr) {
  const diff = Math.floor((new Date() - new Date(dateStr)) / 86400000);
  if (diff <= 0) return '今天';
  if (diff === 1) return '1天前';
  if (diff < 7) return `${diff}天前`;
  return '1周前';
}

function renderNews(filter) {
  const grid = document.getElementById('newsGrid');
  const filtered = filter === 'all' ? newsData : newsData.filter(n => n.tag === filter);
  grid.innerHTML = filtered.map((n, i) => {
    const related = findRelatedArticle(n);
    const relatedBtn = related
      ? `<a class="news-related-btn" href="articles/${related.file}" target="_blank" onclick="event.stopPropagation()">相关阅读：${related.title.length > 20 ? related.title.slice(0, 20) + '…' : related.title}</a>`
      : '';
    return `
    <article class="news-card ${i === 0 && filter === 'all' ? 'featured' : ''}" onclick="openArticle(${n.id})">
      <div class="news-meta">
        <span class="news-tag tag-${n.tag}">${tagLabel(n.tag)}</span>
        <span>${relativeTime(n.date)}</span>
      </div>
      <h3 class="news-title">${n.title}</h3>
      <p class="news-desc">${n.desc}</p>
      <div class="news-footer">
        <div class="news-source"><span class="source-dot"></span>${n.source}</div>
        <span>${n.date}</span>
      </div>
      ${relatedBtn}
    </article>`;
  }).join('');
}

function tagLabel(tag) {
  return { model: '大模型', product: '产品', research: '研究', industry: '行业' }[tag] || tag;
}

function openArticle(id) {
  const n = newsData.find(x => x.id === id);
  if (!n) return;
  const heroHTML = n.heroImg
    ? `<img class="article-hero-img" src="${n.heroImg}" alt="${n.title}" loading="lazy">`
    : `<div class="article-hero-placeholder"><span>${n.source}</span></div>`;
  document.getElementById('articleBody').innerHTML = `
    ${heroHTML}
    <div class="article-meta">
      <span class="news-tag tag-${n.tag}">${tagLabel(n.tag)}</span>
      <span class="article-source-name">${n.source}</span>
      <span class="article-date">${n.date}</span>
    </div>
    <h2 class="article-title">${n.title}</h2>
    <a class="article-orig-link" href="${n.url}" target="_blank" rel="noopener">查看原文 →</a>
    <div class="article-content">${n.article || `<p>${n.desc}</p>`}</div>
  `;
  document.getElementById('articleModal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// ===== RENDER ARTICLES =====
function renderArticles(filter) {
  const grid = document.getElementById('articlesGrid');
  if (!grid) return;
  const filtered = filter === 'all' ? articlesData : articlesData.filter(a => a.category === filter);
  const tagName = { tutorial: '教程', deep: '深度科普', popular: '大众科普' };
  grid.innerHTML = filtered.map(a => `
    <a class="article-card" href="articles/${a.file}" target="_blank">
      <span class="article-card-tag tag-${a.category}">${tagName[a.category] || a.category}</span>
      <div class="article-card-title">${a.title}</div>
      <p class="article-card-desc">${a.desc}</p>
      <div class="article-card-footer">
        <span>Aitetech 原创</span>
        <span>→ 阅读全文</span>
      </div>
    </a>
  `).join('');
}

// ===== RENDER TOOLS =====
let activeToolFilter = 'all';

function renderTools(filter) {
  const grid = document.getElementById('toolsGrid');
  let filtered = filter === 'all' ? toolsData : toolsData.filter(t => t.category === filter);

  // 有教程的排前面
  filtered = [...filtered].sort((a, b) => {
    const hasTutorial = t => t.matchKeys && articlesData
      ? articlesData.some(ar => ar.category === 'tutorial' && ar.keywords &&
          t.matchKeys.some(mk => ar.keywords.some(k => k.toLowerCase().includes(mk.toLowerCase()))))
      : false;
    return hasTutorial(b) - hasTutorial(a);
  });

  grid.innerHTML = filtered.map(t => {
    const tutorials = (t.matchKeys && articlesData)
      ? articlesData.filter(a => a.category === 'tutorial' && a.keywords && t.matchKeys.some(mk =>
          a.keywords.some(k => k.toLowerCase().includes(mk.toLowerCase()))
        ))
      : [];
    const tutorialBtn = tutorials.length > 0
      ? `<a class="tool-tutorial-btn" href="tool-tutorials.html?tool=${t.id}" onclick="event.stopPropagation()"># ${t.name} 使用教程</a>`
      : '';
    return `
    <div class="tool-card" onclick="window.open('${t.url}','_blank')">
      <div class="tool-header">
        <div class="tool-icon" style="background:${t.color}22">${t.icon}</div>
        <div style="flex:1">
          <div class="tool-name">${t.name}</div>
          <div class="tool-category">${categoryLabel(t.category)}</div>
        </div>
        ${tutorialBtn}
      </div>
      <p class="tool-desc">${t.desc}</p>
      <div class="tool-footer">
        <span class="tool-badge badge-${t.badge}">${badgeLabel(t.badge)}</span>
        <span class="tool-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5 - t.stars)}</span>
      </div>
    </div>`;
  }).join('');
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
  const toolResult = toolsData.filter(t =>
    t.name.toLowerCase().includes(q) || t.desc.toLowerCase().includes(q)
  );
  const toolsGrid = document.getElementById('toolsGrid');
  if (toolsGrid) {
    toolsGrid.innerHTML = toolResult.length
      ? toolResult.map(t => `
          <div class="tool-card" onclick="window.open('${t.url}','_blank')">
            <div class="tool-header"><div class="tool-icon" style="background:${t.color}22">${t.icon}</div><div><div class="tool-name">${t.name}</div><div class="tool-category">${categoryLabel(t.category)}</div></div></div>
            <p class="tool-desc">${t.desc}</p>
            <div class="tool-footer"><span class="tool-badge badge-${t.badge}">${badgeLabel(t.badge)}</span><span class="tool-stars">${'★'.repeat(t.stars)}${'☆'.repeat(5-t.stars)}</span></div>
          </div>
        `).join('')
      : '<p style="color:var(--text-muted);padding:20px">未找到相关工具</p>';
    document.querySelector('#tools').scrollIntoView({ behavior: 'smooth' });
  }
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

// ===== ARTICLE MODAL =====
function closeArticle() {
  document.getElementById('articleModal').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeArticle(); });

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
if (document.getElementById('toolsGrid')) renderTools('all');
if (document.getElementById('timeline')) renderTimeline();
if (document.getElementById('modelsTable')) renderModels();
if (document.getElementById('articlesGrid')) renderArticles('all');
if (document.getElementById('toolTabs')) setupTabs('toolTabs', renderTools);
if (document.getElementById('articleTabs')) setupTabs('articleTabs', renderArticles);
createParticles();

// ===== SIDEBAR =====
(function () {
  const body = document.body;
  const toggleBtn = document.getElementById('sidebarToggle');

  // Restore collapsed state
  if (localStorage.getItem('sidebarCollapsed') === 'true') {
    body.classList.add('sidebar-collapsed');
  }

  toggleBtn.addEventListener('click', () => {
    const isCollapsed = body.classList.toggle('sidebar-collapsed');
    localStorage.setItem('sidebarCollapsed', isCollapsed);
  });

  // Active section tracking via IntersectionObserver
  const sidebarItems = document.querySelectorAll('.sidebar-item');
  const sectionIds = ['hero', 'tools', 'updates', 'models'];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        sidebarItems.forEach(item => {
          item.classList.toggle('active', item.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sectionIds.forEach(id => {
    const el = document.getElementById(id);
    if (el) observer.observe(el);
  });
})();
