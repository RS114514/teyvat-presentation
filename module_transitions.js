/**
 * 《原神》大屏交互课件 · 专属视觉特效转场控制器 (Genshin Cinematic Transitions Engine)
 * 文件: module_transitions.js
 * 架构: 双缓冲平滑视窗调度器 (Double-Buffered Viewport System)
 * 规范: mix-blend-mode: screen 滤色黑科技 + 矢量 SVG 路径 + 严禁最后一毫秒暴力替换文字
 */

class GenshinTransitionEngine {
  /**
   * @param {Object} options 配置参数
   * @param {HTMLElement|string} [options.container='#deck-container'] 视口外层主容器
   * @param {HTMLElement|string} [options.viewportCurrent='#viewport-current'] 当前展示层视口
   * @param {HTMLElement|string} [options.viewportIncoming='#viewport-incoming'] 换页缓冲层视口
   * @param {Array<Object>} [options.slides=[]] 幻灯片数据集合
   * @param {Function} [options.renderSlide] 幻灯片预渲染钩子函数 (targetEl, slideData, index) => void
   * @param {Function} [options.onSlideChange] 幻灯片切换完成回调 (index, slideData) => void
   * @param {Function} [options.onTransitionStart] 转场启动回调 (fromIdx, toIdx, transKey) => void
   * @param {Function} [options.onTransitionEnd] 转场结束回调 (toIdx, slideData) => void
   * @param {number} [options.duration=750] 转场动画时长 (毫秒)
   */
  constructor(options = {}) {
    this.options = Object.assign({
      container: '#deck-container',
      viewportCurrent: '#viewport-current',
      viewportIncoming: '#viewport-incoming',
      slides: [],
      renderSlide: null,
      onSlideChange: null,
      onTransitionStart: null,
      onTransitionEnd: null,
      duration: 750
    }, options);

    this.currentIndex = 0;
    this.isLocked = false;
    this.transLayers = {};
    this.container = null;
    this.viewportCurrent = null;
    this.viewportIncoming = null;

    this.init();
  }

  /**
   * 初始化双缓冲视窗与 9 组专属转场 DOM 结构
   */
  init() {
    this.container = typeof this.options.container === 'string'
      ? document.querySelector(this.options.container)
      : this.options.container;

    if (!this.container) {
      this.container = document.body;
    }

    // 确保 #viewport-current 存在
    this.viewportCurrent = typeof this.options.viewportCurrent === 'string'
      ? document.querySelector(this.options.viewportCurrent)
      : this.options.viewportCurrent;

    if (!this.viewportCurrent) {
      this.viewportCurrent = document.createElement('div');
      this.viewportCurrent.id = 'viewport-current';
      this.viewportCurrent.className = 'deck-viewport deck-viewport-current';
      this.container.appendChild(this.viewportCurrent);
    }

    // 确保 #viewport-incoming 存在
    this.viewportIncoming = typeof this.options.viewportIncoming === 'string'
      ? document.querySelector(this.options.viewportIncoming)
      : this.options.viewportIncoming;

    if (!this.viewportIncoming) {
      this.viewportIncoming = document.createElement('div');
      this.viewportIncoming.id = 'viewport-incoming';
      this.viewportIncoming.className = 'deck-viewport deck-viewport-incoming';
      this.container.appendChild(this.viewportIncoming);
    }

    // 构建或补全 9 组基于游戏资产的高保真矢量转场图层
    this.injectTransitionLayers();
  }

  /**
   * 构造并挂载 9 组游戏视觉特效图层 (SVG 路径 + 滤色结构)
   */
  injectTransitionLayers() {
    let transContainer = document.getElementById('genshin-transitions-layer-container');
    if (!transContainer) {
      transContainer = document.createElement('div');
      transContainer.id = 'genshin-transitions-layer-container';
      this.container.appendChild(transContainer);
    }

    const transitionsDef = [
      {
        id: 'trans-wind',
        key: 'trans_01_02_wind',
        html: `
          <div class="wind-blade-cross-1"></div>
          <div class="wind-blade-cross-2"></div>
          <div class="wind-blade-cross-3"></div>
          <!-- 蒙德风神高阶法阵 -->
          <svg class="wind-crest-symbol" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#34e5a7" stroke-width="2.5" stroke-dasharray="10 6" opacity="0.65"/>
            <circle cx="100" cy="100" r="76" stroke="#2dd4bf" stroke-width="1.8"/>
            <circle cx="100" cy="100" r="48" stroke="#34e5a7" stroke-width="2"/>
            <!-- 罗盘四方风向标 -->
            <polygon points="100,14 105,45 95,45" fill="#34e5a7"/>
            <polygon points="100,186 105,155 95,155" fill="#34e5a7"/>
            <polygon points="14,100 45,105 45,95" fill="#34e5a7"/>
            <polygon points="186,100 155,105 155,95" fill="#34e5a7"/>
            <!-- 三叶风之结核心印记 -->
            <path d="M100 52 C80 52, 60 70, 60 92 C60 114, 80 130, 100 144 C120 130, 140 114, 140 92 C140 70, 120 52, 100 52 Z" fill="rgba(52,229,167,0.25)" stroke="#34e5a7" stroke-width="3"/>
            <path d="M100 66 C88 66, 75 78, 75 92 C75 106, 88 118, 100 128 C112 118, 125 106, 125 92 C125 78, 112 66, 100 66 Z" fill="#34e5a7"/>
          </svg>
          <!-- 席卷羽毛粒子独立集群 -->
          <div class="anemo-feathers-cluster">
            <svg class="anemo-feather-item" width="48" height="48" viewBox="0 0 100 100" fill="none">
              <path d="M20 90 C30 65, 45 35, 85 15 C75 35, 60 60, 40 85 C35 88, 25 92, 20 90 Z" fill="rgba(52,229,167,0.85)" stroke="#ffffff" stroke-width="1.5"/>
              <line x1="20" y1="90" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>
            <svg class="anemo-feather-item" width="40" height="40" viewBox="0 0 100 100" fill="none">
              <path d="M20 90 C30 65, 45 35, 85 15 C75 35, 60 60, 40 85 C35 88, 25 92, 20 90 Z" fill="rgba(45,212,191,0.85)" stroke="#ffffff" stroke-width="1.5"/>
              <line x1="20" y1="90" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>
            <svg class="anemo-feather-item" width="56" height="56" viewBox="0 0 100 100" fill="none">
              <path d="M20 90 C30 65, 45 35, 85 15 C75 35, 60 60, 40 85 C35 88, 25 92, 20 90 Z" fill="rgba(167,243,208,0.9)" stroke="#34e5a7" stroke-width="1.5"/>
              <line x1="20" y1="90" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>
            <svg class="anemo-feather-item" width="36" height="36" viewBox="0 0 100 100" fill="none">
              <path d="M20 90 C30 65, 45 35, 85 15 C75 35, 60 60, 40 85 C35 88, 25 92, 20 90 Z" fill="rgba(52,229,167,0.8)" stroke="#ffffff" stroke-width="1.5"/>
              <line x1="20" y1="90" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>
            <svg class="anemo-feather-item" width="44" height="44" viewBox="0 0 100 100" fill="none">
              <path d="M20 90 C30 65, 45 35, 85 15 C75 35, 60 60, 40 85 C35 88, 25 92, 20 90 Z" fill="rgba(255,255,255,0.95)" stroke="#34e5a7" stroke-width="1.5"/>
              <line x1="20" y1="90" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>
            <svg class="anemo-feather-item" width="42" height="42" viewBox="0 0 100 100" fill="none">
              <path d="M20 90 C30 65, 45 35, 85 15 C75 35, 60 60, 40 85 C35 88, 25 92, 20 90 Z" fill="rgba(45,212,191,0.8)" stroke="#ffffff" stroke-width="1.5"/>
              <line x1="20" y1="90" x2="85" y2="15" stroke="#ffffff" stroke-width="2"/>
            </svg>
          </div>
        `
      },
      {
        id: 'trans-rock',
        key: 'trans_02_03_rock',
        html: `
          <!-- 钟离天星方碑下坠虚影 -->
          <svg class="rock-meteor-monolith" viewBox="0 0 140 280" fill="none">
            <polygon points="70,10 120,45 120,240 70,275 20,240 20,45" fill="rgba(244,192,83,0.55)" stroke="#f4c053" stroke-width="3.5"/>
            <line x1="70" y1="10" x2="70" y2="275" stroke="#fef08a" stroke-width="3"/>
            <polygon points="70,60 105,85 105,195 70,220 35,195 35,85" fill="rgba(245,158,11,0.7)" stroke="#fef08a" stroke-width="2.5"/>
            <!-- 岩元素神印矩形纹饰 -->
            <rect x="52" y="110" width="36" height="36" transform="rotate(45 70 128)" stroke="#ffffff" stroke-width="2" fill="rgba(245,158,11,0.5)"/>
          </svg>
          <div class="rock-meteor-core"></div>
          <!-- 蜂窝六边形玉璋护盾阵列 -->
          <svg class="rock-hex-shield-grid" viewBox="0 0 300 300" fill="none">
            <polygon points="150,20 260,85 260,215 150,280 40,215 40,85" stroke="#f4c053" stroke-width="4.5" fill="rgba(244,192,83,0.18)"/>
            <polygon points="150,55 230,100 230,200 150,245 70,200 70,100" stroke="#fef08a" stroke-width="3" stroke-dasharray="10 6"/>
            <!-- 护盾内环岩印纹样 -->
            <rect x="115" y="115" width="70" height="70" transform="rotate(45 150 150)" stroke="#f4c053" stroke-width="3.5" fill="rgba(245,158,11,0.5)"/>
            <rect x="127" y="127" width="46" height="46" transform="rotate(45 150 150)" stroke="#ffffff" stroke-width="2.5"/>
          </svg>
          <!-- 六大岩石碎屑迸发独立集群 -->
          <div class="rock-shards-cluster">
            <svg class="rock-fracture-shard" width="60" height="60" viewBox="0 0 100 100"><polygon points="20,10 90,30 70,90 10,70" fill="#f4c053"/></svg>
            <svg class="rock-fracture-shard" width="75" height="75" viewBox="0 0 100 100"><polygon points="30,15 95,45 80,95 20,80" fill="#f59e0b"/></svg>
            <svg class="rock-fracture-shard" width="55" height="55" viewBox="0 0 100 100"><polygon points="10,25 80,10 90,75 35,90" fill="#fef08a"/></svg>
            <svg class="rock-fracture-shard" width="65" height="65" viewBox="0 0 100 100"><polygon points="40,10 90,50 60,95 10,65" fill="#f4c053"/></svg>
            <svg class="rock-fracture-shard" width="50" height="50" viewBox="0 0 100 100"><polygon points="25,20 85,25 75,85 15,75" fill="#d97706"/></svg>
            <svg class="rock-fracture-shard" width="70" height="70" viewBox="0 0 100 100"><polygon points="15,35 75,15 95,65 30,95" fill="#fbbf24"/></svg>
          </div>
        `
      },
      {
        id: 'trans-slash',
        key: 'trans_03_04_slash',
        html: `
          <!-- 屏幕全屏雷爆闪光 -->
          <div class="slash-flash-screen"></div>
          <!-- 屏幕沿无想一刀真实对角线切开错位容器 -->
          <div class="slash-slice-container">
            <div class="slash-slice-top"></div>
            <div class="slash-slice-bottom"></div>
          </div>
          <!-- 居中雷电光刃束 -->
          <div class="slash-beam-line"></div>
          <!-- 雷电分叉电弧矢量 -->
          <svg class="slash-fork-lightning" viewBox="0 0 1000 600" fill="none">
            <polyline points="0,480 250,380 290,410 480,310 520,335 750,210 790,235 1000,130" stroke="#ffffff" stroke-width="4.5" filter="drop-shadow(0 0 16px #ca7cff)"/>
            <polyline points="250,380 210,430 260,460" stroke="#ca7cff" stroke-width="3"/>
            <polyline points="480,310 440,360 490,390" stroke="#ca7cff" stroke-width="3"/>
            <polyline points="750,210 710,260 760,290" stroke="#ca7cff" stroke-width="3"/>
            <polyline points="520,335 560,370" stroke="#ffffff" stroke-width="2.5"/>
          </svg>
        `
      },
      {
        id: 'trans-dendro',
        key: 'trans_04_05_dendro',
        html: `
          <!-- 纳西妲心景幻成数字殿堂经纬矩阵 -->
          <svg class="dendro-digital-dome" viewBox="0 0 400 400" fill="none">
            <polygon points="200,30 350,115 350,285 200,370 50,285 50,115" stroke="#9de337" stroke-width="3" stroke-dasharray="14 8" opacity="0.85"/>
            <polygon points="200,75 310,138 310,262 200,325 90,262 90,138" stroke="#a3e635" stroke-width="2.5"/>
            <line x1="200" y1="30" x2="200" y2="370" stroke="#9de337" stroke-width="2" stroke-opacity="0.6"/>
            <line x1="50" y1="115" x2="350" y2="285" stroke="#9de337" stroke-width="2" stroke-opacity="0.6"/>
            <line x1="50" y1="285" x2="350" y2="115" stroke="#9de337" stroke-width="2" stroke-opacity="0.6"/>
            <!-- 殿堂中心光标基元 -->
            <rect x="175" y="175" width="50" height="50" stroke="#ffffff" stroke-width="2.5" fill="rgba(157,227,55,0.4)"/>
            <circle cx="200" cy="200" r="10" fill="#ffffff"/>
          </svg>
          <!-- 智慧叶脉百叶窗矢量展开 -->
          <svg class="dendro-leaf-venation" viewBox="0 0 300 300" fill="none">
            <path d="M150 20 C100 80, 80 160, 150 280 C220 160, 200 80, 150 20 Z" stroke="#9de337" stroke-width="3.5" fill="rgba(157,227,55,0.22)"/>
            <line x1="150" y1="20" x2="150" y2="280" stroke="#ffffff" stroke-width="3"/>
            <path d="M150 80 Q110 70 85 95" stroke="#a3e635" stroke-width="2.5"/>
            <path d="M150 80 Q190 70 215 95" stroke="#a3e635" stroke-width="2.5"/>
            <path d="M150 140 Q105 130 75 160" stroke="#a3e635" stroke-width="2.5"/>
            <path d="M150 140 Q195 130 225 160" stroke="#a3e635" stroke-width="2.5"/>
            <path d="M150 200 Q115 195 90 225" stroke="#a3e635" stroke-width="2.5"/>
            <path d="M150 200 Q185 195 210 225" stroke="#a3e635" stroke-width="2.5"/>
          </svg>
          <div class="dendro-matrix-scan-beam"></div>
          <!-- 浮动草元素孢子独立集群 -->
          <div class="dendro-spores-cluster">
            <div class="dendro-spore-dot"></div>
            <div class="dendro-spore-dot"></div>
            <div class="dendro-spore-dot"></div>
            <div class="dendro-spore-dot"></div>
            <div class="dendro-spore-dot"></div>
            <div class="dendro-spore-dot"></div>
          </div>
        `
      },
      {
        id: 'trans-hydro',
        key: 'trans_05_06_hydro',
        html: `
          <!-- 枫丹欧庇克莱审判法阵 -->
          <svg class="hydro-judgement-seal" viewBox="0 0 320 320" fill="none">
            <circle cx="160" cy="160" r="145" stroke="#2ec5ff" stroke-width="3.5" stroke-dasharray="16 8"/>
            <circle cx="160" cy="160" r="120" stroke="#38bdf8" stroke-width="2.5"/>
            <circle cx="160" cy="160" r="85" stroke="#2ec5ff" stroke-width="3" fill="rgba(46,197,255,0.14)"/>
            <!-- 正义天平核心 -->
            <line x1="160" y1="95" x2="160" y2="215" stroke="#ffffff" stroke-width="3.5"/>
            <line x1="105" y1="130" x2="215" y2="130" stroke="#ffffff" stroke-width="3"/>
            <polygon points="105,130 90,172 120,172" fill="rgba(56,189,248,0.85)"/>
            <polygon points="215,130 200,172 230,172" fill="rgba(56,189,248,0.85)"/>
          </svg>
          <!-- 底部涌起湛蓝漫灌水幕 -->
          <div class="hydro-water-surge"></div>
          <!-- 歌剧院剧场大幕独立容器 (双向对称开启) -->
          <div class="hydro-curtains-container">
            <div class="hydro-curtain-left"></div>
            <div class="hydro-curtain-right"></div>
          </div>
        `
      },
      {
        id: 'trans-pyro',
        key: 'trans_06_07_pyro',
        html: `
          <div class="pyro-blast-core"></div>
          <!-- 纳塔神火部族图腾与太阳龙息印记 -->
          <svg class="pyro-dragon-blast" viewBox="0 0 300 300" fill="none">
            <circle cx="150" cy="150" r="130" stroke="#ff5722" stroke-width="3.5" stroke-dasharray="18 10"/>
            <polygon points="150,15 185,115 285,115 205,175 235,275 150,218 65,275 95,175 15,115 115,115" stroke="#fbbf24" stroke-width="3" fill="rgba(255,87,34,0.35)"/>
            <circle cx="150" cy="150" r="52" fill="rgba(234,88,12,0.85)" stroke="#ffffff" stroke-width="2.5"/>
          </svg>
          <!-- 黑曜石灼烧裂纹 -->
          <svg class="pyro-obsidian-cracks" viewBox="0 0 500 500" fill="none">
            <path d="M250 250 L120 110 L50 80" stroke="#ff5722" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 12px #ea580c)"/>
            <path d="M250 250 L380 120 L450 60" stroke="#ff5722" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 12px #ea580c)"/>
            <path d="M250 250 L110 370 L40 430" stroke="#ff5722" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 12px #ea580c)"/>
            <path d="M250 250 L390 380 L460 440" stroke="#ff5722" stroke-width="4.5" stroke-linecap="round" filter="drop-shadow(0 0 12px #ea580c)"/>
            <path d="M250 250 L250 40 L280 10" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round"/>
            <path d="M250 250 L250 460 L220 490" stroke="#fbbf24" stroke-width="3.5" stroke-linecap="round"/>
          </svg>
          <!-- 爆燃火花粒子簇 -->
          <div class="pyro-ember-cluster">
            <div class="pyro-ember-item"></div>
            <div class="pyro-ember-item"></div>
            <div class="pyro-ember-item"></div>
            <div class="pyro-ember-item"></div>
            <div class="pyro-ember-item"></div>
            <div class="pyro-ember-item"></div>
          </div>
        `
      },
      {
        id: 'trans-cryo',
        key: 'trans_07_08_cryo',
        html: `
          <!-- 至冬极寒值边缘霜花覆屏层 -->
          <div class="cryo-sheer-cold-vignette"></div>
          <!-- 极地六角冰晶图样 -->
          <svg class="cryo-frost-crystal-pattern" viewBox="0 0 400 400" fill="none">
            <!-- 经典雪花对称轴 -->
            <line x1="200" y1="20" x2="200" y2="380" stroke="#9ee6ff" stroke-width="4"/>
            <line x1="45" y1="110" x2="355" y2="290" stroke="#9ee6ff" stroke-width="4"/>
            <line x1="45" y1="290" x2="355" y2="110" stroke="#9ee6ff" stroke-width="4"/>
            <!-- 冰晶分支 -->
            <path d="M200 80 L170 50 M200 80 L230 50 M200 130 L160 100 M200 130 L240 100" stroke="#e0f7fa" stroke-width="3"/>
            <path d="M200 320 L170 350 M200 320 L230 350 M200 270 L160 300 M200 270 L240 300" stroke="#e0f7fa" stroke-width="3"/>
            <circle cx="200" cy="200" r="48" stroke="#ffffff" stroke-width="3" fill="rgba(158,230,255,0.3)"/>
          </svg>
          <!-- 破冰碎裂爆发几何 -->
          <svg class="cryo-ice-shard-burst" viewBox="0 0 300 300" fill="none">
            <polygon points="150,60 190,120 150,140 110,120" fill="rgba(255,255,255,0.92)" stroke="#9ee6ff" stroke-width="2.5"/>
            <polygon points="210,120 260,170 200,180 180,140" fill="rgba(158,230,255,0.8)" stroke="#ffffff" stroke-width="2.5"/>
            <polygon points="90,120 120,140 100,180 40,170" fill="rgba(158,230,255,0.8)" stroke="#ffffff" stroke-width="2.5"/>
            <polygon points="150,240 180,180 150,170 120,180" fill="rgba(255,255,255,0.92)" stroke="#9ee6ff" stroke-width="2.5"/>
          </svg>
        `
      },
      {
        id: 'trans-opera',
        key: 'trans_08_09_opera',
        html: `
          <!-- 中国传统大红戏曲水袖长绸 -->
          <div class="opera-ribbon-wave-1"></div>
          <div class="opera-ribbon-wave-2"></div>
          <div class="opera-ribbon-wave-3"></div>
          <!-- 宣纸水墨在中央爆开晕染 (纯正中国水墨浓墨与飞白金云) -->
          <svg class="opera-ink-circle" viewBox="0 0 500 500" fill="none">
            <!-- 浓墨主晕染层 -->
            <path d="M250 80 C340 70, 420 140, 430 230 C440 320, 360 410, 270 420 C180 430, 90 350, 80 260 C70 170, 160 90, 250 80 Z" fill="#090a0f" opacity="0.94"/>
            <path d="M250 110 C320 100, 390 160, 400 230 C410 300, 340 380, 270 390 C200 400, 120 330, 110 260 C100 190, 180 120, 250 110 Z" fill="#111827" opacity="0.96"/>
            <!-- 飞白水墨扩散溅墨点 -->
            <circle cx="160" cy="140" r="16" fill="#090a0f"/>
            <circle cx="120" cy="180" r="10" fill="#111827"/>
            <circle cx="360" cy="120" r="14" fill="#090a0f"/>
            <circle cx="410" cy="170" r="9" fill="#111827"/>
            <circle cx="420" cy="330" r="15" fill="#090a0f"/>
            <circle cx="370" cy="380" r="11" fill="#111827"/>
            <circle cx="130" cy="340" r="13" fill="#090a0f"/>
            <circle cx="90" cy="290" r="8" fill="#111827"/>
            <!-- 传统戏曲朱红点睛与描金祥云纹 -->
            <circle cx="250" cy="250" r="75" fill="#ef4444" opacity="0.85"/>
            <circle cx="250" cy="250" r="36" fill="#ffffff" opacity="0.95"/>
            <path d="M160 210 Q210 160, 250 210 T340 210" stroke="#fef08a" stroke-width="3.5" fill="none"/>
            <path d="M160 290 Q210 340, 250 290 T340 290" stroke="#fef08a" stroke-width="3.5" fill="none"/>
          </svg>
        `
      },
      {
        id: 'trans-celestia',
        key: 'trans_09_10_celestia',
        html: `
          <!-- 水火风雷草冰岩七色向心光束聚合 -->
          <svg class="celestia-seven-rays" viewBox="0 0 500 500" fill="none">
            <!-- 1. 水 Hydro -->
            <line x1="250" y1="250" x2="250" y2="15" stroke="#2ec5ff" stroke-width="5" filter="drop-shadow(0 0 10px #2ec5ff)"/>
            <!-- 2. 火 Pyro -->
            <line x1="250" y1="250" x2="445" y2="100" stroke="#ff5722" stroke-width="5" filter="drop-shadow(0 0 10px #ff5722)"/>
            <!-- 3. 风 Anemo -->
            <line x1="250" y1="250" x2="485" y2="295" stroke="#34e5a7" stroke-width="5" filter="drop-shadow(0 0 10px #34e5a7)"/>
            <!-- 4. 雷 Electro -->
            <line x1="250" y1="250" x2="360" y2="475" stroke="#ca7cff" stroke-width="5" filter="drop-shadow(0 0 10px #ca7cff)"/>
            <!-- 5. 草 Dendro -->
            <line x1="250" y1="250" x2="140" y2="475" stroke="#9de337" stroke-width="5" filter="drop-shadow(0 0 10px #9de337)"/>
            <!-- 6. 冰 Cryo -->
            <line x1="250" y1="250" x2="15" y2="295" stroke="#9ee6ff" stroke-width="5" filter="drop-shadow(0 0 10px #9ee6ff)"/>
            <!-- 7. 岩 Geo -->
            <line x1="250" y1="250" x2="55" y2="100" stroke="#f4c053" stroke-width="5" filter="drop-shadow(0 0 10px #f4c053)"/>
          </svg>
          <div class="celestia-ring-blast"></div>
          <!-- 提瓦特原石 / 七曜星盘核心爆发引爆 -->
          <svg class="celestia-primogem-core" viewBox="0 0 200 200" fill="none">
            <polygon points="100,8 126,74 192,100 126,126 100,192 74,126 8,100 74,74" fill="rgba(255,255,255,0.96)" stroke="#dfb2ff" stroke-width="3.5" filter="drop-shadow(0 0 30px #ffffff)"/>
            <polygon points="100,42 116,84 158,100 116,116 100,158 84,116 42,100 84,84" fill="#dfb2ff"/>
          </svg>
        `
      },
      {
        id: 'trans-lunar',
        key: 'trans_07_08_lunar',
        html: `
          <div class="lunar-torque-ripple"></div>
          <svg class="lunar-welkin-moon-symbol" viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="90" stroke="#b9d8ff" stroke-width="2.5" stroke-dasharray="8 6" opacity="0.75"/>
            <path d="M100 25 C65 25 35 55 35 100 C35 145 65 175 100 175 C75 150 75 50 100 25 Z" fill="rgba(185, 216, 255, 0.4)" stroke="#b9d8ff" stroke-width="3" filter="drop-shadow(0 0 20px #b9d8ff)"/>
            <circle cx="130" cy="100" r="8" fill="#ffffff" filter="drop-shadow(0 0 10px #ffffff)"/>
          </svg>
        `
      },
      {
        id: 'trans-vlogs',
        key: 'trans_11_12_electro',
        html: `
          <div class="electro-keqing-starlight"></div>
          <svg class="electro-starlight-symbol" viewBox="0 0 200 200" fill="none">
            <polygon points="100,10 115,75 180,100 115,125 100,190 85,125 20,100 85,75" fill="rgba(192, 132, 252, 0.4)" stroke="#c084fc" stroke-width="3" filter="drop-shadow(0 0 25px #c084fc)"/>
          </svg>
        `
      }
    ];

    transitionsDef.forEach((def) => {
      let layerEl = document.getElementById(def.id);
      if (!layerEl) {
        layerEl = document.createElement('div');
        layerEl.id = def.id;
        layerEl.className = 'cinematic-trans-layer';
        layerEl.innerHTML = def.html;
        transContainer.appendChild(layerEl);
      } else {
        layerEl.className = 'cinematic-trans-layer';
        layerEl.innerHTML = def.html;
      }
      this.transLayers[def.key] = layerEl;
      this.transLayers[def.id] = layerEl;
    });
  }

  /**
   * 根据当前页与目标页索引匹配专属转场键名
   * @param {number} fromIdx 起始页
   * @param {number} toIdx 目标页
   * @returns {string|null}
   */
  getTransitionKey(fromIdx, toIdx) {
    // 1. 正向相邻转场
    if (fromIdx === 0 && toIdx === 1) return 'trans_01_02_wind';
    if (fromIdx === 1 && toIdx === 2) return 'trans_02_03_rock';
    if (fromIdx === 2 && toIdx === 3) return 'trans_03_04_slash';
    if (fromIdx === 3 && toIdx === 4) return 'trans_04_05_dendro';
    if (fromIdx === 4 && toIdx === 5) return 'trans_05_06_hydro';
    if (fromIdx === 5 && toIdx === 6) return 'trans_06_07_pyro';
    if (fromIdx === 6 && toIdx === 7) return 'trans_07_08_lunar';
    if (fromIdx === 7 && toIdx === 8) return 'trans_07_08_cryo';
    if (fromIdx === 8 && toIdx === 9) return 'trans_09_10_celestia';
    if (fromIdx === 9 && toIdx === 10) return 'trans_08_09_opera';
    if (fromIdx === 10 && toIdx === 11) return 'trans_09_10_celestia';
    if (fromIdx === 11 && toIdx === 12) return 'trans_11_12_electro';

    // 2. 反向相邻转场
    if (fromIdx === 1 && toIdx === 0) return 'trans_01_02_wind';
    if (fromIdx === 2 && toIdx === 1) return 'trans_02_03_rock';
    if (fromIdx === 3 && toIdx === 2) return 'trans_03_04_slash';
    if (fromIdx === 4 && toIdx === 3) return 'trans_04_05_dendro';
    if (fromIdx === 5 && toIdx === 4) return 'trans_05_06_hydro';
    if (fromIdx === 6 && toIdx === 5) return 'trans_06_07_pyro';
    if (fromIdx === 7 && toIdx === 6) return 'trans_07_08_lunar';
    if (fromIdx === 8 && toIdx === 7) return 'trans_07_08_cryo';
    if (fromIdx === 9 && toIdx === 8) return 'trans_09_10_celestia';
    if (fromIdx === 10 && toIdx === 9) return 'trans_08_09_opera';
    if (fromIdx === 11 && toIdx === 10) return 'trans_09_10_celestia';
    if (fromIdx === 12 && toIdx === 11) return 'trans_11_12_electro';

    // 3. 非相邻直接跳转
    const targetMap = {
      1: 'trans_01_02_wind',
      2: 'trans_02_03_rock',
      3: 'trans_03_04_slash',
      4: 'trans_04_05_dendro',
      5: 'trans_05_06_hydro',
      6: 'trans_06_07_pyro',
      7: 'trans_07_08_lunar',
      8: 'trans_07_08_cryo',
      9: 'trans_09_10_celestia',
      10: 'trans_08_09_opera',
      11: 'trans_09_10_celestia',
      12: 'trans_11_12_electro'
    };
    if (targetMap[toIdx]) {
      return targetMap[toIdx];
    }

    return null;
  }

  /**
   * 核心调度：双缓冲平滑转场时序
   * 严禁使用 setTimeout 在最后一毫秒暴力替换文字！两层 DOM 在动画期间完全共存并实时平滑位移。
   *
   * @param {number} nextIndex 目标幻灯片索引
   */
  goto(nextIndex) {
    const slides = this.options.slides;
    if (this.isLocked || nextIndex === this.currentIndex) return;
    if (slides.length > 0 && (nextIndex < 0 || nextIndex >= slides.length)) return;

    this.isLocked = true;
    const curIdx = this.currentIndex;
    const nxtIdx = nextIndex;
    const isForward = nxtIdx > curIdx;
    const nxtSlide = slides[nxtIdx] || null;

    // 1. T+0ms: 在 #viewport-incoming 中预先渲染目标页的全部 DOM 结构
    // 使得动画开始前，目标页所有文本、卡片与视觉均已真实就位，无需延后替换文字
    if (typeof this.options.renderSlide === 'function' && nxtSlide) {
      try {
        this.options.renderSlide(this.viewportIncoming, nxtSlide, nxtIdx);
      } catch (err) {
        console.error('[GenshinTransitionEngine] Error in renderSlide:', err);
      }
    }

    // 初始化缓冲层视窗空间姿态与状态
    const slideClassNames = nxtSlide ? `${nxtSlide.layout ? 'layout-' + nxtSlide.layout : ''} ${nxtSlide.id ? 'slide-' + nxtSlide.id : ''}`.trim() : '';
    this.viewportIncoming.className = `deck-viewport deck-viewport-incoming ${slideClassNames}`;
    this.viewportIncoming.style.transition = 'none';
    this.viewportIncoming.style.opacity = '0';
    this.viewportIncoming.style.transform = isForward
      ? 'scale(1.04) translate3d(35px, 0, -30px)'
      : 'scale(0.96) translate3d(-35px, 0, -30px)';
    this.viewportIncoming.style.pointerEvents = 'none';

    // 强制触发一次重排，确保初始状态就绪
    void this.viewportIncoming.offsetWidth;

    const transKey = this.getTransitionKey(curIdx, nxtIdx);
    const transLayer = transKey ? this.transLayers[transKey] : null;

    // 若触发无想一刀切屏错位，克隆当前视窗内容至对角错位切片容器中
    if (transKey === 'trans_03_04_slash' && transLayer) {
      const sliceTop = transLayer.querySelector('.slash-slice-top');
      const sliceBottom = transLayer.querySelector('.slash-slice-bottom');
      if (sliceTop && sliceBottom) {
        sliceTop.innerHTML = this.viewportCurrent.innerHTML;
        sliceBottom.innerHTML = this.viewportCurrent.innerHTML;
        sliceTop.className = `slash-slice-top ${this.viewportCurrent.className.replace('deck-viewport-current', '')}`;
        sliceBottom.className = `slash-slice-bottom ${this.viewportCurrent.className.replace('deck-viewport-current', '')}`;
      }
    }

    if (typeof this.options.onTransitionStart === 'function') {
      this.options.onTransitionStart(curIdx, nxtIdx, transKey);
    }

    // 2. T+40ms: 激活专属特效遮罩，并触发震屏机制
    setTimeout(() => {
      if (transLayer) {
        transLayer.classList.add('active');
      }
      if (transKey === 'trans_02_03_rock' || transKey === 'trans_07_08_cryo') {
        this.container.classList.add('screen-shake');
      }
    }, 40);

    // 3. T+70ms: 开启两层视窗的平滑位移与 Cross-fade
    // #viewport-current 顺滑退出视口，#viewport-incoming 携完整图文内容由深处推入视口
    setTimeout(() => {
      const easeCurve = 'cubic-bezier(0.16, 1, 0.3, 1)';
      const durationMs = this.options.duration - 150;

      this.viewportCurrent.style.transition = `transform ${durationMs}ms ${easeCurve}, opacity ${durationMs}ms ${easeCurve}`;
      this.viewportIncoming.style.transition = `transform ${durationMs}ms ${easeCurve}, opacity ${durationMs}ms ${easeCurve}`;

      this.viewportCurrent.style.opacity = '0';
      this.viewportCurrent.style.transform = isForward
        ? 'scale(0.96) translate3d(-40px, 0, -30px)'
        : 'scale(1.04) translate3d(40px, 0, -30px)';
      this.viewportCurrent.style.pointerEvents = 'none';

      this.viewportIncoming.style.opacity = '1';
      this.viewportIncoming.style.transform = 'scale(1) translate3d(0, 0, 0)';
      this.viewportIncoming.style.pointerEvents = 'auto';

      // 联动全局主题色
      if (nxtSlide && nxtSlide.elementColor) {
        document.documentElement.style.setProperty('--active-element', nxtSlide.elementColor);
      }
      if (nxtSlide && nxtSlide.elementRgb) {
        document.documentElement.style.setProperty('--active-rgb', nxtSlide.elementRgb);
      }
    }, 70);

    // 4. T+420ms: 目标视窗内要素错落浮现 (Stagger Reveal)
    setTimeout(() => {
      const items = this.viewportIncoming.querySelectorAll('.keypoint-item, .opera-keypoint-card, [data-animate="fade-up"]');
      items.forEach((item, i) => {
        item.style.animationDelay = `${i * 70}ms`;
        item.classList.add('stagger-in');
      });
    }, 420);

    // 5. T+750ms: 转场收尾，移除遮罩，完成双缓冲指针与 DOM ID 交换
    setTimeout(() => {
      if (transLayer) {
        transLayer.classList.remove('active');
      }
      this.container.classList.remove('screen-shake');

      // 清理切屏残影
      if (transKey === 'trans_03_04_slash' && transLayer) {
        const sliceTop = transLayer.querySelector('.slash-slice-top');
        const sliceBottom = transLayer.querySelector('.slash-slice-bottom');
        if (sliceTop) sliceTop.innerHTML = '';
        if (sliceBottom) sliceBottom.innerHTML = '';
      }

      // 缓冲指针与 DOM ID 交换：确保 #viewport-current 始终准确指向当前激活视窗
      const temp = this.viewportCurrent;
      this.viewportCurrent = this.viewportIncoming;
      this.viewportIncoming = temp;

      this.viewportCurrent.id = 'viewport-current';
      this.viewportIncoming.id = 'viewport-incoming';

      // 重置旧视窗状态，归还缓冲池
      this.viewportCurrent.className = `deck-viewport deck-viewport-current ${slideClassNames}`;
      this.viewportCurrent.style.transition = 'none';
      this.viewportCurrent.style.opacity = '1';
      this.viewportCurrent.style.transform = 'scale(1) translate3d(0, 0, 0)';
      this.viewportCurrent.style.pointerEvents = 'auto';

      this.viewportIncoming.className = 'deck-viewport deck-viewport-incoming';
      this.viewportIncoming.style.transition = 'none';
      this.viewportIncoming.style.opacity = '0';
      this.viewportIncoming.style.transform = 'scale(1.04) translate3d(35px, 0, -30px)';
      this.viewportIncoming.style.pointerEvents = 'none';
      this.viewportIncoming.innerHTML = '';

      this.currentIndex = nxtIdx;
      this.isLocked = false;

      if (typeof this.options.onSlideChange === 'function') {
        this.options.onSlideChange(nxtIdx, nxtSlide);
      }
      if (typeof this.options.onTransitionEnd === 'function') {
        this.options.onTransitionEnd(nxtIdx, nxtSlide);
      }
    }, this.options.duration);
  }

  next() {
    this.goto(this.currentIndex + 1);
  }

  prev() {
    this.goto(this.currentIndex - 1);
  }

  getCurrentIndex() {
    return this.currentIndex;
  }

  isBusy() {
    return this.isLocked;
  }
}

// 兼容全局挂载与模块化导出规范
if (typeof window !== 'undefined') {
  window.GenshinTransitionEngine = GenshinTransitionEngine;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { GenshinTransitionEngine };
}
