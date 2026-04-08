/* =====================================================
   AI 前沿 — animations.js
   滚动触发 / 导航栏 / 分数条 动效控制
   ===================================================== */
(function () {
  'use strict';

  // ── 滚动触发淡入 ─────────────────────────────────────
  const CARD_SEL = [
    '.news-card', '.tool-card', '.article-card',
    '.timeline-item', '.about-card', '.stat-item', '.content-type'
  ].join(',');

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.07, rootMargin: '0px 0px -28px 0px' });

  function watchCards(root) {
    (root || document).querySelectorAll(CARD_SEL).forEach((el, i) => {
      if (el.classList.contains('anim-item')) return;
      el.classList.add('anim-item');
      // 同一批次最多错开 7 个，避免最后一张等太久
      el.style.transitionDelay = (i % 8) * 0.06 + 's';
      io.observe(el);
    });
  }

  // 监听动态渲染的网格（renderNews / renderTools / renderArticles 会替换 innerHTML）
  function watchGrid(selector) {
    const grid = document.querySelector(selector);
    if (!grid) return;
    new MutationObserver(() => watchCards(grid)).observe(grid, { childList: true });
  }
  ['#newsGrid', '#toolsGrid', '#articlesGrid', '.news-grid', '.tools-grid', '.articles-grid']
    .forEach(watchGrid);

  // ── 导航栏滚动收缩 ────────────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => navbar.classList.toggle('scrolled', scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // 初始化
  }

  // ── 回到顶部按钮显隐 ──────────────────────────────────
  const backTop = document.getElementById('backTop');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', scrollY > 400);
    }, { passive: true });
  }

  // ── Tab 切换时内容淡入 ────────────────────────────────
  document.addEventListener('click', e => {
    const tab = e.target.closest('.tab');
    if (!tab) return;
    // 找到同级的网格容器
    const header = tab.closest('.section-header') || tab.closest('.filter-tabs')?.parentElement;
    const grid = header?.nextElementSibling || header?.parentElement?.querySelector(
      '.news-grid, .tools-grid, .articles-grid, #newsGrid, #toolsGrid, #articlesGrid'
    );
    if (grid) {
      grid.classList.remove('grid-fade');
      void grid.offsetWidth; // reflow
      grid.classList.add('grid-fade');
    }
  });

  // ── 分数条入场动画 ────────────────────────────────────
  // 先把宽度存到 data-w，再清零，进入视口后恢复
  function initScoreBars() {
    document.querySelectorAll('.score-bar').forEach(bar => {
      if (bar.dataset.w) return; // 已处理
      const w = bar.style.width;
      if (!w) return;
      bar.dataset.w = w;
      bar.style.width = '0';
    });
  }

  const scoreIo = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.score-bar[data-w]').forEach(bar => {
          requestAnimationFrame(() => { bar.style.width = bar.dataset.w; });
        });
        scoreIo.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  function watchScoreTable() {
    const table = document.querySelector('.models-table-wrap');
    if (table) {
      initScoreBars();
      scoreIo.observe(table);
    }
  }

  // ── 初始化 ────────────────────────────────────────────
  function init() {
    watchCards();
    watchScoreTable();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
