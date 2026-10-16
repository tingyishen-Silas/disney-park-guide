(() => {
  'use strict';
  const D = window.GUIDE;
  const main = document.querySelector('main');
  const state = {area:'all',thrill:'all',popularity:'all',recommended:false};
  const paths = {
    home:'M3 11 12 3l9 8M5 10v11h5v-6h4v6h5V10',
    early:'M12 3v2M4.9 4.9l1.4 1.4M3 12h2M19 12h2M17.7 6.3l1.4-1.4M4 18h16M7 15a6 6 0 1 1 10 0M3 21h18',
    entry:'M5 3h14v18H5ZM9 7h6M9 11h6M9 16l2 2 4-4',
    rides:'M3 18C3 2 12 2 12 12s9 10 9-7M3 18h18M6 10v8M12 12v6M18 14v4',
    shows:'M12 8v5l3 2M9 2h6M12 2v3M19 6l2-2M21 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0',
    halloween:'M12 5c-6-5-12 3-9 10s8 8 9 5c1 3 7 2 9-5S18 0 12 5ZM12 5c0-3 2-4 4-4M7 10l2 2H6ZM17 10l-2 2h3ZM7 16l3 1 2-1 2 1 3-1',
    tips:'M9 18h6M10 21h4M8 15a7 7 0 1 1 8 0v3H8ZM12 7v4',
    star:'m12 2 2.8 6.3 6.9.7-5.1 4.6 1.5 6.8-6.1-3.5-6.1 3.5 1.5-6.8L2.3 9l6.9-.7Z'
  };
  const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="${paths[name] || paths.star}"/></svg>`;
  const badge = '<span class="pill recommend">✦ 推荐</span>';
  const official = 'https://www.shanghaidisneyresort.com/zh-cn/';
  const imageButton = (file,label) => `<button class="image-button" data-image="${file}" data-caption="${label}" aria-label="放大查看：${label}"><img src="./assets/${file}" alt="${label}" loading="lazy"><span>${label}</span></button>`;
  const title = (eyebrow,heading,description) => `<div class="page-head"><a class="back-link" href="#home">← 返回手册</a><div class="eyebrow">${eyebrow}</div><h1>${heading}</h1><p>${description}</p></div>`;
  const sources = items => `<details class="source-details"><summary>内容参考与补充说明 ＋</summary><p>朋友们整理的 10 月 17 日游园参考；价格、时间和运营安排可能调整，请以当天官方 App 和现场为准。</p>${items.map(([text,url])=>`<a href="${url}" target="_blank" rel="noopener noreferrer">${text} ↗</a>`).join('')}</details>`;
  const castle = `<svg class="hero-art" viewBox="0 0 400 350" aria-hidden="true"><defs><linearGradient id="sky" x2="0" y2="1"><stop stop-color="#8e759b"/><stop offset="1" stop-color="#594166"/></linearGradient><linearGradient id="moon" x2="1" y2="1"><stop stop-color="#f9dbab"/><stop offset="1" stop-color="#e6ab80"/></linearGradient></defs><circle cx="255" cy="100" r="79" fill="url(#moon)"/><circle cx="255" cy="100" r="91" fill="none" stroke="#efb383" stroke-opacity=".2"/><g fill="#30233e"><path d="M282 53q10-15 19 0 9-15 19 0-14-4-19 7-6-11-19-7M118 86q8-11 15 0 7-11 15 0-10-3-15 6-4-9-15-6"/></g><g stroke="#efb383" stroke-width="1.2"><path d="M357 40v14m-7-7h14M175 36v10m-5-5h10M102 143v12m-6-6h12M350 151v12m-6-6h12"/></g><path d="M105 300V200l22-35 21 35v28h18V158l22-41 22 41v27h19V100l22-45 24 45v85h19v-40l21-32 21 32v155Z" fill="url(#sky)"/><g fill="#362740"><path d="m98 203 29-47 29 47Zm59-42 31-53 32 53Zm63-58 31-61 32 61Zm66 45 29-46 29 46Z"/><path d="M139 299V250l27-33 26 33v49M211 300V219l35-40 36 40v81M300 300v-82l23-30 25 30v82"/></g><g fill="#edc18f"><path d="M245 129a6 6 0 0 1 12 0v13h-12ZM182 182a5 5 0 0 1 10 0v12h-10ZM310 170a5 5 0 0 1 10 0v11h-10ZM123 220a4 4 0 0 1 8 0v10h-8ZM238 267a10 10 0 0 1 20 0v33h-20Z"/></g><g stroke="#b99bc1" fill="none"><path d="M251 43V19l17 7-17 6M188 108V88l14 5-14 5M315 102V80l14 6-14 5M111 280h31M283 280h19"/></g><path d="M40 350q38-76 110-45 60-21 111-3 66-21 139 30v18Z" fill="#241c32"/><g transform="translate(300 286)"><ellipse cx="23" cy="28" rx="28" ry="23" fill="#ce7048"/><ellipse cx="23" cy="28" rx="16" ry="23" fill="#e68e59"/><path d="M23 5q-2-8 6-11" fill="none" stroke="#a49c75" stroke-width="5"/><path d="m10 23 8-5 0 9Zm25 0-8-5v9ZM13 35q10 11 20 0Z" fill="#30233e"/></g><g transform="translate(116 274)"><path d="M0 31V14a14 14 0 0 1 28 0v30l-7-6-7 6-7-6-7 6Z" fill="#e6dce7"/><ellipse cx="9" cy="17" rx="2" ry="3" fill="#30233e"/><ellipse cx="19" cy="17" rx="2" ry="3" fill="#30233e"/></g></svg>`;

  function home() {
    const modules = [
      ['early','01','早享攻略','早起一小时，多一点奇妙'],['entry','02','入园要求','带什么 · 怎么进 · 再入园'],
      ['rides','03','项目推荐','找到适合你的那份心跳'],['shows','04','表演时间','下一场精彩，不错过'],
      ['halloween','05','万圣特别活动','烟花、讨糖，今晚一起跳'],['tips','06','有趣小 tips','朋友们才知道的小贴士']
    ];
    return `<section class="hero"><div class="eyebrow">SHANGHAI DISNEYLAND · FRIENDS’ GUIDE</div><h1>一起去<br><em>奇妙一下。</em></h1><p>从清晨的第一趟矿山车，<br>到万圣夜的最后一束烟花。</p><div class="hero-ticket"><strong>10 / 17</strong><span>2026 · 星期六<br>给朋友们的游园手册</span></div>${castle}</section><div class="intro-line"><h2>今天，怎么玩？</h2><span>Six little chapters.</span></div><div class="module-grid">${modules.map(([id,n,name,sub])=>`<a class="module-card" href="#${id}"><div class="module-top">${icon(id)}<span class="module-number">${n}</span></div><h3>${name}</h3><p>${sub}</p><span class="arrow" aria-hidden="true">↗</span></a>`).join('')}</div><div class="home-note">${icon('shows')}<div><strong>把时间留给喜欢的事</strong><p>演出页可查看接下来三场与正在进行的活动。</p></div><a href="#shows">去看看 ↗</a></div>`;
  }

  function early() {
    return title('01 / EARLY ACCESS','早一点，先玩起来。','提前做好准备，把清晨留给最想玩的项目。') + `
      <section class="stat-panel"><div><h2>乐园早享卡</h2><p>提前约 1 小时入园的资格<br>建议在官方 App 提前购买</p></div><div class="price"><small>¥</small>199<small> / 人</small></div></section>
      <p class="note" style="margin-top:12px">199 元为本次参考价格，具体以所选日期的购买页面为准。早享卡不代替乐园门票。</p>
      <div class="section-title"><span>01</span><h2>清晨时间线</h2></div><div class="time-journey"><div class="time-stop"><small>建议抵达</small><strong>6:15–6:30</strong><p>预留安检排队时间</p></div><div class="time-stop"><small>安检约开始</small><strong>6:40</strong><p>安检后再排队检票</p></div><div class="time-stop"><small>通常可入园</small><strong>7:15–7:30</strong><p>以当天开放为准</p></div></div><p class="note">以上为经验时间参考。早享实际入园及项目开放时间请查看当日官方安排。</p>
      <div class="section-title"><span>02</span><h2>怎么买</h2></div><div class="panel"><h3>官方 App → 早享卡 → 选择到访日期</h3><p>在「早享入园」中找到「乐园早享卡」。核对 <strong>10 月 17 日</strong>，再按页面指引购买。</p><div class="gallery portrait">${imageButton('early-app.jpg','① 首页找到早享卡入口')}${imageButton('early-product.jpg','② 选择日期与乐园早享卡')}</div><p class="note">早享权益 ≠ 早鸟票。早鸟票仅为提前购买的额外优惠票种，不包括早享权益。</p></div>
      <div class="section-title"><span>03</span><h2>怎么到</h2></div><div class="panel"><h3>推荐打车或酒店接送</h3><p>定位至「迪士尼地铁站」或「邻家美利亚酒店东北门」，下车后按现场指引步行至入口。</p><div class="gallery">${imageButton('metro.jpg','迪士尼地铁站定位参考')}${imageButton('hotel.jpg','邻家美利亚酒店东北门')}</div><p class="note">地铁首班车约 7:00 到达迪士尼站，通常晚于本攻略建议抵达时间。具体车次请以出发站当天时刻表为准。</p></div>
      <div class="section-title"><span>04</span><h2>早享游玩顺序</h2></div><div class="panel"><ol class="route-list"><li><div><b>七个小矮人矿山车</b><p>从这一趟童话过山车开始。</p></div></li><li><div><b>疯狂动物城：热力追踪</b><p>不建议第一个去：园区开放可能略晚。</p></div></li><li><div><b>抱抱龙冲天赛车</b><p>把清晨的快乐推向高处。</p></div></li><li><div><b>创极速光轮</b><p>用一场极速体验收尾。</p></div></li></ol></div><p class="note">顺序为朋友们的游玩建议，可根据当天开放情况和实时排队时间调整。</p>`;
  }

  function entry() {
    return title('02 / BEFORE YOU ENTER','轻装出发，顺利入园。','安检和检票需要分别排队。把证件、门票和随身物品准备好。') + `
      <div class="two-col"><section class="panel"><div class="number-label">01</div><h3>先安检</h3><p>检查随身物品，按工作人员指引通过安检。</p></section><section class="panel"><div class="number-label">02</div><h3>再检票</h3><p>这一阶段出示购票使用的<strong>有效证件原件</strong>，取得各自的纸质门票。建议备好购票凭证。</p></section></div>
      <div class="section-title"><span>PACK LIGHT</span><h2>这些物品，出门前检查</h2></div><section class="panel"><h3>拍摄与遥控设备</h3><div class="check-items">${['自拍杆','三脚架','手机支架','补光灯','反光板','无人机等遥控设备'].map(t=>`<span>${t}</span>`).join('')}</div><p class="note">请尽量不带摄影支撑、延伸及补光设备；具体设备是否允许入园，以官方规则和现场安检判断为准。</p><h3 style="margin-top:20px">食品与其他随身物品</h3><div class="check-items">${['刺激性气味食物','自热火锅、需加热的泡面等食品','含酒精饮料','玻璃容器','压力喷雾','折叠椅等便携坐具'].map(t=>`<span>${t}</span>`).join('')}</div><p class="note">以上为容易误带物品的提醒，并非完整禁带清单。</p></section>
      <div class="warm-note">如果物品被安检拦截，可选择放弃携带，或询问工作人员能否寄存。朋友经验中的小件寄存费用约 10–15 元，可寄存物品及实际收费以现场为准。</div>
      <div class="section-title"><span>COME & GO</span><h2>想去小镇，再回乐园？</h2></div><section class="panel"><h3>一日票可在当天多次入园</h3><p>请保管好自己的纸质门票，不要和同行朋友混淆。入园后也可以第一时间在上海迪士尼官方 App 关联门票，方便查看与管理；重返乐园时仍请备好有效门票。</p><ol class="route-list"><li><div><b>首次入园：走乐园主入口</b><p>本指南按普通门票游客安排；酒店住客等特殊权益请按对应指引。</p></div></li><li><div><b>10:00 前：按主入口安排出行</b><p>上午请预留往返主入口的时间。</p></div></li><li><div><b>已入园且 10:00 后：可考虑小镇入口</b><p>当天二次入园可经迪士尼小镇入口，具体开放时间以当天现场为准。</p></div></li></ol></section>
      ${sources([['官方入园、门票与重返乐园攻略','https://www.shanghaidisneyresort.com/gonglve/post/practical/ticket?source=menu'],['官方乐园规则','https://www.shanghaidisneyresort.com/en/legal/park-rules/']])}`;
  }

  function rides() {
    const areas=[...new Set(D.attractions.map(a=>a.area))];
    return title('03 / FIND YOUR ADVENTURE','选一份，心跳加速。','按园区、热门度和刺激程度组合筛选，找到适合自己的项目。') + `
      <div class="filters"><div class="filter-grid"><label>所在园区<select id="area-filter" aria-label="按园区筛选"><option value="all">全部园区</option>${areas.map(a=>`<option ${state.area===a?'selected':''}>${a}</option>`).join('')}</select></label><label>刺激程度<select id="thrill-filter" aria-label="按刺激程度筛选"><option value="all">全部程度</option>${['温和','中等','刺激'].map(a=>`<option ${state.thrill===a?'selected':''}>${a}</option>`).join('')}</select></label><label>热门程度<select id="popularity-filter" aria-label="按热门程度筛选"><option value="all">全部热门度</option>${[1,2,3,4].map(a=>`<option value="${a}" ${String(state.popularity)===String(a)?'selected':''}>${'★'.repeat(a)} ${['','较低','一般','热门','高热门'][a]}</option>`).join('')}</select></label></div><div class="filter-meta"><span id="ride-count" role="status"></span><button class="text-button" id="reset-filters">重置筛选 ↺</button></div></div><div id="ride-results" class="ride-grid"></div><p class="note" style="margin-top:20px">标签为主观游玩参考，不代表实时排队时长或乘坐资格。请以官方 App 的运营信息、现场身高及身体状况要求为准。</p>`;
  }
  function renderRides() {
    const chosen=D.attractions.filter(a=>(state.area==='all'||a.area===state.area)&&(state.thrill==='all'||a.thrill===state.thrill)&&(state.popularity==='all'||a.popularity===Number(state.popularity)));
    document.querySelector('#ride-count').textContent=`找到 ${chosen.length} / ${D.attractions.length} 个项目`;
    document.querySelector('#ride-results').innerHTML=chosen.length?chosen.map(a=>`<article class="ride-card"><div class="ride-area">${a.area}</div><h3>${a.name}</h3><div class="tags"><span class="pill ${a.thrill==='温和'?'green':a.thrill==='刺激'?'red':'orange'}">${a.thrill==='温和'?'○':a.thrill==='中等'?'◑':'●'} ${a.thrill}</span><span class="stars" aria-label="热门程度 ${a.popularity} 星">${'★'.repeat(a.popularity)}<span style="color:#ddd3c5">${'☆'.repeat(4-a.popularity)}</span></span></div><p>${a.review}</p></article>`).join(''):'<div class="empty">这个组合暂时没有项目。<br>试试放宽一个条件，或重置筛选。</div>';
  }

  const sessionDate = time => new Date(`${D.date}T${time}:00+08:00`);
  function getSchedule(now=new Date()) {
    const day=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(now);
    const before=now<sessionDate('00:00');
    const after=now>=new Date('2026-10-18T00:00:00+08:00');
    const occurrences=D.shows.flatMap(show=>show.times.map(time=>({show,time,start:sessionDate(time)}))).sort((a,b)=>a.start-b.start);
    const next=after?[]:occurrences.filter(s=>before||(s.start>=now&&(!s.show.end||s.start>now))).slice(0,3);
    const ongoing=before||after?[]:D.shows.filter(s=>s.end&&sessionDate(s.times[0])<=now&&sessionDate(s.end)>now);
    return {day,before,after,next,ongoing,now};
  }
  // A pure helper exposed for date-boundary verification; no visitor controls or overrides.
  window.getGuideSchedule=getSchedule;
  function shows() {
    return title('04 / SHOWTIME','下一场精彩，见。','10 月 17 日场次参考。同一演出的多个时间放在一起，更好安排。') + `<section class="live-panel" aria-label="接下来三场演出"><div class="live-top"><h2>接下来三场</h2><span class="live-clock" id="beijing-clock"></span></div><div id="live-content"></div></section><div class="section-title"><h2>当天演出时间表</h2><span>10.17 / SAT</span></div><div class="show-tabs" aria-label="演出筛选"><button class="tab-button ${!state.recommended?'active':''}" data-show-filter="all" aria-pressed="${!state.recommended}">全部演出</button><button class="tab-button ${state.recommended?'active':''}" data-show-filter="recommended" aria-pressed="${state.recommended}">✦ 只看推荐</button></div><div id="show-results" class="show-list"></div><p class="note" style="margin-top:18px">时间段表示活动开放时段，期间可能分轮进行，不代表全程连续表演。烟花、巡游及户外活动可能因天气等调整，请留意官方 App；等候点位与提前到达建议可在群内询问。</p><details class="source-details"><summary>查看原始场次参考图 ＋</summary><p>原图的“四个点位”已按本次确认更新为五个。具体地点见万圣特别活动页。</p>${imageButton('show-reference.jpg','10 月 17 日演出场次参考')}</details>`;
  }
  function renderShows(now=new Date()) {
    const list=D.shows.filter(s=>!state.recommended||s.recommended);
    document.querySelector('#show-results').innerHTML=list.map(s=>`<article class="show-card" id="show-${s.id}"><div class="show-title"><h3>${s.name}</h3>${s.recommended?badge:''}</div><div class="show-times">${s.times.map(t=>`<span class="session ${now>(s.end?sessionDate(s.end):sessionDate(t))?'past':''}">${t}${s.end?'–'+s.end:''}</span>`).join('')}</div>${s.id==='dance'?'<div class="show-extra">宝藏湾 · 疯狂动物城 · 梦幻世界 · 明日世界 · 探险岛<br><a href="#halloween/dance">查看五个点位攻略 ↗</a></div>':s.id==='fireworks'?'<div class="show-extra">万圣特别烟花 · 迪士尼反派魅影秀</div>':s.end?'<div class="show-extra">活动时段 · 具体轮次以现场为准</div>':''}</article>`).join('');
  }
  function updateLive() {
    if(!document.querySelector('#live-content'))return;
    const s=getSchedule();
    document.querySelector('#beijing-clock').innerHTML=`<span class="live-dot"></span>北京时间 ${new Intl.DateTimeFormat('zh-CN',{timeZone:'Asia/Shanghai',hour:'2-digit',minute:'2-digit',hour12:false}).format(s.now)}`;
    let html=s.before?'<p class="live-subtitle">10 月 17 日首三场预览 · 当天自动更新推荐</p>':s.after?'<p class="live-subtitle">这份时间表适用于 2026 年 10 月 17 日。</p>':'<p class="live-subtitle">按开始时间排序 · 不含步行及提前等候时间</p>';
    html+=s.next.length?s.next.map(({show,time,start})=>`<a class="next-card" href="#shows/${show.id}"><div class="next-time">${time}</div><div class="next-info"><h3>${show.name}</h3><small>${s.before?'10 月 17 日':`还有 ${Math.max(0,Math.ceil((start-s.now)/60000))} 分钟开始`}</small></div>${show.recommended?badge:''}</a>`).join(''):`<p class="live-empty">${s.after?'10 月 17 日演出安排已结束。':s.ongoing.length?'今天没有尚未开始的场次啦。':'今日演出已结束，带着快乐回去吧。'}</p>`;
    if(s.ongoing.length)html+=`<div class="ongoing"><div class="ongoing-title">● 正在进行的活动时段</div>${s.ongoing.map(show=>`<a class="ongoing-item" href="#shows/${show.id}">${show.name} · 至 ${show.end} ↗</a>`).join('')}</div>`;
    document.querySelector('#live-content').innerHTML=html;
    renderShows(s.now);
  }

  function halloween() {
    return title('05 / A LITTLE SPOOKY','今晚，怪好玩。','万圣特别烟花、讨糖、嚎叫和蹦迪，把夜晚交给快乐。') + `<div class="night-intro"><div class="eyebrow">HALLOWEEN AFTER DARK</div><h2 style="margin-top:10px">白天尽兴玩，夜晚尽情跳。</h2><p>10 月 17 日游园参考 · 想看的场次先记好，想跳的舞池慢慢挑。</p></div>
      <section class="festival-card"><div class="festival-number">01</div><div><h2>万圣特别烟花</h2><div class="tags">${badge}<span class="pill">迪士尼反派魅影秀</span></div><div class="times">20:20 / 21:35</div><p>当反派接管夜晚，城堡投影与烟花一起上演万圣氛围。喜欢拍照和仪式感的朋友，把这一站留给夜空。</p><p class="note" style="margin-top:8px">场次按本次参考表记录；具体演出安排及烟花效果以当天官方 App、天气与现场为准。</p><a class="jump" href="#shows/fireworks">查看演出时间表 ↗</a></div></section>
      <section class="festival-card"><div class="festival-number">02</div><div><h2>万圣讨糖活动</h2><div class="times">18:30–21:00</div><p>去收集一点万圣夜的甜蜜。时间表中的「林间故事·凡迭戈讨糖」可作为当晚参考，具体点位、轮次与参与要求请现场确认。</p><p class="note" style="margin-top:8px">迪士尼小镇也有万圣相关活动，注意区分乐园内和小镇的参与地点与规则。</p></div></section>
      <section class="festival-card"><div class="festival-number">03</div><div><h2>疯狂嚎叫节</h2><div class="tags"><span class="pill">疯狂动物城</span><span class="pill orange">一起加入大合唱</span></div><div class="times">17:10 / 18:10 / 19:10</div><p>来动物城跟着嚎叫版《奇妙在身边》一起热闹起来。官方活动还设置了获得「领嚎之王」王冠的机会，参与互动，说不定有惊喜。</p><a class="jump" href="#shows/howl">查看演出时间表 ↗</a></div></section>
      <section class="festival-card" id="dance"><div class="festival-number">04</div><div><h2>万圣蹦迪</h2><div class="tags">${badge}<span class="pill">怪好玩蹦迪舞池</span></div><div class="times">18:00–21:00</div><p>五个点位都保留。想要热闹、互动或更宽敞的空间，展开看看，挑一个喜欢的舞池。</p><div class="dance-list">${D.dance.map(d=>`<details class="dance-detail"><summary><span>${d.name}<small>${d.tag}</small></span></summary><div class="dance-copy"><p>${d.text}</p><p class="note">${d.tip}</p></div></details>`).join('')}</div><p class="note">以上点位特色来自游玩经验分享；人流、曲目、互动及视野会随现场安排变化。具体舞池位置可询问演职人员。</p><a class="jump" href="#shows/dance">查看当晚时间安排 ↗</a></div></section>
      ${sources([['上海迪士尼度假区官方万圣活动宣发','https://weibo.com/2/detail/5342988680037116'],['官方当季活动一览','https://www.shanghaidisneyresort.com/zh-cn/experience?group=seasonal-events-2'],['官方迪士尼小镇万圣活动介绍','https://weibo.com/2/detail/5353152635210264']])}`;
  }

  function tips() {
    return title('06 / LITTLE THINGS, BIG JOY','一些，快乐的小窍门。','收好这份朋友间的小抄。有拿不准的事，随时在群里问一问。') + `<div class="tips-list">
      <section class="tip-card"><div class="tip-top"><span>01</span><h2>讨一张贴纸</h2></div><p>可以礼貌地向胸口佩戴铭牌的工作人员讨要贴纸，看看能不能收获一个小惊喜。</p></section>
      <section class="tip-card"><div class="tip-top"><span>02</span><h2>吃饭购物，先问南山</h2></div><p>园区内用餐、购物前，可以在群内联系<strong>「南山」</strong>，可能解锁 <strong>8 折优惠</strong>。适用店铺与商品请先确认。</p></section>
      <section class="tip-card"><div class="tip-top"><span>03</span><h2>乐拍通，一起留下纪念</h2></div><p>想拍一组纪念照，可以在群里问问有没有人一起拼拍摄套餐。本次分享的套餐最多可供 <strong>6 位</strong>拍摄，具体套餐、人数与使用规则请在群内确认后购买。</p></section>
      <section class="tip-card"><div class="tip-top"><span>04</span><h2>好位置，群里取取经</h2></div><p>不确定演出该在哪里等、需要提前多久到？在群内问一问，大家一起找个合适的位置。</p></section>
      <section class="tip-card"><div class="tip-top"><span>05</span><h2>进园前，补充一点能量</h2></div><p>迪士尼地铁站 <strong>1 号口</strong>有蜜雪冰城和多个便利店，有需要可以选购后再入园。挑选食物与饮料时记得留意安检要求。</p><a class="small-link" href="#entry">看看入园提醒 ↗</a></section>
      <section class="tip-card help-card"><div class="tip-top"><span>✚</span><h2>身体不适，及时求助</h2></div><p>园区内设有医务室。如果感到身体不适，请及时联系就近工作人员，寻求帮助。</p></section>
      <section class="tip-card wide"><div class="tip-top"><span>06</span><h2>去迪士尼小镇吃点好的</h2></div><dl class="restaurant-list"><div><dt>西餐</dt><dd>芝乐坊</dd></div><div><dt>中餐</dt><dd>旺顺融、桂满陇、南里山房</dd></div><div><dt>烤肉</dt><dd>烧肉 Like</dd></div><div><dt>其他</dt><dd>芽笼芽笼、凑凑火锅、PHO 越南粉</dd></div></dl><p class="note" style="margin-top:12px">朋友们的口味清单。营业时间和排队情况以店铺当天为准。</p></section></div>`;
  }

  const pages={home,early,entry,rides,shows,halloween,tips};
  function route() {
    const [requested,anchor]=(location.hash.slice(1)||'home').split('/');
    const page=pages[requested]?requested:'home';
    if(page==='shows'&&anchor)state.recommended=false;
    main.innerHTML=pages[page]();
    document.querySelector('.bottom-nav').innerHTML=[['home','手册'],['rides','项目'],['shows','演出'],['halloween','万圣夜']].map(([id,name])=>`<a href="#${id}" class="${id===page?'active':''}" ${id===page?'aria-current="page"':''}>${icon(id)}<span>${name}</span></a>`).join('');
    document.title=`${{home:'一起去奇妙一下',early:'早享攻略',entry:'入园要求',rides:'项目推荐',shows:'表演时间',halloween:'万圣特别活动',tips:'有趣小 tips'}[page]} · 10.17 游园手册`;
    if(page==='rides')renderRides();
    if(page==='shows')updateLive();
    window.scrollTo(0,0);
    if(anchor)requestAnimationFrame(()=>document.getElementById(page==='shows'?`show-${anchor}`:anchor)?.scrollIntoView({block:'center'}));
  }
  main.addEventListener('change',e=>{
    const key={'area-filter':'area','thrill-filter':'thrill','popularity-filter':'popularity'}[e.target.id];
    if(key){state[key]=e.target.value;renderRides();}
  });
  main.addEventListener('click',e=>{
    if(e.target.closest('#reset-filters')){state.area=state.thrill=state.popularity='all';['area','thrill','popularity'].forEach(k=>document.querySelector(`#${k}-filter`).value='all');renderRides();}
    const filter=e.target.closest('[data-show-filter]');
    if(filter){state.recommended=filter.dataset.showFilter==='recommended';document.querySelectorAll('[data-show-filter]').forEach(b=>{const active=(b.dataset.showFilter==='recommended')===state.recommended;b.classList.toggle('active',active);b.setAttribute('aria-pressed',active);});renderShows();}
    const image=e.target.closest('[data-image]');
    if(image){const dialog=document.querySelector('#image-dialog');const img=dialog.querySelector('img');img.src=`./assets/${image.dataset.image}`;img.alt=image.dataset.caption;dialog.showModal();document.body.style.overflow='hidden';}
  });
  const dialog=document.querySelector('#image-dialog');
  dialog.querySelector('.close-dialog').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close();});
  dialog.addEventListener('close',()=>{document.body.style.overflow='';});
  window.addEventListener('hashchange',route);
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)updateLive();});
  setInterval(updateLive,15000);
  route();
})();
