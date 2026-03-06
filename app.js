/* ============================================================
   ClaimCheck · Shared Application Logic
   Data, sidebar, modals, scan, toast, product switching
   ============================================================ */

const PRODUCTS = {
  jacket: {
    id: 'jacket', name: 'STORMCREW 三合一冲锋衣', brand: '影视飓风',
    industry: '户外运动', platform: '天猫', sales: '1.7万+', price: '¥549',
    image: 'pic/冲锋衣主图.jpg',
    stats: { risks: 5, complaints: 2, highRisk: 3, reviews: 3 },
    status: 'danger',
    text: 'STORMCREW 三合一冲锋衣，全身覆盖无氟防水涂层，全压胶工艺（所有接缝热风压胶），100% 防水，户外极端环境防护。采用最先进的防水材料，无氟涂层环保健康，拒油等级 4 级。',
    risks: [
      { category:'违禁词', dim:'合规', kw:'最先进', level:'高危', lc:'r',
        problem:'《广告法》第九条禁止"国家级""最高级""最佳"等绝对化用语',
        evidence:'直接违反广告法。天猫将限流处罚。',
        original:'采用最先进的防水材料', fix:'改为"高性能防水材料"' },
      { category:'绝对化用语', dim:'合规', kw:'100% 防水', level:'高危', lc:'r',
        problem:'《广告法》禁止绝对化用语，任何面料无法做到100%防水',
        evidence:'投诉即判罚，职业打假人重点目标。',
        original:'100% 防水，户外极端环境防护', fix:'改为"高效防水"或"符合国标防水标准"' },
      { category:'虚假宣传争议', dim:'打假', kw:'全压胶', level:'高危', lc:'r',
        problem:'宣称"所有裁片接缝处均压胶"，实际口袋和领子没有压胶',
        evidence:'博主"H先生小韩哥"发视频指出口袋无压胶。专家姚蔚铭确认"口袋不压胶普遍，但与宣传矛盾"。曾引发舆论风波。',
        original:'所有裁片接缝处均使用无缝热风压胶', fix:'改为"主要接缝处全压胶（肩部、腋下、拉链等），内部压胶10米+，符合国标 GB/T 32624-2023"' },
      { category:'技术悖论', dim:'打假', kw:'无氟涂层', level:'中危', lc:'o',
        problem:'"无氟涂层"与"拒油等级4级"存在技术矛盾——无氟拒水剂无法达到4级拒油',
        evidence:'送检 PFOA 0.90μg/㎡（国标<1.0，合格）。专家姚蔚铭："实现拒油大概率需含氟物质"。官方再次送检大货 PFOA/PFOS 未检出。',
        original:'全身覆盖无氟防水涂层', fix:'方案1：删除"无氟"，改为"防水涂层"\n方案2：保留但注明"符合国标无氟整理认定标准"' },
      { category:'认知鸿沟', dim:'认知', kw:'全压胶', level:'低危', lc:'g',
        problem:'消费者理解"全压胶"=每处都压；行业共识=主要防水接缝处压胶',
        evidence:'近30天62%客诉涉及压胶理解偏差。改措辞后存量用户仍按旧理解。',
        original:'全压胶工艺', fix:'在详情页增加图示说明"全压胶"的行业定义' }
    ],
    complaints: [
      { q:'你们详情页写的所有裁片接缝处均压胶，为什么口袋没有压胶？是不是虚假宣传？', tags:['全压胶','口袋'],
        steps:[
          {t:'行业标准',x:'冲锋衣"全压胶"在行业内指主要防水接缝处（肩部、腋下、拉链等）全部压胶，符合国标 GB/T 32624-2023。口袋不压胶是行业通行做法。'},
          {t:'产品情况',x:'STORMCREW 冲锋衣内部压胶长度超过10米，防水性能完全达标。'},
          {t:'证明材料',x:'已提供国标检测报告，产品通过所有防水性能测试。'},
          {t:'解决方案',x:'后续会在详情页补充更详细说明。支持7天无理由退货。'}],
        ctx:['售前扫描标注"全压胶"为虚假宣传争议（高危）','行业案例：类似品牌因压胶宣传被投诉','博主"H先生小韩哥"发视频质疑','近30天62%客诉涉及压胶'] },
      { q:'你们说无氟，但博主检测出来有PFOA，是不是虚假宣传？', tags:['无氟','PFOA'],
        steps:[
          {t:'检测结果',x:'已提供大货成衣完整质检报告，PFOA 和 PFOS 均为"未检出"，符合国标对"无氟整理"的认定。'},
          {t:'标准说明',x:'国标对"无氟"定义是 PFOA<1.0μg/㎡。我们检测结果为"未检出"，远低于国标。'},
          {t:'关于博主检测',x:'该博主送检样品标注为"已破坏，数量不足"，报告写明"不具有对社会证明作用"。'},
          {t:'解决方案',x:'支持7天无理由退货，可提供完整检测报告供查阅。'}],
        ctx:['售前扫描标注"无氟涂层"为技术悖论（中危）','PFOA 0.90<1.0 合格','大货再次送检未检出'] }
    ]
  },
  tshirt: {
    id: 'tshirt', name: '凉伴抗菌短袖', brand: '影视飓风',
    industry: '服饰', platform: '天猫', sales: '20万+', price: '¥89',
    image: 'pic/凉拌抗菌短袖.png',
    stats: { risks: 1, complaints: 1, highRisk: 0, reviews: 1 },
    status: 'warning',
    text: '集凉感、抗菌、速干、防晒功能于一体\n280g 重磅纯棉，领口 3% 氨纶防变形',
    risks: [
      { category:'证据支撑不足', dim:'打假', kw:'凉感面料', level:'中危', lc:'o',
        problem:'宣称"凉感"但未标注凉感值（Q-max）检测数据',
        evidence:'消费者质疑"凉感"是否有客观数据支撑。',
        original:'集凉感、抗菌、速干功能于一体', fix:'补充凉感值检测数据，如"Q-max ≥0.15"' }
    ],
    complaints: [
      { q:'你们说凉感面料，我穿着也没觉得凉啊？', tags:['凉感','面料'],
        steps:[
          {t:'解释说明',x:'凉感面料的体感因人而异，其原理是面料接触皮肤瞬间的导热效果（Q-max值），并非持续降温。'},
          {t:'产品数据',x:'产品已通过凉感性能测试，Q-max 达到 0.18，超过行业标准。'},
          {t:'解决方案',x:'支持7天无理由退货。如需了解更多，可查看详情页质检报告。'}],
        ctx:['凉感属于主观体验差异','Q-max 数据合格'] }
    ]
  },
  base: {
    id: 'base', name: '「降燥」抗菌打底衫', brand: '影视飓风',
    industry: '服饰', platform: '天猫', sales: '3万+', price: '¥129',
    image: 'pic/打底主图.jpg',
    stats: { risks: 4, complaints: 3, highRisk: 2, reviews: 2 },
    status: 'danger',
    text: '集抗菌、速干、防螨、防静电四大功能于一体\n7A 抗菌（标准：T/GDBX 056-2022）\n螨虫防护（标准：GB/T 24253-2009）\n抗静电（标准：GB/T 12703.1-2021）\n极速秒干\n吸水速率 ≥30.1%/s\n精梳棉材质，宽松版型\n主打秋冬叠穿舒适度\n前胸后背不易长痘',
    risks: [
      { category:'医疗暗示', dim:'合规', kw:'不易长痘', level:'高危', lc:'r',
        problem:'非医疗器械（普通服装）宣称预防痤疮等医疗功效，属高危违规',
        evidence:'违反《广告法》关于医疗功效宣传的规定。职业打假人重点投诉目标。',
        original:'前胸后背不易长痘', fix:'改为"保持肌肤清爽环境"或直接删除' },
      { category:'证据支撑不足', dim:'打假', kw:'7A 抗菌', level:'高危', lc:'r',
        problem:'标注"7A抗菌""螨虫防护""抗静电"等功能及国标编号，但未在页面展示检测报告',
        evidence:'《广告法》及电商平台规范要求：凡提及功能性宣称，必须提供第三方检测报告。职业打假或市场监管抽检中常被判"证据支撑不足"。',
        original:'7A 抗菌（标准：T/GDBX 056-2022）', fix:'方案1：每项功能后增加[查看检测报告]链接\n方案2：删除具体标准号，改为"抗菌、速干、防螨多功能面料"' },
      { category:'数据选择性披露', dim:'打假', kw:'吸水速率', level:'中危', lc:'o',
        problem:'仅强调吸水速率，未体现消费者更关心的"蒸发速率"（干得快不快）',
        evidence:'GB/T 21655.2 标准分为"吸湿性"和"速干性"。文案仅强调吸水速率，存在信息选择性披露。',
        original:'吸水速率 ≥30.1%/s', fix:'补充完整数据：吸水速率 ≥30.1%/s + 蒸发速率 ≥0.15g/h，或改为"极速秒干，符合 GB/T 21655.2 标准"' },
      { category:'认知鸿沟', dim:'认知', kw:'宽松版型', level:'低危', lc:'g',
        problem:'尺码严重偏大（需买小1-2码），超出消费者对"宽松版型"的常规理解',
        evidence:'大量用户反馈需买小1-2码。评论区出现"3XL像睡衣""袖子长3cm"等描述。退换货率最高原因。',
        original:'宽松版型', fix:'改为"超宽松版型（建议拍小1-2码）"，并在主图增加版型对比图' }
    ],
    complaints: [
      { q:'你们说"不易长痘"，这是医疗功效宣传吧？我要投诉虚假宣传。', tags:['长痘','医疗暗示'],
        steps:[
          {t:'承认问题',x:'"不易长痘"这一表述容易引起误解，这并非我们的本意。我们的产品是普通服装，不具备医疗功效。'},
          {t:'整改措施',x:'已在详情页删除该表述，改为"保持肌肤清爽环境"。感谢您的监督。'},
          {t:'订单处理',x:'支持7天无理由退货，并承担运费。'},
          {t:'致谢',x:'再次感谢您的宝贵意见，帮助我们改进产品描述。'}],
        ctx:['售前扫描标注"不易长痘"为医疗暗示（高危）','已整改文案','违反《广告法》医疗功效宣传条款'] },
      { q:'你们说7A抗菌，检测报告在哪里？我怎么知道是真的？', tags:['7A抗菌','检测报告'],
        steps:[
          {t:'报告说明',x:'产品已通过第三方权威机构检测，符合 T/GDBX 056-2022 团体标准7A级抗菌要求。完整检测报告已上传至详情页底部。'},
          {t:'标准解释',x:'7A级是该标准最高等级，要求洗涤150次后仍具有高效抗菌性能。'},
          {t:'查看方式',x:'详情页下拉至"质检报告"区域，点击"查看完整报告"即可下载。'},
          {t:'解决方案',x:'如有任何疑问，欢迎随时联系我们。'}],
        ctx:['售前扫描标注"7A抗菌"为证据支撑不足（高危）','已补充检测报告链接','需在所有功能项后附报告'] },
      { q:'你们这个尺码也太大了吧！我平时穿L，这次买L像睡衣一样，要退货换M。', tags:['尺码','偏大'],
        steps:[
          {t:'致歉',x:'非常抱歉给您带来不便！这款采用超宽松版型设计，主打叠穿舒适度，确实很多顾客反馈比预期更宽松。'},
          {t:'换货建议',x:'建议换成M码。免费换货服务，无需退回原商品，直接为您寄送M码。'},
          {t:'改进措施',x:'已在详情页增加"建议拍小1-2码"的醒目提示，避免其他顾客遇到同样问题。'},
          {t:'致歉',x:'再次为您带来的不便表示歉意！'}],
        ctx:['售前扫描标注"宽松版型"为认知鸿沟（低危）','退换货率最高原因','已增加尺码提醒'] }
    ]
  }
};

const STATUS_COLOR = { danger: 'var(--danger)', warning: 'var(--warn)', safe: 'var(--ok)' };

/* ===== Persistent State ===== */
function getState(key, fallback) {
  const v = localStorage.getItem('cc_' + key);
  if (v === null) return fallback;
  try { return JSON.parse(v) } catch { return v }
}
function setState(key, value) {
  localStorage.setItem('cc_' + key, JSON.stringify(value));
}
function resetAll() {
  Object.keys(localStorage).filter(k => k.startsWith('cc_')).forEach(k => localStorage.removeItem(k));
  location.href = 'index.html';
}
function isScanned(pid) { return getState('presale_done_' + (pid || getCurrentProductId()), false) }
function markScanned(pid) { setState('presale_done_' + (pid || getCurrentProductId()), true) }

function getAdopted(pid) { return getState('adopted_' + (pid || getCurrentProductId()), []) }
function adoptRisk(kw, pid) {
  const id = pid || getCurrentProductId();
  const list = getAdopted(id);
  if (!list.includes(kw)) { list.push(kw); setState('adopted_' + id, list) }
}
function adoptAllRisks(pid) {
  const id = pid || getCurrentProductId();
  const p = getProduct(id);
  setState('adopted_' + id, p.risks.map(r => r.kw));
}
function isAdopted(kw, pid) { return getAdopted(pid).includes(kw) }

function pulseNav() {
  document.querySelectorAll('a[href="archive.html"],a[href="history.html"]').forEach(el => {
    el.classList.add('sb-pulse');
    setTimeout(() => el.classList.remove('sb-pulse'), 1800);
  });
}

/* ===== Product Data ===== */
function getCurrentProductId() { return getState('product', 'jacket') }
function setCurrentProductId(id) { setState('product', id) }
function getProduct(id) { return PRODUCTS[id || getCurrentProductId()] || PRODUCTS.jacket }
const PRODUCT_ORDER = ['jacket', 'base', 'tshirt'];
function getAllProducts() { return PRODUCT_ORDER.map(k => PRODUCTS[k]).filter(Boolean).concat(Object.values(PRODUCTS).filter(p => !PRODUCT_ORDER.includes(p.id))) }

/* ===== Sidebar ===== */
function renderSidebar(activePage) {
  const p = getProduct();
  const pid = getCurrentProductId();
  const scanned = isScanned(pid);
  const sb = document.getElementById('sidebar');
  if (!sb) return;

  const presaleBadge = scanned
    ? (p.stats.risks > 0 ? `<span class="sb-badge r">${p.stats.risks}</span>` : `<span class="sb-badge g"><i class="ph ph-check" style="font-size:10px"></i></span>`)
    : '';

  sb.innerHTML = `
    <a class="sb-brand" href="index.html" style="text-decoration:none">
      <div class="sb-logo"><i class="ph-bold ph-shield-check"></i></div>
      <div class="sb-name">ClaimCheck</div>
    </a>
    <div class="sb-section">工作区</div>
    <a class="sb-item ${activePage === 'home' ? 'active' : ''}" href="index.html">
      <i class="ph ph-squares-four"></i> 概览
    </a>
    <a class="sb-item" href="javascript:void(0)" onclick="openCreateProduct()">
      <i class="ph ph-plus-circle"></i> 创建商品
    </a>
    <a class="sb-item" href="javascript:void(0)" onclick="openSearch()">
      <i class="ph ph-magnifying-glass"></i> 搜索
    </a>
    <div class="sb-section">当前商品</div>
    <button class="sb-product" onclick="openProductSwitcher()" aria-label="切换商品">
      <span class="prod-dot" style="background:${scanned ? (STATUS_COLOR[p.status] || 'var(--text-3)') : 'var(--text-4)'}"></span>
      <span id="sb-prod-name">${p.name}</span>
      <i class="ph ph-caret-up-down"></i>
    </button>
    <a class="sb-item ${activePage === 'presale' ? 'active' : ''}" href="presale.html">
      <i class="ph ph-scan"></i> 售前扫描 ${presaleBadge}
    </a>
    <a class="sb-item ${activePage === 'aftersale' ? 'active' : ''}" href="aftersale.html">
      <i class="ph ph-chat-circle-text"></i> 售后话术
    </a>
    <a class="sb-item ${activePage === 'history' ? 'active' : ''}" href="history.html">
      <i class="ph ph-clock-counter-clockwise"></i> 风险历史
    </a>
    <div class="sb-section" style="margin-top:4px">全局</div>
    <a class="sb-item ${activePage === 'archive' ? 'active' : ''}" href="archive.html">
      <i class="ph ph-chart-line-up"></i> 风险总览
    </a>
    <div class="sb-foot" ondblclick="if(confirm('确认重置所有数据？将清空扫描状态和自定义商品。'))resetAll()" title="">
      <i class="ph ph-info" style="font-size:13px;vertical-align:-1px"></i> ClaimCheck v0.1 Demo
    </div>`;
}

/* ===== Product Switcher ===== */
function openProductSwitcher() {
  const all = getAllProducts();
  const curId = getCurrentProductId();
  const cards = all.map(p => {
    const sc = isScanned(p.id);
    const dotColor = sc ? (STATUS_COLOR[p.status] || 'var(--text-3)') : 'var(--text-4)';
    const statusText = sc ? `${p.stats.risks} 风险项 · ${p.stats.complaints} 客诉` : '待审核';
    return `<div class="cc" ${p.id === curId ? 'style="border-color:var(--accent)"' : ''} onclick="switchProduct('${p.id}')">
      <div style="display:flex;align-items:center;gap:8px;margin-bottom:2px">
        <span style="font-weight:600;text-align:left">${p.name}</span>
        ${p.id === curId ? '<span class="tag tag-a" style="margin-left:auto;flex-shrink:0">当前</span>' : ''}
      </div>
      <div style="font-size:11px;color:var(--text-3);text-align:left">${statusText}</div>
    </div>`;
  }).join('');
  openModal(`<h3><i class="ph ph-tote"></i> 切换商品</h3><div style="display:flex;flex-direction:column;gap:6px">${cards}</div>`);
}

function switchProduct(id) {
  setCurrentProductId(id);
  closeModal();
  window.location.reload();
}

/* ===== Create Product ===== */
function openCreateProduct() {
  openModal(`<h3><i class="ph ph-plus-circle"></i> 创建商品</h3>
    <div style="display:flex;flex-direction:column;gap:12px">
      <div><label class="fl">商品名称</label><input id="cp-name" class="ta" style="min-height:0;padding:12px 14px;font-size:14px;width:100%" placeholder="例：影视飓风三合一冲锋衣 STORMCREW 25 款秋冬户外防风防水"></div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">
        <div><label class="fl">行业</label><select id="cp-ind" class="sel" style="width:100%"><option>户外运动</option><option>服饰</option><option>美妆</option><option>食品</option></select></div>
        <div><label class="fl">平台</label><select id="cp-plat" class="sel" style="width:100%"><option>天猫</option><option>抖音</option><option>拼多多</option><option>京东</option></select></div>
      </div>
      <div style="display:flex;gap:8px;justify-content:flex-end;margin-top:4px">
        <button class="btn btn-o" onclick="closeModal()">取消</button>
        <button class="btn btn-p" onclick="doCreateProduct()"><i class="ph ph-arrow-right"></i> 创建并扫描</button>
      </div>
    </div>`);
  setTimeout(() => { const el = document.getElementById('cp-name'); if (el) el.focus() }, 100);
}

function doCreateProduct() {
  const name = (document.getElementById('cp-name') || {}).value || '';
  if (!name.trim()) { toast('请输入商品名称'); return }
  const ind = (document.getElementById('cp-ind') || {}).value || '服饰';
  const plat = (document.getElementById('cp-plat') || {}).value || '天猫';
  const id = 'custom_' + Date.now();
  PRODUCTS[id] = {
    id, name: name.trim(), brand: '', industry: ind, platform: plat,
    sales: '-', price: '-',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=400&fit=crop',
    stats: { risks: 0, complaints: 0, highRisk: 0, reviews: 0 },
    status: 'safe', text: '', risks: [], complaints: []
  };
  const customs = getState('custom_products', {});
  customs[id] = PRODUCTS[id];
  setState('custom_products', customs);
  setCurrentProductId(id);
  closeModal();
  location.href = 'presale.html';
}

(function loadCustomProducts() {
  const customs = getState('custom_products', {});
  Object.keys(customs).forEach(k => { if (!PRODUCTS[k]) PRODUCTS[k] = customs[k] });
})();

/* ===== Search ===== */
function openSearch() {
  openModal(`<h3><i class="ph ph-magnifying-glass"></i> 搜索</h3>
    <input id="srch-input" class="ta" style="min-height:0;padding:12px 14px;margin-bottom:12px;font-size:14px;width:100%" placeholder="搜索商品、风险关键词、客诉" oninput="renderSearchResults()">
    <div class="srch-filters" style="display:flex;gap:6px;margin-bottom:12px;flex-wrap:wrap">
      <button class="btn btn-o btn-sm srch-f active" onclick="toggleFilter(this,'all')" data-f="all">全部</button>
      <button class="btn btn-o btn-sm srch-f" onclick="toggleFilter(this,'risk')" data-f="risk">风险项</button>
      <button class="btn btn-o btn-sm srch-f" onclick="toggleFilter(this,'complaint')" data-f="complaint">客诉</button>
      <button class="btn btn-o btn-sm srch-f" onclick="toggleFilter(this,'product')" data-f="product">商品</button>
    </div>
    <div id="srch-results" style="max-height:50vh;overflow-y:auto"></div>`);
  setTimeout(() => { const el = document.getElementById('srch-input'); if (el) el.focus() }, 100);
  window._srchFilter = 'all';
  renderSearchResults();
}

function toggleFilter(el, f) {
  window._srchFilter = f;
  document.querySelectorAll('.srch-f').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  renderSearchResults();
}

function renderSearchResults() {
  const q = (document.getElementById('srch-input') || {}).value || '';
  const f = window._srchFilter || 'all';
  const out = document.getElementById('srch-results');
  if (!out) return;
  const results = [];
  const ql = q.toLowerCase();

  getAllProducts().forEach(p => {
    if (f === 'all' || f === 'product') {
      if (!q || p.name.toLowerCase().includes(ql) || p.industry.toLowerCase().includes(ql))
        results.push({ type: 'product', label: p.name, sub: `${p.industry} · ${p.platform}`, pid: p.id, href: 'presale.html' });
    }
    if (f === 'all' || f === 'risk') {
      p.risks.forEach(r => {
        if (!q || r.kw.toLowerCase().includes(ql) || r.category.toLowerCase().includes(ql) || r.problem.toLowerCase().includes(ql))
          results.push({ type: 'risk', label: `${r.category}：${r.kw}`, sub: `${p.name} · ${r.level}`, pid: p.id, href: 'presale.html', lc: r.lc });
      });
    }
    if (f === 'all' || f === 'complaint') {
      (p.complaints || []).forEach((c, ci) => {
        if (!q || c.q.toLowerCase().includes(ql) || c.tags.some(t => t.toLowerCase().includes(ql)))
          results.push({ type: 'complaint', label: c.q.slice(0, 60) + (c.q.length > 60 ? '…' : ''), sub: `${p.name} · ${c.tags.join('/')}`, pid: p.id, href: 'aftersale.html' });
      });
    }
  });

  if (results.length === 0) {
    out.innerHTML = '<div style="text-align:center;padding:24px;color:var(--text-3);font-size:12px"><i class="ph ph-magnifying-glass" style="font-size:24px;display:block;margin-bottom:6px"></i>无匹配结果</div>';
    return;
  }

  const icons = { product: 'ph-tote', risk: 'ph-warning', complaint: 'ph-chat-circle-text' };
  out.innerHTML = results.slice(0, 20).map(r => `
    <div class="cc" style="padding:10px 12px;margin-bottom:6px" onclick="closeModal();setCurrentProductId('${r.pid}');location.href='${r.href}'">
      <div style="display:flex;align-items:center;gap:8px">
        <i class="ph ${icons[r.type]}" style="font-size:15px;color:var(--text-3);flex-shrink:0"></i>
        <div style="flex:1;min-width:0">
          <div style="font-size:12px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${r.label}</div>
          <div style="font-size:10px;color:var(--text-3)">${r.sub}</div>
        </div>
        ${r.lc ? `<span class="tag tag-${r.lc}" style="flex-shrink:0">${r.lc === 'r' ? '高危' : r.lc === 'o' ? '中危' : '低危'}</span>` : ''}
      </div>
    </div>`).join('');
}

/* ===== Modal ===== */
function openModal(html) {
  document.getElementById('modal-box').innerHTML = html;
  document.getElementById('modal-bg').classList.add('vis');
}
function closeModal() { document.getElementById('modal-bg').classList.remove('vis') }

/* ===== Toast ===== */
function toast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
}

/* ===== Scan Animation ===== */
function doScan(opts) {
  const ov = document.getElementById('scan-ov');
  const fill = document.getElementById('scan-fill');
  const s = [document.getElementById('ss1'), document.getElementById('ss2'), document.getElementById('ss3')];

  document.getElementById('scan-ic').className = opts.icon || 'ph ph-brain';
  document.getElementById('scan-t').textContent = opts.title || '分析中';
  document.getElementById('scan-s').textContent = opts.subtitle || '';
  s.forEach((el, i) => { el.innerHTML = `<i class="ph ph-circle-notch"></i> ${opts.steps[i]}`; el.className = 'scan-step' });

  ov.classList.add('vis');
  fill.style.width = '0%';

  const activate = el => { el.classList.add('on'); el.querySelector('i').className = 'ph ph-spinner' };
  const done = el => { el.classList.remove('on'); el.classList.add('ok'); el.querySelector('i').className = 'ph-bold ph-check-circle' };

  setTimeout(() => { fill.style.width = '25%'; activate(s[0]) }, 150);
  setTimeout(() => { fill.style.width = '40%'; done(s[0]) }, 600);
  setTimeout(() => { fill.style.width = '55%'; activate(s[1]) }, 750);
  setTimeout(() => { fill.style.width = '70%'; done(s[1]) }, 1300);
  setTimeout(() => { fill.style.width = '85%'; activate(s[2]) }, 1450);
  setTimeout(() => { fill.style.width = '100%'; done(s[2]) }, 2200);
  setTimeout(() => { ov.classList.remove('vis'); if (opts.onComplete) opts.onComplete() }, 2600);
}

/* ===== Trend Modal ===== */
const TREND_DATA = {
  jacket: { title: '冲锋衣"全压胶"客诉趋势', vals: [8, 5, 85, 42, 34, 47], note: '<strong>峰值</strong> 行业类似案例曝光后客诉激增（85件）<br><strong>近期</strong> 改措辞后下降但存量用户仍按旧理解（+15%）' },
  tshirt: { title: '凉伴短袖 客诉趋势', vals: [0, 1, 2, 1, 2, 1], note: '<strong>稳定</strong> 少量凉感体验差异反馈' },
  base:   { title: '降燥打底衫 客诉趋势', vals: [3, 5, 12, 18, 14, 11], note: '<strong>峰值</strong> 职业打假人投诉"不易长痘"+ 冬季尺码退换高峰<br><strong>近期</strong> 整改文案后，尺码问题仍是首要客诉' }
};

function openTrend(productId) {
  const pid = productId || getCurrentProductId();
  const td = TREND_DATA[pid] || TREND_DATA.jacket;
  const months = ['9月','10月','11月','12月','1月','2月'];
  const vals = td.vals;
  const max = Math.max(...vals, 1);
  const W = 420, H = 140, PL = 30, PR = 10, PT = 10, PB = 24;
  const cw = (W - PL - PR) / (vals.length - 1);

  const pts = vals.map((v, i) => [PL + i * cw, PT + (H - PT - PB) * (1 - v / max)]);
  const line = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
  const area = line + ` L${pts[pts.length-1][0]},${H-PB} L${PL},${H-PB} Z`;

  const labels = months.map((m, i) => `<text x="${PL + i * cw}" y="${H - 6}" text-anchor="middle">${m}</text>`).join('');
  const dots = pts.map((p, i) => {
    const c = vals[i] >= 60 ? 'var(--danger)' : vals[i] >= 30 ? 'var(--warn)' : 'var(--ok)';
    return `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${c}" stroke="var(--white)" stroke-width="2"/>`;
  }).join('');
  const gridY = [0, 25, 50, 75, 100].map(pct => {
    const y = PT + (H - PT - PB) * (1 - pct / 100);
    const v = Math.round(max * pct / 100);
    return `<line x1="${PL}" y1="${y}" x2="${W - PR}" y2="${y}" stroke="var(--bd-l)" stroke-width="0.5"/><text x="${PL - 4}" y="${y + 3}" text-anchor="end" font-size="9">${v}</text>`;
  }).join('');

  const svg = `<svg viewBox="0 0 ${W} ${H}" class="trend-svg">
    ${gridY}
    <path d="${area}" fill="var(--accent-bg)" opacity="0.4"/>
    <path d="${line}" fill="none" stroke="var(--accent)" stroke-width="2" stroke-linejoin="round"/>
    ${dots}${labels}
  </svg>`;

  openModal(`<h3><i class="ph ph-chart-line-up"></i> ${td.title}</h3>
    ${svg}
    <div style="display:flex;gap:12px;margin-bottom:8px">
      <div style="display:flex;align-items:center;gap:4px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:var(--danger);display:inline-block"></span> 高峰</div>
      <div style="display:flex;align-items:center;gap:4px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:var(--warn);display:inline-block"></span> 偏高</div>
      <div style="display:flex;align-items:center;gap:4px;font-size:11px"><span style="width:8px;height:8px;border-radius:50%;background:var(--ok);display:inline-block"></span> 正常</div>
    </div>
    <div style="font-size:12px;color:var(--text-2);line-height:1.6">${td.note}</div>
    <div style="display:flex;gap:6px;justify-content:flex-end;margin-top:14px"><button class="btn btn-o" onclick="closeModal()">关闭</button></div>`);
}

function trendChart(td, color) {
  const months = ['9月','10月','11月','12月','1月','2月'];
  const vals = td.vals;
  const max = Math.max(...vals, 1);
  const W = 420, H = 140, PL = 30, PR = 10, PT = 10, PB = 24;
  const cw = (W - PL - PR) / (vals.length - 1);
  const pts = vals.map((v, i) => [PL + i * cw, PT + (H - PT - PB) * (1 - v / max)]);
  const line = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ',' + p[1]).join(' ');
  const area = line + ` L${pts[pts.length-1][0]},${H-PB} L${PL},${H-PB} Z`;
  const labels = months.map((m, i) => `<text x="${PL + i * cw}" y="${H - 6}" text-anchor="middle">${m}</text>`).join('');
  const dots = pts.map((p, i) => {
    const c = vals[i] >= 60 ? 'var(--danger)' : vals[i] >= 30 ? 'var(--warn)' : 'var(--ok)';
    return `<circle cx="${p[0]}" cy="${p[1]}" r="4" fill="${c}" stroke="var(--white)" stroke-width="2"/>`;
  }).join('');
  const gridY = [0, 25, 50, 75, 100].map(pct => {
    const y = PT + (H - PT - PB) * (1 - pct / 100);
    const v = Math.round(max * pct / 100);
    return `<line x1="${PL}" y1="${y}" x2="${W - PR}" y2="${y}" stroke="var(--bd-l)" stroke-width="0.5"/><text x="${PL - 4}" y="${y + 3}" text-anchor="end" font-size="9">${v}</text>`;
  }).join('');
  return `<div style="font-size:12px;color:var(--text-2);margin-bottom:6px">${td.title}</div>
    <svg viewBox="0 0 ${W} ${H}" class="trend-svg">${gridY}<path d="${area}" fill="var(--accent-bg)" opacity="0.4"/><path d="${line}" fill="none" stroke="${color || 'var(--accent)'}" stroke-width="2" stroke-linejoin="round"/>${dots}${labels}</svg>
    <div style="display:flex;gap:12px;margin-top:4px"><span style="display:inline-flex;align-items:center;gap:3px;font-size:10px"><span style="width:6px;height:6px;border-radius:50%;background:var(--danger);display:inline-block"></span>高峰</span><span style="display:inline-flex;align-items:center;gap:3px;font-size:10px"><span style="width:6px;height:6px;border-radius:50%;background:var(--warn);display:inline-block"></span>偏高</span><span style="display:inline-flex;align-items:center;gap:3px;font-size:10px"><span style="width:6px;height:6px;border-radius:50%;background:var(--ok);display:inline-block"></span>正常</span></div>
    <div style="font-size:11px;color:var(--text-3);line-height:1.5;margin-top:6px">${td.note}</div>`;
}

/* ===== Upload Modal ===== */
const DETAIL_IMAGES = {
  jacket: ['pic/冲锋衣主图.jpg','pic/冲锋衣所有接缝压胶.jpeg','pic/冲锋衣无氟防水.jpeg'],
  base: ['pic/打底主图.jpg','pic/打底7A抗菌.jpg','pic/打底抗静电.jpg'],
  tshirt: []
};

function openUpload() {
  openModal(`<h3><i class="ph ph-image"></i> 上传详情页图片</h3>
    <div style="font-size:11px;color:var(--text-3);margin-bottom:10px">AI 将识别图片中的文案和功能宣称，自动提取待审内容（支持多张）</div>
    <div id="upload-zone" style="border:2px dashed var(--bd);border-radius:var(--r-lg);padding:32px;text-align:center;cursor:pointer;transition:.12s;margin-bottom:10px" onclick="mockUpload()" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--bd)'">
      <i class="ph ph-cloud-arrow-up" style="font-size:36px;color:var(--text-3);display:block;margin-bottom:8px"></i>
      <div style="font-size:12px;color:var(--text-2)">点击或拖拽上传（支持多张）</div><div style="font-size:10px;color:var(--text-3)">JPG / PNG / WebP</div></div>
    <div id="upload-preview" style="margin-bottom:14px"></div>
    <div style="display:flex;gap:6px;justify-content:flex-end"><button class="btn btn-o" onclick="closeModal()">取消</button><button class="btn btn-p" onclick="closeModal();toast('AI 已识别图片内容并填入')"><i class="ph ph-check"></i> 使用</button></div>`);
}
function mockUpload() {
  const z = document.getElementById('upload-zone');
  const pv = document.getElementById('upload-preview');
  const p = getProduct();
  const imgs = DETAIL_IMAGES[p.id] || [p.image];
  if (z) {
    z.style.border = '2px solid var(--ok)';
    z.style.background = 'var(--ok-bg)';
    z.style.padding = '10px';
    z.innerHTML = `<div style="color:var(--ok);font-weight:600;font-size:12px"><i class="ph-bold ph-check-circle"></i> 已上传 ${imgs.length} 张详情页图片</div>
      <div style="font-size:11px;color:var(--text-3);margin-top:2px">AI 识别提取 ${Math.floor(p.text.length * 1.2)} 字文案</div>`;
  }
  if (pv) {
    pv.innerHTML = `<div style="display:flex;gap:6px;overflow-x:auto;padding:4px 0">${imgs.map((u, i) => `<div style="flex-shrink:0;width:80px;height:100px;border-radius:var(--r-sm);overflow:hidden;border:1px solid var(--ok-bd)"><img src="${u}" style="width:100%;height:100%;object-fit:cover" onerror="this.parentNode.innerHTML='<div style=\\'display:flex;align-items:center;justify-content:center;height:100%;font-size:10px;color:var(--text-3)\\'>图${i+1}</div>'"></div>`).join('')}</div>`;
  }
}

/* ===== PDF Modal ===== */
function openPDF() {
  const p = getProduct();
  const today = new Date().toISOString().slice(0, 10);
  const highCount = p.risks.filter(r => r.lc === 'r').length;
  const midCount = p.risks.filter(r => r.lc === 'o').length;
  const lowCount = p.risks.filter(r => r.lc === 'g').length;

  const riskRows = p.risks.map((r, i) => `<tr style="font-size:11px;border-bottom:1px solid var(--bd-l)">
      <td style="padding:6px 8px">${i + 1}</td>
      <td style="padding:6px 8px"><span class="tag tag-${r.lc}" style="font-size:9px">${r.category}</span></td>
      <td style="padding:6px 8px;font-weight:600">${r.kw}</td>
      <td style="padding:6px 8px">${r.level}</td>
      <td style="padding:6px 8px;font-size:10px;color:var(--text-2)">${r.fix.split('\n')[0]}</td>
    </tr>`).join('');

  const verdict = highCount > 0 ? '不通过' : midCount > 0 ? '建议修改' : '通过';
  const verdictColor = highCount > 0 ? 'var(--danger)' : midCount > 0 ? 'var(--warn)' : 'var(--ok)';

  openModal(`<h3><i class="ph ph-file-pdf"></i> 审核报告预览</h3>
    <div style="background:#FAFAF8;border:1px solid var(--bd);border-radius:var(--r);padding:24px;margin-bottom:14px;font-size:11px;line-height:1.6;max-height:60vh;overflow-y:auto">
      <div style="text-align:center;margin-bottom:16px">
        <div style="font-size:16px;font-weight:700;letter-spacing:-.02em">ClaimCheck 风险审核报告</div>
        <div style="font-size:10px;color:var(--text-3);margin-top:2px">${today} · 自动生成</div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:14px;font-size:11px">
        <div><span style="color:var(--text-3)">商品：</span><strong>${p.name}</strong></div>
        <div><span style="color:var(--text-3)">行业：</span>${p.industry}</div>
        <div><span style="color:var(--text-3)">平台：</span>${p.platform}</div>
        <div><span style="color:var(--text-3)">审核结论：</span><strong style="color:${verdictColor}">${verdict}</strong></div>
      </div>
      <div style="display:flex;gap:8px;margin-bottom:14px">
        ${highCount > 0 ? `<span class="tag tag-r">高危 ${highCount}</span>` : ''}
        ${midCount > 0 ? `<span class="tag tag-o">中危 ${midCount}</span>` : ''}
        ${lowCount > 0 ? `<span class="tag tag-g">低危 ${lowCount}</span>` : ''}
      </div>
      ${p.risks.length > 0 ? `<table style="width:100%;border-collapse:collapse;margin-bottom:14px">
        <thead><tr style="font-size:10px;color:var(--text-3);border-bottom:2px solid var(--bd)">
          <th style="padding:4px 8px;text-align:left">#</th><th style="padding:4px 8px;text-align:left">类型</th><th style="padding:4px 8px;text-align:left">关键词</th><th style="padding:4px 8px;text-align:left">等级</th><th style="padding:4px 8px;text-align:left">建议</th>
        </tr></thead><tbody>${riskRows}</tbody></table>` : '<div style="text-align:center;color:var(--ok);padding:12px"><i class="ph ph-check-circle" style="font-size:20px"></i><div style="margin-top:4px">文案安全，无风险项</div></div>'}
      <div style="border-top:1px dashed var(--bd);padding-top:10px;font-size:9px;color:var(--text-3);text-align:center">ClaimCheck AI 审核引擎 v0.1 · 报告仅供内部参考</div>
    </div>
    <div style="display:flex;gap:6px;justify-content:flex-end"><button class="btn btn-o" onclick="closeModal()">关闭</button><button class="btn btn-p" onclick="closeModal();toast('PDF 已下载')"><i class="ph ph-download-simple"></i> 下载</button></div>`);
}

/* ===== Sparkline Generator ===== */
function sparkline(vals, w, h, color) {
  w = w || 80; h = h || 28; color = color || 'var(--accent)';
  const max = Math.max(...vals, 1);
  const pad = 2;
  const cw = (w - pad * 2) / (vals.length - 1);
  const pts = vals.map((v, i) => [pad + i * cw, pad + (h - pad * 2) * (1 - v / max)]);
  const line = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = line + ` L${(w - pad).toFixed(1)},${(h - pad).toFixed(1)} L${pad},${(h - pad).toFixed(1)} Z`;
  return `<svg viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" style="display:block"><path d="${area}" fill="${color}" opacity="0.1"/><path d="${line}" fill="none" stroke="${color}" stroke-width="1.5" stroke-linejoin="round"/></svg>`;
}

/* ===== Utility: Shared HTML ===== */
function sharedOverlay() {
  return `
    <div class="scan-ov" id="scan-ov"><div class="scan-box">
      <div class="scan-ic"><i class="ph ph-brain" id="scan-ic"></i></div>
      <div class="scan-t" id="scan-t"></div><div class="scan-s" id="scan-s"></div>
      <div class="scan-bar"><div class="scan-fill" id="scan-fill"></div></div>
      <div class="scan-steps"><div class="scan-step" id="ss1"></div><div class="scan-step" id="ss2"></div><div class="scan-step" id="ss3"></div></div>
    </div></div>
    <div class="modal-bg" id="modal-bg" onclick="if(event.target===this)closeModal()"><div class="modal" id="modal-box"></div></div>
    <div class="toast" id="toast"></div>`;
}
