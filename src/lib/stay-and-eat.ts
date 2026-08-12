import type { Locale } from "@/i18n/translations";

type LocalizedText = Record<
  Locale,
  {
    title: string;
    type: string;
    area: string;
    desc: string;
    specialty?: string;
  }
>;

export type Lodging = {
  id: string;
  phone?: string;
  phones?: string[];
  website?: string;
} & LocalizedText;

export type Dining = {
  id: string;
  phone?: string;
} & LocalizedText;

export const lodging: Lodging[] = [
  {
    id: "garden-hotel",
    phone: "0366 564 44 44",
    website: "https://abanagardenhotel.com",
    tr: {
      title: "Abana Garden Hotel",
      type: "Otel · butik",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "2024’te açılan deniz manzaralı butik otel; restoran ve kafe hizmeti.",
    },
    en: {
      title: "Abana Garden Hotel",
      type: "Hotel · boutique",
      area: "Center, Kamil Demircioğlu St.",
      desc: "Sea-view boutique hotel opened in 2024, with restaurant and café.",
    },
  },
  {
    id: "tatilya",
    phone: "0366 564 19 19",
    website: "https://tatilyaresorthotel.com",
    tr: {
      title: "Tatilya Resort Hotel",
      type: "Otel · resort",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "Aquapark, havuz, spa ve yarım pansiyon seçenekleriyle büyük sahil oteli.",
    },
    en: {
      title: "Tatilya Resort Hotel",
      type: "Hotel · resort",
      area: "Center, Kamil Demircioğlu St.",
      desc: "Large coastal resort with water park, pools, spa and half-board options.",
    },
  },
  {
    id: "albatros-pansiyon",
    tr: {
      title: "Abana Albatros Pansiyon",
      type: "Pansiyon · bungalov",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "Bungalov tarzı pansiyon; hafta sonları canlı müzik ve restoran.",
    },
    en: {
      title: "Abana Albatros Pension",
      type: "Pension · bungalow",
      area: "Center, Kamil Demircioğlu St.",
      desc: "Bungalow-style pension with restaurant; live music on weekends.",
    },
  },
  {
    id: "quiet-haciveli",
    tr: {
      title: "Quiet Abana Hacıveli Konağı",
      type: "Butik otel · eko",
      area: "Hacıveli Mah.",
      desc: "Denize sıfır 6 odalı konak; glamping ve bungalov seçenekleriyle aynı marka.",
    },
    en: {
      title: "Quiet Abana Hacıveli Mansion",
      type: "Boutique · eco stay",
      area: "Hacıveli neighborhood",
      desc: "Six-room seafront B&B; glamping and bungalows under the same brand.",
    },
  },
  {
    id: "quiet-glamping",
    tr: {
      title: "Quiet Abana Glamping",
      type: "Glamping",
      area: "Hacıveli",
      desc: "Doğa içinde lüks çadır konaklama; online rezervasyon üzerinden.",
    },
    en: {
      title: "Quiet Abana Glamping",
      type: "Glamping",
      area: "Hacıveli",
      desc: "Luxury glamping in nature; book via online platforms.",
    },
  },
  {
    id: "berrunil",
    phone: "0366 585 53 63",
    tr: {
      title: "Berrunil Otel",
      type: "Otel",
      area: "Yakaören / İlişi (Abana sınırı)",
      desc: "Özel plaj, havuz ve spa; Abana–Bozkurt sahil hattında.",
    },
    en: {
      title: "Berrunil Hotel",
      type: "Hotel",
      area: "Yakaören / İlişi (Abana border)",
      desc: "Private beach, pool and spa on the Abana–Bozkurt coastal strip.",
    },
  },
  {
    id: "saracoglu",
    phone: "0366 564 26 75",
    tr: {
      title: "Saraçoğlu Otel",
      type: "Otel",
      area: "Merkez, Cevizlik Sk.",
      desc: "Aile işletmesi ~40 oda; kahvaltı ve ev yemekleri.",
    },
    en: {
      title: "Saraçoğlu Hotel",
      type: "Hotel",
      area: "Center, Cevizlik St.",
      desc: "Family-run ~40 rooms; breakfast and home-style meals.",
    },
  },
  {
    id: "umit-pansiyon",
    phone: "0366 564 11 07",
    tr: {
      title: "Ümit Pansiyon",
      type: "Pansiyon",
      area: "Merkez, Mahmut Türe Şekerci Cd.",
      desc: "Merkezi konumda ekonomik pansiyon.",
    },
    en: {
      title: "Ümit Pension",
      type: "Pension",
      area: "Center, Mahmut Türe Şekerci St.",
      desc: "Budget pension in a central location.",
    },
  },
  {
    id: "sahil-pansiyon",
    phone: "0366 564 15 41",
    tr: {
      title: "Sahil Pansiyon",
      type: "Pansiyon",
      area: "Merkez, sahil hattı",
      desc: "Küçük butik pansiyon, denize yakın.",
    },
    en: {
      title: "Sahil Pension",
      type: "Pension",
      area: "Center, coastline",
      desc: "Small boutique pension near the sea.",
    },
  },
  {
    id: "kutay-motel",
    phone: "0366 564 18 90",
    tr: {
      title: "Kutay Motel",
      type: "Motel",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "Ekonomik sahil moteli, plaja yakın.",
    },
    en: {
      title: "Kutay Motel",
      type: "Motel",
      area: "Center, Kamil Demircioğlu St.",
      desc: "Economical seaside motel close to the beach.",
    },
  },
  {
    id: "agac-motel",
    phone: "0538 573 01 32",
    tr: {
      title: "Ağaç Motel",
      type: "Motel",
      area: "Merkez, Hilmi Uran Cd.",
      desc: "Denize sıfır, ağaçlık alanda; helal mutfak.",
    },
    en: {
      title: "Ağaç Motel",
      type: "Motel",
      area: "Center, Hilmi Uran St.",
      desc: "Seafront among trees; halal kitchen.",
    },
  },
  {
    id: "gunbatimi-koy",
    phone: "0366 564 21 36",
    tr: {
      title: "Günbatımı Tatil Köyü",
      type: "Tatil köyü",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "Sahil kenarında bungalov ve kafe/bar.",
    },
    en: {
      title: "Günbatımı Holiday Village",
      type: "Holiday village",
      area: "Center, Kamil Demircioğlu St.",
      desc: "Coastal holiday units with café and bar.",
    },
  },
];

export const dining: Dining[] = [
  {
    id: "patika",
    phone: "0532 163 22 09",
    tr: {
      title: "Patika Cafe & Restaurant",
      type: "Restoran · kafe",
      area: "Konakören (İlişi)",
      desc: "Karadeniz ve Türk mutfağı; manzaralı teras.",
      specialty: "Izgara, deniz ürünleri",
    },
    en: {
      title: "Patika Cafe & Restaurant",
      type: "Restaurant · café",
      area: "Konakören (İlişi)",
      desc: "Black Sea and Turkish cuisine with a scenic terrace.",
      specialty: "Grills, seafood",
    },
  },
  {
    id: "seyir-terasi",
    phone: "0366 564 22 22",
    tr: {
      title: "Abana Seyir Terası",
      type: "Restoran · lokanta",
      area: "Bağlık Mah.",
      desc: "Deniz ve orman manzarası; düğün ve etkinlik alanı.",
      specialty: "Izgara, kebap",
    },
    en: {
      title: "Abana View Terrace",
      type: "Restaurant",
      area: "Bağlık neighborhood",
      desc: "Sea and forest views; weddings and events.",
      specialty: "Grills, kebab",
    },
  },
  {
    id: "balcoon",
    phone: "0545 553 37 37",
    tr: {
      title: "Abana Balcoon",
      type: "Restoran",
      area: "Merkez, Bahattin Yorgancı Cd.",
      desc: "Deniz manzaralı teras; Türk mutfağı ve balık.",
      specialty: "Balık, meze",
    },
    en: {
      title: "Abana Balcoon",
      type: "Restaurant",
      area: "Center, Bahattin Yorgancı St.",
      desc: "Sea-view terrace; Turkish cuisine and fish.",
      specialty: "Fish, meze",
    },
  },
  {
    id: "albatros-restoran",
    tr: {
      title: "Abana Albatros Restoran",
      type: "Restoran",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "Pansiyon bünyesinde; hafta sonu canlı müzik.",
      specialty: "Deniz manzarası",
    },
    en: {
      title: "Abana Albatros Restaurant",
      type: "Restaurant",
      area: "Center, Kamil Demircioğlu St.",
      desc: "At the pension; live music on weekends.",
      specialty: "Sea views",
    },
  },
  {
    id: "yesilyuva-ocakbasi",
    phone: "0366 564 22 76",
    tr: {
      title: "Yeşilyuva Ocakbaşı Kebap Lahmacun",
      type: "Ocakbaşı · lokanta",
      area: "Merkez, Hilmi Uran Cd.",
      desc: "Lahmacun, kebap, pide ve etli ekmek.",
      specialty: "Lahmacun, kebap",
    },
    en: {
      title: "Yeşilyuva Ocakbaşı Kebap Lahmacun",
      type: "Grill house",
      area: "Center, Hilmi Uran St.",
      desc: "Lahmacun, kebab, pide and etli ekmek.",
      specialty: "Lahmacun, kebab",
    },
  },
  {
    id: "damla",
    phone: "0366 564 12 87",
    tr: {
      title: "Damla Restaurant",
      type: "Lokanta",
      area: "Merkez, Hilmi Uran Cd.",
      desc: "Meydana yakın; gözleme ve kebap.",
      specialty: "Gözleme, kebap",
    },
    en: {
      title: "Damla Restaurant",
      type: "Local restaurant",
      area: "Center, Hilmi Uran St.",
      desc: "Near the square; gözleme and kebab.",
      specialty: "Gözleme, kebab",
    },
  },
  {
    id: "ayce-liman",
    phone: "0366 564 24 10",
    tr: {
      title: "Ayce Liman Cafe & Balık Restaurant",
      type: "Balık restoranı",
      area: "Liman mevki",
      desc: "Taze balık ve deniz ürünleri; liman kenarı.",
      specialty: "Balık, meze",
    },
    en: {
      title: "Ayce Liman Cafe & Fish Restaurant",
      type: "Fish restaurant",
      area: "Harbor area",
      desc: "Fresh fish and seafood by the harbor.",
      specialty: "Fish, meze",
    },
  },
  {
    id: "gunbatimi-restoran",
    phone: "0366 564 21 36",
    tr: {
      title: "Günbatımı Restaurant",
      type: "Balık restoranı",
      area: "Merkez, Necati Çakıcı Sk.",
      desc: "Gün batımı manzaralı balıkçı restoran.",
      specialty: "Balık",
    },
    en: {
      title: "Günbatımı Restaurant",
      type: "Fish restaurant",
      area: "Center, Necati Çakıcı St.",
      desc: "Fish restaurant with sunset views.",
      specialty: "Fish",
    },
  },
  {
    id: "sakli-bahce",
    phone: "0532 056 84 71",
    tr: {
      title: "Hacıveli Saklı Bahçe",
      type: "Kafe",
      area: "Hacıveli Mah.",
      desc: "Bahçe içi sakin kafe; yerel kahvaltı.",
      specialty: "Kahvaltı, çay",
    },
    en: {
      title: "Hacıveli Hidden Garden",
      type: "Café",
      area: "Hacıveli neighborhood",
      desc: "Quiet garden café; local breakfast.",
      specialty: "Breakfast, tea",
    },
  },
  {
    id: "econun-yeri",
    phone: "0366 564 11 50",
    tr: {
      title: "Eco'nun Yeri",
      type: "Kafe",
      area: "Merkez, Uğur Mumcu Bul.",
      desc: "Merkezde günlük kafe ve atıştırmalık.",
      specialty: "Kafe",
    },
    en: {
      title: "Eco'nun Yeri",
      type: "Café",
      area: "Center, Uğur Mumcu Blvd.",
      desc: "Everyday café and snacks in the center.",
      specialty: "Café fare",
    },
  },
  {
    id: "hayal-kahvesi",
    tr: {
      title: "Hayal Kahvesi",
      type: "Kafe · pub",
      area: "Merkez, Hilmi Uran Cd.",
      desc: "Akşam saatlerinde popüler içecek ve atıştırmalık noktası.",
      specialty: "Kahve, içecek",
    },
    en: {
      title: "Hayal Kahvesi",
      type: "Café · pub",
      area: "Center, Hilmi Uran St.",
      desc: "Popular evening spot for drinks and snacks.",
      specialty: "Coffee, drinks",
    },
  },
  {
    id: "garden-restoran",
    phone: "0366 564 44 44",
    tr: {
      title: "Abana Garden Hotel Restoran",
      type: "Restoran · kafe",
      area: "Merkez, Kamil Demircioğlu Cd.",
      desc: "Otel restoranı; misafir olmayanlara da açık.",
      specialty: "Balık, pastane ürünleri",
    },
    en: {
      title: "Abana Garden Hotel Restaurant",
      type: "Restaurant · café",
      area: "Center, Kamil Demircioğlu St.",
      desc: "Hotel restaurant open to non-guests.",
      specialty: "Fish, pastries",
    },
  },
  {
    id: "hasbahce",
    tr: {
      title: "Hasbahçe",
      type: "Çay bahçesi",
      area: "Merkez meydan",
      desc: "Çınar altında çay ve atıştırmalık.",
      specialty: "Çay, gözleme",
    },
    en: {
      title: "Hasbahçe",
      type: "Tea garden",
      area: "Town square",
      desc: "Tea and snacks under plane trees.",
      specialty: "Tea, gözleme",
    },
  },
  {
    id: "evren-pastanesi",
    tr: {
      title: "Evren Pastanesi",
      type: "Pastane",
      area: "Merkez",
      desc: "Tatlı, börek ve pastane ürünleri.",
      specialty: "Pastane",
    },
    en: {
      title: "Evren Bakery",
      type: "Bakery",
      area: "Center",
      desc: "Desserts, pastries and baked goods.",
      specialty: "Bakery",
    },
  },
  {
    id: "seval-pastanesi",
    tr: {
      title: "Seval Pastanesi",
      type: "Pastane",
      area: "Merkez",
      desc: "Yerel pastane ve unlu mamul.",
      specialty: "Pastane",
    },
    en: {
      title: "Seval Bakery",
      type: "Bakery",
      area: "Center",
      desc: "Local bakery and pastries.",
      specialty: "Bakery",
    },
  },
  {
    id: "pasam-doner",
    tr: {
      title: "Paşam Döner & Izgara",
      type: "Fast food",
      area: "Merkez",
      desc: "Döner ve ızgara; hızlı atıştırma.",
      specialty: "Döner",
    },
    en: {
      title: "Paşam Döner & Grill",
      type: "Fast food",
      area: "Center",
      desc: "Döner and grills; quick bites.",
      specialty: "Döner",
    },
  },
  {
    id: "nur-kebap",
    tr: {
      title: "Nur Kebap Salonu",
      type: "Kebap · lokanta",
      area: "Merkez",
      desc: "Kebap ve pide salonu.",
      specialty: "Kebap",
    },
    en: {
      title: "Nur Kebap Salonu",
      type: "Kebab house",
      area: "Center",
      desc: "Kebab and pide restaurant.",
      specialty: "Kebab",
    },
  },
  {
    id: "meydan-pide",
    tr: {
      title: "Meydan 2 Pide Salonu",
      type: "Pideci",
      area: "Merkez meydan",
      desc: "Karadeniz pidesi ve lahmacun.",
      specialty: "Pide",
    },
    en: {
      title: "Meydan 2 Pide Salonu",
      type: "Pide shop",
      area: "Town square",
      desc: "Black Sea pide and lahmacun.",
      specialty: "Pide",
    },
  },
  {
    id: "9dayi-cafe",
    tr: {
      title: "9Dayızcafe",
      type: "Kafe",
      area: "Merkez",
      desc: "Merkezde yerel kafe.",
      specialty: "Kafe",
    },
    en: {
      title: "9Dayızcafe",
      type: "Café",
      area: "Center",
      desc: "Local café in the center.",
      specialty: "Café fare",
    },
  },
];

export function telHref(phone: string) {
  return `tel:${phone.replace(/\s/g, "")}`;
}
