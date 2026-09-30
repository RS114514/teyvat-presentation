/**
 * ==========================================================================
 * 《原神》5分钟提瓦特全景交互课件 · 十二大独立页面全景数据库
 * Module: module_slides_data.js
 * 
 * 核心升级（按手写便签 DSCF1100.JPG 规范重构）：
 * 1. 整页排版多样化：
 *    - 方案①：[ 图 | 文 ] 与 [ 文 | 图 ]（蒙德与稻妻文字靠右，立绘靠左）
 *    - 方案②：杂志画册拼贴 [ 图 | 文 ] + [ 图 | 图 ]（璃月、须弥、挪德卡莱包含大版面实景图卡）
 *    - 全图通铺悬浮排文：文字直接悬浮于纯景之上，无黑色方块死板束缚，大字对比鲜明。
 * 2. 深度融入七国文化与建筑风格：
 *    - 稻妻一刀流居合斩、江户幕府文化；
 *    - 枫丹法国美好年代与欧庇克莱法庭大歌剧；
 *    - 蒙德中世纪莱茵河流域与游吟诗人风车城镇；
 *    - 璃月古代春秋商埠与江南徽派马头墙；
 *    - 须弥中世纪波斯黄金时代与智慧之家图书馆；
 *    - 纳塔前哥伦布中美洲玛雅阿兹特克与部族圣火竞技；
 *    - 挪德卡莱官方「空月之歌」大篇章、北欧冷杉木屋与月矩力；
 *    - 至冬18-19世纪沙俄冬宫巴洛克冰雪要塞。
 * 3. 幼儿园/少儿动画级别极简纯英文口播台词（通俗生动、平均句长4-7词、脱口而出）。
 * 4. 第12页收官：刻晴专属立绘 + 3组真实B站德国游学视频二维码与下划线链接。
 * 
 * 演讲人：朱宇晨 (Zhu Yuchen) | 制作人：傅梓浩 (Fu Zihao)
 * ==========================================================================
 */

const SLIDES_DATA_12 = [
  // --------------------------------------------------------------------------
  // Slide 01: 提瓦特序幕 (星海与双子) [0:00 - 0:35]
  // 版式：全图通透悬浮排文 (Full Bleed Celestial Overlay)
  // --------------------------------------------------------------------------
  {
    index: 1,
    id: "prologue",
    layout: "A",
    layoutType: "floating-text",
    element: "celestia",
    elementName: "星海天理 · CELESTIA",
    elementColor: "#dfb2ff",
    elementRgb: "223, 178, 255",
    culturePrototype: "世界观: 诺斯替神话与古典双生漫游史诗",
    watermark: "TEYVAT",
    mainTitle: "WELCOME TO TEYVAT · SEVEN NATIONS",
    subTitle: "星海序幕 · 异界旅行者的降临",
    keypoints: [
      {
        en: "A Classical Astral Odyssey: Two brave twins journey across infinite stars.",
        cn: "古典星海史诗：勇敢的双生旅行者在浩瀚群星之间漫游，降临奇幻大陆。"
      },
      {
        en: "The Unknown God's Separation: A mysterious deity tore our twin away.",
        cn: "天理神明横空阻截：陌生的神明无情降临，将至亲双子封印分离。"
      },
      {
        en: "An Epic Quest for Family: We embark on a journey across seven nations.",
        cn: "七国巡礼启程：我们踏上漫长旅途游历诸国，找寻至亲与世界的终极真相。"
      }
    ],
    teleprompter: '"Hello everyone! Look at the shiny stars! Welcome to Teyvat! Two brave twins fly in the sky. But a strange god stops them. The twin is gone! Now, our great journey begins. Let us find our dear twin together!"',
    placardNation: "TRAVELER",
    placardTitleCn: "双生旅行者 · 空与荧",
    placardTitleEn: "Aether & Lumine / The Star Travelers",
    localCharImg: "genshin_interactive_assets/characters/aether_nobg.png",
    localCharImgBg: "genshin_interactive_assets/characters/lumine_nobg.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/mondstadt_feidu.png",
    isCover: true,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 02: 蒙德 (果酒湖风车全景 - 温迪) [0:35 - 0:55]
  // 版式：方案① [ 文 | 图 ] (特色排版：文字靠右悬浮！温迪靠左！)
  // --------------------------------------------------------------------------
  {
    index: 2,
    id: "mondstadt",
    layout: "A",
    layoutType: "reverse-floating",
    element: "anemo",
    elementName: "风元素 · ANEMO",
    elementColor: "#34e5a7",
    elementRgb: "52, 229, 167",
    culturePrototype: "建筑发源: 12–14世纪欧洲莱茵河流域风车小镇",
    watermark: "MONDSTADT",
    mainTitle: "MONDSTADT · CITY OF FREEDOM",
    subTitle: "自由之都 · 蒲公英与游吟牧歌",
    keypoints: [
      {
        en: "Medieval Rhine Valley Towns: Giant windmills and lakeside stone towers.",
        cn: "中世纪莱茵河风貌：灵感源于欧洲12–14世纪风车城镇与果酒湖风光。"
      },
      {
        en: "Troubadour Pastoral Ballads: Free people celebrate with poetry and song.",
        cn: "游吟诗人抒情牧歌：人们在蒲公英微风中咏唱自由浪漫的诗篇与歌谣。"
      },
      {
        en: "Venti the Cheerful Bard: Barbatos plays melodies with the gentle breeze.",
        cn: "风神温迪伴随和煦微风，用古琴奏响属于整座城邦的欢快乐章。"
      }
    ],
    teleprompter: '"Look! This is Mondstadt! It is the city of wind and freedom. Look at the big windmills! It comes from old Europe! People sing happy songs and drink sweet grape juice. Their god is Venti. He plays music with the warm wind!"',
    placardNation: "BARBATOS",
    placardTitleCn: "风神巴巴托斯 · 温迪",
    placardTitleEn: "Venti / Barbatos the Anemo Archon",
    localCharImg: "genshin_interactive_assets/characters/venti_nobg_vB.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/mondstadt_city.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 03: 璃月 (海灯节千灯与商港全景 - 钟离) [0:55 - 1:15]
  // 版式：方案② 杂志画报双图拼贴 [ 图 | 文 ] + [ 图 | 图 ] (实景建筑大卡 + 悬浮文字)
  // --------------------------------------------------------------------------
  {
    index: 3,
    id: "liyue",
    layout: "A",
    layoutType: "editorial-collage",
    element: "geo",
    elementName: "岩元素 · GEO",
    elementColor: "#f4c053",
    elementRgb: "244, 192, 83",
    culturePrototype: "建筑发源: 古代中国春秋通商口岸与江南徽派马头墙",
    watermark: "LIYUE",
    mainTitle: "LIYUE · HARBOR OF CONTRACTS",
    subTitle: "千帆契约 · 岩峰矗立与江南徽派",
    keypoints: [
      {
        en: "Spring-Autumn Ports & Huizhou Style: Flying pavilions and stone bridges.",
        cn: "春秋商埠与江南徽派：融入徽派马头墙建筑艺术与奇崛山水峰林。"
      },
      {
        en: "The Sacred Pillar of Contracts: Mutual trust and commerce prosper here.",
        cn: "千帆商港契约精神：以崇高的契约与诚信为立市之本，四海通达。"
      },
      {
        en: "Morax Guards the Golden Harbor: Zhongli protects peace like solid rock.",
        cn: "岩王帝君钟离教导世人信守承诺，如磐石般守护千家万户的繁盛。"
      }
    ],
    photoCard: {
      img: "genshin_interactive_assets/landscapes_real/liyue_feiyun.png",
      title: "绯云坡牌楼与徽派水乡古肆 · FEIYUN SLOPE",
      badge: "HUIZHOU ARCHITECTURE · 徽派古建"
    },
    teleprompter: '"Next, welcome to Liyue! This is a grand Chinese city. Tall stone mountains and red lanterns! People do business and always keep promises. Their god is Zhongli. He is super strong like a big rock. He keeps all friends safe!"',
    placardNation: "MORAX",
    placardTitleCn: "岩王帝君摩拉克斯 · 钟离",
    placardTitleEn: "Zhongli / Morax the Geo Archon",
    localCharImg: "genshin_interactive_assets/characters/zhongli_nobg_vB.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/liyue_harbor.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 04: 稻妻 (天守阁俯瞰与紫电樱花 - 雷电将军) [1:15 - 1:35]
  // 版式：方案① [ 文 | 图 ] (特色排版：文字靠右悬浮！将军靠左！)
  // --------------------------------------------------------------------------
  {
    index: 4,
    id: "inazuma",
    layout: "A",
    layoutType: "reverse-floating",
    element: "electro",
    elementName: "雷元素 · ELECTRO",
    elementColor: "#ca7cff",
    elementRgb: "202, 124, 255",
    culturePrototype: "文化发源: 日本江户幕府时代与战国一刀流武士道",
    watermark: "INAZUMA",
    mainTitle: "INAZUMA · NATION OF ETERNITY",
    subTitle: "雷鸣孤岛 · 永恒之心与一刀流武道",
    keypoints: [
      {
        en: "17th–19th Century Edo Samurai Heritage: Shinto torii and castle keeps.",
        cn: "日本江户幕府时代风貌：汲取天守阁城堡、鸣神大社千本鸟居与武士道。"
      },
      {
        en: "The Decisive Iaijutsu Sword Strike: Musou no Hitotachi slashes mountains.",
        cn: "稻妻一刀流居合斩：雷电将军以无想一刀万钧雷霆斩断群山，断绝凡尘。"
      },
      {
        en: "Sacred Sakura Beneath Storm Clouds: Pink petals drift across thunder.",
        cn: "神樱落英与万顷雷云：漫山粉樱与高天紫色雷霆构成极致的凄美永恒。"
      }
    ],
    teleprompter: '"Now, look! Purple lightning! Welcome to Inazuma! It comes from old Japan. Beautiful pink sakura flowers fall everywhere! Raiden Shogun is the queen. She holds a cool sword. Swish! One hit can cut a mountain in two!"',
    placardNation: "BEELZEBUL",
    placardTitleCn: "御建鸣神主尊 · 雷电将军",
    placardTitleEn: "Raiden Shogun / Beelzebul the Electro Archon",
    localCharImg: "genshin_interactive_assets/characters/raiden_shogun_nobg_vB.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/inazuma_city.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 05: 须弥 (教令院神树与智慧绿茵 - 纳西妲) [1:35 - 1:55]
  // 版式：方案② 杂志拼图 [ 图 | 文 ] (净善宫实景大卡 + 自然流线悬浮文字)
  // --------------------------------------------------------------------------
  {
    index: 5,
    id: "sumeru",
    layout: "D",
    layoutType: "editorial-collage",
    element: "dendro",
    elementName: "草元素 · DENDRO",
    elementColor: "#9de337",
    elementRgb: "157, 227, 55",
    culturePrototype: "文化发源: 中世纪波斯黄金时代、古印度与阿拉伯阿拔斯文明",
    watermark: "SUMERU",
    mainTitle: "SUMERU · CRADLE OF WISDOM",
    subTitle: "智慧绿茵 · 繁茂雨林与波斯学者",
    keypoints: [
      {
        en: "Persian & Indian Golden Age: Inspired by the historic House of Wisdom.",
        cn: "波斯与古印度文明：汲取阿拔斯智慧之家大图书馆与热带雨林学者学院。"
      },
      {
        en: "Ancient Pyramids Meet Canopy Treehouses: Nature and mystery unite.",
        cn: "热带雨林树屋与金色沙漠：浩瀚沙漠金字塔与参天智慧神树和谐并存。"
      },
      {
        en: "Little Nahida's Gentle Compassion: Guarding pure dreams for every child.",
        cn: "草神纳西妲聪慧博爱：用温柔知识守护每一个孩子的纯真美梦与求知探索。"
      }
    ],
    photoCard: {
      img: "genshin_interactive_assets/landscapes_real/sumeru_palace.png",
      title: "须弥净善宫与大智慧神树 · SANCTUARY OF SURASTHANA",
      badge: "HOUSE OF WISDOM · 智慧学者"
    },
    teleprompter: '"Next is green Sumeru! Giant trees meet golden sand! It comes from ancient Persia and India. Little Nahida is the baby archon! She is so small, cute, and super smart. She gives sweet dreams to all good children!"',
    placardNation: "BUER",
    placardTitleCn: "小吉祥草王 · 纳西妲",
    placardTitleEn: "Nahida / Buer the Dendro Archon",
    localCharImg: "genshin_interactive_assets/characters/nahida_splash_vA.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/sumeru_city.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 06: 枫丹 (欧庇克莱歌剧院水城 - 芙宁娜) [1:55 - 2:15]
  // 版式：半图半文 (左右分割剧场透视 · 法国大歌剧悬浮排文)
  // --------------------------------------------------------------------------
  {
    index: 6,
    id: "fontaine",
    layout: "A",
    layoutType: "floating-text",
    element: "hydro",
    elementName: "水元素 · HYDRO",
    elementColor: "#2ec5ff",
    elementRgb: "46, 197, 255",
    culturePrototype: "文化发源: 19世纪法国美好年代、工业蒸汽与巴黎大歌剧院",
    watermark: "FONTAINE",
    mainTitle: "FONTAINE · COURT OF JUSTICE",
    subTitle: "戏剧之都 · 众水之舞与法国大歌剧",
    keypoints: [
      {
        en: "19th Century French Belle Époque: Baroque aqueducts and clockwork tech.",
        cn: "19世纪法国美好年代：巴黎建筑美学、水上巡轨船与复古蒸汽发条机械。"
      },
      {
        en: "French Grand Opera & Court Drama: Judicial trials as theatrical shows.",
        cn: "法国大歌剧院与法庭大戏：欧庇克莱歌剧院将每一次严肃审判化作舞台盛宴。"
      },
      {
        en: "Lady Furina's Glamorous Stage: Elegance, justice, and wonderful twists.",
        cn: "芙宁娜的华丽剧场：以充满戏剧魅力的姿态与连连惊喜展现公正的真谛。"
      }
    ],
    teleprompter: '"Dive into Fontaine! It is the city of water! Just like romantic France! People go to the grand opera house. They watch fun trials like a circus show! Lady Furina loves drama. Neuvillette keeps water clean and fair!"',
    placardNation: "FOCALORS",
    placardTitleCn: "众水与戏剧之神 · 芙宁娜",
    placardTitleEn: "Furina / Focalors the Hydro Archon",
    localCharImg: "genshin_interactive_assets/characters/furina_splash_vA.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/fontaine_opera.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 07: 纳塔 (圣火竞技场与群龙部族 - 玛薇卡) [2:15 - 2:35]
  // 版式：全景战火竞技场 · 烈焰战歌悬浮排文 (Full Panorama Floating)
  // --------------------------------------------------------------------------
  {
    index: 7,
    id: "natlan",
    layout: "A",
    layoutType: "floating-text",
    element: "pyro",
    elementName: "火元素 · PYRO",
    elementColor: "#ff5722",
    elementRgb: "255, 87, 34",
    culturePrototype: "文化发源: 前哥伦布中美洲玛雅阿兹特克与非洲部族图腾",
    watermark: "NATLAN",
    mainTitle: "NATLAN · LAND OF SACRED FLAME",
    subTitle: "烈焰熔炉 · 群龙部族与圣火竞技",
    keypoints: [
      {
        en: "Pre-Columbian Mesoamerican Spirit: Aztec murals and African tribal beats.",
        cn: "前哥伦布时期中美洲精魄：汲取古代阿兹特克文明、彩绘峡谷与部族战歌。"
      },
      {
        en: "Sacred Stadium Combat: Warriors fight for glory with saurian allies.",
        cn: "圣火竞技场勇士搏击：六大部族勇士与飞龙伙伴一同在长燃圣火下驰骋。"
      },
      {
        en: "Mavuika's Fiery Courage: The blazing Pyro Archon rides for her people.",
        cn: "火神玛薇卡炽热无畏：骑着烈火战车，以炽烈战歌带领全族守望相助。"
      }
    ],
    teleprompter: '"Hot, hot, hot! Welcome to Natlan! This is the land of fire, like ancient Mesoamerica! Cute little dragons fly in the canyon! Warriors fight with big smiles. Archon Mavuika rides a super fast bike! She protects everyone with fire!"',
    placardNation: "HABRANKA",
    placardTitleCn: "纳塔火神 · 玛薇卡",
    placardTitleEn: "Mavuika / Habranka the Pyro Archon",
    localCharImg: "genshin_interactive_assets/characters/mavuika_splash_vA.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/natlan_stadium.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 08: 挪德卡莱 (空月之歌篇章 · 哥伦比娅) [2:35 - 2:55]
  // 版式：方案② 杂志画报双图拼贴 [ 图 | 文 ] + [ 图 | 图 ] (极夜冷杉大卡 + 银辉悬浮字)
  // --------------------------------------------------------------------------
  {
    index: 8,
    id: "nod-krai",
    layout: "A",
    layoutType: "editorial-collage",
    element: "lunar",
    elementName: "月矩力 · LUNAR TORQUE",
    elementColor: "#b9d8ff",
    elementRgb: "185, 216, 255",
    culturePrototype: "文化发源: 北欧斯堪的纳维亚松林与环波罗的海芬兰神话",
    watermark: "NOD-KRAI",
    mainTitle: "NOD-KRAI · SONG OF THE WELKIN MOON",
    subTitle: "新月秘境 · 挪德卡莱与古老月之歌",
    keypoints: [
      {
        en: "Official Chapter: Song of the Welkin Moon: An expansive independent zone.",
        cn: "官方年度主篇章「空月之歌」：位于提瓦特大陆北缘的宏大独立探索大区域。"
      },
      {
        en: "Nordic Pine Woods & Baltic Legends: Ancient lunar temple ruins in snow.",
        cn: "北欧冷杉雪林与芬兰神话：苍茫极夜、冰封月神古殿遗迹与木屋海岸。"
      },
      {
        en: "Moon Goddess Columbina: Uncovering mysterious Lunar Torque energy.",
        cn: "月之少女哥伦比娅：人们修筑新月神像，觉醒超越七元素的古老月矩力。"
      }
    ],
    photoCard: {
      img: "genshin_interactive_assets/landscapes_real/snezhnaya_bwiki.png",
      title: "挪德卡莱雪原松林与三月女神古殿 · WELKIN TEMPLE",
      badge: "LUNAR TORQUE · 月之文明"
    },
    teleprompter: '"Now we enter Nod-Krai! The new magical land in the north! It is like snowy Nordic forests. Cold pine trees and glowing silver moon! Columbina is the moon girl. She sings sweet songs with secret moon magic!"',
    placardNation: "KUUTAR",
    placardTitleCn: "月之少女 · 哥伦比娅",
    placardTitleEn: "Columbina · Kuutar / The Moon Maiden",
    localCharImg: "genshin_interactive_assets/characters/columbina_splash_vA.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/snezhnaya_nordkrai.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 09: 至冬 (至冬冰雪宫殿全景与极光 - 冰之女皇) [2:55 - 3:15]
  // 版式：极光冷调对称悬浮排文 (Arctic Aurora Floating)
  // --------------------------------------------------------------------------
  {
    index: 9,
    id: "snezhnaya",
    layout: "A",
    layoutType: "floating-text",
    element: "cryo",
    elementName: "冰元素 · CRYO",
    elementColor: "#9ee6ff",
    elementRgb: "158, 230, 255",
    culturePrototype: "建筑发源: 18–19世纪沙皇俄国冬宫与巴洛克洋葱顶城堡",
    watermark: "SNEZHNAYA",
    mainTitle: "SNEZHNAYA · REALM OF WINTER",
    subTitle: "极寒北境 · 冰雪要塞与沙俄冬宫",
    keypoints: [
      {
        en: "18th–19th Century Tsarist Baroque: Towering onion-domed ice fortresses.",
        cn: "沙皇俄国巴洛克冬宫风貌：宏伟的洋葱圆顶冰雪要塞屹立在漫天北极光之下。"
      },
      {
        en: "The Tsaritsa's Sovereign Will: Her Majesty leads Snezhnaya to challenge high heavens.",
        cn: "冰之女皇至高意志：至高无上的冰雪女王，心怀向天理秩序宣战的坚毅宿命。"
      },
      {
        en: "Fatui Harbingers Gather in Frost: Reclaiming truth for the final world.",
        cn: "愚人众十一执行官在至冬宫集结：在冰封严寒深处探寻世界终极法则。"
      }
    ],
    teleprompter: '"Brrr! It is so cold! Welcome to Snezhnaya! The frozen land of snow! It looks like Russian ice palaces. The Tsaritsa is the powerful ice queen. She and the Fatui fighters have a big secret plan for the world!"',
    placardNation: "SNEZHNAYA",
    placardTitleCn: "至冬神明 · 冰之女皇",
    placardTitleEn: "The Tsaritsa / Her Majesty the Cryo Archon",
    localCharImg: "genshin_interactive_assets/characters/tsaritsa_refined_official.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/snezhnaya_palace_clean.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 10: 提瓦特万国建筑文明巡礼 (派蒙全景向导 · 八国建筑史诗) [3:15 - 3:45]
  // 版式：方案①/方案② 全景画卷多维网格 [ 图 | 文 | 图 ] (派蒙悬浮呼吸动效 + 八国建筑画卷)
  // --------------------------------------------------------------------------
  {
    index: 10,
    id: "tevyat-architecture",
    layout: "architecture",
    layoutType: "architecture-showcase",
    element: "omni",
    elementName: "提瓦特建筑志 · WORLD ARCHITECTURE",
    elementColor: "#facc15",
    elementRgb: "250, 204, 21",
    culturePrototype: "建筑文明溯源: 德国桁架、徽派榫卯、和风枯山水、波斯穹顶、法式巴洛克、美洲金字塔、沙俄雪堡、北欧木殿",
    watermark: "ARCHITECTURE",
    mainTitle: "ARCHITECTURAL WONDERS OF TEYVAT",
    subTitle: "提瓦特万国建筑巡礼 · 文明筑造的凝固史诗",
    keypoints: [
      {
        en: "Global Heritage Reborn: Seven nations echo real-world human architectural wonders.",
        cn: "真实世界文明重现：七大国度生动复刻人类文明跨越千年的经典建筑遗存。"
      },
      {
        en: "East Meets West in Harmony: Chinese timber mortise-tenon meets European baroque stone.",
        cn: "东西方建筑美学交融：东方木构飞檐榫卯与西方石砌巴洛克穹顶各放异彩。"
      },
      {
        en: "Living History in Fantasy: Every wall, bridge, and roof tells a unique cultural story.",
        cn: "幻想世界里的活历史：每一根梁木、每一条水槽都在向世界述说真实的文明史。"
      }
    ],
    paimonBubble: {
      en: "Paimon says: Look around! Teyvat is full of wonderful homes and towers! People built them with clever real-world wisdom!",
      cn: "派蒙说：哇！快看提瓦特的每座建筑！全都有着人类现实世界的智慧呢！"
    },
    architectureCards: [
      {
        nation: "蒙德 · MONDSTADT",
        titleEn: "German Timber & Windmills",
        titleCn: "德式半木桁架与风车水力",
        img: "genshin_interactive_assets/landscapes_real/mondstadt_cathedral.png"
      },
      {
        nation: "璃月 · LIYUE",
        titleEn: "Hui-style Mortise-Tenon",
        titleCn: "徽派飞檐与纯木榫卯结构",
        img: "genshin_interactive_assets/landscapes_real/liyue_wangshu.png"
      },
      {
        nation: "稻妻 · INAZUMA",
        titleEn: "Tenshukaku Castle & Zen",
        titleCn: "天守阁平山城与和风枯山水",
        img: "genshin_interactive_assets/landscapes_real/inazuma_city.png"
      },
      {
        nation: "须弥 · SUMERU",
        titleEn: "Persian Arabesque Domes",
        titleCn: "波斯几何穹顶与参天树居",
        img: "genshin_interactive_assets/landscapes_real/sumeru_palace.png"
      },
      {
        nation: "枫丹 · FONTAINE",
        titleEn: "Beaux-Arts & Aqueducts",
        titleCn: "法式折衷主义歌剧院与水道",
        img: "genshin_interactive_assets/landscapes_real/fontaine_opera.png"
      },
      {
        nation: "纳塔 · NATLAN",
        titleEn: "Mesoamerican Pyramids",
        titleCn: "中美洲阶梯金字塔与圣火台",
        img: "genshin_interactive_assets/landscapes_real/natlan_stadium.png"
      },
      {
        nation: "至冬 · SNEZHNAYA",
        titleEn: "Tsarist Baroque Onion Domes",
        titleCn: "沙俄巴洛克洋葱头冰雪城堡",
        img: "genshin_interactive_assets/landscapes_real/snezhnaya_palace_clean.png"
      },
      {
        nation: "挪德卡莱 · NOD-KRAI",
        titleEn: "Nordic Stave Churches",
        titleCn: "北欧冷杉木板神殿与月影立柱",
        img: "genshin_interactive_assets/landscapes_real/snezhnaya_nordkrai.png"
      }
    ],
    teleprompter: '"Look here! Paimon is guiding our city tour! Did you know every building in Teyvat comes from real history? In Mondstadt, we see tall German windmills catching the fresh wind! In Liyue, wooden houses use clever Chinese mortise and tenon—no nails at all! In Fontaine, huge water bridges look like French palaces! When we play the game, we are traveling across thousands of years of real human architecture! Isn\'t that super cool?"',
    placardNation: "TEYVAT GUIDE",
    placardTitleCn: "提瓦特最好向导 · 派蒙",
    placardTitleEn: "Paimon / The Best Guide in Teyvat",
    localCharImg: "genshin_interactive_assets/characters/paimon_guide_nobg.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/chenyu_yilong.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 11: 文化出海专题 (《神女劈观》戏楼长卷 - 云堇与申鹤) [3:45 - 4:15]
  // 版式：方案② 宽银幕三联长卷 [ 图 | 文 | 图 ] (申鹤在左、云堇在右、居中戏曲悬浮)
  // --------------------------------------------------------------------------
  {
    index: 11,
    id: "divine-damsel",
    layout: "C",
    layoutType: "opera-panorama",
    element: "geo",
    elementName: "文化出海标杆 · CULTURAL EXPORT",
    elementColor: "#f59e0b",
    elementRgb: "245, 158, 11",
    culturePrototype: "国粹非遗: 正统徽班京剧唱腔与西方现代管弦交响跨界熔铸",
    watermark: "OPERA",
    mainTitle: "DIVINE DAMSEL · PEKING OPERA",
    subTitle: "声动四海 · 《神女劈观》跨界破圈绝唱",
    keypoints: [
      {
        en: "National Intangible Peking Opera: Yun Jin sings the heroic story of Shenhe.",
        cn: "中国非物质文化遗产：戏曲名角云堇以婉转唱腔演绎申鹤除魔卫民传奇。"
      },
      {
        en: "Peking Opera Arias with Symphony: Traditional gongs meet grand orchestra.",
        cn: "京剧念白与西洋交响熔铸：传统戏曲声腔打击乐与现代管弦交响跨界融合。"
      },
      {
        en: "A Global Cultural Phenomenon: Millions worldwide embraced Chinese opera.",
        cn: "全球破圈文化现象：让数以千万计的海外年轻玩家领略东方古典戏曲之美。"
      }
    ],
    teleprompter: '"Listen! This is real Chinese Peking Opera! Girl singer Yun Jin sings on stage. She tells how brave Shenhe saved people. Kids around the world watched this video. They said: Wow! Chinese opera is so amazing and cool!"',
    placardNation: "OPERA DIVA",
    placardTitleCn: "和裕茶馆名角 · 云堇",
    placardTitleEn: "Yun Jin Peking Opera Singer",
    localCharImg: "genshin_interactive_assets/characters/yunjin_nobg_vB.png",
    charImgLeft: "genshin_interactive_assets/characters/shenhe_nobg_vB.png",
    charImgRight: "genshin_interactive_assets/characters/yunjin_nobg_vB.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/chenyu_qiaoying.png",
    isCover: false,
    isEnding: false
  },

  // --------------------------------------------------------------------------
  // Slide 12: 结语 (文明之桥 · 携手同行) [4:15 - 4:40]
  // 版式：全景画卷双生悬浮致谢 (Epilogue Panoramic Harmony)
  // --------------------------------------------------------------------------
  {
    index: 12,
    id: "epilogue",
    layout: "epilogue",
    layoutType: "epilogue-harmony",
    element: "celestia",
    elementName: "总结致谢 · EPILOGUE",
    elementColor: "#dfb2ff",
    elementRgb: "223, 178, 255",
    culturePrototype: "第九艺术数字化载体与多元文明跨界互鉴",
    watermark: "HARMONY",
    mainTitle: "A BRIDGE OF CULTURES · TEYVAT HARMONY",
    subTitle: "文明之桥 · 携手同行的跨文化史诗长卷",
    keypoints: [
      {
        en: "Digital Bridge of Civilizations: Video games unite global stories and hearts.",
        cn: "多元文明的数字之桥：让东方美学与世界古典文化在虚拟空间中交响互鉴。"
      },
      {
        en: "Every Culture Shines with Beauty: From Rhine windmills to Chinese mountains.",
        cn: "每一种文明都璀璨生辉：从莱茵风车、华夏山水到北欧极夜，美美与共。"
      },
      {
        en: "Thank You for Traveling Across Teyvat: May your stars guide your bright journey!",
        cn: "衷心感谢老师与各位同学一路相伴！愿大家的旅程永远充满星辰与梦想！"
      }
    ],
    teleprompter: '"See? Games are like a big rainbow bridge! Kids from China, Europe, America, and Japan play together. We share fun stories and become good friends. Thank you all for listening! You are the best!"',
    placardNation: "TRAVELERS",
    placardTitleCn: "双生旅行者 · 荧与空",
    placardTitleEn: "Lumine & Aether / Star Travelers",
    localCharImg: "genshin_interactive_assets/characters/lumine_nobg.png",
    localCharImgBg: "genshin_interactive_assets/characters/aether_nobg.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/liyue_wangshu.png",
    isCover: false,
    isEnding: true
  },

  // --------------------------------------------------------------------------
  // Slide 13: 演讲收官与课外探索 (刻晴展台 · 德国研学视频矩阵) [4:40 - 5:00]
  // 版式：Layout Keqing Vlogs (左侧视频卡片 + 真实二维码 + 刻晴专属展台)
  // --------------------------------------------------------------------------
  {
    index: 13,
    id: "keqing-vlogs",
    layout: "keqing-vlogs",
    layoutType: "keqing-vlogs",
    element: "electro",
    elementName: "收官分享 · REAL ENGLISH",
    elementColor: "#c084fc",
    elementRgb: "192, 132, 252",
    culturePrototype: "跨文化交流: 春晖学子德国研学生活与真实英语对话",
    watermark: "GERMANY",
    mainTitle: "ENGLISH VLOGS IN GERMANY · REAL DIALOGUE",
    subTitle: "实境交流 · 德国游学纪实与口语分享",
    callToActionEn: "Want to hear more spoken English in real life? Scan below to watch!",
    callToActionCn: "还想听朱宇晨讲英文？请看视频",
    keypoints: [
      {
        en: "Explore real German classroom lessons and student exchanges.",
        cn: "走入真实的德国高中课堂，记录沉浸式跨文化教学与交流。"
      },
      {
        en: "Experience warm local host families and wonderful friendships.",
        cn: "体会热情淳朴的当地寄宿家庭生活，收获真挚深厚的跨国友谊。"
      },
      {
        en: "Scan the QR codes below to watch our live English travel vlogs.",
        cn: "扫描下方二维码即可直接在手机端观看朱宇晨的真实英语口语视频。"
      }
    ],
    vlogs: [
      {
        title: "春晖中学交流生在德国的第二天-德式课堂与文化体验-0722",
        url: "https://www.bilibili.com/video/BV1dR3F6RExu/",
        qr: "genshin_interactive_assets/qrcodes/vlog1_qr.png",
        cover: "genshin_interactive_assets/vlogs/vlog1_cover.jpg",
        desc: "Day 2 in Germany: German Classroom & Cultural Workshop"
      },
      {
        title: "春晖中学交流生在德国的第一天-新家庭新环境-0721！",
        url: "https://www.bilibili.com/video/BV1A3g16fEv2/",
        qr: "genshin_interactive_assets/qrcodes/vlog2_qr.png",
        cover: "genshin_interactive_assets/vlogs/vlog2_cover.jpg",
        desc: "Day 1 in Germany: Meeting the Host Family & New Environment"
      },
      {
        title: "春晖中学的德国交换生",
        url: "https://www.bilibili.com/video/BV1aM7k6UEG7/",
        qr: "genshin_interactive_assets/qrcodes/vlog3_qr.png",
        cover: "genshin_interactive_assets/vlogs/vlog3_cover.jpg",
        desc: "Documentary: Cross-Cultural Exchange at Chunhui High School"
      }
    ],
    closingEn: "Thank you for traveling across Teyvat with me! May your journey be filled with stars and abysses.",
    closingSlogan: "Ad astra abyssosque! 向着星辰与深渊！",
    teleprompter: '"Want to hear me speak more English in real life? Look at my travel videos in Germany! Cute German classrooms and happy host families! Scan the QR codes on the screen! Let us watch together! Thank you and goodbye!"',
    placardNation: "YU HENG",
    placardTitleCn: "玉衡星 · 刻晴",
    placardTitleEn: "Keqing / Yuheng of the Liyue Qixing",
    localCharImg: "genshin_interactive_assets/characters/liyue/keqing_nobg_cutout.png",
    localSceneryBg: "genshin_interactive_assets/landscapes_real/chenyu_yilong.png",
    isCover: false,
    isEnding: true
  }
];

const SLIDES_DATA_13 = SLIDES_DATA_12;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { SLIDES_DATA_12, SLIDES_DATA_13 };
}

