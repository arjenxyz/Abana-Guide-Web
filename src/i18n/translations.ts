export type Locale = "tr" | "en";

export const translations = {
  tr: {
    meta: {
      title: "Abana Gezi Rehberi | Kastamonu",
      description:
        "Karadeniz'in saklı cenneti Abana'yı keşfedin. Gezilecek yerler, aktiviteler, ulaşım ve konaklama bilgileri.",
    },
    nav: {
      home: "Ana Sayfa",
      about: "Hakkında",
      places: "Gezilecek Yerler",
      activities: "Aktiviteler",
      gallery: "Galeri",
      panorama: "360°",
      transport: "Ulaşım",
      contact: "İletişim",
      menu: "Menü",
      assistant: "Abana Asistanı",
      guide: "Gezi Rehberi",
    },
    hero: {
      slides: [
        {
          title: "Abana'ya Hoş Geldiniz",
          desc: "Karadeniz'in saklı cenneti, doğası ve sahilleriyle büyüleyen Kastamonu'nun incisi",
          cta: "Keşfet",
        },
        {
          title: "11 km Sahil Şeridi",
          desc: "Karadeniz'in en uzun ve en düzenli sahillerinden birinde güneşin doğuşunu ve batışını izleyin",
          cta: "Detayları Gör",
        },
        {
          title: "Doğa ile İç İçe",
          desc: "Hacıveli Kanyonu, Kent Ormanı ve Toza Seyir Tepesi sizi bekliyor",
          cta: "Aktiviteleri Keşfet",
        },
      ],
    },
    about: {
      tag: "Keşfedilmeyi Bekliyor",
      title: "Abana Hakkında",
      p1: "Abana, Kastamonu'nun Karadeniz kıyısında yer alan, doğal güzellikleri ve sakin yaşamıyla öne çıkan şirin bir sahil ilçesidir. Yaklaşık 11 kilometre uzunluğundaki sahil şeridi ve 33 km² yüzölçümüyle, deniz ile dağ arasında sadece 100 metre mesafe bulunan eşsiz bir coğrafyaya sahiptir.",
      p2: "Yaz aylarında canlanan turizm hareketliliği, temiz plajları, yemyeşil ormanları ve tarihi dokusuyla Abana, hem doğa severlerin hem de huzur arayanların vazgeçilmez rotalarından biridir. Güneşin Karadeniz üzerinden doğup yine deniz üzerinde batışını izlemek ilçenin en güzel deneyimlerinden biridir.",
      stats: [
        { value: "11 km", label: "Sahil Şeridi" },
        { value: "33 km²", label: "Yüzölçümü" },
        { value: "98 km", label: "Kastamonu'ya" },
        { value: "22°C", label: "Yaz Ortalaması" },
      ],
      location: "Kastamonu, Türkiye",
      beachAlt: "Abana Sahili",
    },
    places: {
      tag: "Doğa & Tarih",
      title: "Gezilecek Yerler",
      items: [
        {
          title: "Hacıveli Kanyonu",
          desc: "İlçe merkezine 8 km uzaklıkta, 3 km yürüyüş parkuru bulunan etkileyici bir kanyon. Trekking ve doğa fotoğrafçılığı için ideal.",
          badge: "Doğa",
          meta: ["8 km", "~3 saat"],
        },
        {
          title: "Toza Seyir Tepesi",
          desc: "Konakören Mahallesi'nde, iki seyir balkonundan Karadeniz'in panoramik manzarasını izleyebileceğiniz muhteşem bir nokta.",
          badge: "Manzara",
          meta: ["12 km", "Fotoğraf"],
        },
        {
          title: "Kent Ormanı & Seyir Terası",
          desc: "Orman içi yürüyüş yolları ve seyir terası ile Karadeniz manzarası eşliğinde doğayla baş başa kalın.",
          badge: "Orman",
          meta: ["Merkez", "Piknik"],
        },
        {
          title: "Abana Sahili",
          desc: "11 km boyunca uzanan kumsallarıyla Karadeniz'in en güzel sahillerinden biri. Yüzme, yürüyüş ve gün batımı izleme için mükemmel.",
          badge: "Sahil",
          meta: ["Merkez", "Tem-Eyl"],
        },
        {
          title: "Yeşilyuva Tabiat Parkı",
          desc: "Doğa yürüyüşü ve kamp yapmak isteyenler için mükemmel bir alan. Zengin bitki örtüsü ve temiz havası ile huzur dolu.",
          badge: "Doğa",
          meta: ["Yeşilyuva", "Kamp"],
        },
        {
          title: "Harmason (Mevlana) Camii",
          desc: "Osmanlı mimarisiyle dikkat çeken tarihi cami ve çevresindeki yaşlı çınar ağaçları görülmeye değer.",
          badge: "Tarih",
          meta: ["12 km", "Tarihi"],
        },
      ],
    },
    activities: {
      tag: "Yapılacaklar",
      title: "Aktiviteler",
      items: [
        { title: "Trekking", desc: "Hacıveli Kanyonu ve dağ parkurlarında doğa yürüyüşleri" },
        { title: "Deniz & Plaj", desc: "Temiz kumsallarda yüzme, güneşlenme ve su sporları" },
        { title: "Fotoğrafçılık", desc: "Seyir tepeleri ve doğa alanlarında profesyonel çekim" },
        { title: "Kamp", desc: "Yeşilyuva Tabiat Parkı'nda doğayla iç içe kamp" },
        { title: "Balıkçılık", desc: "Karadeniz sahilinde sportif balık avı deneyimi" },
        { title: "Yerel Lezzetler", desc: "Karadeniz mutfağının eşsiz tatlarını keşfedin" },
      ],
    },
    gallery: {
      tag: "Fotoğraflar",
      title: "Galeri",
      items: [
        "Abana Sahili",
        "Yağmur sonrası gökkuşağı",
        "Yeşilyuva Tabiat Parkı",
        "Deniz manzaralı piknik",
        "Kordon ve sahil",
        "Gün batımı",
        "Tarihi ahşap konak",
        "Fırtınalı Karadeniz",
      ],
    },
    panorama: {
      tag: "Sanal Tur",
      title: "360° Panorama",
      intro:
        "Abana’da çekilmiş geniş panoramalarda sağa sola kaydırarak sahili, mesire alanını ve gece manzarasını gezin. Aşağıda belediyenin Street View turu da duruyor.",
      hint: "Fareyle sürükleyin veya parmağınızla kaydırın. Ok tuşlarıyla da bakış açısını kaydırabilirsiniz.",
      scenes: [
        {
          title: "Sahil kordonu",
          desc: "Denizden ilçe meydanına, palmiyeler ve caminin minaresine kadar sahil şeridi",
        },
        {
          title: "Yeşilyuva mesire",
          desc: "Çamlık, piknik masaları, mangal alanı ve denize açılan orman içi durak",
        },
        {
          title: "Gece manzarası",
          desc: "Yamaçtaki evler ve bulutların altındaki Abana gecesi",
        },
      ],
      location: "Abana Merkez — Street View",
      locationDesc: "Merkez Mahallesi, Atatürk Bulvarı çevresi",
      openOfficial: "Belediye 360° turu",
    },
    transport: {
      tag: "Nasıl Gidilir?",
      title: "Ulaşım Bilgileri",
      intro:
        "Abana, Kastamonu'nun Karadeniz kıyısında; il merkezine yaklaşık 98 km uzaklıktadır. İlçe küçük olduğu için merkeze vardıktan sonra çoğu yere yürüyerek veya kısa minibüs yolculuğuyla ulaşılır.",
      items: [
        {
          title: "Özel Araç",
          desc: "En pratik ve esnek seçenek. Yaz sezonunda sahil yolunda manzara molaları planlayın.",
          points: [
            "Kastamonu → Abana: D010, yaklaşık 98 km / 1 saat 30 dk – 2 saat",
            "Güzergâh: Kastamonu – Devrekâni – Bozkurt – Abana",
            "İstanbul → Abana: yaklaşık 520–560 km / 7–8 saat (Karadeniz sahil yolu veya Ankara üzerinden)",
            "Ankara → Abana: yaklaşık 320–350 km / 4,5–5,5 saat",
            "İnebolu → Abana: sahil yolu, yaklaşık 25 km / 25–35 dk",
            "Çatalzeytin → Abana: doğu komşu ilçe, kısa sahil bağlantısı",
          ],
        },
        {
          title: "Otobüs & Minibüs",
          desc: "Abana'ya doğrudan şehirlerarası sefer azdır; çoğu yolcu Kastamonu veya İnebolu aktarması kullanır.",
          points: [
            "İstanbul, Ankara ve diğer illerden Kastamonu otogarına otobüs",
            "Kastamonu otogarından Abana / Bozkurt / İnebolu minibüs veya dolmuş hatları",
            "Yaz aylarında sefer sıklığı artar; kışın son seferi kaçırmamak için sorun",
            "İnebolu üzerinden gelenler sahil minibüsleriyle Abana'ya bağlanır",
            "İlçe içi: merkez küçük, çoğu nokta 10 dakikalık yürüme mesafesinde",
          ],
        },
        {
          title: "Havayolu",
          desc: "En yakın havalimanı Kastamonu (KFS). Oradan karayoluyla Abana'ya devam edilir.",
          points: [
            "Kastamonu Havalimanı (KFS): Abana'ya yaklaşık 105 km / 1,5–2 saat",
            "Havalimanından araç kiralama veya Kastamonu merkeze transfer",
            "Merkezden minibüs / özel araç ile Abana",
            "Alternatif: Sinop, Zonguldak Çaycuma veya Samsun havalimanları + karayolu",
            "Yaz döneminde iç hat seferlerini önceden kontrol edin",
          ],
        },
      ],
      distancesTitle: "Yaklaşık mesafeler",
      distances: [
        { from: "Kastamonu", km: "98 km", time: "1,5–2 saat" },
        { from: "İnebolu", km: "25 km", time: "25–35 dk" },
        { from: "Ankara", km: "320–350 km", time: "4,5–5,5 saat" },
        { from: "İstanbul", km: "520–560 km", time: "7–8 saat" },
      ],
      tipsTitle: "Pratik notlar",
      tips: [
        "İlçeyi uçtan uca geçmek yaklaşık 10 dakika sürer; merkeze yakın konaklama yürüyüş için idealdir.",
        "Hacıveli Kanyonu (~8 km) ve Toza Seyir Tepesi (~12 km) için özel araç veya taksi/minibüs gerekir.",
        "Temmuz–Eylül arası yoğunluk artar; otopark ve konaklamayı erken planlayın.",
        "Karadeniz sahil yolu virajlıdır; gece sürüşünde temkinli olun.",
        "Güncel sefer saatleri için Kastamonu otogarı ve Abana Belediyesi duyurularını kontrol edin.",
      ],
      mapTitle: "Haritada Abana",
    },
    contact: {
      tag: "Bize Ulaşın",
      title: "İletişim",
      address: "Adres",
      addressText: "Abana, Kastamonu / Türkiye",
      web: "Web",
      info: "Bilgi",
      infoText: "Abana Belediyesi Turizm Birimi",
      namePlaceholder: "Adınız Soyadınız",
      emailPlaceholder: "E-posta Adresiniz",
      messagePlaceholder: "Mesajınız...",
      send: "Gönder",
      success: "Mesajınız gönderildi! Teşekkürler.",
    },
    footer: {
      desc: "Karadeniz'in saklı cenneti, doğası ve sahilleriyle büyüleyen Kastamonu'nun incisi.",
      quickLinks: "Hızlı Bağlantılar",
      usefulLinks: "Faydalı Linkler",
      social: "Sosyal Medya",
      municipality: "Abana Belediyesi",
      news: "Abana Haber",
      governorship: "Kastamonu Valiliği",
      copyright: "© 2026 Abana Gezi Rehberi. Tüm hakları saklıdır.",
      photoCredit:
        "Fotoğraflar: Abana yerinde çekimler · Wikimedia Commons · Pexels",
    },
    chat: {
      open: "Chatbot aç",
      close: "Chatbot kapat",
      subtitle: "Turistik bilgi desteği",
      typing: "Yazıyor...",
      placeholder: "Sorunuzu yazın...",
      send: "Mesaj gönder",
      welcome:
        "Merhaba! Ben Abana gezi asistanıyım. Abana hakkında ne öğrenmek istersiniz?",
      noReply:
        "Şu anda net bir yanıt üretemedim. Lütfen soruyu farklı şekilde tekrar yazar mısınız?",
      error:
        "Şu anda asistan servisine bağlanamadım. Birkaç saniye sonra tekrar dener misiniz?",
      quickQuestions: [
        "Abana'da nereler gezilir?",
        "En iyi denize girme dönemi ne zaman?",
        "Abana'ya nasıl gidilir?",
        "Doğa yürüyüşü için öneri ver",
      ],
    },
  },
  en: {
    meta: {
      title: "Abana Travel Guide | Kastamonu",
      description:
        "Discover Abana, the hidden gem of the Black Sea. Places to visit, activities, transport and accommodation information.",
    },
    nav: {
      home: "Home",
      about: "About",
      places: "Places to Visit",
      activities: "Activities",
      gallery: "Gallery",
      panorama: "360°",
      transport: "Transport",
      contact: "Contact",
      menu: "Menu",
      assistant: "Abana Assistant",
      guide: "Travel Guide",
    },
    hero: {
      slides: [
        {
          title: "Welcome to Abana",
          desc: "Kastamonu's hidden gem on the Black Sea, captivating with its nature and beaches",
          cta: "Explore",
        },
        {
          title: "11 km Coastline",
          desc: "Watch the sunrise and sunset on one of the Black Sea's longest and most pristine beaches",
          cta: "Learn More",
        },
        {
          title: "Immersed in Nature",
          desc: "Hacıveli Canyon, City Forest and Toza Viewpoint await you",
          cta: "Discover Activities",
        },
      ],
    },
    about: {
      tag: "Waiting to Be Discovered",
      title: "About Abana",
      p1: "Abana is a charming coastal district of Kastamonu on the Black Sea, known for its natural beauty and peaceful lifestyle. With approximately 11 km of coastline and an area of 33 km², it has a unique geography where the sea and mountains are only 100 meters apart.",
      p2: "With bustling tourism in summer, clean beaches, lush forests and historic charm, Abana is a must-visit for nature lovers and those seeking tranquility. Watching the sun rise and set over the Black Sea is one of the district's finest experiences.",
      stats: [
        { value: "11 km", label: "Coastline" },
        { value: "33 km²", label: "Area" },
        { value: "98 km", label: "To Kastamonu" },
        { value: "22°C", label: "Summer Average" },
      ],
      location: "Kastamonu, Turkey",
      beachAlt: "Abana Beach",
    },
    places: {
      tag: "Nature & History",
      title: "Places to Visit",
      items: [
        {
          title: "Hacıveli Canyon",
          desc: "A stunning canyon 8 km from the town center with a 3 km hiking trail. Ideal for trekking and nature photography.",
          badge: "Nature",
          meta: ["8 km", "~3 hours"],
        },
        {
          title: "Toza Viewpoint",
          desc: "In Konakören neighborhood, a magnificent spot with two viewing balconies overlooking the panoramic Black Sea.",
          badge: "View",
          meta: ["12 km", "Photography"],
        },
        {
          title: "City Forest & View Terrace",
          desc: "Forest trails and a viewing terrace where you can enjoy the Black Sea scenery in nature.",
          badge: "Forest",
          meta: ["Center", "Picnic"],
        },
        {
          title: "Abana Beach",
          desc: "One of the Black Sea's finest beaches with 11 km of sandy shores. Perfect for swimming, walking and sunset watching.",
          badge: "Beach",
          meta: ["Center", "Jul-Sep"],
        },
        {
          title: "Yeşilyuva Nature Park",
          desc: "A perfect area for hiking and camping with rich vegetation and clean air.",
          badge: "Nature",
          meta: ["Yeşilyuva", "Camping"],
        },
        {
          title: "Harmason (Mevlana) Mosque",
          desc: "Historic mosque with Ottoman architecture and ancient plane trees worth seeing.",
          badge: "History",
          meta: ["12 km", "Historic"],
        },
      ],
    },
    activities: {
      tag: "Things to Do",
      title: "Activities",
      items: [
        { title: "Trekking", desc: "Nature hikes in Hacıveli Canyon and mountain trails" },
        { title: "Sea & Beach", desc: "Swimming, sunbathing and water sports on clean beaches" },
        { title: "Photography", desc: "Professional shots at viewpoints and natural areas" },
        { title: "Camping", desc: "Camp in nature at Yeşilyuva Nature Park" },
        { title: "Fishing", desc: "Sport fishing experience on the Black Sea coast" },
        { title: "Local Cuisine", desc: "Discover the unique flavors of Black Sea cuisine" },
      ],
    },
    gallery: {
      tag: "Photos",
      title: "Gallery",
      items: [
        "Abana Beach",
        "Rainbow after the rain",
        "Yeşilyuva Nature Park",
        "Picnic with a sea view",
        "Promenade and coast",
        "Sunset",
        "Historic wooden mansion",
        "Stormy Black Sea",
      ],
    },
    panorama: {
      tag: "Virtual Tour",
      title: "360° Panorama",
      intro:
        "Swipe left and right through wide panoramas shot in Abana — the waterfront, the picnic woods, and the town at night. The municipality Street View tour is below.",
      hint: "Drag with the mouse or swipe with your finger. Use the arrows to pan across the scene.",
      scenes: [
        {
          title: "Seafront promenade",
          desc: "From the shore to the town square, palms and the mosque minaret",
        },
        {
          title: "Yeşilyuva picnic woods",
          desc: "Pines, picnic tables, a barbecue spot and a clearing that opens to the sea",
        },
        {
          title: "Night view",
          desc: "Houses on the hillside under clouds on an Abana night",
        },
      ],
      location: "Abana Center — Street View",
      locationDesc: "Merkez neighborhood, around Atatürk Boulevard",
      openOfficial: "Municipality 360° tour",
    },
    transport: {
      tag: "How to Get There",
      title: "Transport Information",
      intro:
        "Abana sits on Kastamonu's Black Sea coast, about 98 km from the provincial center. The town is small: once you arrive, most places are a short walk or minibus ride away.",
      items: [
        {
          title: "Private Car",
          desc: "The most flexible option. In summer, plan short viewpoint stops along the coastal road.",
          points: [
            "Kastamonu → Abana: D010, about 98 km / 1.5–2 hours",
            "Route: Kastamonu – Devrekâni – Bozkurt – Abana",
            "Istanbul → Abana: about 520–560 km / 7–8 hours (Black Sea coast or via Ankara)",
            "Ankara → Abana: about 320–350 km / 4.5–5.5 hours",
            "İnebolu → Abana: coastal road, about 25 km / 25–35 minutes",
            "Çatalzeytin → Abana: neighboring district to the east, short coastal link",
          ],
        },
        {
          title: "Bus & Minibus",
          desc: "Direct long-distance buses to Abana are limited; most travelers transfer in Kastamonu or İnebolu.",
          points: [
            "Coaches from Istanbul, Ankara and other cities to Kastamonu bus station",
            "Minibus / dolmuş lines from Kastamonu toward Abana, Bozkurt or İnebolu",
            "More frequent services in summer; in winter ask for the last departure",
            "From İnebolu, coastal minibuses continue to Abana",
            "In town: the center is compact, most spots are within a 10-minute walk",
          ],
        },
        {
          title: "Air",
          desc: "Nearest airport is Kastamonu (KFS). Continue to Abana by road.",
          points: [
            "Kastamonu Airport (KFS): about 105 km / 1.5–2 hours to Abana",
            "Car rental or transfer from the airport to Kastamonu center",
            "Then minibus or private car to Abana",
            "Alternatives: Sinop, Zonguldak Çaycuma or Samsun airports + road transfer",
            "Check domestic flight schedules in advance during the summer season",
          ],
        },
      ],
      distancesTitle: "Approximate distances",
      distances: [
        { from: "Kastamonu", km: "98 km", time: "1.5–2 hours" },
        { from: "İnebolu", km: "25 km", time: "25–35 min" },
        { from: "Ankara", km: "320–350 km", time: "4.5–5.5 hours" },
        { from: "Istanbul", km: "520–560 km", time: "7–8 hours" },
      ],
      tipsTitle: "Practical notes",
      tips: [
        "Crossing the district end to end takes about 10 minutes; staying near the center is ideal for walking.",
        "Hacıveli Canyon (~8 km) and Toza Viewpoint (~12 km) need a car, taxi or minibus.",
        "July–September is busier; book parking and lodging early.",
        "The Black Sea coastal road is winding; drive carefully at night.",
        "Check current timetables via Kastamonu bus station and Abana Municipality notices.",
      ],
      mapTitle: "Abana on the map",
    },
    contact: {
      tag: "Get in Touch",
      title: "Contact",
      address: "Address",
      addressText: "Abana, Kastamonu / Turkey",
      web: "Web",
      info: "Info",
      infoText: "Abana Municipality Tourism Unit",
      namePlaceholder: "Your Name",
      emailPlaceholder: "Your Email",
      messagePlaceholder: "Your message...",
      send: "Send",
      success: "Your message has been sent! Thank you.",
    },
    footer: {
      desc: "The hidden gem of the Black Sea, captivating with its nature and beaches in Kastamonu.",
      quickLinks: "Quick Links",
      usefulLinks: "Useful Links",
      social: "Social Media",
      municipality: "Abana Municipality",
      news: "Abana News",
      governorship: "Kastamonu Governorship",
      copyright: "© 2026 Abana Travel Guide. All rights reserved.",
      photoCredit:
        "Photos: shot on location in Abana · Wikimedia Commons · Pexels",
    },
    chat: {
      open: "Open chatbot",
      close: "Close chatbot",
      subtitle: "Tourism information support",
      typing: "Typing...",
      placeholder: "Type your question...",
      send: "Send message",
      welcome:
        "Hello! I'm the Abana travel assistant. What would you like to know about Abana?",
      noReply:
        "I couldn't generate a clear answer. Please try rephrasing your question.",
      error:
        "Could not connect to the assistant service. Please try again in a few seconds.",
      quickQuestions: [
        "What places to visit in Abana?",
        "Best time to swim in the sea?",
        "How to get to Abana?",
        "Hiking recommendations",
      ],
    },
  },
} as const;

export type TranslationKeys = (typeof translations)[Locale];
