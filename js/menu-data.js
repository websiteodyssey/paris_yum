/* ============================================================
   Paris Yum — Données du menu (reprises du site officiel)
   Source : parisyum-commande.fr — noms, prix et photos réels.
   ------------------------------------------------------------
   Image d'un plat : { p: <numéro>, j: true } → owner_update/*.jpg
                      { p: <numéro> }          → images/*.png
   price : nombre en euros (null = "Sur place", non commandable)
   tags  : "spicy" (🌶️) et/ou "star" (★ populaire)
   ============================================================ */

const IMG_BASE = "https://parisyum-commande.fr/image/cache/catalog/customer/parisyum-commande_fr";

const SIGNATURES = [
  { name: "Agneau entier rôti", zh: "烤全羊", price: 258, p: 1,
    desc: "La pièce d'exception, rôtie lentement — à partager (sur réservation)." },
  { name: "Poisson au pot de pierre", zh: "石锅鱼", price: 49.9, p: 182, j: true,
    desc: "Poisson frais mijoté dans un bouillon épicé parfumé, servi bouillonnant." },
  { name: "Poulet Kung Pao", zh: "宫保鸡丁", price: 15.9, p: 29,
    desc: "Le grand classique du Sichuan : poulet, cacahuètes et piment séché." },
  { name: "Écrevisses épicées", zh: "麻辣小龙虾", price: 38.9, p: 58,
    desc: "Écrevisses sautées au wok dans une sauce mala, gourmandes et généreuses." },
  { name: "Poisson mandarin aigre-doux", zh: "松鼠桂鱼", price: 34.9, p: 46,
    desc: "Frit en fleur, nappé d'une sauce aigre-douce brillante." },
  { name: "Tofu Mapo", zh: "麻婆豆腐", price: 14.9, p: 68,
    desc: "Tofu soyeux, sauce piquante au poivre du Sichuan — iconique." }
];

const MENU = [
  {
    id: "presages", fr: "Présages de prospérité", zh: "三羊开泰",
    note: "Nos grandes pièces de partage. Les agneaux rôtis se commandent à l'avance.",
    items: [
      { name: "Agneau entier rôti", zh: "烤全羊", price: 258, p: 1, tags: ["star"] },
      { name: "Demi-agneau rôti", zh: "烤半羊", price: 138, p: 2 },
      { name: "Gigot d'agneau rôti", zh: "烤羊腿", price: 78, p: 3 },
      { name: "Poisson au pot de pierre", zh: "石锅鱼", price: 49.9, p: 182, j: true, tags: ["spicy", "star"] }
    ]
  },
  {
    id: "bbq", fr: "Barbecue", zh: "烧烤",
    note: "Brochettes et grillades préparées à la commande. Servies par 5.",
    items: [
      { name: "Brochettes d'agneau (x5)", zh: "羊肉串", price: 10, p: 4, tags: ["star"] },
      { name: "Brochettes de bœuf (x5)", zh: "牛肉串", price: 10, p: 5 },
      { name: "Ailes de poulet (x5)", zh: "鸡翅", price: 12.5, p: 6 },
      { name: "Saucisse de porc (x5)", zh: "王中王", price: 10, p: 7 },
      { name: "Saucisse taïwanaise (x5)", zh: "台肠", price: 12.5, p: 12 },
      { name: "Gésiers de poulet (x5)", zh: "鸡胗", price: 10, p: 10 },
      { name: "Calamar (x5)", zh: "鱿鱼须", price: 10, p: 9 },
      { name: "Tofu séché (x5)", zh: "豆腐干", price: 9, p: 8 },
      { name: "Chou-fleur (x5)", zh: "花菜", price: 9, p: 11 },
      { name: "Tofu puant grillé (x5)", zh: "烧烤臭豆腐", price: 12.5, p: 178, j: true, tags: ["spicy"] }
    ]
  },
  {
    id: "entrees", fr: "Entrées", zh: "凉菜",
    items: [
      { name: "Tofu aux œufs de cent ans", zh: "皮蛋豆腐", price: 11.9, p: 21 },
      { name: "Salade de concombre", zh: "拍黄瓜", price: 11.9, p: 22, tags: ["star"] },
      { name: "Salade de méduse", zh: "拌海蜇", price: 15.9, p: 23 },
      { name: "Poulet épicé du Sichuan", zh: "口水鸡", price: 11.9, p: 13, tags: ["spicy"] },
      { name: "Abats de bœuf épicés", zh: "夫妻肺片", price: 12.9, p: 18, tags: ["spicy"] },
      { name: "Bœuf braisé à la coriandre", zh: "香菜牛肉", price: 13.9, p: 17, j: true },
      { name: "Crabe cru épicé", zh: "江蟹生", price: 26.9, p: 15, tags: ["spicy"] },
      { name: "Pattes de canard au wasabi", zh: "芥末鸭掌", price: 15.9, p: 158, j: true },
      { name: "Foie d'agneau", zh: "羊肝", price: 13.9, p: 25 },
      { name: "Dorade séchée", zh: "鱼干", price: 12.9, p: 160, j: true },
      { name: "Os de poulet grillé", zh: "烧烤鸡架", price: 8.9, p: 150, j: true },
      { name: "Boulettes aux légumes (12p)", zh: "蔬菜丸子", price: 12.9, p: 181, j: true },
      { name: "Nouilles froides", zh: "凉皮", price: 11.9, p: 14 },
      { name: "Pommes de terre épicées", zh: "炝拌土豆丝", price: 11.9, p: 20, tags: ["spicy"] },
      { name: "Edamame", zh: "盐水毛豆", price: 8.9, p: 19 },
      { name: "Cacahuètes", zh: "花生米", price: 7.9, p: 16 }
    ]
  },
  {
    id: "viandes", fr: "Viandes & spécialités", zh: "精美肉类",
    items: [
      { name: "Poulet Kung Pao", zh: "宫保鸡丁", price: 15.9, p: 29, tags: ["spicy", "star"] },
      { name: "Poulet aigre-doux", zh: "糖醋鸡", price: 16.9, p: 26 },
      { name: "Poulet épicé", zh: "辣子鸡", price: 16.9, p: 27, tags: ["spicy"] },
      { name: "Poulet aux champignons noirs", zh: "木耳鸡", price: 16.9, p: 28 },
      { name: "Côtes de porc croustillantes", zh: "香酥排骨", price: 17.9, p: 31, tags: ["star"] },
      { name: "Porc épicé sauté (Huiguorou)", zh: "回锅肉", price: 15.9, p: 32, tags: ["spicy"] },
      { name: "Porc sucré croustillant (Guobaorou)", zh: "锅包肉", price: 15.9, p: 35 },
      { name: "Bœuf sauté au cumin", zh: "孜然牛肉", price: 16.9, p: 33 },
      { name: "Bœuf aux oignons", zh: "洋葱牛肉", price: 16.9, p: 38 },
      { name: "Bœuf sauté aux piments", zh: "尖椒炒牛肉", price: 18.9, p: 156, j: true, tags: ["spicy"] },
      { name: "Bœuf enoki", zh: "金针肥牛", price: 20.9, p: 41 },
      { name: "Bœuf au bouillon pimenté", zh: "水煮牛肉", price: 30.9, p: 42, tags: ["spicy", "star"] },
      { name: "Côtelettes d'agneau sel & poivre", zh: "椒盐羊排", price: 20.9, p: 36 },
      { name: "Canard laqué sur plaque", zh: "铁板烤鸭", price: 22.9, p: 37, j: true },
      { name: "Bouillon d'abats de bœuf", zh: "干锅牛杂煲", price: 24.9, p: 145, j: true },
      { name: "Rognons de porc sautés", zh: "火爆腰花", price: 17.9, p: 40, tags: ["spicy"] },
      { name: "Grenouilles au bouillon pimenté", zh: "水煮田鸡", price: 32.9, p: 45, tags: ["spicy"] },
      { name: "Cuisses de grenouilles sautées", zh: "爆炒田鸡", price: 30.9, p: 159, j: true }
    ]
  },
  {
    id: "mer", fr: "Fruits de mer", zh: "海鲜",
    items: [
      { name: "Poisson mandarin aigre-doux", zh: "松鼠桂鱼", price: 34.9, p: 46, tags: ["star"] },
      { name: "Poisson épicé à l'huile", zh: "沸腾鱼", price: 38.9, p: 49, tags: ["spicy", "star"] },
      { name: "Poisson au bouillon pimenté", zh: "水煮鱼", price: 34.9, p: 51, tags: ["spicy"] },
      { name: "Poisson au chou chinois", zh: "酸菜鱼", price: 32.9, p: 48 },
      { name: "Tête de poisson au piment", zh: "剁椒鱼头", price: 48.9, p: 59, tags: ["spicy"] },
      { name: "Crabe sauté épicé", zh: "香辣蟹", price: 29.9, p: 54, tags: ["spicy"] },
      { name: "Crabe braisé", zh: "红烧蟹", price: 29.9, p: 56 },
      { name: "Écrevisses épicées", zh: "麻辣小龙虾", price: 38.9, p: 58, tags: ["spicy", "star"] },
      { name: "Crevettes sautées épicées", zh: "香辣虾", price: 24.9, p: 52, tags: ["spicy"] },
      { name: "Crevettes sel & poivre", zh: "椒盐虾", price: 24.9, p: 53 },
      { name: "Tentacules de calamar", zh: "干锅鱿鱼须", price: 19.9, p: 57 },
      { name: "Seiche sautée", zh: "爆炒目鱼", price: 26.9, p: 62, j: true },
      { name: "Bigorneaux sautés", zh: "爆炒螺蛳", price: 22.9, p: 149, j: true },
      { name: "Couteaux de mer sautés", zh: "油葱蛏子", price: 22.9, p: 148, j: true },
      { name: "Sashimi de palourde", zh: "北极贝", price: 18.9, p: 63 },
      { name: "Plateau de fruits de mer", zh: "海鲜拼盘", price: 50, p: 60 }
    ]
  },
  {
    id: "legumes", fr: "Légumes", zh: "蔬菜",
    items: [
      { name: "Tofu Mapo", zh: "麻婆豆腐", price: 14.9, p: 68, tags: ["spicy", "star"] },
      { name: "Aubergines sautées Yuxiang", zh: "鱼香茄子", price: 15.9, p: 66, tags: ["star"] },
      { name: "Tofu aux huit trésors", zh: "八珍豆腐煲", price: 19.9, p: 43 },
      { name: "Trois légumes (Disanxian)", zh: "地三鲜", price: 14.9, p: 71 },
      { name: "Chou chinois sauté au porc", zh: "手撕包菜", price: 14.9, p: 67 },
      { name: "Chou-fleur sauté au porc", zh: "干锅花菜", price: 15.9, p: 69 },
      { name: "Liseron d'eau sauté", zh: "清炒空心菜", price: 16.9, p: 73 },
      { name: "Okra à l'ail", zh: "蒜蓉秋葵", price: 15.9, p: 72 },
      { name: "Igname au jaune d'œuf", zh: "蛋黄山药", price: 17.9, p: 70 },
      { name: "Maïs sauté aux pignons", zh: "松子玉米", price: 13.9, p: 65 },
      { name: "Pommes de terre aigres-épicées", zh: "酸辣土豆丝", price: 12.9, p: 74, tags: ["spicy"] },
      { name: "Taro sauté sur plaque", zh: "铁板芋头", price: 18.9, p: 168, j: true },
      { name: "Tofu puant à l'ail", zh: "蒜蓉臭豆腐", price: 16.9, p: 157, j: true },
      { name: "Pousses de soja sautées", zh: "清炒豆芽", price: 12.9, p: 169, j: true }
    ]
  },
  {
    id: "soupes", fr: "Bouillons & soupes", zh: "营养汤类",
    items: [
      { name: "Marmite de poulet & crabe", zh: "鸡蟹煲", price: 48.9, p: 75, tags: ["star"] },
      { name: "Marmite de poulet noir", zh: "乌鸡煲", price: 48.9, p: 76 },
      { name: "Soupe d'abats d'agneau", zh: "羊杂汤", price: null, p: 77 },
      { name: "Soupe aigre-piquante", zh: "酸辣汤", price: null, p: 78, tags: ["spicy"] },
      { name: "Soupe tomate & œuf", zh: "西红柿鸡蛋汤", price: null, p: 79 },
      { name: "Soupe tofu & légumes", zh: "豆腐菜汤", price: null, p: 80 }
    ]
  },
  {
    id: "accompagnements", fr: "Accompagnements", zh: "主食",
    items: [
      { name: "Riz cantonais (grand)", zh: "广东炒饭", price: 17.9, p: 85, tags: ["star"] },
      { name: "Nouilles sautées au bœuf (grand)", zh: "牛肉炒面", price: 19.9, p: 82, tags: ["star"] },
      { name: "Nouilles sautées au poulet (grand)", zh: "鸡肉炒面", price: 19.9, p: 83 },
      { name: "Nouilles sautées aux légumes (grand)", zh: "青菜炒面", price: 17.9, p: 84 },
      { name: "Nouilles sautées fruits de mer (grand)", zh: "海鲜炒面", price: 20.9, p: 86 },
      { name: "Vermicelles sautées (grand)", zh: "炒粉干", price: 19.9, p: 90 },
      { name: "Vermicelles au porc haché", zh: "蚂蚁上树", price: 12.9, p: 81, tags: ["spicy"] },
      { name: "Gâteaux de riz sautés (grand)", zh: "炒年糕", price: 19.9, p: 88 },
      { name: "Soupe de nouilles longévité", zh: "长寿面", price: 20.9, p: 151, j: true },
      { name: "Riz blanc", zh: "白米饭", price: 2.5, p: 91 },
      { name: "Raviolis grillés au porc", zh: "猪煎饺", price: null, p: 87 },
      { name: "Raviolis Dongbei (à l'eau)", zh: "水饺", price: null, p: 89 },
      { name: "Gyoza au poulet", zh: "日本煎饺", price: null, p: 155, j: true }
    ]
  },
  {
    id: "desserts", fr: "Douceurs & fruits", zh: "甜品",
    items: [
      { name: "Plateau de fruits", zh: "水果拼盘", price: 18.9, p: 129 },
      { name: "Boulettes de riz gluant (10p)", zh: "汤圆", price: 15.9, p: 130, tags: ["star"] },
      { name: "Gâteau à la citrouille (12p)", zh: "南瓜饼", price: 18, p: 131 },
      { name: "Gâteaux de riz au sucre brun (12p)", zh: "红糖糍粑", price: 15.9, p: 175, j: true },
      { name: "Perles de coco (2p)", zh: "糯米糍", price: 4.8, p: 133 },
      { name: "Mochi (2p)", zh: "麻糬", price: 6.8, p: 174, j: true },
      { name: "Nougat aux sésames (10p)", zh: "芝麻牛轧糖", price: 4.8, p: 134 },
      { name: "Litchis", zh: "荔枝", price: 4.8, p: 132 }
    ]
  },
  {
    id: "boissons", fr: "Boissons", zh: "饮料",
    items: [
      { name: "Coca (canette)", zh: "小可乐", price: 3.8, p: 112 },
      { name: "Coca (bouteille)", zh: "大可乐", price: 8.8, p: 113 },
      { name: "Fanta (canette)", zh: "小芬达", price: 3.8, p: 114 },
      { name: "Fanta (bouteille)", zh: "大芬达", price: 8.8, p: 154, j: true },
      { name: "Ice Tea (canette)", zh: "小冰红茶", price: 3.8, p: 180, j: true },
      { name: "Ice Tea (grand)", zh: "大冰红茶", price: 8.8, p: 179, j: true },
      { name: "Thé oolong à la pêche", zh: "蜜桃乌龙茶", price: 4.8, p: 152, j: true },
      { name: "Jus de pomme", zh: "苹果汁", price: 8.8, p: 172, j: true },
      { name: "Jus de fruit", zh: "果汁", price: 3.8, p: 121 },
      { name: "Red Bull", zh: "红牛", price: 4.8, p: 115 },
      { name: "Lait de soja (canette)", zh: "小豆奶", price: 3.8, p: 116 },
      { name: "Lait Wangzai", zh: "旺仔牛奶", price: 4.8, p: 118 },
      { name: "Wang Lao Ji", zh: "王老吉", price: 3.8, p: 120 },
      { name: "Boisson aux prunes", zh: "酸梅汤", price: 8.8, p: 122 },
      { name: "Aloe Vera (grand)", zh: "大芦荟", price: 8.8, p: 119 },
      { name: "Aloe Vera (petit)", zh: "小芦荟", price: 3.8, p: 140 },
      { name: "Evian (grand)", zh: "大水", price: 6.8, p: 123 },
      { name: "Evian (petit)", zh: "小水", price: 3.8, p: 138 },
      { name: "Badoit (grand)", zh: "大气泡水", price: 6.8, p: 124 },
      { name: "Badoit (petit)", zh: "小气泡水", price: 3.8, p: 139 },
      { name: "Thé au jasmin", zh: "茉莉花茶", price: 9.8, p: 126, j: true },
      { name: "Thé vert", zh: "绿茶", price: 9.8, p: 127, j: true },
      { name: "Thé chrysanthème", zh: "菊花茶", price: 9.8, p: 128, j: true },
      { name: "Café", zh: "咖啡", price: 2, p: 125 }
    ]
  },
  {
    id: "bieres", fr: "Bières", zh: "啤酒",
    items: [
      { name: "Bière Snow — lot de 2", zh: "大雪花", price: 15.6, p: 95, desc: "Achetez-en 1, le 2ᵉ offert", tags: ["star"] },
      { name: "Bière Snow (petite)", zh: "小雪花", price: 4.5, p: 162, j: true },
      { name: "Tsingtao (petite)", zh: "小青岛", price: 4.5, p: 93, tags: ["star"] },
      { name: "Tsingtao (grande)", zh: "大青岛", price: 7.5, p: 94 },
      { name: "Heineken", zh: "小喜力", price: 4.5, p: 92 },
      { name: "Desperados", zh: "Desperados", price: 4.8, p: 96 }
    ]
  },
  {
    id: "vin_rouge", fr: "Vin rouge", zh: "红酒",
    note: "L'abus d'alcool est dangereux pour la santé. À consommer avec modération.",
    items: [
      { name: "Côtes du Rhône", zh: "红酒", price: 25.8, p: 97, j: true },
      { name: "Bordeaux Supérieur", zh: "红酒", price: 28.9, p: 98, j: true },
      { name: "Saint-Émilion Grand Cru", zh: "红酒", price: 45.9, p: 99, j: true },
      { name: "Margaux", zh: "红酒", price: 45.9, p: 100, j: true },
      { name: "Château la Tour Carnet", zh: "红酒", price: 68.9, p: 170, j: true }
    ]
  },
  {
    id: "vin_rose", fr: "Vin rosé", zh: "粉葡萄酒",
    items: [
      { name: "Côtes de Provence", zh: "桃红", price: 26.9, p: 101, j: true },
      { name: "Tavel", zh: "桃红", price: 26.9, p: 102, j: true }
    ]
  },
  {
    id: "vin_blanc", fr: "Vin blanc", zh: "白葡萄酒",
    items: [
      { name: "Riesling", zh: "白酒", price: 25.9, p: 103, j: true },
      { name: "Pouilly-Fumé", zh: "白酒", price: 38.9, p: 104, j: true },
      { name: "Sancerre", zh: "白酒", price: 40.9, p: 105, j: true },
      { name: "Chablis", zh: "白酒", price: 38.9, p: 165, j: true }
    ]
  },
  {
    id: "spiritueux", fr: "Spiritueux", zh: "烈酒",
    note: "L'abus d'alcool est dangereux pour la santé. À consommer avec modération.",
    items: [
      { name: "Soju (Corée)", zh: "韩国酒", price: 11.9, p: 163, j: true },
      { name: "Vodka", zh: "伏特加", price: 88, p: 107, j: true },
      { name: "Champagne", zh: "香槟", price: 88, p: 109, j: true },
      { name: "Bleu de la Mer", zh: "海之蓝", price: 90, p: 110, j: true },
      { name: "Jack Daniel's", zh: "杰克丹尼", price: 100, p: 106, j: true },
      { name: "Chivas 12 ans", zh: "芝华士", price: 100, p: 108, j: true },
      { name: "Luzhou Laojiao", zh: "泸州老窖", price: 120, p: 166, j: true },
      { name: "Fenjiu Qinghua 20", zh: "汾酒青花20", price: 128, p: 167, j: true },
      { name: "Bleu du Ciel", zh: "天之蓝", price: 169, p: 111, j: true }
    ]
  }
];

const HOURS = [
  { day: "Lundi",    time: "19h00 – 23h30",             dow: 1 },
  { day: "Mardi",    time: "12h00–14h00 · 19h00–23h30", dow: 2 },
  { day: "Mercredi", time: "12h00–14h00 · 19h00–23h30", dow: 3 },
  { day: "Jeudi",    time: "12h00–14h00 · 19h00–23h30", dow: 4 },
  { day: "Vendredi", time: "19h00 – 23h30",             dow: 5 },
  { day: "Samedi",   time: "12h00–14h00 · 19h00–23h30", dow: 6 },
  { day: "Dimanche", time: "12h00–14h00 · 19h00–23h30", dow: 0 }
];
