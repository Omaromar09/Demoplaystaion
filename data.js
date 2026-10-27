/**
 * XO PS Lounge - Data Store
 * All rooms, games, and "The Rest" café menu items
 */

const XO_DATA = {
    loungeInfo: {
        name: "XO PS Lounge",
        nameAr: "اكس او بي اس لاونج",
        tagline: "عالم البلايستيشن الفاخر والهدوء التام",
        phone: "+201012345678",
        address: "شارع النصر، أمام سيتي سنتر، الطابق الثاني",
        totalRooms: 15,
        ps5Count: 8,
        ps4Count: 7,
        ps5PricePerHour: 100, // للفرد
        ps4PricePerHour: 70,  // للفرد
        openingHours: "يومياً من 12:00 ظهراً حتى 4:00 فجراً"
    },

    // 15 Private Rooms
    rooms: [
        // --- 8 PS5 Rooms ---
        {
            id: 1,
            name: "روم 1 - القعدة العربية الملكية",
            type: "PS5",
            theme: "arabic",
            themeName: "جلسة عربية فاخرة",
            hourlyRate: 100,
            capacity: "1 - 8 أفراد",
            icon: "fa-couch",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-amber-600 to-yellow-500",
            description: "جلسة عربية ديوان فاخرة مطرزة، وسائد مريحة جداً، سجاد يدوي، إضاءة شرقية دافئة، وتكييف مركزي لعشاق اللعب في راحة تامة.",
            features: ["بلايستيشن 5 أحدث إصدار", "شاشة 65 بوصة 4K QLED", "جلسة أرضية عربية VIP", "4 دراعات DualSense أصلية", "عزل صوتي تام 100%", "بار مشروبات سريع"]
        },
        {
            id: 2,
            name: "روم 2 - سايبر نيون جيمينج",
            type: "PS5",
            theme: "gaming",
            themeName: "سايبر RGB بروفيشنال",
            hourlyRate: 100,
            capacity: "1 - 6 أفراد",
            icon: "fa-gamepad",
            image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-cyan-500 to-blue-600",
            description: "أجواء جيمينج مظلمة مع خطوط نيون زرقاء وبنفسجية RGB تفاعلية، كراسي ليزي بوي مريحة، وشاشات بمعدل تحديث 120Hz.",
            features: ["بلايستيشن 5", "شاشة سوني Bravia XR 120Hz", "إضاءة نيون RGB ديناميكية", "كراسي Lazy-Boy مريحة", "سماعات محيطية 3D", "أزرار خدمة سريعة"]
        },
        {
            id: 3,
            name: "روم 3 - ستاديوم تشامبيونز",
            type: "PS5",
            theme: "football",
            themeName: "أجواء كروية وستاديوم",
            hourlyRate: 100,
            capacity: "1 - 6 أفراد",
            icon: "fa-futbol",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-emerald-500 to-green-700",
            description: "مصممة لعشاق FC 24 و eFootball! أرضية نجيل صناعي، أعلام أندية أوروبية، ومكبرات صوت تمنحك إحساس الجماهير في الملعب.",
            features: ["بلايستيشن 5", "شاشة 70 بوصة 4K عملاقة", "تجهيز ستاديوم كروي", "شاشات عرض نتائج المباريات", "كراسي مدرجات مريحة", "عزل تام للحماس"]
        },
        {
            id: 4,
            name: "روم 4 - سكاي ريلاكس لاونج",
            type: "PS5",
            theme: "relax",
            themeName: "ريلاكس وهدوء تام",
            hourlyRate: 100,
            capacity: "1 - 5 أفراد",
            icon: "fa-cloud-moon",
            image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-sky-400 to-indigo-600",
            description: "روم مكشوفة ومود هادئ جداً، أسقف بنجوم مضيئة (Fiber Optic Star Sky)، عطور لافندر هادئة، وصوت شلالات خافت للاسترخاء.",
            features: ["بلايستيشن 5", "سقف نجوم مضيئة Star Ceiling", "كنبات فندقية فائقة النعومة", "نظام تنقية هواء معطر", "إضاءة دافئة قابلة للتعتيم", "هدوء مطلق"]
        },
        {
            id: 5,
            name: "روم 5 - نيون فايتر أرينا",
            type: "PS5",
            theme: "gaming",
            themeName: "أركيد ونيون فايتر",
            hourlyRate: 100,
            capacity: "1 - 6 أفراد",
            icon: "fa-bolt",
            image: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-pink-600 to-purple-600",
            description: "مخصصة لمباريات التحدي وألعاب القتال (Tekken 8 / Mortal Kombat 1)، إضاءة وردية وبنفسجية حماسية ومكبرات صوت اهتزازية.",
            features: ["بلايستيشن 5", "شاشة 65 بوصة استجابة 1ms", "إضاءة نيون فايتر", "كراسي ميموري فوم مريحة", "شاشات ثانوية للمشاهدين", "دراعات إضافية"]
        },
        {
            id: 6,
            name: "روم 6 - الديوان الأندلسي",
            type: "PS5",
            theme: "arabic",
            themeName: "جلسة عربية مغربية",
            hourlyRate: 100,
            capacity: "1 - 8 أفراد",
            icon: "fa-mosque",
            image: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-amber-500 to-rose-600",
            description: "طابع أندلسي راقٍ بنقوش هندسية، إضاءات فوانيس دافئة، كنبات واسعة جداً تتسع للمجموعات الكبيرة والأصدقاء.",
            features: ["بلايستيشن 5", "شاشة 65 بوصة 4K", "مجلس أرضي واسع جداً", "شاحن لاسلكي متعدد", "طاولة ضيافة مشروبات", "عازل ضوضاء مزدوج"]
        },
        {
            id: 7,
            name: "روم 7 - برو إيسبورتس ستيشن",
            type: "PS5",
            theme: "gaming",
            themeName: "إيسبورتس وبطولات",
            hourlyRate: 100,
            capacity: "1 - 4 أفراد",
            icon: "fa-trophy",
            image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-violet-600 to-blue-700",
            description: "تجهيز بطولات رسمي! كراسي DXRacer أصلية، صوت محيطي ثلاثي الأبعاد، ودراعات DualSense Edge التنافسية لمحترفي كول أوف ديوتي.",
            features: ["بلايستيشن 5", "DualSense Edge كونتورلر", "شاشة OLED بدقة 4K", "كراسي قيمنق احترافية", "تسجيل لقطات اللعب", "واي فاي فايبر فائق السرعة"]
        },
        {
            id: 8,
            name: "روم 8 - ذا بنكر رويال VIP",
            type: "PS5",
            theme: "relax",
            themeName: "سويت ملكي خاص VIP",
            hourlyRate: 100,
            capacity: "1 - 8 أفراد",
            icon: "fa-crown",
            image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-yellow-500 to-amber-700",
            description: "أفخم روم في المكان! صالة خاصة مستقلة، شاشة عملاقة 75 بوصة، كراسي جلد طبيعي ريكلاينر مع مساج، وخدمة نادل خاصة للريست.",
            features: ["بلايستيشن 5", "شاشة 75 بوصة Neo QLED", "كراسي مساج ريكلاينر", "ثلاجة ميني بار خاصة", "إضاءة تحكم ذكي باللمس", "خصوصية VIP مطلقة"]
        },

        // --- 7 PS4 Rooms ---
        {
            id: 9,
            name: "روم 9 - الجلسة العربية الأصيلة",
            type: "PS4",
            theme: "arabic",
            themeName: "قعدة عربية شعبية دافئة",
            hourlyRate: 70,
            capacity: "1 - 6 أفراد",
            icon: "fa-couch",
            image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-orange-600 to-amber-500",
            description: "قعدة عربي مريحة ومميزة، تكييف قوي، شاشة عالية الوضوح، أجواء سمر ولمة صحاب لا تعوض بأسعار اقتصادية.",
            features: ["بلايستيشن 4 برو", "شاشة 55 بوصة Smart 4K", "قعدة عربية مريحة", "دراعات DualShock 4 أصلية", "عزل صوتي كامل", "طلب مباشر من الريست"]
        },
        {
            id: 10,
            name: "روم 10 - سايبر ماتريكس نيون",
            type: "PS4",
            theme: "gaming",
            themeName: "سايبر جيمينج إلكتروني",
            hourlyRate: 70,
            capacity: "1 - 5 أفراد",
            icon: "fa-microchip",
            image: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-cyan-600 to-teal-500",
            description: "طابع ماتركس أخضر وأزرق سداسي، إضاءات LED خافتة تعزز التركيز، مخصصة لجلسات ألعاب المغامرات والشوتر.",
            features: ["بلايستيشن 4 برو", "شاشة 55 بوصة HDR", "إضاءة ماتريكس سايبر", "كراسي قيمنق مبطنة", "عزل ضوضاء ممتاز", "إنترنت ألياف ضوئية"]
        },
        {
            id: 11,
            name: "روم 11 - ستاديوم كلاسيك",
            type: "PS4",
            theme: "football",
            themeName: "أجواء دوري الأبطال",
            hourlyRate: 70,
            capacity: "1 - 6 أفراد",
            icon: "fa-futbol",
            image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-emerald-600 to-teal-700",
            description: "غرفة كروية مليئة ببوسترات أساطير كرة القدم، مصممة لماتشات التحدي والرهانات الكروية مع أصحابك.",
            features: ["بلايستيشن 4 برو", "شاشة 58 بوصة كروية", "تجهيز دوري الأبطال", "4 دراعات أصلية جاهزة", "نظام صوتي ستريو نقي", "خدمة سريعة"]
        },
        {
            id: 12,
            name: "روم 12 - ريلاكس مود تشيل",
            type: "PS4",
            theme: "relax",
            themeName: "ريلاكس وتشيل هادئ",
            hourlyRate: 70,
            capacity: "1 - 5 أفراد",
            icon: "fa-leaf",
            image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-teal-500 to-cyan-600",
            description: "غرفة هادئة ذات طابع طبيعي وألوان ترابية مريحة للعين، إضاءة صفراء دافئة، كنب مريح يجعلك تنفصل عن العالم الخارجي.",
            features: ["بلايستيشن 4 برو", "شاشة 55 بوصة", "كنبات فوتيه ريلاكس", "عزل صوتي تام", "مشروبات وهدوء كامل", "شاحن سريع"]
        },
        {
            id: 13,
            name: "روم 13 - ريترو كلاسيك جيمرز",
            type: "PS4",
            theme: "gaming",
            themeName: "ريترو ونوستالجيا الألعاب",
            hourlyRate: 70,
            capacity: "1 - 4 أفراد",
            icon: "fa-ghost",
            image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-purple-600 to-pink-500",
            description: "لعشاق ذكريات الألعاب الكلاسيكية مع لمسة مودرن، ألعاب كراش وتيكن وجي تي ايه في جو نوستالجي مميز.",
            features: ["بلايستيشن 4 برو", "شاشة 55 بوصة", "ديكورات ريترو بيكسل", "كراسي مريحة", "ألعاب كلاسيكية ومودرن", "عزل تام"]
        },
        {
            id: 14,
            name: "روم 14 - المجلس العربي المودرن",
            type: "PS4",
            theme: "arabic",
            themeName: "قعدة عربية عصرية",
            hourlyRate: 70,
            capacity: "1 - 6 أفراد",
            icon: "fa-couch",
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-amber-600 to-yellow-600",
            description: "مزيج أنيق بين القعدة العربية الأصيلة والتصميم المودرن المريح، إضاءة ليد مخفية وأرضية مبطنة بالكامل.",
            features: ["بلايستيشن 4 برو", "شاشة 55 بوصة 4K", "مجلس أرضي حديث ومريح", "عزل صوت فندقي", "أحدث الألعاب مثبتة", "خدمة الريست بكود الغرفة"]
        },
        {
            id: 15,
            name: "روم 15 - باتل أرينا إكستريم",
            type: "PS4",
            theme: "gaming",
            themeName: "باتل أرينا حماسية",
            hourlyRate: 70,
            capacity: "1 - 5 أفراد",
            icon: "fa-crosshairs",
            image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80",
            badgeColor: "from-red-600 to-orange-600",
            description: "غرفة تنافسية باللون الأحمر والأسود الناري، موجهة لألعاب الشوتر ومباريات التحدي الساخنة.",
            features: ["بلايستيشن 4 برو", "شاشة 55 بوصة فائقة السرعة", "إضاءة نيون حمراء ديناميكية", "كراسي سباق", "عزل تام للحماس والصراخ", "دراعات إضافية"]
        }
    ],

    // Top 16 games installed on consoles (15+ as requested)
    games: [
        {
            id: "fc24",
            title: "EA Sports FC 24",
            titleAr: "إي إيه سبورتس إف سي 24 (فيفا)",
            genre: "رياضة / كرة قدم",
            players: "1 - 4 لاعبين",
            rating: "4.9",
            cover: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=400&q=80",
            icon: "fa-futbol",
            badge: "الأكثر طلباً",
            description: "اللعبة الأشهر في العالم! أحدث الانتقالات، أطوار التحدي التنافسية، وحركات HyperMotion V الواقعية."
        },
        {
            id: "gta5",
            title: "Grand Theft Auto V",
            titleAr: "جي تي إيه 5 (GTA V)",
            genre: "عالم مفتوح / أكشن",
            players: "1 لاعب (أونلاين متاح)",
            rating: "4.9",
            cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=400&q=80",
            icon: "fa-car",
            badge: "أسطورة الألعاب",
            description: "عالم لوس سانتوس المفتوح بكل تفاصيله، مهمات لا تنتهي وجرافيكس فائق الجودة."
        },
        {
            id: "tekken8",
            title: "Tekken 8",
            titleAr: "تيكن 8 (Tekken 8)",
            genre: "قتال / فايتنج",
            players: "1 - 2 لاعبين",
            rating: "4.8",
            cover: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?auto=format&fit=crop&w=400&q=80",
            icon: "fa-hand-fist",
            badge: "جديد PS5",
            description: "أحدث ثورة في ألعاب القتال! جرافيكس مذهل بفضل Unreal Engine 5 وحركات قتالية مدمرة."
        },
        {
            id: "mk1",
            title: "Mortal Kombat 1",
            titleAr: "مورتال كومبات 1",
            genre: "قتال / حماسي",
            players: "1 - 2 لاعبين",
            rating: "4.8",
            cover: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=400&q=80",
            icon: "fa-skull",
            badge: "تحدي الأصدقاء",
            description: "الفيتاليتي الشهيرة بحلة سينمائية لا تصدق ونظام Kameo Fighters المبتكر."
        },
        {
            id: "spiderman2",
            title: "Marvel's Spider-Man 2",
            titleAr: "سبايدر مان 2",
            genre: "أكشن / مغامرات",
            players: "1 لاعب",
            rating: "4.9",
            cover: "https://images.unsplash.com/photo-1635863138275-d9b33299680b?auto=format&fit=crop&w=400&q=80",
            icon: "fa-spider",
            badge: "حصري سوني",
            description: "تأرجح في نيويورك مع بيتر باركر ومايلز موراليس في مواجهة فينوم وكرافن الصياد."
        },
        {
            id: "cod_mw3",
            title: "Call of Duty: MW III & Warzone",
            titleAr: "كول أوف ديوتي وورزون",
            genre: "تصويب / شوتر",
            players: "1 - 4 لاعبين",
            rating: "4.7",
            cover: "https://images.unsplash.com/photo-1542751110-97427bbecf20?auto=format&fit=crop&w=400&q=80",
            icon: "fa-crosshairs",
            badge: "حرب تكتيكية",
            description: "المعارك التنافسية الأقوى، سيرفرات فايبر بدون لاج، ومود الزومبي الممتع مع الصحاب."
        },
        {
            id: "gow_ragnarok",
            title: "God of War Ragnarök",
            titleAr: "إله الحرب: راجناروك",
            genre: "مغامرات / ملحمي",
            players: "1 لاعب",
            rating: "5.0",
            cover: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=400&q=80",
            icon: "fa-axe",
            badge: "تحفة فنية",
            description: "رحلة كريتوس وأتريوس عبر العوالم التسعة في ملحمة أسطورية أذهلت النقاد واللاعبين."
        },
        {
            id: "nfs_unbound",
            title: "Need for Speed Unbound",
            titleAr: "نيد فور سبيد أنباوند",
            genre: "سباقات سيارات",
            players: "1 - 2 لاعبين",
            rating: "4.6",
            cover: "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=400&q=80",
            icon: "fa-gauge-high",
            badge: "سرعة وإثارة",
            description: "تعديل سيارات خارقة، سباقات شوارع نارية، ومؤثرات جرافيتي أنمي مبهرة."
        },
        {
            id: "efootball",
            title: "eFootball 2024 (PES)",
            titleAr: "إي فوتبول (بيس 2024)",
            genre: "كرة قدم كلاسيكية",
            players: "1 - 4 لاعبين",
            rating: "4.5",
            cover: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?auto=format&fit=crop&w=400&q=80",
            icon: "fa-futbol",
            badge: "تكتيك كروي",
            description: "الأسلوب الكلاسيكي المحبوب لدى الجميع، تحكم سلس ومنافسات جماعية ممتعة."
        },
        {
            id: "it_takes_two",
            title: "It Takes Two",
            titleAr: "إت تيكس تو (لعبة ثنائية)",
            genre: "مغامرات تعاونية Co-Op",
            players: "2 لاعبين (حصرياً)",
            rating: "5.0",
            cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=400&q=80",
            icon: "fa-heart",
            badge: "لعبة العام Co-Op",
            description: "أفضل لعبة لشخصين على الإطلاق! أفكار متجددة كل مرحلة وضحك وتعاون لا ينتهي."
        },
        {
            id: "ufc5",
            title: "EA Sports UFC 5",
            titleAr: "يو إف سي 5 (UFC 5)",
            genre: "فنون قتالية مختلطة MMA",
            players: "1 - 2 لاعبين",
            rating: "4.7",
            cover: "https://images.unsplash.com/photo-1517438322307-e67111335449?auto=format&fit=crop&w=400&q=80",
            icon: "fa-hand-back-fist",
            badge: "واقعية قتالية",
            description: "داخل الحلبة الثمانية! كدمات واقعية، ضربات قاضية ونظام استسلام متطور جداً."
        },
        {
            id: "rdr2",
            title: "Red Dead Redemption 2",
            titleAr: "ريد ديد ريدمبشن 2",
            genre: "ويسترن / قصة عميقة",
            players: "1 لاعب",
            rating: "5.0",
            cover: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=400&q=80",
            icon: "fa-hat-cowboy",
            badge: "الأعلى تقييماً",
            description: "أفضل عالم مفتوح تم صنعه في تاريخ الألعاب، قصة آرثر مورغان المؤثرة في الغرب الأمريكي."
        },
        {
            id: "hogwarts",
            title: "Hogwarts Legacy",
            titleAr: "هوجورتس ليجاسي",
            genre: "عالم هاري بوتر السحري",
            players: "1 لاعب",
            rating: "4.7",
            cover: "https://images.unsplash.com/photo-1514533450685-4493e01d1fdc?auto=format&fit=crop&w=400&q=80",
            icon: "fa-wand-magic-sparkles",
            badge: "سحر ومغامرة",
            description: "عش تجربة الساحر داخل قلعة هوجورتس وتعلم التعاويذ وروض الوحوش السحرية."
        },
        {
            id: "ac_mirage",
            title: "Assassin's Creed Mirage",
            titleAr: "أساسنز كريد ميراج (بغداد)",
            genre: "تخفي / تاريخي",
            players: "1 لاعب",
            rating: "4.6",
            cover: "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?auto=format&fit=crop&w=400&q=80",
            icon: "fa-user-ninja",
            badge: "دبلجة عربية كاملة",
            description: "استكشف بغداد في العصر الذهبي الإسلامي بشخصية باسم بن إسحاق مع أداء صوتي عربي كامل."
        },
        {
            id: "crash_ctr",
            title: "Crash Team Racing Nitro-Fueled",
            titleAr: "كراش سباق سيارات (CTR)",
            genre: "سباقات عائلية ومرح",
            players: "1 - 4 لاعبين",
            rating: "4.8",
            cover: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=400&q=80",
            icon: "fa-flag-checkered",
            badge: "ضحك ومقالب",
            description: "لعبة الصحاب الأولى في الضحك والصواريخ والقنابل، سباقات نارية تناسب الجميع."
        },
        {
            id: "rocket_league",
            title: "Rocket League",
            titleAr: "روكيت ليج",
            genre: "سيارات تلعب كورة",
            players: "1 - 4 لاعبين",
            rating: "4.8",
            cover: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
            icon: "fa-rocket",
            badge: "مهارة وسرعة",
            description: "مزيج مجنون بين سيارات الروكيت ولعبة كرة القدم، حركات بهلوانية وأهداف طائرة."
        }
    ],

    // "الريست" (The Rest) Café & Drinks Menu
    theRestMenu: {
        categories: [
            { id: "all", name: "الكل", icon: "fa-list" },
            { id: "water", name: "مياه معدنية", icon: "fa-bottle-water" },
            { id: "soda", name: "مياه غازية", icon: "fa-wine-bottle" },
            { id: "energy", name: "مشروبات طاقة", icon: "fa-bolt-lightning" },
            { id: "coffee", name: "قهوة وإسبريسو", icon: "fa-mug-hot" },
            { id: "cold_drinks", name: "عصائر وبارد", icon: "fa-glass-water" },
            { id: "snacks", name: "سناكس وشوكولاتة", icon: "fa-cookie-bite" }
        ],
        items: [
            // مياه معدنية
            {
                id: "w1",
                categoryId: "water",
                name: "مياه معدنية طبيعية 600 مل",
                nameEn: "Mineral Water 600ml",
                price: 10,
                icon: "fa-bottle-water",
                image: "https://images.unsplash.com/photo-1560008511-11c63416e52d?auto=format&fit=crop&w=300&q=80",
                description: "مياه نقية مثلجة لترطيب وانتعاش دائم أثناء اللعب.",
                tags: ["منعش", "أساسي"]
            },
            {
                id: "w2",
                categoryId: "water",
                name: "مياه معدنية حجم كبير 1.5 لتر",
                nameEn: "Mineral Water 1.5L",
                price: 18,
                icon: "fa-bottle-water",
                image: "https://images.unsplash.com/photo-1550505095-81378a674395?auto=format&fit=crop&w=300&q=80",
                description: "حجم عائلي يكفي لساعات اللعب الطويلة مع أصحابك.",
                tags: ["توفير"]
            },
            {
                id: "w3",
                categoryId: "water",
                name: "مياه فوّارة بيرييه / سيلتزر",
                nameEn: "Sparkling Water Perrier",
                price: 35,
                icon: "fa-droplet",
                image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=300&q=80",
                description: "مياه غازية طبيعية ممتازة مع شريحة ليمون ونعناع فريش.",
                tags: ["بريميوم"]
            },

            // مياه غازية
            {
                id: "s1",
                categoryId: "soda",
                name: "كوكاكولا كانز كلاسيك 330 مل",
                nameEn: "Coca-Cola Original Can",
                price: 25,
                icon: "fa-can-food",
                image: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?auto=format&fit=crop&w=300&q=80",
                description: "مثلجة لأعلى درجات الانتعاش مع طعم الكولا الأصيل.",
                tags: ["الأكثر طلباً"]
            },
            {
                id: "s2",
                categoryId: "soda",
                name: "كوكاكولا زيرو / دايت",
                nameEn: "Coca-Cola Zero Sugar",
                price: 25,
                icon: "fa-can-food",
                image: "https://images.unsplash.com/photo-1554866585-cd94860890b7?auto=format&fit=crop&w=300&q=80",
                description: "صفر سكر وسعرات حرارية مع نفس الطعم المميز.",
                tags: ["دايت"]
            },
            {
                id: "s3",
                categoryId: "soda",
                name: "بيبسي كانز 330 مل",
                nameEn: "Pepsi Can",
                price: 25,
                icon: "fa-can-food",
                image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=300&q=80",
                description: "مشروب بيبسي البارد والمنعش في كانز ألومنيوم مثلج.",
                tags: ["كلاسيك"]
            },
            {
                id: "s4",
                categoryId: "soda",
                name: "سفن أب / سبرايت ليمون",
                nameEn: "7UP / Sprite Lemon",
                price: 25,
                icon: "fa-lemon",
                image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=300&q=80",
                description: "انتعاش الليمون الصافي الخالي من الكافيين.",
                tags: ["ليمون"]
            },
            {
                id: "s5",
                categoryId: "soda",
                name: "شويبس جولد (خوخ / رمان / ليمون)",
                nameEn: "Schweppes Gold",
                price: 28,
                icon: "fa-wine-bottle",
                image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=300&q=80",
                description: "نكهات فواكه فاخرة مع لسعة غازية راقية.",
                tags: ["نكهات فاخرة"]
            },
            {
                id: "s6",
                categoryId: "soda",
                name: "فانتا برتقال / تفاح",
                nameEn: "Fanta Orange / Apple",
                price: 25,
                icon: "fa-apple-whole",
                image: "https://images.unsplash.com/photo-1624517452488-04869289c4ca?auto=format&fit=crop&w=300&q=80",
                description: "طعم البرتقال المنعش والحلو لتجديد طاقتك.",
                tags: ["فاكهة"]
            },

            // مشروبات طاقة
            {
                id: "e1",
                categoryId: "energy",
                name: "ريد بول الأصلي (Red Bull 250ml)",
                nameEn: "Red Bull Energy Drink",
                price: 70,
                icon: "fa-bolt",
                image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
                description: "يعطيك أجنحة! يعزز التركيز وسرعة رد الفعل في الألعاب التنافسية.",
                tags: ["جيمرز VIP", "أعلى تركيز"]
            },
            {
                id: "e2",
                categoryId: "energy",
                name: "ريد بول إيديشن (توت / بطيخ / استوائي)",
                nameEn: "Red Bull Special Edition",
                price: 75,
                icon: "fa-bolt-lightning",
                image: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=300&q=80",
                description: "نكهات مميزة منعشة مع نفس قوة طاقة ريد بول الأصلية.",
                tags: ["نكهات خاصة"]
            },
            {
                id: "e3",
                categoryId: "energy",
                name: "مونستر إنرجي الأسود الأصلي (Monster 500ml)",
                nameEn: "Monster Energy Original 500ml",
                price: 75,
                icon: "fa-paw",
                image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=300&q=80",
                description: "الحجم العملاق 500 مل لطاقة تدوم لجلسات اللعب الطويلة حتى الفجر.",
                tags: ["حجم كبير 500ml"]
            },
            {
                id: "e4",
                categoryId: "energy",
                name: "مونستر وايت ألترا (Monster White Zero)",
                nameEn: "Monster Ultra White (Sugar Free)",
                price: 80,
                icon: "fa-fire",
                image: "https://images.unsplash.com/photo-1622543925917-763c34d1a86e?auto=format&fit=crop&w=300&q=80",
                description: "المشروب المفضل لدى محترفي الإيسبورتس، طاقة خفيفة بدون أي سكر.",
                tags: ["زيرو شوجر"]
            },
            {
                id: "e5",
                categoryId: "energy",
                name: "ستينج إنرجي (أحمر فراولة / أزرق توت)",
                nameEn: "Sting Energy Drink",
                price: 25,
                icon: "fa-shield-halved",
                image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=300&q=80",
                description: "طاقة سريعة وسعر اقتصادي محبوب للجميع أثناء التحديات.",
                tags: ["اقتصادي"]
            },

            // قهوة وإسبريسو
            {
                id: "c1",
                categoryId: "coffee",
                name: "قهوة تركي مخصوص (سادة / مظبوط / مانو / زيادة)",
                nameEn: "Special Turkish Coffee",
                price: 25,
                icon: "fa-mug-hot",
                image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
                description: "بن برازيلي محوج مطحون طازجاً، بوش كريمي متماسك ورائحة تفوق الخيال.",
                tags: ["كلاسيك مصري"]
            },
            {
                id: "c2",
                categoryId: "coffee",
                name: "قهوة تركي محوجة دوبل حبهان",
                nameEn: "Turkish Coffee with Cardamom",
                price: 30,
                icon: "fa-mug-hot",
                image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&q=80",
                description: "نكهة الحبهان الأصيلة مع المستكة لصفاء الذهن والتركيز العالي.",
                tags: ["مزاج عالي"]
            },
            {
                id: "c3",
                categoryId: "coffee",
                name: "قهوة فرنساوي بالحليب الساخن",
                nameEn: "French Coffee with Milk",
                price: 35,
                icon: "fa-mug-saucer",
                image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=300&q=80",
                description: "بن تركي فاتح مع حليب كامل الدسم ورغوة ناعمة مخملية.",
                tags: ["ناعم وكريمي"]
            },
            {
                id: "c4",
                categoryId: "coffee",
                name: "إسبريسو سينجل (Single Espresso)",
                nameEn: "Single Shot Espresso",
                price: 30,
                icon: "fa-mug-hot",
                image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=300&q=80",
                description: "شوت إسبريسو مركز ومستخلص باحترافية بضغط 9 بار وطبقة كريما ذهبية.",
                tags: ["شوت طاقة"]
            },
            {
                id: "c5",
                categoryId: "coffee",
                name: "إسبريسو دبل (Double Espresso)",
                nameEn: "Double Shot Espresso",
                price: 40,
                icon: "fa-mug-hot",
                image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=300&q=80",
                description: "جرعة مضاعفة من الكافيين المركز لتثبيت عينك على الشاشة بدون رمشة.",
                tags: ["دبل شوت"]
            },
            {
                id: "c6",
                categoryId: "coffee",
                name: "كابتشينو إيطالي أصلي بالفوم",
                nameEn: "Italian Cappuccino",
                price: 45,
                icon: "fa-mug-saucer",
                image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=300&q=80",
                description: "توازن مثالي بين الإسبريسو والحليب المبخر ورغوة حليب سميكة مع رشة قرفة أو كاكاو.",
                tags: ["إيطالي"]
            },
            {
                id: "c7",
                categoryId: "coffee",
                name: "كافيه لاتيه فانيليا (Caffe Latte)",
                nameEn: "Vanilla Caffe Latte",
                price: 45,
                icon: "fa-mug-saucer",
                image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?auto=format&fit=crop&w=300&q=80",
                description: "حليب مبخر غني مع إسبريسو خفيف ونكهة فانيليا فرنسية هادئة.",
                tags: ["هادئ ولذيذ"]
            },
            {
                id: "c8",
                categoryId: "coffee",
                name: "فلات وايت (Flat White)",
                nameEn: "Specialty Flat White",
                price: 48,
                icon: "fa-mug-saucer",
                image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=300&q=80",
                description: "دبل ريستريتو نقي مع ميكروفوم حريري لعشاق مذاق القهوة الغني.",
                tags: ["قهوة مختصة"]
            },
            {
                id: "c9",
                categoryId: "coffee",
                name: "آيس سبانيش لاتيه مثلج (Iced Spanish Latte)",
                nameEn: "Iced Spanish Latte",
                price: 55,
                icon: "fa-glass-water",
                image: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&w=300&q=80",
                description: "حليب مكثف محلى مع إسبريسو وحليب مثلج، المشروب الأكثر طلباً في الصيف واللعب.",
                tags: ["الأكثر مبيعاً", "مثلج"]
            },
            {
                id: "c10",
                categoryId: "coffee",
                name: "كراميل ماكياتو مثلج / ساخن",
                nameEn: "Caramel Macchiato",
                price: 55,
                icon: "fa-glass-water",
                image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=300&q=80",
                description: "طبقات من الحليب والإسبريسو مع صوص الكراميل السائل الذهبي.",
                tags: ["حلو وكريمي"]
            },
            {
                id: "c11",
                categoryId: "coffee",
                name: "كافيه موكا بالشوكولاتة والكريمة",
                nameEn: "Cafe Mocha with Cream",
                price: 55,
                icon: "fa-mug-saucer",
                image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?auto=format&fit=crop&w=300&q=80",
                description: "مزيج غني من الإسبريسو والشوكولاتة البلجيكية الفاخرة وكريمة الخفق.",
                tags: ["شوكولاتة فاخرة"]
            },

            // عصائر ومشروبات باردة
            {
                id: "j1",
                categoryId: "cold_drinks",
                name: "عصير برتقال فريش طبيعي 100%",
                nameEn: "Fresh Orange Juice",
                price: 35,
                icon: "fa-glass-water",
                image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=300&q=80",
                description: "معصور طازجاً بدون إضافة سكر أو ماء، غني بفيتامين سي.",
                tags: ["طبيعي 100%"]
            },
            {
                id: "j2",
                categoryId: "cold_drinks",
                name: "عصير مانجو فريش مثلج",
                nameEn: "Fresh Mango Juice",
                price: 40,
                icon: "fa-glass-water",
                image: "https://images.unsplash.com/photo-1546173159-315724a31696?auto=format&fit=crop&w=300&q=80",
                description: "مانجو طبيعية قطع سميكة مثلجة ذات قوام غني وطعم لا يقاوم.",
                tags: ["فريش"]
            },
            {
                id: "j3",
                categoryId: "cold_drinks",
                name: "ليمون بالنعناع فريش مثلج (ليمونادا)",
                nameEn: "Fresh Mint Lemonade",
                price: 35,
                icon: "fa-lemon",
                image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=300&q=80",
                description: "عصير الليمون المنعش مع أوراق النعناع الأخضر الطازج والثلج المجروش.",
                tags: ["انتعاش مطلق"]
            },
            {
                id: "j4",
                categoryId: "cold_drinks",
                name: "ميلك شيك أوريو / شوكولاتة بالآيس كريم",
                nameEn: "Oreo & Chocolate Milkshake",
                price: 50,
                icon: "fa-ice-cream",
                image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=300&q=80",
                description: "بسكويت أوريو مطحون مع حليب مثلج وآيس كريم فانيليا وصوص شوكولاتة.",
                tags: ["سوبر شيك"]
            },

            // سناكس
            {
                id: "sn1",
                categoryId: "snacks",
                name: "ميكس مكسرات جيمرز محمص (كاجو / لوز / فستق)",
                nameEn: "Gamers Premium Roasted Nuts",
                price: 35,
                icon: "fa-bowl-rice",
                image: "https://images.unsplash.com/photo-1528751014936-863e6e7a319c?auto=format&fit=crop&w=300&q=80",
                description: "مكسرات فاخرة محمصة طازجة ومملحة بخفة، تسالي مثالية مع اللعب.",
                tags: ["صحي وخفيف"]
            },
            {
                id: "sn2",
                categoryId: "snacks",
                name: "شيبس دوريتوس / برينجلز حار وحلو",
                nameEn: "Doritos / Pringles Chips",
                price: 30,
                icon: "fa-cookie-bite",
                image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=300&q=80",
                description: "عبوة شيبس مقرمش بنكهات الجبن الناتشو أو الفلفل الحار والليمون.",
                tags: ["مقرمش"]
            },
            {
                id: "sn3",
                categoryId: "snacks",
                name: "شوكولاتة سنيكرز / كيت كات / كادبوري",
                nameEn: "Chocolate Bars (Snickers / KitKat)",
                price: 25,
                icon: "fa-candy-cane",
                image: "https://images.unsplash.com/photo-1582293041079-7814c2f12063?auto=format&fit=crop&w=300&q=80",
                description: "شوكولاتة لذيذة لرفع مستوى السكر وسرعة التفكير وقت المباريات الصعبة.",
                tags: ["طاقة سكرية"]
            }
        ]
    },

    // الفاوتشرز (Vouchers & Discount Codes)
    vouchers: [
        {
            id: "VOUCH-01",
            code: "XO-COFFEE20",
            title: "خصم 20% على حجز الغرفة",
            type: "percentage",
            value: 20,
            badge: "خصم ترحيبي",
            image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=400&q=80",
            description: "خصم 20% ساري على أي حجز غرفة سواء بلايستيشن 5 أو بلايستيشن 4.",
            durationText: "صالح لمدة 7 أيام",
            expiryDate: "2024-10-25",
            remainingDays: 5,
            icon: "fa-ticket"
        },
        {
            id: "VOUCH-02",
            code: "FREE-ESPRESSO",
            title: "مشروب إسبريسو / قهوة مجاناً من الريست",
            type: "free_item",
            value: 35,
            badge: "ضيافة كافيه",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=400&q=80",
            description: "كوب قهوة تركي محوج أو سينجل إسبريسو مجاناً مع أي حجز أكثر من ساعتين.",
            durationText: "صالح لمدة 10 أيام",
            expiryDate: "2024-10-28",
            remainingDays: 8,
            icon: "fa-mug-hot"
        },
        {
            id: "VOUCH-03",
            code: "GAMER-50EGP",
            title: "خصم 50 ج.م على الحجوزات الجماعية",
            type: "fixed",
            value: 50,
            badge: "عرض الويك إند",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=400&q=80",
            description: "خصم نقدي بقيمة 50 جنيه عند حجز 3 ساعات أو أكثر لمجموعتك.",
            durationText: "صالح لمدة 3 أيام",
            expiryDate: "2024-10-18",
            remainingDays: 3,
            icon: "fa-tags"
        }
    ],

    // معرض صور اللاونج الحقيقية (Real Egyptian PlayStation Lounge Experience)
    gallery: [
        {
            id: 1,
            title: "لمة الصحاب وتحديات فيفا 24 الحماسية",
            category: "challenges",
            categoryName: "تحديات وبطولات",
            image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80",
            badge: "FC 24 & تيكن",
            description: "أجواء التحديات والمنافسة الساخنة في ألعاب FC 24 وتيكن مع شاشات 4K ودراعات أصلية."
        },
        {
            id: 2,
            title: "القعدة العربي الملكية والشلت المريحة",
            category: "arabic",
            categoryName: "قعدة عربي",
            image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
            badge: "جلسة ديوان فاخرة",
            description: "جلسات أرضية ديوان فاخرة مع وسائد مريحة جداً تناسب المجموعات الكبيرة والسمر لساعات طويلة."
        },
        {
            id: 3,
            title: "رومات الـ VIP وكراسي الليزي بوي",
            category: "vip",
            categoryName: "رومات VIP",
            image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=800&q=80",
            badge: "سويت ملكي 75 بوصة",
            description: "غرف خاصة مستقلة مع شاشات 75 بوصة عملاقة وكراسي جلد ريكلاينر لمزيد من الفخامة والخصوصية."
        },
        {
            id: 4,
            title: "سيت أب بلايستيشن 5 وإضاءات هادئة",
            category: "gaming",
            categoryName: "أجهزة كونسول",
            image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
            badge: "PS5 Ultra HD",
            description: "أحدث أجهزة PS5 مع إضاءات دافئة خافتة مريحة للعين وتجهيزات صوتية متطورة."
        },
        {
            id: 5,
            title: "بار كافيه الريست والقهوة التركي",
            category: "rest",
            categoryName: "كافيه الريست",
            image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=800&q=80",
            badge: "باريستا وضيافة",
            description: "مشروباتك الساخنة والباردة وقهوتك التركي والإسبريسو توصلك لداخل غرفتك بضغطة زر."
        },
        {
            id: 6,
            title: "أجواء الكلاسيكو والدوري التنافسي",
            category: "challenges",
            categoryName: "تحديات وبطولات",
            image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=80",
            badge: "ستاديوم كروي",
            description: "غرف مخصصة بأجواء كروية حماسية وعزل صوتي تام يضمن حماس غير محدود."
        }
    ]
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = XO_DATA;
}
