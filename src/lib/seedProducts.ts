// One-off batch of products added on 2026-11-24. Inserted once (guarded by a flag
// in the seed_flags table); after that the admin panel is the source of truth.
export interface SeedProduct {
  slug: string;
  title: string;
  productType: "bouquet" | "arrangement" | "plant" | "giftset" | "balloon" | "chocolate-wine";
  price: number;
  images: string[];
}

export const SEED_BATCH_KEY = "catalog-2026-11-24";

export const seedBatch: SeedProduct[] = [
  {
    "slug": "flower-balloon-chocolate-wine-giftset",
    "title": "מארז מתנה - בלון פרח, שוקולד ויין",
    "productType": "giftset",
    "price": 249,
    "images": [
      "/products/flower-balloon-chocolate-wine-giftset.jpeg"
    ]
  },
  {
    "slug": "gypsophila-bag-wine-giftset",
    "title": "מארז מתנה - תיק ג'יפסנית ומארז יין",
    "productType": "giftset",
    "price": 329,
    "images": [
      "/products/gypsophila-bag-wine-giftset.jpeg"
    ]
  },
  {
    "slug": "snake-plant-red-wine-giftset",
    "title": "מארז מתנה - עציץ סנסוויירה ויין אדום",
    "productType": "giftset",
    "price": 189,
    "images": [
      "/products/snake-plant-red-wine-giftset.jpeg"
    ]
  },
  {
    "slug": "snake-plant-wine-chocolate-giftset",
    "title": "מארז מתנה - עציץ סנסוויירה, יין ושוקולד",
    "productType": "giftset",
    "price": 219,
    "images": [
      "/products/snake-plant-wine-chocolate-giftset.jpeg"
    ]
  },
  {
    "slug": "blue-snake-plant-sparkling-giftset",
    "title": "מארז מתנה - סנסוויירה כחולה ויין מבעבע",
    "productType": "giftset",
    "price": 169,
    "images": [
      "/products/blue-snake-plant-sparkling-giftset.jpeg"
    ]
  },
  {
    "slug": "succulent-olive-wood-plate",
    "title": "סוקולנט על פלטת עץ זית",
    "productType": "plant",
    "price": 129,
    "images": [
      "/products/succulent-olive-wood-plate.jpeg"
    ]
  },
  {
    "slug": "aloe-wood-block",
    "title": "אלוורה בבסיס עץ",
    "productType": "plant",
    "price": 89,
    "images": [
      "/products/aloe-wood-block.jpeg"
    ]
  },
  {
    "slug": "snake-plant-wood-trunk",
    "title": "סנסוויירה בגזע עץ",
    "productType": "plant",
    "price": 149,
    "images": [
      "/products/snake-plant-wood-trunk.jpeg"
    ]
  },
  {
    "slug": "colorful-snake-plant-pots",
    "title": "סנסוויירות צבעוניות בעציצים",
    "productType": "plant",
    "price": 79,
    "images": [
      "/products/colorful-snake-plant-pots.jpeg"
    ]
  },
  {
    "slug": "roses-alstroemeria-vase-bouquet",
    "title": "זר ורדים ורודים באגרטל עם סרט",
    "productType": "arrangement",
    "price": 249,
    "images": [
      "/products/roses-alstroemeria-vase-bouquet.jpeg"
    ]
  },
  {
    "slug": "rainbow-gypsophila-vase",
    "title": "סידור ג'יפסנית צבעונית באגרטל",
    "productType": "arrangement",
    "price": 289,
    "images": [
      "/products/rainbow-gypsophila-vase.jpeg"
    ]
  },
  {
    "slug": "pink-lisianthus-bouquet-new",
    "title": "זר ליזיאנטוס ורוד",
    "productType": "bouquet",
    "price": 169,
    "images": [
      "/products/pink-lisianthus-bouquet-new.jpeg"
    ]
  },
  {
    "slug": "gerbera-white-wrap-bouquet",
    "title": "זר גרברות בעטיפה לבנה",
    "productType": "bouquet",
    "price": 219,
    "images": [
      "/products/gerbera-white-wrap-bouquet.jpeg"
    ]
  },
  {
    "slug": "red-roses-white-lace-bouquet",
    "title": "זר ורדים אדומים בעטיפת תחרה לבנה",
    "productType": "bouquet",
    "price": 279,
    "images": [
      "/products/red-roses-white-lace-bouquet.jpeg"
    ]
  },
  {
    "slug": "mixed-roses-newspaper-vase",
    "title": "סידור ורדים בעטיפת עיתון באגרטל",
    "productType": "arrangement",
    "price": 299,
    "images": [
      "/products/mixed-roses-newspaper-vase.jpeg"
    ]
  },
  {
    "slug": "white-chrysanthemum-bouquet",
    "title": "זר חרציות לבנות בעטיפה",
    "productType": "bouquet",
    "price": 169,
    "images": [
      "/products/white-chrysanthemum-bouquet.jpeg"
    ]
  },
  {
    "slug": "gerbera-gladiolus-bouquet",
    "title": "זר גרברות וגלדיולות",
    "productType": "bouquet",
    "price": 229,
    "images": [
      "/products/gerbera-gladiolus-bouquet.jpeg"
    ]
  },
  {
    "slug": "single-red-rose",
    "title": "ורד אדום בודד בעטיפה",
    "productType": "bouquet",
    "price": 49,
    "images": [
      "/products/single-red-rose.jpeg"
    ]
  },
  {
    "slug": "colorful-mixed-bouquet",
    "title": "זר פרחים צבעוני מעורב",
    "productType": "bouquet",
    "price": 199,
    "images": [
      "/products/colorful-mixed-bouquet.jpeg"
    ]
  },
  {
    "slug": "gypsophila-flower-crown",
    "title": "זר ראש מג'יפסנית",
    "productType": "arrangement",
    "price": 89,
    "images": [
      "/products/gypsophila-flower-crown.jpeg"
    ]
  },
  {
    "slug": "pink-bag-gypsophila",
    "title": "תיק ורוד עם ג'יפסנית צבעונית",
    "productType": "arrangement",
    "price": 179,
    "images": [
      "/products/pink-bag-gypsophila.jpeg"
    ]
  },
  {
    "slug": "red-roses-eucalyptus-bouquet",
    "title": "זר ורדים אדומים ואקליפטוס",
    "productType": "bouquet",
    "price": 229,
    "images": [
      "/products/red-roses-eucalyptus-bouquet.jpeg"
    ]
  },
  {
    "slug": "white-lilies-vase-bouquet",
    "title": "סידור לילים ופרחים לבנים באגרטל",
    "productType": "arrangement",
    "price": 279,
    "images": [
      "/products/white-lilies-vase-bouquet.jpeg"
    ]
  },
  {
    "slug": "red-roses-black-wrap-ribbon",
    "title": "זר ורדים אדומים גדול בעטיפה שחורה",
    "productType": "bouquet",
    "price": 349,
    "images": [
      "/products/red-roses-black-wrap-ribbon.jpeg"
    ]
  },
  {
    "slug": "white-gypsophila-bunch",
    "title": "צרור ג'יפסנית לבנה",
    "productType": "bouquet",
    "price": 69,
    "images": [
      "/products/white-gypsophila-bunch.jpeg"
    ]
  },
  {
    "slug": "carmel-private-collection-wine",
    "title": "יין כרמל פרייבט קולקשן",
    "productType": "chocolate-wine",
    "price": 79,
    "images": [
      "/products/carmel-private-collection-wine.jpeg"
    ]
  },
  {
    "slug": "zion-estate-shiraz-wine",
    "title": "יין ציון אסטייט שיראז",
    "productType": "chocolate-wine",
    "price": 69,
    "images": [
      "/products/zion-estate-shiraz-wine.jpeg"
    ]
  },
  {
    "slug": "alma-cabernet-wine",
    "title": "יין אלמה קברנה סוביניון",
    "productType": "chocolate-wine",
    "price": 79,
    "images": [
      "/products/alma-cabernet-wine.jpeg"
    ]
  },
  {
    "slug": "kamila-morello-chocolates",
    "title": "בונבוניירה קמילה מורלו",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/kamila-morello-chocolates.jpeg",
      "/products/kamila-morello-chocolates-2.jpeg"
    ]
  },
  {
    "slug": "kamila-pavolli-chocolates",
    "title": "קופסת שוקולד קמילה פבולי",
    "productType": "chocolate-wine",
    "price": 49,
    "images": [
      "/products/kamila-pavolli-chocolates.jpeg"
    ]
  },
  {
    "slug": "merci-lovelies-chocolates",
    "title": "שוקולד מרסי לאבליז",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/merci-lovelies-chocolates.jpeg"
    ]
  },
  {
    "slug": "hovkei-derech-book-set",
    "title": "ספר ומארז חובקי דרך",
    "productType": "chocolate-wine",
    "price": 69,
    "images": [
      "/products/hovkei-derech-book-set.jpeg"
    ]
  },
  {
    "slug": "ribbed-glass-vase",
    "title": "אגרטל זכוכית מפוספס",
    "productType": "chocolate-wine",
    "price": 79,
    "images": [
      "/products/ribbed-glass-vase.jpeg"
    ]
  },
  {
    "slug": "round-glass-bowl-vase",
    "title": "אגרטל זכוכית עגול",
    "productType": "chocolate-wine",
    "price": 49,
    "images": [
      "/products/round-glass-bowl-vase.jpeg"
    ]
  },
  {
    "slug": "classic-glass-vase",
    "title": "אגרטל זכוכית קלאסי",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/classic-glass-vase.jpeg"
    ]
  },
  {
    "slug": "wide-neck-glass-vase",
    "title": "אגרטל זכוכית רחב",
    "productType": "chocolate-wine",
    "price": 69,
    "images": [
      "/products/wide-neck-glass-vase.jpeg"
    ]
  },
  {
    "slug": "pink-pedestal-pot",
    "title": "עציץ קרמיקה ורוד על בסיס",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/pink-pedestal-pot.jpeg",
      "/products/pink-pedestal-pot-2.jpeg"
    ]
  },
  {
    "slug": "lilac-pedestal-pot",
    "title": "עציץ קרמיקה לילך על בסיס",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/lilac-pedestal-pot.jpeg",
      "/products/lilac-pedestal-pot-2.jpeg"
    ]
  },
  {
    "slug": "yellow-smiley-pot",
    "title": "עציץ חייכן צהוב",
    "productType": "chocolate-wine",
    "price": 69,
    "images": [
      "/products/yellow-smiley-pot.jpeg"
    ]
  },
  {
    "slug": "black-glasses-pot",
    "title": "עציץ שחור עם משקפיים",
    "productType": "chocolate-wine",
    "price": 69,
    "images": [
      "/products/black-glasses-pot.jpeg",
      "/products/black-glasses-pot-2.jpeg"
    ]
  },
  {
    "slug": "stone-look-pot",
    "title": "עציץ בעיצוב אבן",
    "productType": "chocolate-wine",
    "price": 79,
    "images": [
      "/products/stone-look-pot.jpeg",
      "/products/stone-look-pot-2.jpeg"
    ]
  },
  {
    "slug": "yellow-ceramic-pot",
    "title": "עציץ קרמיקה צהוב עם צלחת",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/yellow-ceramic-pot.jpeg"
    ]
  },
  {
    "slug": "grey-pink-gold-pot",
    "title": "עציץ אפור וורוד עם פס זהב",
    "productType": "chocolate-wine",
    "price": 59,
    "images": [
      "/products/grey-pink-gold-pot.jpeg"
    ]
  }
];
