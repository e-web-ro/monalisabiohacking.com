export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
}

export const blogPosts: Record<string, BlogPost[]> = {
  ro: [
    {
      slug: "peptide-si-autoimunitate-descoperirea-mea",
      title: "Peptide și autoimunitate: descoperirea mea — ce sunt, cum le clasific, când pot ajuta și când NU",
      excerpt: "Continuarea seriei începute cu „Povestea mea cu Hashimoto”. Un ghid practic despre peptidele care pot adresa inflamația cronică și regenerarea.",
      date: "17 aug. 2025",
      readTime: "3 min de citit",
      image: "/cell-abstract.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Educație",
      content: `
          <p class="lead">Continuarea seriei începute cu „Povestea mea cu Hashimoto”. Acest material este educațional și nu înlocuiește consultul medical.</p>
          
          <h2>Pe scurt: ce sunt peptidele</h2>
          <p>Peptidele sunt lanțuri scurte de aminoacizi (de obicei 2–50) care acționează ca mesageri în corp. Unele sunt identice cu molecule naturale, altele sunt analogi modificați pentru a dura mai mult sau a pătrunde mai bine în țesuturi. Ideea centrală: nu „forțează” corpul, ci îi trimit semnale — de reparare, calmare a inflamației, reglare metabolică etc.</p>
    
          <h2>Cum le clasific (practic și ușor de înțeles)</h2>
          
          <h3>1) Regenerare & țesut conjunctiv</h3>
          <ul>
            <li><strong>BPC‑157</strong> – integritatea mucoasei intestinale, tendoane, ligamente; efect antiinflamator local.</li>
            <li><strong>TB‑500</strong> (fragment din Thymosin β‑4) – migrare celulară, refacere țesuturi, scădere fibroză.</li>
            <li><strong>GHK‑Cu</strong> – remodelare colagen/elastină, angiogeneză, antioxidant.</li>
          </ul>
    
          <h3>2) Imunomodulare</h3>
          <ul>
            <li><strong>Thymosin Alpha‑1 (TA‑1)</strong> – reglează răspunsul imun (sprijină T‑reg, echilibru TH1/TH2).</li>
            <li><strong>KPV</strong> (fragment α‑MSH) – antiinflamator, util în inflamații intestinale/dermatite.</li>
          </ul>
    
          <h3>3) Metabolism & compoziție corporală</h3>
          <ul>
            <li><strong>GLP‑1 analogi</strong> (ex. semaglutid) – apetit, glicemie, greutate.</li>
          </ul>
    
          <div class="bg-secondary/30 p-6 rounded-xl border-l-4 border-primary my-8">
            <h3 class="text-white font-bold mb-2">Cadru etic & siguranță</h3>
            <p>Nu recomand auto‑injectare fără formare și fără consult. Prefer forme topice/orale când există opțiuni plauzibile. Aleg laboratoare cu transparență. Pauze programate și reevaluare la 4–8 săptămâni.</p>
          </div>
    
          <p class="text-sm text-zinc-500 italic">Disclaimer: Informațiile sunt educaționale. Nu reprezintă sfat medical și nu încurajează achiziția/folosirea fără supraveghere profesionistă.</p>
        `
    },
    {
      slug: "povestea-mea-cu-hashimoto",
      title: "Povestea mea cu Hashimoto: cum am slăbit 25 kg și am descoperit peptidele regenerative",
      excerpt: "De la 100 de kilograme și oboseală constantă, la un nou început prin nutriție și cercetare personală.",
      date: "17 aug. 2025",
      readTime: "2 min de citit",
      image: "/monalisa.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Personal",
      content: `
          <h2>De la 100 de kilograme și oboseală constantă, la un nou început</h2>
          <p>Am fost diagnosticată cu boala Hashimoto în urmă cu peste 20 de ani. La început, nu am înțeles pe deplin ce înseamnă „o boală autoimună”. Vedeam doar efectele: oboseală cronică, inflamație, dureri articulare.</p>
          <p>La un moment dat, am ajuns să cântăresc 100 de kilograme la 1,74 m. Mișcarea devenise dificilă. Am reușit să scad în greutate, de la 100 kg la 75 kg într-un an folosind strategii metabolice și nutriție funcțională.</p>
        `
    },
    {
      slug: "peptidele-secretul-din-celule",
      title: "Peptidele – Secretul din celule care rescrie regenerarea și echilibrul hormonal",
      excerpt: "Ce sunt peptidele, cum acționează și care este stadiul actual al cercetării. O incursiune în istorie și studii clinice.",
      date: "4 aug. 2025",
      readTime: "3 min de citit",
      image: "/cell-abstract.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Știință",
      content: `
          <h2>1. Istoria peptidelor: de la insulină la terapii moderne</h2>
          <p><strong>1922:</strong> prima utilizare medicală de peptide – insulină din pancreas de animal. Astăzi, peptidele sunt folosite pentru semnalizare celulară și regenerare.</p>
        `
    },
    {
      slug: "pofta-de-dulce-semnal-biologic",
      title: "Pofta de dulce nu înseamnă că n-ai voință – e un semnal biologic!",
      excerpt: "Nu e lipsă de disciplină. E biochimie. Află legătura dintre somn, stres, hormoni și nevoia de zahăr.",
      date: "24 iul. 2025",
      readTime: "2 min de citit",
      image: "/monalisa.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Nutriție",
      content: `
          <p class="lead">Ți s-a întâmplat să te trezești cu o poftă irezistibilă de ceva dulce? Nu e lipsă de disciplină. E biochimie.</p>
          <p>Lipsa somnului perturbă doi hormoni esențiali: Grelina și Leptina. Când nu dormi, corpul cere energie rapidă: zahăr.</p>
        `
    }
  ],
  en: [
    {
      slug: "peptides-and-autoimmunity-my-discovery",
      title: "Peptides and Autoimmunity: My Discovery — what they are, how I classify them, when they help and when they DON'T",
      excerpt: "Continuation of the series started with 'My Hashimoto Story'. A practical guide about peptides that can address chronic inflammation and regeneration.",
      date: "Aug 17, 2025",
      readTime: "3 min read",
      image: "/cell-abstract.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Education",
      content: `
          <p class="lead">Continuation of the series started with 'My Hashimoto Story'. This material is educational and does not replace medical consultation.</p>
          
          <h2>In short: what are peptides</h2>
          <p>Peptides are short chains of amino acids (usually 2–50) that act as messengers in the body. They don't 'force' the body, but send signals — for repair, calming inflammation, metabolic regulation, etc.</p>
    
          <h2>How I classify them</h2>
          
          <h3>1) Regeneration & connective tissue</h3>
          <ul>
            <li><strong>BPC‑157</strong> – intestinal lining integrity, tendons, ligaments; local anti-inflammatory effect.</li>
            <li><strong>TB‑500</strong> – cell migration, tissue recovery.</li>
          </ul>
    
          <h3>2) Immunomodulation</h3>
          <ul>
            <li><strong>Thymosin Alpha‑1 (TA‑1)</strong> – regulates immune response.</li>
          </ul>
    
          <div class="bg-secondary/30 p-6 rounded-xl border-l-4 border-primary my-8">
            <h3 class="text-white font-bold mb-2">Ethics & Safety</h3>
            <p>I do not recommend self-injection without training and consultation. I prefer topical/oral forms when plausible options exist.</p>
          </div>
    
          <p class="text-sm text-zinc-500 italic">Disclaimer: Information is educational. It is not medical advice.</p>
        `
    },
    {
      slug: "my-hashimoto-story",
      title: "My Hashimoto Story: How I lost 25 kg and discovered regenerative peptides",
      excerpt: "From 100 kilograms and constant fatigue to a new beginning through nutrition and personal research.",
      date: "Aug 17, 2025",
      readTime: "2 min read",
      image: "/monalisa.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Personal",
      content: `
          <h2>From 100 kilograms and constant fatigue to a new beginning</h2>
          <p>I was diagnosed with Hashimoto's disease over 20 years ago. At first, I didn't fully understand what 'autoimmune disease' meant. I only saw the effects: chronic fatigue, inflammation, joint pain.</p>
          <p>At one point, I weighed 100 kg. I managed to lose weight, from 100 kg to 75 kg in one year using metabolic strategies and functional nutrition.</p>
        `
    },
    {
      slug: "peptides-the-secret-from-cells",
      title: "Peptides – The Secret from Cells rewriting regeneration and hormonal balance",
      excerpt: "What are peptides, how they act and what is the current state of research. An incursion into history and clinical studies.",
      date: "Aug 4, 2025",
      readTime: "3 min read",
      image: "/cell-abstract.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Science",
      content: `
          <h2>1. History of peptides: from insulin to modern therapies</h2>
          <p><strong>1922:</strong> first medical use of peptides – insulin from animal pancreas. Today, peptides are used for cell signaling and regeneration.</p>
        `
    },
    {
      slug: "sugar-cravings-biological-signal",
      title: "Sugar Cravings: It's not a lack of willpower – it's a biological signal!",
      excerpt: "It's not a lack of discipline. It's biochemistry. Find out the link between sleep, stress, hormones and sugar needs.",
      date: "Jul 24, 2025",
      readTime: "2 min read",
      image: "/monalisa.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Nutrition",
      content: `
          <p class="lead">Have you ever woken up with an irresistible craving for something sweet? It's not a lack of discipline. It's biochemistry.</p>
          <p>Lack of sleep disrupts two essential hormones: Ghrelin and Leptin. When you don't sleep, your body demands quick energy: sugar.</p>
        `
    }
  ],
  de: [
    {
      slug: "peptide-und-autoimmunitaet-meine-entdeckung",
      title: "Peptide und Autoimmunität: Meine Entdeckung — was sie sind, wie ich sie klassifiziere, wann sie helfen und wann NICHT",
      excerpt: "Fortsetzung der Serie, die mit 'Meine Hashimoto-Geschichte' begann. Ein praktischer Leitfaden über Peptide, die chronische Entzündungen und Regeneration adressieren können.",
      date: "17. Aug. 2025",
      readTime: "3 Min. Lesezeit",
      image: "/cell-abstract.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Bildung",
      content: `
          <p class="lead">Fortsetzung der Serie, die mit 'Meine Hashimoto-Geschichte' begann. Dieses Material dient der Aufklärung und ersetzt keine ärztliche Beratung.</p>
          
          <h2>Kurz gesagt: Was sind Peptide?</h2>
          <p>Peptide sind kurze Ketten von Aminosäuren (meist 2–50), die als Botenstoffe im Körper fungieren. Sie 'zwingen' den Körper zu nichts, sondern senden Signale — zur Reparatur, zur Beruhigung von Entzündungen, zur Stoffwechselregulation usw.</p>
    
          <h2>Wie ich sie klassifiziere</h2>
          
          <h3>1) Regeneration & Bindegewebe</h3>
          <ul>
            <li><strong>BPC‑157</strong> – Integrität der Darmschleimhaut, Sehnen, Bänder; lokale entzündungshemmende Wirkung.</li>
            <li><strong>TB‑500</strong> – Zellmigration, Geweberegeneration.</li>
          </ul>
    
          <h3>2) Immunmodulation</h3>
          <ul>
            <li><strong>Thymosin Alpha‑1 (TA‑1)</strong> – reguliert die Immunantwort.</li>
          </ul>
    
          <div class="bg-secondary/30 p-6 rounded-xl border-l-4 border-primary my-8">
            <h3 class="text-white font-bold mb-2">Ethik & Sicherheit</h3>
            <p>Ich empfehle keine Selbstinjektion ohne Schulung und Beratung. Ich bevorzuge topische/orale Formen, sofern plausible Optionen existieren.</p>
          </div>
    
          <p class="text-sm text-zinc-500 italic">Haftungsausschluss: Informationen dienen der Aufklärung. Es ist keine medizinische Beratung.</p>
        `
    },
    {
      slug: "meine-hashimoto-geschichte",
      title: "Meine Hashimoto-Geschichte: Wie ich 25 kg verlor und regenerative Peptide entdeckte",
      excerpt: "Von 100 Kilogramm und ständiger Müdigkeit zu einem Neuanfang durch Ernährung und persönliche Forschung.",
      date: "17. Aug. 2025",
      readTime: "2 Min. Lesezeit",
      image: "/monalisa.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Persönlich",
      content: `
          <h2>Von 100 Kilogramm und ständiger Müdigkeit zu einem Neuanfang</h2>
          <p>Vor über 20 Jahren wurde bei mir Hashimoto diagnostiziert. Zuerst verstand ich nicht ganz, was 'Autoimmunerkrankung' bedeutete. Ich sah nur die Auswirkungen: chronische Müdigkeit, Entzündungen, Gelenkschmerzen.</p>
          <p>An einem Punkt wog ich 100 kg. Ich schaffte es, in einem Jahr von 100 kg auf 75 kg abzunehmen, indem ich Stoffwechselstrategien und funktionelle Ernährung anwandte.</p>
        `
    },
    {
      slug: "peptide-das-geheimnis-aus-den-zellen",
      title: "Peptide – Das Geheimnis aus den Zellen, das Regeneration und hormonelles Gleichgewicht neu schreibt",
      excerpt: "Was Peptide sind, wie sie wirken und wie der aktuelle Stand der Forschung ist. Ein Einblick in die Geschichte und klinische Studien.",
      date: "4. Aug. 2025",
      readTime: "3 Min. Lesezeit",
      image: "/cell-abstract.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Wissenschaft",
      content: `
          <h2>1. Geschichte der Peptide: von Insulin bis zu modernen Therapien</h2>
          <p><strong>1922:</strong> erste medizinische Anwendung von Peptiden – Insulin aus tierischer Bauchspeicheldrüse. Heute werden Peptide für die Zellsignalisierung und Regeneration eingesetzt.</p>
        `
    },
    {
      slug: "heisshunger-auf-suesses-biologisches-signal",
      title: "Heißhunger auf Süßes: Es ist kein Mangel an Willenskraft – es ist ein biologisches Signal!",
      excerpt: "Es ist kein Mangel an Disziplin. Es ist Biochemie. Erfahren Sie den Zusammenhang zwischen Schlaf, Stress, Hormonen und Zuckerbedarf.",
      date: "24. Jul. 2025",
      readTime: "2 Min. Lesezeit",
      image: "/monalisa.png",
      author: "Monalisa Orendt",
      authorImage: "/monalisa.png",
      category: "Ernährung",
      content: `
          <p class="lead">Sind Sie schon einmal mit einem unwiderstehlichen Verlangen nach etwas Süßem aufgewacht? Es ist kein Mangel an Disziplin. Es ist Biochemie.</p>
          <p>Schlafmangel stört zwei wichtige Hormone: Ghrelin und Leptin. Wenn Sie nicht schlafen, verlangt Ihr Körper nach schneller Energie: Zucker.</p>
        `
    }
  ]
};
