export interface BlogPost {
    slug: string;
    title: string;
    excerpt: string;
    date: string;
    readTime: string;
    image: string;
    content: string; // We'll use simple HTML string for this MVP
    author: string;
    authorImage: string;
    category: string;
}

export const blogPosts: BlogPost[] = [
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
      <p>De ce mă interesează? Pentru că în autoimunitate (ex. Hashimoto) avem adesea inflamație cronică, permeabilitate intestinală, stres oxidativ și dereglări ale somnului/energiei. Peptidele pot adresa tocmai aceste „bucle” fiziologice.</p>

      <h2>Cum le clasific (practic și ușor de înțeles)</h2>
      
      <h3>1) Regenerare & țesut conjunctiv</h3>
      <ul>
        <li><strong>BPC‑157</strong> – integritatea mucoasei intestinale, tendoane, ligamente; efect antiinflamator local.</li>
        <li><strong>TB‑500</strong> (fragment din Thymosin β‑4) – migrare celulară, refacere țesuturi, scădere fibroză.</li>
        <li><strong>GHK‑Cu</strong> – remodelare colagen/elastină, angiogeneză, antioxidant.</li>
      </ul>
      <p><em>Când ajută:</em> dureri tendinoase/articulare, „leaky gut”, refacere după microleziuni.<br>
      <em>Atenție:</em> fiind pro‑vindecare și pro‑angiogeneză, evit în cancer activ, retinopatii proliferative.</p>

      <h3>2) Imunomodulare</h3>
      <ul>
        <li><strong>Thymosin Alpha‑1 (TA‑1)</strong> – reglează răspunsul imun (sprijină T‑reg, echilibru TH1/TH2).</li>
        <li><strong>KPV</strong> (fragment α‑MSH) – antiinflamator, util în inflamații intestinale/dermatite.</li>
        <li><strong>LL‑37</strong> – peptid antimicrobian, dar poate fi iritant/proinflamator la doze nepotrivite.</li>
      </ul>
      <p><em>Când ajută:</em> infecții recurente, status imun „obosit”, inflamații cutanate/intestinal.</p>

      <h3>3) Metabolism & compoziție corporală</h3>
      <ul>
        <li><strong>GLP‑1 analogi</strong> (ex. semaglutid) – apetit, glicemie, greutate.</li>
        <li><strong>GHRH/Ghrelin‑like</strong> (ex. CJC‑1295, ipamorelin) – axa GH/IGF‑1.</li>
      </ul>
      <p><em>Când ajută:</em> rezistență la insulină, controlul greutății, sarcopenie.</p>

      <h3>4) Neuro‑cognitive & stres</h3>
      <ul>
        <li><strong>Selank, Semax, DSIP</strong> – focus, anxietate, somn.</li>
      </ul>
      <p><em>Când ajută:</em> stres cronic, somn fragmentat, „ceață mentală”.</p>

      <h3>5) Mitochondrii & longevitate</h3>
      <ul>
        <li><strong>Epitalon</strong> – ritm circadian, stres oxidativ, markerii de longevitate.</li>
        <li><strong>MOTS‑c, Humanin</strong> – semnalizare mitocondrială.</li>
      </ul>

      <h2>Experiența mea (până acum)</h2>
      <p><strong>BPC‑157 (10 zile) + TB‑500:</strong> scădere a durerilor articulare, diminuarea balonării, normalizarea tranzitului.</p>
      <p><strong>Epitalon:</strong> somn/energie mai stabile, percepție de „echilibru interior”.</p>
      <p>Urmează: GHK‑Cu alături de BPC/TB pentru sinergie pe regenerare; Thymosin Alpha‑1 pentru imunomodulare blândă.</p>

      <h2>Ce monitorizez (checklist practic)</h2>
      <ul>
        <li><strong>Tiroidă:</strong> TSH, fT4, fT3, TPO, TgAb.</li>
        <li><strong>Inflamație:</strong> CRP (hs‑CRP), fibrinogen.</li>
        <li><strong>Metabolism:</strong> glucoză, HbA1c, insulină, IGF‑1.</li>
        <li><strong>Simptome zilnice:</strong> somn, tranzit, energie, durere, piele.</li>
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
      
      <h3>Diagnosticul care mi-a schimbat viața</h3>
      <p>Am fost diagnosticată cu boala Hashimoto în urmă cu peste 20 de ani. La început, nu am înțeles pe deplin ce înseamnă „o boală autoimună”. Vedeam doar efectele: oboseală cronică, inflamație, dureri articulare, balonări, probleme digestive și o greutate care nu mai putea fi controlată.</p>
      <p>Ani de zile am încercat tratamente clasice și ajustări de stil de viață, dar nimic nu părea să îmi ofere echilibrul pe care îl căutam.</p>

      <h3>Lupta cu kilogramele și cu energia</h3>
      <p>La un moment dat, am ajuns să cântăresc 100 de kilograme la 1,74 m. Mișcarea devenise dificilă, oboseam extrem de repede și starea mea de spirit era mereu afectată. Am știut atunci că trebuie să găsesc o soluție care să funcționeze pentru mine.</p>

      <h3>Primul pas – Agonist GLP-1</h3>
      <p>Într-o vizită la medicul de familie, am cerut să încerc semaglutida. Nu știam exact ce este, dar auzisem că ar putea ajuta. Așa am aflat că este un agonist GLP-1, un analog peptidic modificat. Pentru mine, a fost începutul unei transformări.</p>
      <ul>
        <li>Am reușit să scad în greutate, de la 100 kg la 75 kg într-un an.</li>
        <li>Am recăpătat mobilitatea.</li>
        <li>Am început să simt din nou energie și speranță.</li>
      </ul>

      <h3>Curiozitatea m-a împins mai departe</h3>
      <p>Nu m-am oprit la rezultat. Am început să citesc: ce este GLP-1, cum funcționează, ce alte opțiuni există. Am descoperit tirzepatida și apoi retatrutida. Am înțeles că nu vorbim doar despre medicamente de slăbit, ci despre modularea metabolismului și influențarea inflamației. Această căutare m-a condus către un univers pe care nu îl cunoșteam: peptidele regenerative.</p>

      <h3>Ce am învățat până aici</h3>
      <p>Hashimoto m-a învățat că nu există un „tratament-minune”. Nutriția curată, disciplina și cercetarea constantă fac diferența. Semaglutida a fost doar un prim pas – nu o soluție finală. Dorința mea nu mai era doar să slăbesc, ci să regăsesc echilibrul interior și să explorez opțiuni de regenerare reală.</p>
    `
    },
    {
        slug: "peptidele-secretul-din-celule",
        title: "Peptidele – Secretul din celule care rescrie regenerarea și echilibrul hormonal",
        excerpt: "Ce sunt peptidele, cum acționează și care este stadiul actual al cercetării. O incursiune în istorie și studii clinice.",
        date: "4 aug. 2025",
        readTime: "3 min de citit",
        image: "/cell-abstract.png", // Reusing image
        author: "Monalisa Orendt",
        authorImage: "/monalisa.png",
        category: "Știință",
        content: `
      <h2>1. Istoria peptidelor: de la insulină la terapii moderne</h2>
      <p><strong>1922:</strong> prima utilizare medicală de peptide – insulină din pancreas de animal, revoluționând tratamentul diabetului de tip 1.</p>
      <p><strong>1940–1960:</strong> sinteza peptide hormonale ca oxitocina și vasopresina, urmate în 1961 de sinteza chimică a porțiunii active a hormonului ACTH.</p>
      <p>Ulterior, peptidele au început să fie dezvoltate ca mesageri celulari, regenerative și dermatologici.</p>

      <h2>2. Exemple de peptide cu studii semnificative</h2>
      
      <h3>GHK‑Cu (Glycyl‑L‑Histidyl‑L‑Lysine + Cupru)</h3>
      <p>Izolat din plasma umană în 1973. Stimulează colagenul, glicozaminoglicanii și vindecarea rănilor. Un review din 2018 demonstrează reglarea expresiei a peste 30% din genele umane.</p>

      <h3>Palmitoyl pentapeptide‑4 (Matrixyl)</h3>
      <p>Lansat în 2000. Studiile au demonstrat reducerea ridurilor, stimularea colagenului și regenerare a matricei extracelulare.</p>
      
      <h3>RGD (Arginyl‑Glycyl‑Aspartic acid)</h3>
      <p>Motif responsabil de adeziunea celulară. A declanșat dezvoltarea unor medicamente și materiale bio-active orientate pe aderarea celulară și vindecare tisulară.</p>

      <h2>3. Clasificare și scopuri principale</h2>
      <ul>
        <li><strong>Signal peptides:</strong> stimulează colagenul.</li>
        <li><strong>Carrier peptides:</strong> transportă cupru și regenerează (ex. GHK-Cu).</li>
        <li><strong>Neuro‑inhibitor peptides:</strong> ex. Argireline pentru expresii faciale.</li>
        <li><strong>Enzyme inhibitor peptides:</strong> ex. inhibitori de MMP.</li>
      </ul>

      <h2>4. Situația actuală a cercetării</h2>
      <p>În 2023–2025, se observă o expansiune a utilizării peptidelor în terapia colitelor, regenerare tisulară și medicina sportivă. Inovații recente includ integrarea unui peptid dimeric cupru (D‑CuP) în hidrogel activ.</p>
      
      <div class="bg-secondary/30 p-6 rounded-xl border-l-4 border-primary my-8">
        <p>Peptidele rămân un domeniu promițător, cu potențial real pentru regenerare, anti-aging și echilibru hormonal. Dar nu sunt formule minune: dozele, tipul de administrare și contextul general de stil de viață fac diferența.</p>
      </div>
    `
    },
    {
        slug: "pofta-de-dulce-semnal-biologic",
        title: "Pofta de dulce nu înseamnă că n-ai voință – e un semnal biologic!",
        excerpt: "Nu e lipsă de disciplină. E biochimie. Află legătura dintre somn, stres, hormoni și nevoia de zahăr.",
        date: "24 iul. 2025",
        readTime: "2 min de citit",
        image: "/monalisa.png", // Using author image as fallback since we don't have a specific one
        author: "Monalisa Orendt",
        authorImage: "/monalisa.png",
        category: "Nutriție",
        content: `
      <p class="lead">Ți s-a întâmplat să te trezești cu o poftă irezistibilă de ceva dulce, chiar dacă știi că „nu ai voie”? Respiră adânc: nu e vina ta. Nu e lipsă de disciplină. E biochimie.</p>
      
      <h2>1. Când nu dormi suficient, corpul cere zahăr</h2>
      <p>Lipsa somnului perturbă doi hormoni esențiali: <strong>Grelina</strong> (care crește foamea) și <strong>Leptina</strong> (care reglează sațietatea).</p>
      <p>Dormi puțin → grelina crește → ți-e foame → dar nu orice foame, ci foame de dulce, pentru că zahărul e o sursă rapidă de energie. Corpul tău doar încearcă să supraviețuiască.</p>

      <h2>2. Cortizolul te împinge spre dulce</h2>
      <p>Când ești stresată, corpul secretă cortizol. Problema? Cortizolul cere glucocoză pentru a avea „combustibil de criză”. Așa ajungi să „ai poftă de ceva dulce” mai ales după o ceartă sau când te simți copleșită.</p>

      <h2>3. Dezechilibre hormonale = poftă de dulce ciclică</h2>
      <p>Femeile după 35 de ani se confruntă cu modificări hormonale. Scade progesteronul, estrogenul fluctuează, iar rezistența la insulină poate apărea.</p>

      <h2>4. Oboseala cronică mascată</h2>
      <p>Multe femei spun: „Dar eu nu mă simt obosită!” Și totuși: te trezești greu, ai căderi de energie, bei multă cafea. Asta nu e energie adevărată – e supraviețuire biochimică.</p>

      <h3>Ce poți face?</h3>
      <ul>
        <li>✅ Dormi 7–8 ore pe noapte.</li>
        <li>✅ Începe ziua cu mic dejun bogat în proteine și grăsimi bune.</li>
        <li>✅ Practică respirație conștientă.</li>
        <li>✅ Adaugă magneziu, crom, vitamina D3.</li>
      </ul>

      <p class="font-bold mt-6">Concluzie: Pofta de dulce nu e despre voință. Este un semnal subtil că organismul tău are nevoie de ceva – somn, iubire, odihnă, echilibru.</p>
    `
    }
];
