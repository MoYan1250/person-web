export type PaperBlurb = {
  zh: string;
  en: string;
};

export const PAPER_BLURBS: Record<string, PaperBlurb> = {
  nakamoto2008bitcoin: {
    zh: "提出不需中心機構的點對點電子現金：工作量證明、最長鏈共識，以及可操作的防雙花機制。",
    en: "Peer-to-peer electronic cash without a trusted party: proof-of-work, longest-chain consensus, and a workable defence against double-spending.",
  },
  szabo1996smartcontracts: {
    zh: "把合約寫成可自動執行的協定，用密碼學與協定設計降低對中介與事後強制的依賴。",
    en: "Casts contracts as self-executing protocols, using cryptography and protocol design to cut reliance on intermediaries.",
  },
  vaswani2017attention: {
    zh: "用自注意力取代遞迴與卷積，提出 Transformer，成為後來大型語言模型的骨幹。",
    en: "Replaces recurrence and convolution with self-attention. The Transformer became the backbone of later large language models.",
  },
  wang2025decoy: {
    zh: "把 CS:GO 離散成資料驅動的模擬環境，方便做戰略層的多智能體規劃實驗。",
    en: "A data-driven, discretized CS:GO simulator for strategic multi-agent planning rather than raw pixel control.",
  },
  pearce2022counterstrike: {
    zh: "用大規模行為克隆在 CS 死鬥中學出可玩的瞄準與移動，顯示純模仿在快節奏射擊裡能走多遠。",
    en: "Large-scale behavioural cloning for CS deathmatch: how far imitation alone can go on aim and movement in a fast FPS.",
  },
  durst2024csmove: {
    zh: "從職業對局學出類人移動軌跡，讓 bot 的走位更接近職業選手而不是規則巡邏。",
    en: "Learns human-like CS movement from pro demos so bots path more like players than scripted patrols.",
  },
  justesen2025humanlikebots: {
    zh: "用計算便宜的感測特徵訓練戰術射擊 bot，在像人與省算力之間做取捨。",
    en: "Tactical-shooter bots trained from cheap sensor features, trading some fidelity for compute-efficient human-likeness.",
  },
  xenopoulos2020valuing: {
    zh: "把足球 VAEP 搬到 CS:GO：估計每個動作對回合勝率的貢獻，用來量化選手決策。",
    en: "Ports football-style VAEP to CS:GO: each action’s contribution to round win probability, as a way to value decisions.",
  },
  xenopoulos2021economy: {
    zh: "把買槍、存錢、強起等經濟選擇做成最佳化問題，分析隊伍何時該賭經濟。",
    en: "Treats buy / save / force-buy as an optimisation problem: when a side should gamble the economy.",
  },
  xenopoulos2022esta: {
    zh: "公開電競軌跡與動作資料集，讓走位、瞄準與回合事件可以一起做量化分析。",
    en: "A public esports trajectory-and-action dataset so movement, aim, and round events can be studied together.",
  },
  xenopoulos2022proam: {
    zh: "用勝率模型對比職業與業餘對局，指出差距不只在準度，也在時機與資訊處理。",
    en: "Win-probability models comparing pro and amateur play: the gap is timing and information use, not only aim.",
  },
  xenopoulos2022ggviz: {
    zh: "加速大規模電競對局視覺化與分析，讓 demo 級資料能被較快地瀏覽與對照。",
    en: "Speeds up large-scale esports demo visualisation so match data can be browsed and compared without a full replay stack.",
  },
  xenopoulos2023thesis: {
    zh: "電競資料探勘學位論文：把勝率、經濟、軌跡與視覺化收成一套分析框架。",
    en: "Doctoral thesis on esports mining: win probability, economy, trajectories, and visualisation in one analysis stack.",
  },
  berner2019dota: {
    zh: "OpenAI Five：大規模自我對弈把 Dota 2 打到擊敗職業隊，展示長時程、不完美資訊下的團隊 RL。",
    en: "OpenAI Five: large-scale self-play reaches pro-beating Dota 2, a landmark for long-horizon, imperfect-information team RL.",
  },
  vinyals2019alphastar: {
    zh: "AlphaStar 在星海爭霸 II 達到宗師水準，結合聯盟訓練、模仿學習與多智能體 RL。",
    en: "AlphaStar reaches Grandmaster in StarCraft II by combining league training, imitation, and multi-agent RL.",
  },
  jaderberg2019ftw: {
    zh: "在 3D 多人遊戲 Capture the Flag 上，族群訓練打出人類水準的團隊合作與對戰。",
    en: "Population-based RL reaches human-level team play in 3D Capture the Flag, with cooperation emerging from the league.",
  },
  baker2020emergent: {
    zh: "躲貓貓自我對弈中湧現出工具使用與反制，展示開放式多智能體課程能長出策略。",
    en: "Hide-and-seek self-play yields emergent tool use and counter-strategies: an autocurriculum for multi-agent skill growth.",
  },
  ye2020juewu: {
    zh: "騰訊絕悟：用深度 RL 打完整場 MOBA，把宏觀運營與微操放進同一套訓練管線。",
    en: "Tencent JueWu plays full MOBA matches with deep RL, putting macro play and micro control in one training pipeline.",
  },
  ye2020supervised: {
    zh: "在王者榮耀上顯示：大規模監督模仿就能達到接近人類高手的對局水準。",
    en: "On Honor of Kings, large-scale supervised imitation already reaches near-expert MOBA play.",
  },
  wurman2022gt: {
    zh: "GT Sophy 在《Gran Turismo》中擊敗人類冠軍車手，把賽車控制推到超人類水準。",
    en: "GT Sophy outruns champion Gran Turismo drivers, pushing racing control past the human frontier.",
  },
  oel2021xland: {
    zh: "XLand 開放式學習：在程序生成任務分佈上訓練，得到較能遷移的一般能力智能體。",
    en: "Open-ended learning in XLand: training on a procedural task distribution yields more generally capable agents.",
  },
  shao2019survey: {
    zh: "回顧遊戲裡的深度強化學習：從 Atari 到即時戰略，整理方法、環境與未解問題。",
    en: "Survey of deep RL in video games, from Atari to RTS: methods, environments, and open problems.",
  },
  marlvideogames2025review: {
    zh: "綜述遊戲中的多智能體強化學習：合作、競爭、電競與評測缺口。",
    en: "Review of MARL in video games: cooperation, competition, esports settings, and evaluation gaps.",
  },
  hausknecht2015drqn: {
    zh: "把 LSTM 接進 DQN，讓 Q 學習能處理需要記憶的部分可觀測任務。",
    en: "Recurrent DQN: an LSTM on top of DQN so Q-learning can hold memory in partially observable tasks.",
  },
  kempka2016vizdoom: {
    zh: "以 Doom 為基底的視覺 RL 平台，成為第一人稱、部分可觀測控制的常用環境。",
    en: "A Doom-based visual RL platform that became a standard for first-person, partially observable control.",
  },
  hegde2021agentslisten: {
    zh: "把聽覺與其他感官併入高吞吐 RL，說明多模態輸入如何改變射擊／迷宮類策略。",
    en: "High-throughput RL with hearing and other senses: how extra modalities change shooter / maze policies.",
  },
  ellis2022smacv2: {
    zh: "SMACv2 提高隨機性與多樣性，修正原版 SMAC 容易被記住地圖的評測漏洞。",
    en: "SMACv2 raises stochasticity and diversity so agents cannot just memorise the original SMAC maps.",
  },
  samvelyan2019smac: {
    zh: "星海微操多智能體挑戰：分散執行、集中訓練的合作 MARL 基準，帶起 QMIX 一代方法。",
    en: "The StarCraft micromanagement challenge: a CTDE cooperative MARL benchmark that defined the QMIX generation.",
  },
  phan2023aerial: {
    zh: "用注意力式記憶處理隨機部分可觀測的 MARL，讓智能體在噪音觀測下仍能協調。",
    en: "Attention-based recurrence for MARL under stochastic partial observability, so agents can still coordinate on noisy views.",
  },
  igl2018dvrl: {
    zh: "用變分推斷學信念狀態，再在 POMDP 上做深度 RL，把表徵與控制一起訓練。",
    en: "Variational belief states plus deep RL for POMDPs: representation and control trained together.",
  },
  humanlikeagents2025: {
    zh: "盤點虛擬遊戲裡「像人」智能體的難題：評測、風格、可玩性，而不只是勝率。",
    en: "A tour of what “human-like” game agents still get wrong: evaluation, style, and playability beyond win rate.",
  },
  aitchison2022deceive: {
    zh: "在隱藏身份遊戲中學習欺騙：何時說謊、如何維持一致謊言，而不只是最大化即時獎勵。",
    en: "Learns deception in hidden-role games: when to lie and how to keep a story consistent, not just maximise instant reward.",
  },
  bansal2018emergent: {
    zh: "對抗自我對弈讓技能不斷升級，展示競爭本身可以當課程，長出複雜運動與策略。",
    en: "Competitive self-play as a curriculum: skills keep escalating, and complex motor / tactical behaviour emerges.",
  },
  mareddy2025deceptive: {
    zh: "在不對稱資訊的雙人對抗裡學習欺敵策略，把誤導當成可優化的行為而非腳本。",
    en: "Learns deceptive play in an asymmetric two-player game, treating misdirection as an optimisable policy.",
  },
  bontrager2019superstition: {
    zh: "指出深度 RL 會在欺敵遊戲裡學到「迷信」：把噪音相關當成因，策略因此發脆。",
    en: "Shows deep RL picking up superstitions in deceptive games: spurious correlations that make policies brittle.",
  },
  gleave2020adversarial: {
    zh: "對抗策略：專門訓練來擊敗固定受害者策略，即使受害者在對正常人時很強。",
    en: "Adversarial policies: attackers trained to beat a fixed victim even when that victim is strong against ordinary opponents.",
  },
  guo2021adversarialpolicy: {
    zh: "在雙人競爭遊戲裡學對抗策略，系統化地找對方策略的漏洞。",
    en: "Adversarial policy learning in two-player competitive games, hunting holes in the opponent’s policy.",
  },
  hao2025mdpl: {
    zh: "在既合作又競爭的多智能體裡研究行為層欺騙，而不只是通訊通道上的說謊。",
    en: "Behavioral deception in mixed cooperative–competitive MARL, not only lying over an explicit channel.",
  },
  albrecht2018modelling: {
    zh: "綜述「為其他智能體建模」：類型、方法與未解問題，是後來心智理論工作的地圖。",
    en: "Survey of modelling other agents: taxonomies, methods, and open problems that later theory-of-mind work sits on.",
  },
  rabinowitz2018tomnet: {
    zh: "ToMnet：從觀察行為中推論其他智能體的目標與信念，展示可學習的機器心智理論。",
    en: "ToMnet infers others’ goals and beliefs from observed behaviour: a learnable machine theory of mind.",
  },
  oguntola2023tom: {
    zh: "把心智理論當內在動機，鼓勵 MARL 智能體去預測同伴，從而改善合作。",
    en: "Treats theory of mind as intrinsic motivation so MARL agents get rewarded for predicting teammates.",
  },
  wang2020roma: {
    zh: "ROMA：讓角色在訓練中湧現，用角色條件化策略來分解合作任務。",
    en: "ROMA: roles emerge during training and condition policies, decomposing cooperative tasks without hand-set jobs.",
  },
  wang2021rode: {
    zh: "RODE：先學角色再把任務拆開，讓不同角色專注不同子任務與動作子集。",
    en: "RODE learns roles first, then assigns subtasks and action subsets so agents specialise instead of sharing one blob policy.",
  },
  rashid2020qmix: {
    zh: "QMIX：用單調混合網路把局部 Q 合成全局 Q，成為合作 MARL 價值分解的標準作法。",
    en: "QMIX mixes local Q-values into a global Q with a monotonic mixer — the default value-factorisation recipe for cooperative MARL.",
  },
  sunehag2017vdn: {
    zh: "VDN：把團隊 Q 直接加成各個智能體的 Q，是後來 QMIX 等分解方法的起點。",
    en: "Value-decomposition networks: the team Q is a sum of per-agent Qs, the starting point for later mixers such as QMIX.",
  },
  foerster2018coma: {
    zh: "COMA：用反事實基線解決多智能體策略梯度的歸功問題，讓每個智能體看清自己的貢獻。",
    en: "COMA uses a counterfactual baseline so multi-agent policy gradients can credit each agent’s own contribution.",
  },
  yu2022mappo: {
    zh: "MAPPO：把 PPO 認真調參後，在合作 MARL 上常能打平或超過複雜 off-policy 方法。",
    en: "MAPPO: well-tuned PPO is surprisingly strong in cooperative MARL, often matching heavier off-policy algorithms.",
  },
  lowe2017maddpg: {
    zh: "MADDPG：集中式評論家、分散式演員，讓混合合作—競爭環境也能用 Actor-Critic。",
    en: "MADDPG: centralised critics, decentralised actors — actor–critic for mixed cooperative–competitive environments.",
  },
  mahajan2019maven: {
    zh: "MAVEN：用潛在變數驅動探索，改善價值分解方法容易過早收斂的問題。",
    en: "MAVEN uses latent-variable exploration so value-decomposition agents do not collapse to one brittle joint policy.",
  },
  r3dm2025: {
    zh: "用動態模型發現角色並保持多樣性，讓 MARL 不只有一個「大家都會的」策略。",
    en: "Discovers roles from dynamics models and keeps them diverse, so MARL does not collapse onto one shared trick.",
  },
  wang2021qplex: {
    zh: "QPLEX：雙路對決結構做價值分解，表達能力比單調混合更強，同時仍可分散執行。",
    en: "QPLEX factorises value with a duplex dueling structure: more expressive than monotonic mixing, still decentralised at execution.",
  },
  zhu2024commsurvey: {
    zh: "綜述帶通訊的 MADRL：學什麼時候說、對誰說、說什麼，以及頻寬與語意問題。",
    en: "Survey of communicative MADRL: when to speak, to whom, what to say, plus bandwidth and meaning.",
  },
  foerster2016dial: {
    zh: "DIAL：把通訊當可微通道，讓深度 MARL 端到端學會協議，而不靠預先定義語言。",
    en: "DIAL treats communication as a differentiable channel so deep MARL can learn a protocol end-to-end.",
  },
  sukhbaatar2016commnet: {
    zh: "CommNet：用連續通訊向量做多智能體協調，溝通可隨反向傳播一起學。",
    en: "CommNet coordinates agents with continuous communication vectors trained by backpropagation.",
  },
  das2019tarmac: {
    zh: "TarMAC：用注意力選擇對誰說話，避免廣播式通訊在人數變多時崩潰。",
    en: "TarMAC uses attention to pick whom to address, so communication does not stay a brittle all-to-all broadcast.",
  },
  wang2020ibcomm: {
    zh: "用資訊瓶頸壓通訊量，逼智能體只傳任務真正需要的位元。",
    en: "An information-bottleneck on messages so agents transmit only bits the task actually needs.",
  },
  hu2020eventtriggered: {
    zh: "事件觸發通訊：只在需要時發話，適應有限頻寬，而不是每個時間步都廣播。",
    en: "Event-triggered communication: speak only when needed, matching limited-bandwidth MARL instead of per-step broadcasts.",
  },
  jaques2019social: {
    zh: "把「影響其他智能體」當內在獎勵，誘導出有用的溝通與社會行為。",
    en: "Social influence as intrinsic reward: agents are rewarded for affecting others, which induces useful communication.",
  },
  baker2022vpt: {
    zh: "VPT：從大量未標註 Minecraft 影片做行為預訓練，再微調出能完成長任務的智能體。",
    en: "VPT: behavioural pretraining from unlabelled Minecraft videos, then finetuning into long-horizon agents.",
  },
  mathieu2023unplugged: {
    zh: "AlphaStar Unplugged：用離線 RL 在星海資料上訓練，不必再跑昂貴的線上自我對弈。",
    en: "AlphaStar Unplugged: offline RL on StarCraft data, avoiding another round of huge online self-play.",
  },
  hester2018dqfd: {
    zh: "DQfD：把示範混進 DQN 回放，大幅減少從零試錯的樣本需求。",
    en: "Deep Q-learning from demonstrations: demo data in the replay buffer cuts the cost of learning from scratch.",
  },
  ross2011dagger: {
    zh: "DAgger：反覆把學習者狀態丟回專家標註，緩解模仿學習的複合誤差。",
    en: "DAgger: query the expert on states the learner actually visits, reducing compounding error in imitation.",
  },
  ho2016gail: {
    zh: "GAIL：用對抗訓練從示範學策略，不必先還原獎勵函數。",
    en: "Generative adversarial imitation: learn a policy from demos without first recovering a reward function.",
  },
  semisupervisedreward2020: {
    zh: "離線 RL 裡用半監督方式學獎勵，減少對昂貴標註回報的依賴。",
    en: "Semi-supervised reward learning for offline RL, so labelled returns are no longer the whole supervision signal.",
  },
  semisupervisedactionfree2022: {
    zh: "離線 RL 也能吃沒有動作標註的軌跡，把影片或觀測序列納進訓練。",
    en: "Offline RL that can use action-free trajectories, so observation-only logs still help training.",
  },
  reed2022gato: {
    zh: "Gato：同一個 Transformer 兼做控制、對話與圖像任務，展示通才智能體的可行形態。",
    en: "Gato: one Transformer spanning control, dialogue, and images — a proof of shape for a generalist agent.",
  },
  chen2021dt: {
    zh: "Decision Transformer：把 RL 當成條件序列建模，用回報當 prompt 生成動作。",
    en: "Decision Transformer: RL as conditional sequence modelling, generating actions prompted by target return.",
  },
  justesen2017macromanagement: {
    zh: "從星海重播學宏觀經營（造兵、科技、擴張），把長時程策略從微操裡拆出來。",
    en: "Learns StarCraft macromanagement from replays: build orders and expansion, separated from micromanagement.",
  },
  wu2017msc: {
    zh: "MSC 資料集：專供星海 II 宏觀決策研究，標好經濟與戰略狀態。",
    en: "MSC: a StarCraft II dataset aimed at macro decisions, with economy and strategy state labelled for learning.",
  },
  wu2019macrostrategy: {
    zh: "MOBA 階層宏觀策略：上層選目標，下層執行，緩解長時程信用分配。",
    en: "A hierarchical macro-strategy model for MOBA AI: a high-level goal layer over a low-level executor.",
  },
  vezhnevets2017feudal: {
    zh: "FeUdal Networks：經理下達目標、工人執行，是深度階層 RL 的代表性結構。",
    en: "FeUdal Networks: a manager sets goals, a worker acts — a canonical architecture for deep hierarchical RL.",
  },
  bacon2017optioncritic: {
    zh: "Option-Critic：端到端同時學選項與內部策略，不必手工切子策略。",
    en: "The option-critic learns options and intra-option policies together, without hand-specified skills.",
  },
  ng1999shaping: {
    zh: "證明勢函數塑造不改最優策略，給後來幾乎所有 shaping 獎勵一個理論底。",
    en: "Potential-based shaping leaves the optimal policy unchanged — the theoretical licence for almost all later reward shaping.",
  },
  geng2025mosmac: {
    zh: "MOSMAC：序列多目標 MARL 基準，要求智能體在衝突目標之間做取捨與排序。",
    en: "MOSMAC: a MARL benchmark of sequential multi-objective tasks, forcing trade-offs rather than a single scalar return.",
  },
  carroll2019overcooked: {
    zh: "Overcooked：說明要跟人類協作，不能只跟自我對弈夥伴訓練，必須學人的慣例。",
    en: "Overcooked: self-play partners are not enough for human–AI coordination; agents must learn human conventions.",
  },
  hu2020otherplay: {
    zh: "Other-Play：訓練時打亂「任意但需一致」的慣例，讓零樣本協調不再綁死自己人的約定。",
    en: "Other-Play randomises arbitrary-but-consistent conventions in training so zero-shot coordination is not locked to self-play codes.",
  },
  bard2020hanabi: {
    zh: "將《花火》打造成理論與合作 MARL 的共同基準：有限通訊、心智理論、習慣約定。",
    en: "The Hanabi challenge: limited communication, theory of mind, and convention — a shared benchmark for cooperative AI.",
  },
  mirsky2022adhoc: {
    zh: "綜述即興組隊：沒有事先協調協議時，如何與陌生隊友合作。",
    en: "Survey of ad hoc teamwork: cooperating with unseen teammates when no protocol was agreed in advance.",
  },
  hu2021obl: {
    zh: "Off-Belief Learning：假設別人像是沒有私有資訊在玩，學出更穩的零樣本協調策略。",
    en: "Off-belief learning assumes others play as if they had no private information, yielding more robust zero-shot coordination.",
  },
  terry2021pettingzoo: {
    zh: "PettingZoo：給 MARL 一個類似 Gym 的統一 API，降低環境切換成本。",
    en: "PettingZoo: a Gym-like API for MARL environments, so algorithms are not rewritten per simulator.",
  },
  leibo2021meltingpot: {
    zh: "Melting Pot：用「社會」測試泛化，評 MARL 面對新夥伴、新人口時還能不能合作。",
    en: "Melting Pot evaluates MARL in social generalisation: new partners and populations, not just the training mix.",
  },
  kurach2020grf: {
    zh: "Google Research Football：物理逼真的足球 RL 環境，用來測長時程團隊合作與戰術。",
    en: "Google Research Football: a physics-rich football environment for long-horizon teamwork and tactics.",
  },
  michalski2023smaclite: {
    zh: "SMAClite：輕量版 SMAC，讓合作 MARL 實驗不必扛完整星海模擬器。",
    en: "SMAClite: a lightweight SMAC-style environment so cooperative MARL experiments do not need the full StarCraft stack.",
  },
  bettini2023benchmarl: {
    zh: "BenchMARL：把多套 MARL 演算法與環境放到同一套評測框架裡，方便公平對照。",
    en: "BenchMARL: one benchmarking harness for many MARL algorithms and environments, aimed at fairer comparisons.",
  },
  shacklett2023madrona: {
    zh: "Madrona：資料導向的高吞吐多世界模擬架構，讓 RL 能同時跑大量平行環境。",
    en: "Madrona: a data-oriented many-world simulator architecture for high-throughput parallel RL environments.",
  },
  ustun2024terrain: {
    zh: "把地理特化地形抽象掉，讓地形相關 RL 能擴到更多地圖而不從頭重訓。",
    en: "Abstracts geo-specific terrain so terrain RL can scale across maps without retraining from scratch each time.",
  },
  zhang2024selfplaysurvey: {
    zh: "綜述自我對弈：從虛構對弈、族群訓練到開放課程，整理何時有效、何時崩潰。",
    en: "Survey of self-play: fictitious play, population methods, open-ended curricula — when it works and when it collapses.",
  },
  lanctot2017psro: {
    zh: "PSRO：用博弈論族群迭代逼近納什均衡，把 MARL 與雙重神諭式求解接起來。",
    en: "PSRO iterates a population toward Nash via a game-theoretic meta-solver, linking MARL to double-oracle style solving.",
  },
  heinrich2016nfsp: {
    zh: "NFSP：在有缺陷資訊博弈裡同時學最佳反應與平均策略，端到端近似納什。",
    en: "Neural fictitious self-play: best response plus average policy in imperfect-information games, approximating Nash end-to-end.",
  },
  jaderberg2017pbt: {
    zh: "族群訓練：邊訓練邊進化超參與策略，後來成為 FTW、AlphaStar 訓練的核心零件。",
    en: "Population-based training evolves hyperparameters and policies while they train — later core to FTW and AlphaStar.",
  },
  portelas2020acl: {
    zh: "短評自動課程學習：誰決定任務難度、如何避免智能體卡在太易或太難。",
    en: "A short survey of automatic curriculum learning: who sets difficulty, and how to avoid tasks that are too easy or too hard.",
  },
  xu2023fictitiouscrossplay: {
    zh: "虛構交叉對弈：在混合合作—競爭裡逼近全局納什，而不是只打自己的複製人。",
    en: "Fictitious cross-play: approaching a global Nash in mixed cooperative–competitive games, not only clones of oneself.",
  },
  sun2020tleague: {
    zh: "TLeague：面向競爭自我對弈的分散式 MARL 框架，把聯盟、演員與評估串成基礎設施。",
    en: "TLeague: infrastructure for competitive self-play MARL — leagues, actors, and evaluation in one distributed stack.",
  },
  gorsane2022evalprotocol: {
    zh: "主張合作 MARL 要用標準化評測協議，否則論文數字無法互比。",
    en: "Argues cooperative MARL needs a standardised evaluation protocol, otherwise reported numbers are not comparable.",
  },
  agarwal2021precipice: {
    zh: "指出深度 RL 結論常踩在統計懸崖上：種子太少、區間不報，顯著性不可信。",
    en: "Deep RL often sits on a statistical precipice: too few seeds, missing intervals, and overclaimed significance.",
  },
  papoudakis2021benchmarking: {
    zh: "在多個合作任務上系統對照主流 MADRL 演算法，給出可複現的相對強弱。",
    en: "A systematic bake-off of MADRL algorithms on cooperative tasks, with reproducible relative rankings.",
  },
  revisitingeval2023: {
    zh: "一年後重跑 MARL 評測：數字能變多少，以及基準本身是否已經過時。",
    en: "Revisits MARL evaluation a year later: how much numbers move, and whether the benchmarks themselves aged.",
  },
  hernandezleal2019survey: {
    zh: "對 MADRL 的調查與批評：哪些承諾被誇大，哪些實驗設定有缺陷。",
    en: "A survey and critique of multi-agent deep RL: overclaimed results and fragile experimental setups.",
  },
  henderson2018matters: {
    zh: "《Deep RL that Matters》：超參、種子與實作細節足以翻轉論文結論。",
    en: "Deep RL that matters: hyperparameters, seeds, and implementation details can reverse a paper’s conclusions.",
  },
  cicero2022diplomacy: {
    zh: "CICERO 把語言模型與戰略推理接在一起，在《外交》上達到人類水準的協商與對局。",
    en: "CICERO pairs a language model with strategic planning and reaches human-level play in Diplomacy.",
  },
  xu2024werewolf: {
    zh: "用語言模型加強化學習打狼人殺：在對話、欺騙與投票裡學策略，而不只是套 prompt。",
    en: "Language agents plus RL for Werewolf: strategy over talk, deception, and voting, not prompt templates alone.",
  },
  li2023tomllm: {
    zh: "讓 LLM 帶著心智理論做多智能體合作：推論他人意圖，再決定自己的行動與發言。",
    en: "Theory of mind for LLM agents in multi-agent collaboration: infer others’ intent, then choose actions and speech.",
  },
  zeng2026lpm: {
    zh: "從影片學習角色表演：全雙工視聽對話、身份一致與即時串流生成，並提出 LPM-Bench 評估基準。",
    en: "Video-based character performance: full-duplex audiovisual conversation, identity-stable real-time streaming, with the LPM-Bench evaluation suite.",
  },
};

export function getPaperBlurb(id: string, locale: string): string | undefined {
  const entry = PAPER_BLURBS[id];
  if (!entry) return undefined;
  return locale === "en" ? entry.en : entry.zh;
}
