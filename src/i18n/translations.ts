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
      gallery: "Galeri",
      stayEat: "Rehber",
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
          cta: "Gezilecek Yerler",
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
    gallery: {
      tag: "Fotoğraflar",
      title: "Galeri",
      close: "Galeriyi kapat",
      prev: "Önceki fotoğraf",
      next: "Sonraki fotoğraf",
      showMore: "Tümünü göster",
      showLess: "Daha az göster",
    },
    stayEat: {
      tag: "Abana Rehberi",
      title: "Gezilecek Yerler ve Pratik Bilgiler",
      intro:
        "Doğa, sahil ve tarih noktalarından konaklama ve yemek seçeneklerine, Kastamonu üzerinden ulaşıma kadar Abana planınızı tek yerden oluşturun. Yaz sezonunda rezervasyon ve telefon teyidi önerilir.",
      tabPlaces: "Gezilecek Yerler",
      tabLodging: "Konaklama",
      tabDining: "Yemek",
      tabTransport: "Ulaşım",
      placesCount: "{n} gezilecek nokta",
      lodgingCount: "{n} konaklama seçeneği",
      diningCount: "{n} yeme-içme noktası",
      transportSubtitle: "Kastamonu'dan Abana'ya adım adım",
      specialty: "Öne çıkan",
      call: "Ara",
      website: "Web sitesi",
      note:
        "Liste yerel kaynaklara dayanır; saatler ve işletme durumu mevsime göre değişebilir. Gitmeden önce arayıp teyit edin. Hostel bulunmamaktadır.",
    },
    transport: {
      tag: "Nasıl Gidilir?",
      title: "Ulaşım Bilgileri",
      intro:
        "Abana’ya ulaşım Kastamonu üzerinden planlanır. Önce nereden başlayacağınızı seçin; ardından otogardan Abana’ya gidiş seçeneklerini adım adım gösterelim.",
      planner: {
        stepStart: "Başlangıç",
        stepAirport: "Havalimanı",
        stepAbana: "Abana",
        startQuestion: "Lütfen başlangıç noktanızı seçin",
        startHint: "Havalimanına mı indiniz, yoksa doğrudan Kastamonu otogarında mısınız?",
        origins: {
          airport: "Havalimanı",
          station: "Kastamonu Otogarı",
          airportHint: "KFS — iniş sonrası yönlendirme",
          stationHint: "Minibüs veya özel araç seçimi",
        },
        back: "Geri",
        changeStart: "Başlangıç noktasını değiştir",
        airport: {
          title: "Havalimanından sonra",
          intro:
            "Kastamonu Havalimanı’na (KFS) indikten sonra Abana yolculuğu genelde otogar üzerinden devam eder.",
          municipalTitle: "Belediye otobüsü",
          municipalDesc:
            "Uçak inişinin ardından havalimanı çıkışında belediye otobüsü beklemektedir. Hızlı olun — kısa sürede dolabilir. Bu servisle Kastamonu otogarına ulaşabilirsiniz.",
          taxiTitle: "Taksi veya özel araç",
          taxiDesc:
            "Taksi ya da kiralık araç tercih edecekseniz hedefiniz Kastamonu otogarı olmalıdır. Oradan Abana minibüsüne geçebilir veya özel araçla devam edebilirsiniz.",
          mapTitle: "Havalimanı → Kastamonu Otogarı",
          mapCta: "Rotayı Google Haritalar’da aç",
          continue: "Otogara vardım, devam et",
        },
        modeQuestion: "Otogardan Abana’ya nasıl gideceksiniz?",
        modeHint: "Minibüs veya özel araç seçeneğini işaretleyin",
        modes: {
          minibus: "Minibüs",
          car: "Özel araç",
        },
        minibus: {
          title: "Otogardan Abana minibüsü",
          desc:
            "Kastamonu otogarından Abana’ya giden minibüs hatları çalışır. Sefer saatleri mevsime göre değişir; yola çıkmadan arayıp teyit edin.",
          note:
            "Yaz sezonunda seferler sıklaşır. Son minibüs saatini mutlaka telefonla sorun.",
          operatorsTitle: "Abana yönü firmalar",
          operators: [
            {
              name: "Sahil Tur",
              route: "Kastamonu – Abana – Bozkurt",
              phone: "0366 215 46 76",
            },
            {
              name: "Abana Bozkurt Seyahat",
              route: "Kastamonu – Abana – Bozkurt",
              phone: "0366 564 14 88",
            },
          ],
          stationPhone: "0366 214 10 10",
          stationPhoneLabel: "Kastamonu Otogarı (genel bilgi)",
        },
        car: {
          title: "Özel araçla Abana",
          desc: "Kastamonu otogarından veya merkezden D010 ile sahile inilir.",
          points: [
            "Güzergâh: Kastamonu – Devrekâni – Bozkurt – Abana (D010)",
            "Mesafe / süre: yaklaşık 98 km, 1,5–2 saat",
            "Sahil yolu virajlıdır; yazın manzara molası planlayabilirsiniz",
          ],
          mapTitle: "Kastamonu → Abana",
          mapCta: "Rotayı Google Haritalar’da aç",
        },
      },
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
      disclaimer:
        "Bu site Abana Belediyesi ile resmi bir bağlantı taşımaz. Proje, Abana’yı tanıtmak amacıyla Arjen tarafından gönüllü olarak geliştirilmiştir.",
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
      gallery: "Gallery",
      stayEat: "Guide",
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
          cta: "Places to Visit",
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
    gallery: {
      tag: "Photos",
      title: "Gallery",
      close: "Close gallery",
      prev: "Previous photo",
      next: "Next photo",
      showMore: "Show all",
      showLess: "Show less",
    },
    stayEat: {
      tag: "Abana Guide",
      title: "Places to Visit & Practical Info",
      intro:
        "From nature, beach and historic sights to lodging, dining and step-by-step transport from Kastamonu — plan your Abana trip in one place. Book ahead and call to confirm in summer.",
      tabPlaces: "Places to Visit",
      tabLodging: "Lodging",
      tabDining: "Dining",
      tabTransport: "Transport",
      placesCount: "{n} places to visit",
      lodgingCount: "{n} places to stay",
      diningCount: "{n} places to eat",
      transportSubtitle: "Step-by-step from Kastamonu to Abana",
      specialty: "Highlights",
      call: "Call",
      website: "Website",
      note:
        "List based on local sources; hours and availability vary by season. Call ahead before visiting. No hostels found in Abana.",
    },
    transport: {
      tag: "How to Get There",
      title: "Transport Information",
      intro:
        "Getting to Abana is planned via Kastamonu. First choose where you are starting; then we will walk you through the options from the bus station to Abana.",
      planner: {
        stepStart: "Start",
        stepAirport: "Airport",
        stepAbana: "Abana",
        startQuestion: "Please select your starting point",
        startHint: "Did you land at the airport, or are you already at Kastamonu bus station?",
        origins: {
          airport: "Airport",
          station: "Kastamonu Bus Station",
          airportHint: "KFS — guidance after landing",
          stationHint: "Choose minibus or private car",
        },
        back: "Back",
        changeStart: "Change starting point",
        airport: {
          title: "After the airport",
          intro:
            "After landing at Kastamonu Airport (KFS), the journey to Abana usually continues via the bus station.",
          municipalTitle: "Municipal bus",
          municipalDesc:
            "A municipal bus waits at the airport exit after your flight lands. Be quick — it fills up fast. This service takes you to Kastamonu bus station.",
          taxiTitle: "Taxi or private car",
          taxiDesc:
            "If you prefer a taxi or rental car, head to Kastamonu bus station. From there you can take a minibus to Abana or continue by car.",
          mapTitle: "Airport → Kastamonu Bus Station",
          mapCta: "Open route in Google Maps",
          continue: "I'm at the station, continue",
        },
        modeQuestion: "How will you get from the station to Abana?",
        modeHint: "Choose minibus or private car",
        modes: {
          minibus: "Minibus",
          car: "Private car",
        },
        minibus: {
          title: "Minibus from the station to Abana",
          desc:
            "Minibuses run from Kastamonu bus station to Abana. Schedules vary by season — call ahead before you travel.",
          note:
            "Services are more frequent in summer. Always confirm the last minibus by phone.",
          operatorsTitle: "Operators toward Abana",
          operators: [
            {
              name: "Sahil Tur",
              route: "Kastamonu – Abana – Bozkurt",
              phone: "0366 215 46 76",
            },
            {
              name: "Abana Bozkurt Seyahat",
              route: "Kastamonu – Abana – Bozkurt",
              phone: "0366 564 14 88",
            },
          ],
          stationPhone: "0366 214 10 10",
          stationPhoneLabel: "Kastamonu Bus Station (general info)",
        },
        car: {
          title: "Driving to Abana",
          desc: "From Kastamonu bus station or the city center, take the D010 down to the coast.",
          points: [
            "Route: Kastamonu – Devrekâni – Bozkurt – Abana (D010)",
            "Distance / time: about 98 km, 1.5–2 hours",
            "The coastal road is winding; in summer you can plan a viewpoint stop",
          ],
          mapTitle: "Kastamonu → Abana",
          mapCta: "Open route in Google Maps",
        },
      },
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
      disclaimer:
        "This site is not officially affiliated with Abana Municipality. The project was voluntarily developed by Arjen to promote Abana.",
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
