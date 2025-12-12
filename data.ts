import { AppData } from './types';

// ==========================================
// DATA CENTER (数据中心)
// You can modify the content below to update the app.
// 您可以在下方修改内容以更新小程序。
// ==========================================

export const appData: AppData = {
  // 0. Global Config (全局配置)
  meta: {
    homeHint: "💡 提示：游览并打卡所有景点，即可解锁【通关大礼】(点击关闭)",
    completionTitle: "🎉 恭喜通关 🎉",
    completionDesc: "以此通关文牒为证，\n阁下已阅尽山海雄关之美。\n祝您：前程似锦，万事胜意！",
    overviewTitle: "山海关景区总览",
    overviewContent: "山海关，又称“榆关”，位于河北省秦皇岛市东北15公里处，是明长城的东北关隘之一，在1990年以前被认为是明长城东端起点，素有“天下第一关”之称。\n\n与万里之外的嘉峪关遥相呼应，闻名天下。山海关关城周长约4公里，与长城相连，以城为关，城高14米，厚7米，有四座主要城门，多种防御建筑。包括“天下第一关”箭楼、靖边楼、牧营楼、临闾楼等。\n\n这里不仅是军事重镇，更是历史文化的宝库，见证了无数历史兴衰。游览山海关，不仅是看雄伟的建筑，更是品味一段厚重的历史。"
  },

  // 1. Spots List (景点列表)
  // image: Path to the image (put images in public folder or use URL)
  // x, y: Position on map in percentage (0-100)
  spots: [
    {
      id: 1,
      name: "天下第一关",
      x: 45, // Map X coordinate %
      y: 30, // Map Y coordinate %
      image: "https://picsum.photos/800/600?random=1", // Replace with local image: '/images/spot1.jpg'
      desc: "万里长城东起点的军事重镇。",
      content: "天下第一关即山海关，是万里长城东部起点的第一座关隘，建于明洪武十四年（1381年）。它依山阻海，雄关锁隘，易守难攻，自古即为兵家必争之地。城楼上的“天下第一关”巨匾，笔力苍劲，气势雄伟，相传为明代书法家萧显所书。",
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" // Replace with local audio
    },
    {
      id: 2,
      name: "老龙头",
      x: 75,
      y: 65,
      image: "https://picsum.photos/800/600?random=2",
      desc: "长城入海处，犹如巨龙探海。",
      content: "老龙头位于山海关城南5公里的渤海之滨，是明长城的东部入海处。长城犹如一条巨龙，翻越燕山山脉，跨过山海关，在此把头伸入波涛汹涌的渤海之中，故得名“老龙头”。这里是世界上唯一的一段海上长城。",
    },
    {
      id: 3,
      name: "孟姜女庙",
      x: 20,
      y: 25,
      image: "https://picsum.photos/800/600?random=3",
      desc: "传颂千年的民间爱情传说。",
      content: "孟姜女庙又称贞女祠，坐落在凤凰山上。庙宇四周林木葱郁，掩映着红墙灰瓦。庙前有108级台阶，象征孟姜女寻夫的艰辛。庙内供奉着孟姜女像，两侧对联“海水朝朝朝朝朝朝朝落，浮云长长长长长长长消”更是千古绝对。",
    },
    {
      id: 4,
      name: "角山长城",
      x: 35,
      y: 10,
      image: "https://picsum.photos/800/600?random=4",
      desc: "万里长城第一山。",
      content: "角山长城距古城山海关北约3公里，系燕山余脉，是关城北山屏障。因山势巍峨，巨石嵯峨，好似龙首戴角而得名。这里的长城利用山势险峻，随山就势，蜿蜒起伏，极为壮观。",
    },
    {
      id: 5,
      name: "闯关东文化园",
      x: 60,
      y: 50,
      image: "https://picsum.photos/800/600?random=5",
      desc: "铭记近代史上波澜壮阔的移民史诗。",
      content: "闯关东文化园真实再现了中国近代史上著名的“闯关东”历史画卷。通过雕塑、建筑和场景还原，展示了先辈们不畏艰险、勇于开拓的奋斗精神。这里不仅是历史的见证，更是中华民族坚韧不拔精神的缩影。",
    }
  ],

  // 2. Facilities List (设施列表 - 保留数据结构，但在首页UI中不再展示)
  facilities: [
    { id: 101, type: 'wc', name: '洗手间A', x: 30, y: 40 },
    { id: 102, type: 'wc', name: '洗手间B', x: 65, y: 70 },
    { id: 201, type: 'food', name: '长城茶馆', x: 50, y: 35 },
    { id: 202, type: 'food', name: '关外小吃', x: 70, y: 55 },
  ],

  // 3. Fortunes List (签文列表)
  fortunes: [
    { id: 1, text: "万里长城永不倒，事业步步高。——上上签" },
    { id: 2, text: "雄关漫道真如铁，而今迈步从头越。——上签" },
    { id: 3, text: "不到长城非好汉，坚持到底心无憾。——中上签" },
    { id: 4, text: "孟姜哭倒长城边，真情自有感动天。——情感签" },
    { id: 5, text: "老龙头畔观沧海，胸怀广阔福自来。——事业签" },
    { id: 6, text: "山海关前紫气升，贵人相助事竟成。——吉祥签" },
    { id: 7, text: "角山极顶看日出，前程似锦展宏图。——上上签" },
    { id: 8, text: "烽火台前思良将，平安喜乐保安康。——平安签" },
    { id: 9, text: "一夫当关万夫莫开，守住本心好运来。——定心签" },
    { id: 10, text: "燕山脚下好风光，家和万事皆兴旺。——家宅签" },
  ]
};