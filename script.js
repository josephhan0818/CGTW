const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const langToggle = document.getElementById("langToggle");
const contactForm = document.getElementById("contactForm");
const matchResult = document.getElementById("matchResult");
const heroVideoA = document.getElementById("heroVideoA");
const heroVideoB = document.getElementById("heroVideoB");
const heroVideoPlaceholder = document.getElementById("heroVideoPlaceholder");
const generatedGrid = document.getElementById("generatedGrid");
const interviewPhoto = document.getElementById("interviewPhoto");
const interviewTag = document.getElementById("interviewTag");
const interviewName = document.getElementById("interviewName");
const interviewQuote = document.getElementById("interviewQuote");
const interviewPrev = document.getElementById("interviewPrev");
const interviewNext = document.getElementById("interviewNext");
const interviewCarousel = document.getElementById("interviewCarousel");
const capabilityRadar = document.getElementById("capabilityRadar");
const radarSwitch = document.getElementById("radarSwitch");

let generatedImageFiles = [];
let interviewIndex = 0;
let interviewAutoplayTimer = null;
let heroVideoFiles = [];
let heroVideoIndex = 0;
let heroVideoActiveSlot = 0;
let heroVideoTimer = null;
let radarChart = null;
let selectedUnitIndex = 0;

const capabilityAxes = {
  en: ["Design Innovation", "Manufacturing Scale", "Ecosystem Linkage", "Policy Influence", "Material R&D"],
  zh: ["設計創新", "製造規模", "生態連結", "政策影響", "材料研發"]
};

const capabilityUnits = [
  {
    key: "Better Future Factory",
    scores: [92, 64, 78, 52, 74]
  },
  {
    key: "Holland Circular Hotspot",
    scores: [70, 56, 94, 91, 62]
  },
  {
    key: "Tijn van Orsouw",
    scores: [96, 78, 82, 63, 91]
  }
];

const generatedStories = {
  en: [
    {
      title: "Flowing Material Intelligence",
      body: "A soft macro language that visualizes recycled fibers as premium design resources ready for industrial implementation."
    },
    {
      title: "Pellet-to-Product Transition",
      body: "Shows how feedstock can evolve into manufacturable forms, bridging Taiwan suppliers with European design specifications."
    },
    {
      title: "Human-Centered Circular Workspace",
      body: "Expresses an organic production environment where tactile prototyping, sustainability data, and product aesthetics converge."
    }
  ],
  zh: [
    {
      title: "流動材質洞察",
      body: "以柔和微距語言呈現再生纖維，將廢材轉為可導入產線的高質感設計資源。"
    },
    {
      title: "顆粒到產品的轉譯",
      body: "展示材料顆粒如何轉化為可量產形式，連接臺灣供應能力與歐洲設計規格。"
    },
    {
      title: "以人為本的循環工作場景",
      body: "呈現有機製造環境，讓觸覺打樣、永續數據與產品美學在同一流程中整合。"
    }
  ]
};

const interviewProfiles = {
  en: [
    {
      name: "Better Future Factory",
      tag: "Upcycling / Design",
      quote: "Turning waste streams into meaningful products with measurable circular value.",
      image: "better_future_factory.jpg"
    },
    {
      name: "Holland Circular Hotspot",
      tag: "Policy / Government",
      quote: "Connecting policy, business, and design actors to build a stronger circular ecosystem.",
      image: "Holland_circular_hotspot_freek.jpg"
    },
    {
      name: "Tijn van Orsouw",
      tag: "Industrial Upcycling / Sustainable Product Design",
      quote: "Turning low-value industrial waste into high-value brand assets through intuitive circular design.",
      image: "tijn.jpg"
    }
  ],
  zh: [
    {
      name: "Better Future Factory",
      tag: "升級再造 / 設計",
      quote: "將廢棄物流轉化為具市場價值的循環產品。",
      image: "better_future_factory.jpg"
    },
    {
      name: "Holland Circular Hotspot",
      tag: "政策 / 政府",
      quote: "串連政策、企業與設計社群，打造更強的循環經濟生態系。",
      image: "Holland_circular_hotspot_freek.jpg"
    },
    {
      name: "Tijn van Orsouw",
      tag: "工業廢料升級再造 / 永續產品設計",
      quote: "以直覺且創新的設計語彙，將低價值工業廢料轉化為高附加價值企業資產。",
      image: "tijn.jpg"
    }
  ]
};

let currentLang = "en";

const i18n = {
  en: {
    navCases: "Case Studies",
    navAnalysis: "Capability Analysis",
    navMatching: "Contact",
    navMedia: "Podcast/Media",
    heroEyebrow: "From Taiwan to Europe: A Circular Industry Action Guide",
    heroTitle: "Bridging Taiwan's Manufacturing Power with Europe's Sustainable Design.",
    heroSubtitle:
      "An open-source action guide and matchmaking platform for the circular economy transition.",
    heroVideoHint: "",
    heroVideoEmpty: "1920 × 1080 video slot reserved. Add files to assets/videos and update manifest.json.",
    ctaPrimary: "Explore European Cases",
    ctaSecondary: "Find Taiwan Partners",
    whyTitle: "Why this platform matters",
    missionTitle: "Motivation & Project Objectives",
    missionP1:
      "As global sustainability accelerates, Europe leads in sustainable design. Taiwan has strong materials and design talent, yet lacks a long-term physical exchange platform in Europe, limiting collaboration depth.",
    missionP2:
      "I am deeply passionate about promoting innovative and meaningful ideas. Through my student projects and two years at Dot Design, I realized I want to share Taiwan's strengths with Europe while bringing European sustainability insights closer to Taiwan industries.",
    missionP3:
      "Therefore, I am building an open platform titled Circular Design Action Guide: Taiwan to Europe, helping the public understand sustainable design and discover collaboration-ready resources more efficiently.",
    missionP4:
      "This leads to a 3-month Deep Interview Program with Europe's sustainability design sector as the essential first step of the larger platform roadmap.",
    goalTitle: "Project Goals",
    goalP1:
      "The core goal is to interview outstanding European sustainability professionals and organizations, document their stories, and open a two-way bridge between Europe and Asia's circular industries.",
    goalP2:
      "Website content will be updated in parallel. The first public version is scheduled for December 2026, offering a free preview and pathways for expert matchmaking.",
    insightTitle: "Insight",
    insightDesc: "Deep-dive interviews with Dutch sustainability pioneers.",
    analysisTitle: "Analysis",
    analysisDesc: "Practical roadmap analysis for traditional industries.",
    connectionTitle: "Connection",
    connectionDesc: "Matching Taiwan's recycled materials with EU design needs.",
    dbTitle: "European Case Studies & Capability Analysis",
    dbSubtitle: "Interview targets and ecosystem capabilities",
    moreComing: "More interview units coming soon",
    downloadTitle: "Download Full Guide",
    downloadDesc:
      "Download the Taiwan-Europe Circular Industry Guide PDF to review platform structure, interview scope, and collaboration pathways.",
    downloadBtn: "Download Taiwan-Europe_Circular_Industry_Guide_說明文件.pdf",
    joinTitle: "Join The Platform",
    joinSubtitle:
      "Invite more Taiwan-Europe organizations to join this contact platform and co-create new circular collaboration cases.",
    joinReason1:
      "The platform offers clear capability positioning, case context, and matchmaking direction so new participants can quickly find suitable international partners.",
    joinReason2:
      "For enterprises, joining can accelerate ESG transformation and circular material collaboration. For design and research units, methods can be translated into deployable industrial projects.",
    joinReason3:
      "Every new participant adds another verifiable cross-border collaboration path and expands a stronger Taiwan-Europe circular case library.",
    joinCta: "Apply To Join The Platform",
    card1: "Capability: Turning waste into products.",
    card1Intro: "A design-led pioneer turning circular prototypes into market-ready products.",
    card3: "Capability: Circular economy ecosystem building.",
    card3Intro: "A key ecosystem connector aligning policy, investment, and circular action.",
    card5Tag: "Upcycling / Zero-Waste Proposal",
    card5: "Capability: Turning low-value industrial waste into high-value brand assets.",
    card5Intro:
      "Independent designer based in Arnhem focused on industrial upcycling, enterprise zero-waste proposals, and sustainable product design.",
    fitTitle: "Participation Unit Capability & Positioning Matrix",
    fitSubtitle:
      "Define each participant's core capability and strategic role, then map suitable collaboration unit types.",
    fitPartnerLabel: "Suitable partner unit types:",
    fitCard1Tag: "Design Translation Hub",
    fitCard1Cap: "Capability: Rapidly turns waste streams into desirable, market-ready circular products.",
    fitCard1Pos: "Positioning: Front-end concept and product strategy partner for circular brands.",
    fitCard1P1: "Recycled material suppliers",
    fitCard1P2: "Consumer brand owners",
    fitCard1P3: "Industrial design and prototyping teams",
    fitCard3Tag: "Ecosystem Orchestrator",
    fitCard3Cap: "Capability: Bridges policy, capital, and industry programs to unlock circular collaboration.",
    fitCard3Pos: "Positioning: Ecosystem connector and cross-border collaboration facilitator.",
    fitCard3P1: "Government and public innovation agencies",
    fitCard3P2: "Impact investors and venture studios",
    fitCard3P3: "Industry associations and clusters",
    fitCard5Tag: "Industrial Upcycling Specialist",
    fitCard5Cap: "Capability: Converts low-value industrial leftovers into premium products and brand assets.",
    fitCard5Pos: "Positioning: Independent B2B zero-waste transformation designer for manufacturing enterprises.",
    fitCard5Case:
      "Featured Case: Nedstack PemPark & New Wave transformed old transport crates and production leftovers into a 9-meter wave partition and workspace furniture system.",
    fitCard5Interview:
      "Interview Focus: How to persuade large enterprises to invest in converting industrial by-products into high-value circular assets.",
    fitCard5P1: "Traditional factories and B2B manufacturers seeking ESG transition",
    fitCard5P2: "Brand owners with fixed waste streams such as packaging scraps, offcuts, and downgraded products",
    fitCard5P3: "Innovation teams building in-factory closed-loop systems and high-value green product lines",
    radarTitle: "Pentagon Capability Analysis",
    radarSubtitle: "Interactive radar chart powered by ECharts for dynamic visual comparison.",
    interviewTitle: "Interview Spotlight",
    interviewSubtitle: "Professional profile carousel of interview units and one-line positioning.",
    carouselPrev: "Previous",
    carouselNext: "Next",
    matchTitle: "Contact Us",
    matchSubtitle: "Tell us your collaboration goals and contact request.",
    fieldRole: "Your Name",
    fieldNeed: "Your Email",
    contactSubject: "Email Subject",
    contactMessage: "Request Details",
    contactAddress: "Contact email: josephhan818@gmail.com",
    matchBtn: "Send Email Request",
    matchResult: "After clicking send, your email app will open and draft a message to josephhan818@gmail.com.",
    mediaTitle: "Podcast & Articles",
    podcastTitle: "Ep.1: Secrets of Blue City Rotterdam.",
    articleTitle: "Opinion: How Taiwan's SMEs can meet EU's 2030 ESG Standards.",
    readArticle: "Read Article",
    footerSupport: "Supported by: Youth 10 Billion Overseas Dream Fund (Proposed).",
    footerContact: "Contact",
    footerAuthor: "About the Author (Joseph Han)",
    footerPolicy: "Open Data Policy"
  },
  zh: {
    navCases: "案例資料庫",
    navAnalysis: "能力分析",
    navMatching: "聯絡我們",
    navMedia: "Podcast / 媒體",
    heroEyebrow: "從臺灣到歐洲：循環產業行動指南",
    heroTitle: "串接臺灣製造實力與歐洲永續設計。",
    heroSubtitle: "一個開源行動指南與媒合平台，加速循環經濟轉型。",
    heroVideoHint: "",
    heroVideoEmpty: "已預留 1920 × 1080 影片區塊，請將影片放入 assets/videos 並更新 manifest.json。",
    ctaPrimary: "探索歐洲案例",
    ctaSecondary: "尋找臺灣夥伴",
    whyTitle: "為何需要這個平台",
    missionTitle: "動機與計劃目標",
    missionP1:
      "全球永續轉型浪潮下，歐洲為永續設計領航者。台灣擁有卓越的永續材料與設計力，卻缺乏一個實體、長期的歐洲交流平台，導致商機與合作多為短期，難以深化。",
    missionP2:
      "我一直以來都對於推廣創新且有益的事物有巨大的熱忱。如今在工作期間，我意識到自己希望將台灣的好東西跟歐洲分享，也希望歐洲永續領域的資訊能更無礙地與台灣產業交流。",
    missionP3:
      "因此，我打算製作一個「從台灣到歐洲：循環產業指南」的網路公開資訊平台，讓大眾更認識永續設計領域，也更容易找到可以合作對應的資源。",
    missionP4:
      "我構思了為期三個月的「歐洲永續設計產業深度訪談企劃」，希望藉由補助計畫推動企劃不可或缺的第一步。",
    goalTitle: "計劃目標",
    goalP1:
      "本企劃將約訪優秀的歐洲永續產業專家，透過永續設計師與資源單位訪談，記錄其故事於平台曝光，提供歐亞循環產業雙向交流管道。",
    goalP2:
      "同步更新網站資料，預計於 2026 年 12 月推出第一版公開資訊網頁，提供大眾免費預覽與專家媒合機會。",
    insightTitle: "洞察",
    insightDesc: "深度訪談荷蘭永續先行者。",
    analysisTitle: "分析",
    analysisDesc: "為傳統產業提供可落地的轉型路徑。",
    connectionTitle: "連結",
    connectionDesc: "媒合臺灣再生材料與歐洲設計需求。",
    dbTitle: "歐洲案例研究與能力分析",
    dbSubtitle: "訪談對象與生態系能力地圖",
    moreComing: "持續新增更多",
    downloadTitle: "下載完整說明文件",
    downloadDesc: "下載 Taiwan-Europe Circular Industry Guide 說明文件，快速掌握平台架構、訪談範圍與合作流程。",
    downloadBtn: "下載 Taiwan-Europe_Circular_Industry_Guide_說明文件.pdf",
    joinTitle: "加入平台邀請",
    joinSubtitle: "邀請更多台歐單位加入聯繫平台，持續形成跨領域合作案例與實踐網絡。",
    joinReason1: "平台提供明確的能力定位、案例脈絡與媒合方向，協助新加入單位快速找到合適的國際合作夥伴。",
    joinReason2:
      "對企業端而言可加速 ESG 與循環材料轉型；對設計與研究單位而言，可把方法論轉化為可落地的產業合作案。",
    joinReason3: "每新增一個參與者，就多建立一條可驗證的跨境合作路徑，持續擴充台歐循環產業案例庫。",
    joinCta: "申請加入聯繫平台",
    card1: "能力：將廢棄物轉化為產品。",
    card1Intro: "設計導向的先行者，將循環原型轉化為可進入市場的產品。",
    card3: "能力：建構循環經濟生態系。",
    card3Intro: "關鍵生態系節點，協調政策、投資與產業落地合作。",
    card5Tag: "工業廢料升級再造 / 企業零廢棄提案",
    card5: "能力：將低價值工業垃圾轉化為高附加價值的企業品牌資產。",
    card5Intro:
      "來自荷蘭阿納姆的獨立設計師，專注工業廢料升級再造、企業零廢棄轉型與永續產品設計敘事。",
    fitTitle: "參與單位能力與定位分析矩陣",
    fitSubtitle: "為每個參與單位定義核心能力與策略定位，並對應可優先合作的單位類型。",
    fitPartnerLabel: "適合合作的單位類型：",
    fitCard1Tag: "設計轉譯樞紐",
    fitCard1Cap: "能力：可快速將廢棄物流轉化為具市場吸引力的循環產品。",
    fitCard1Pos: "定位：擔任循環品牌的前端概念與產品策略合作夥伴。",
    fitCard1P1: "再生材料供應商",
    fitCard1P2: "消費品牌端業主",
    fitCard1P3: "工業設計與打樣團隊",
    fitCard3Tag: "生態系協作推動者",
    fitCard3Cap: "能力：可串接政策、資金與產業計畫，啟動循環合作機會。",
    fitCard3Pos: "定位：生態系連結者與跨國合作促成平台。",
    fitCard3P1: "政府與公共創新推動單位",
    fitCard3P2: "影響力投資機構與創業孵化單位",
    fitCard3P3: "產業公協會與聚落平台",
    fitCard5Tag: "工業升級再造設計專家",
    fitCard5Cap: "能力：把低價值工業邊角料、包材與次級品轉為高價值產品與品牌資產。",
    fitCard5Pos: "定位：大型製造業與 B2B 企業的零廢棄設計轉型顧問與執行夥伴。",
    fitCard5Case:
      "代表案例：Nedstack 的 PemPark 與 New Wave 計畫，將舊木箱與生產餘料重組為 9 公尺波浪隔間牆與交流家具系統。",
    fitCard5Interview:
      "訪談焦點：工業廢料的極致轉化，如何讓企業願意投資把副產品升級成商業價值與永續資產。",
    fitCard5P1: "尋求 ESG 轉型的傳統工廠與 B2B 製造企業",
    fitCard5P2: "具固定廢料流（包裝材、邊角料、次級品）的品牌與製造端",
    fitCard5P3: "希望在廠內建立微型閉環系統與高單價綠色商品線的創新團隊",
    radarTitle: "五角形能力分析圖",
    radarSubtitle: "採用 ECharts 製作可互動的動態雷達圖，快速比較各單位能力輪廓。",
    interviewTitle: "受訪單位焦點輪播",
    interviewSubtitle: "以專業形象照與一句話定位，快速理解各受訪單位價值。",
    carouselPrev: "上一位",
    carouselNext: "下一位",
    matchTitle: "聯絡我們",
    matchSubtitle: "告訴我們你的合作需求與聯繫內容。",
    fieldRole: "你的姓名",
    fieldNeed: "你的 Email",
    contactSubject: "信件主旨",
    contactMessage: "需求內容",
    contactAddress: "聯絡信箱：josephhan818@gmail.com",
    matchBtn: "寄出聯繫需求",
    matchResult: "按下寄出後，將開啟你的信箱程式並自動建立寄給 josephhan818@gmail.com 的草稿信。",
    mediaTitle: "Podcast 與文章",
    podcastTitle: "第 1 集：藍色城市鹿特丹的關鍵祕密。",
    articleTitle: "觀點：臺灣中小企業如何對接歐盟 2030 ESG 標準。",
    readArticle: "閱讀文章",
    footerSupport: "支持單位：青年百億海外圓夢基金（提案中）。",
    footerContact: "聯絡我們",
    footerAuthor: "關於作者（韓松庭）",
    footerPolicy: "開放資料政策"
  }
};

const applyLanguage = (lang) => {
  document.documentElement.lang = lang === "en" ? "en" : "zh-Hant";
  const dict = i18n[lang];
  document.querySelectorAll("[data-i18n]").forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) {
      node.textContent = dict[key];
    }
  });
  langToggle.textContent = lang === "en" ? "EN / ZH-TW" : "ZH-TW / EN";
  renderGeneratedGallery(lang);
  renderInterviewProfile(lang, interviewIndex);
  renderCapabilityRadar(lang, selectedUnitIndex);
};

const setRadarSwitchState = (index) => {
  if (!radarSwitch) {
    return;
  }

  const buttons = radarSwitch.querySelectorAll(".fit-switch-btn");
  buttons.forEach((button) => {
    const buttonIndex = Number(button.dataset.unitIndex);
    button.classList.toggle("is-active", buttonIndex === index);
  });
};

const renderCapabilityRadar = (lang, index = 0) => {
  if (!capabilityRadar || !window.echarts || !capabilityUnits.length) {
    return;
  }

  const safeIndex = (index + capabilityUnits.length) % capabilityUnits.length;
  selectedUnitIndex = safeIndex;
  const unit = capabilityUnits[safeIndex];
  const axisLabels = capabilityAxes[lang] || capabilityAxes.en;

  if (!radarChart) {
    radarChart = window.echarts.init(capabilityRadar);
  }

  const option = {
    animationDuration: 850,
    animationEasing: "quarticOut",
    textStyle: {
      fontFamily: "Noto Sans TC, Segoe UI, sans-serif"
    },
    tooltip: {
      trigger: "item"
    },
    radar: {
      shape: "polygon",
      radius: "66%",
      splitNumber: 5,
      axisName: {
        color: "#1e1e26",
        fontSize: 12,
        fontWeight: 700
      },
      splitArea: {
        areaStyle: {
          color: [
            "rgba(184, 149, 90, 0.04)",
            "rgba(184, 149, 90, 0.08)",
            "rgba(184, 149, 90, 0.12)",
            "rgba(184, 149, 90, 0.16)",
            "rgba(184, 149, 90, 0.2)"
          ]
        }
      },
      splitLine: {
        lineStyle: {
          color: "rgba(40, 40, 48, 0.2)"
        }
      },
      axisLine: {
        lineStyle: {
          color: "rgba(40, 40, 48, 0.32)"
        }
      },
      indicator: axisLabels.map((name) => ({
        name,
        max: 100
      }))
    },
    series: [
      {
        type: "radar",
        symbol: "circle",
        symbolSize: 7,
        lineStyle: {
          width: 2.4,
          color: "#15151d"
        },
        itemStyle: {
          color: "#b8955a",
          borderWidth: 1,
          borderColor: "#1f1f27"
        },
        areaStyle: {
          color: "rgba(184, 149, 90, 0.35)"
        },
        emphasis: {
          lineStyle: {
            width: 3
          }
        },
        data: [
          {
            value: unit.scores,
            name: unit.key
          }
        ]
      }
    ]
  };

  radarChart.setOption(option, true);
  setRadarSwitchState(safeIndex);
};

const renderInterviewProfile = (lang, index, withTransition = true) => {
  if (!interviewPhoto || !interviewTag || !interviewName || !interviewQuote) {
    return;
  }

  const list = interviewProfiles[lang] || interviewProfiles.en;
  if (!Array.isArray(list) || !list.length) {
    return;
  }

  const safeIndex = (index + list.length) % list.length;
  const applyProfile = () => {
    interviewIndex = safeIndex;
    const profile = list[safeIndex];
    interviewPhoto.src = `./assets/images/${profile.image}`;
    interviewPhoto.alt = profile.name;
    interviewTag.textContent = profile.tag;
    interviewName.textContent = profile.name;
    interviewQuote.textContent = profile.quote;
  };

  if (!withTransition || !interviewCarousel) {
    applyProfile();
    return;
  }

  interviewCarousel.classList.add("is-changing");
  window.setTimeout(() => {
    applyProfile();
    interviewCarousel.classList.remove("is-changing");
  }, 380);
};

const renderGeneratedGallery = (lang) => {
  if (!generatedGrid) {
    return;
  }

  const files = generatedImageFiles.slice(0, 3);
  if (!files.length) {
    generatedGrid.innerHTML = "";
    return;
  }

  const stories = generatedStories[lang] || generatedStories.en;
  generatedGrid.innerHTML = files
    .map((file, index) => {
      const story = stories[index] || stories[stories.length - 1];
      return `
        <article class="generated-card card-tilt">
          <figure>
            <img src="./assets/images/${file}" alt="${story.title}" loading="lazy" />
          </figure>
          <div class="generated-copy">
            <h3>${story.title}</h3>
            <p>${story.body}</p>
          </div>
        </article>
      `;
    })
    .join("");

};

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

const tactileTargets = Array.from(document.querySelectorAll(".btn, .lang-toggle"));

const applyMagnetic = (element) => {
  element.addEventListener("pointermove", (event) => {
    const rect = element.getBoundingClientRect();
    const offsetX = (event.clientX - rect.left - rect.width / 2) / rect.width;
    const offsetY = (event.clientY - rect.top - rect.height / 2) / rect.height;
    element.style.transform = `translate(${offsetX * 9}px, ${offsetY * 7}px)`;
  });

  element.addEventListener("pointerleave", () => {
    element.style.transform = "";
  });

  element.addEventListener("pointerdown", () => {
    element.classList.add("is-pressed");
  });

  const release = () => element.classList.remove("is-pressed");
  element.addEventListener("pointerup", release);
  element.addEventListener("pointercancel", release);

  element.addEventListener("click", (event) => {
    const rect = element.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    element.style.setProperty("--rx", `${x}%`);
    element.style.setProperty("--ry", `${y}%`);
    element.classList.remove("ripple");
    window.requestAnimationFrame(() => element.classList.add("ripple"));
    window.setTimeout(() => element.classList.remove("ripple"), 620);
  });
};

tactileTargets.forEach(applyMagnetic);

window.addEventListener("pointermove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.body.style.setProperty("--mx", `${x}%`);
  document.body.style.setProperty("--my", `${y}%`);
});

langToggle.addEventListener("click", () => {
  currentLang = currentLang === "en" ? "zh" : "en";
  applyLanguage(currentLang);
});

if (interviewPrev && interviewNext) {
  interviewPrev.addEventListener("click", () => {
    renderInterviewProfile(currentLang, interviewIndex - 1, true);
    restartInterviewAutoplay();
  });

  interviewNext.addEventListener("click", () => {
    renderInterviewProfile(currentLang, interviewIndex + 1, true);
    restartInterviewAutoplay();
  });
}

if (radarSwitch) {
  radarSwitch.addEventListener("click", (event) => {
    const button = event.target.closest(".fit-switch-btn");
    if (!button) {
      return;
    }

    const nextIndex = Number(button.dataset.unitIndex);
    if (Number.isNaN(nextIndex)) {
      return;
    }

    renderCapabilityRadar(currentLang, nextIndex);
  });
}

window.addEventListener("resize", () => {
  if (radarChart) {
    radarChart.resize();
  }
});

const restartInterviewAutoplay = () => {
  if (interviewAutoplayTimer) {
    window.clearInterval(interviewAutoplayTimer);
  }
  interviewAutoplayTimer = window.setInterval(() => {
    renderInterviewProfile(currentLang, interviewIndex + 1, true);
  }, 7600);
};

const playHeroVideo = (index) => {
  if (!heroVideoA || !heroVideoB || !heroVideoFiles.length) {
    return;
  }

  const videos = [heroVideoA, heroVideoB];
  const nextSlot = heroVideoActiveSlot === 0 ? 1 : 0;
  const activeVideo = videos[heroVideoActiveSlot];
  const nextVideo = videos[nextSlot];
  const safeIndex = (index + heroVideoFiles.length) % heroVideoFiles.length;
  const source = `./assets/videos/${heroVideoFiles[safeIndex]}`;

  heroVideoIndex = safeIndex;
  nextVideo.src = source;
  nextVideo.load();

  const reveal = () => {
    nextVideo.classList.add("active");
    activeVideo.classList.remove("active");
    heroVideoActiveSlot = nextSlot;
    nextVideo.play().catch(() => {});
  };

  if (nextVideo.readyState >= 2) {
    reveal();
    return;
  }

  nextVideo.oncanplay = () => {
    nextVideo.oncanplay = null;
    reveal();
  };
};

const startHeroVideoAutoplay = () => {
  if (heroVideoTimer) {
    window.clearInterval(heroVideoTimer);
  }
  heroVideoTimer = window.setInterval(() => {
    playHeroVideo(heroVideoIndex + 1);
  }, 9000);
};

if (contactForm && matchResult) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("contactName")?.value.trim() || "";
    const email = document.getElementById("contactEmail")?.value.trim() || "";
    const subject = document.getElementById("contactSubject")?.value.trim() || "";
    const message = document.getElementById("contactMessage")?.value.trim() || "";

    if (!name || !email || !subject || !message) {
      matchResult.textContent =
        currentLang === "en"
          ? "Please complete all required fields before sending."
          : "請先完整填寫所有欄位再送出。";
      return;
    }

    const mailSubject = encodeURIComponent(`[Platform Contact] ${subject}`);
    const mailBody = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nRequest Details:\n${message}`
    );

    window.location.href = `mailto:josephhan818@gmail.com?subject=${mailSubject}&body=${mailBody}`;

    matchResult.textContent =
      currentLang === "en"
        ? "Draft email opened. If your email app did not open, please send manually to josephhan818@gmail.com."
        : "已嘗試開啟信件草稿；若未自動開啟，請手動寄送至 josephhan818@gmail.com。";
  });
}

const loadMediaSources = async () => {
  try {
    const [imageManifestRes, videoManifestRes] = await Promise.all([
      fetch("./assets/images/manifest.json", { cache: "no-cache" }).catch(() => null),
      fetch("./assets/videos/manifest.json", { cache: "no-cache" }).catch(() => null)
    ]);

    if (imageManifestRes?.ok) {
      const imageManifest = await imageManifestRes.json();
      generatedImageFiles =
        (Array.isArray(imageManifest?.latest) && imageManifest.latest.length
          ? imageManifest.latest
          : Array.isArray(imageManifest?.files)
            ? imageManifest.files
            : []) || [];
    }

    if (videoManifestRes?.ok) {
      const videoManifest = await videoManifestRes.json();
      heroVideoFiles =
        (Array.isArray(videoManifest?.latest) && videoManifest.latest.length
          ? videoManifest.latest
          : Array.isArray(videoManifest?.files)
            ? videoManifest.files
            : []) || [];
    }

    if (heroVideoFiles.length && heroVideoA && heroVideoB) {
      if (heroVideoPlaceholder) {
        heroVideoPlaceholder.style.display = "none";
      }
      heroVideoA.src = `./assets/videos/${heroVideoFiles[0]}`;
      heroVideoA.classList.add("active");
      heroVideoA.load();
      heroVideoA.play().catch(() => {});
      heroVideoIndex = 0;
      startHeroVideoAutoplay();
    } else if (heroVideoPlaceholder) {
      heroVideoPlaceholder.style.display = "grid";
    }

    renderGeneratedGallery(currentLang);
  } catch (error) {
    console.warn("Banner manifest not available, using placeholder.", error?.message);
    renderGeneratedGallery(currentLang);
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
  applyLanguage(currentLang);
  loadMediaSources();
  renderInterviewProfile(currentLang, interviewIndex, false);
  renderCapabilityRadar(currentLang, selectedUnitIndex);
  restartInterviewAutoplay();
});
