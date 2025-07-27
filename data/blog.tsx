interface BlogPost {
  id: string
  title: string
  category: string
  date: string
  readingTime: string
  image: string
  content: string // Contient le HTML complet
  excerpt?: string
  author?: string
  isNew?: boolean
  featured?: boolean
}
export const blogs :  BlogPost[] = [
  {
    id: '1',
    title: "RSE et développement durable : un impératif stratégique pour les entreprises marocaines",
    excerpt: "Comment la RSE devient un levier clé de compétitivité pour les entreprises marocaines face aux nouveaux enjeux réglementaires et sociétaux.",
    image: "/images/blog/blog-1.jpg",
    category: "ESG",
    date: "2025-01-06",
    readingTime: "10 min",
    author: "Expert RSE & SDGs",
    isNew: false,
    featured: true,
    content: `
      <article class="prose max-w-none">
        <div class="mb-8 text-sm text-gray-500">
          <span>Date : 06 Janvier 2025</span>
          <span class="mx-2">•</span>
          <span>Auteur : Expert RSE & SDGs</span>
        </div>
  
        <blockquote class="border-l-4 border-[var(--color-primary)] pl-4 italic my-6 text-lg">
          « Les entreprises ne peuvent plus ignorer leur responsabilité envers la société et la planète. Elles doivent devenir des actrices du changement. »
        </blockquote>
  
        <p class="lead">C'est dans cette dynamique que s'inscrivent les entreprises marocaines, aujourd'hui au cœur d'une mutation profonde. Entre enjeux climatiques, inégalités sociales et pression réglementaire, intégrer la Responsabilité Sociétale des Entreprises (RSE) n'est plus un choix mais une nécessité. Et si cette transition devenait aussi une formidable opportunité ?</p>
  
        <h2>Pourquoi la RSE devient incontournable au Maroc ?</h2>
        <p>Le Maroc, engagé dans la Stratégie nationale de développement durable à l'horizon 2030, aligne progressivement les acteurs publics et privés vers un modèle économique responsable. Porté par les Objectifs de Développement Durable (ODD), ce virage impose aux entreprises de repenser leur modèle d'affaires.</p>
  
        <h3>Enjeu #1 : Anticiper les risques et les attentes sociétales</h3>
        <p>La mondialisation et la pression des parties prenantes (consommateurs, investisseurs, collectivités) poussent les entreprises marocaines à intégrer les dimensions éthique, sociale et environnementale dans leurs stratégies.</p>
  
        <h3>Enjeu #2 : Renforcer la compétitivité</h3>
        <p>Les entreprises engagées en RSE sont perçues comme plus fiables, plus innovantes, et attirent les meilleurs talents et financements.</p>
  
        <h2>Comprendre les fondements de la RSE</h2>
        <p>La RSE repose sur quatre piliers fondamentaux, tels que définis dans la pyramide de Carroll :</p>
  
        <div class="overflow-x-auto my-6">
          <table class="min-w-full border border-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-4 py-3 text-left border-b">Niveau</th>
                <th class="px-4 py-3 text-left border-b">Responsabilité</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="px-4 py-3 border-b">Économique</td>
                <td class="px-4 py-3 border-b">Générer des profits durables</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-b">Juridique</td>
                <td class="px-4 py-3 border-b">Respecter les lois et régulations</td>
              </tr>
              <tr>
                <td class="px-4 py-3 border-b">Éthique</td>
                <td class="px-4 py-3 border-b">Agir avec intégrité et équité</td>
              </tr>
              <tr>
                <td class="px-4 py-3">Philanthropique</td>
                <td class="px-4 py-3">Contribuer au bien-être des communautés</td>
              </tr>
            </tbody>
          </table>
        </div>
  
        <p>À cela s'ajoute une exigence de transparence, dialogue et mesure d'impact.</p>
  
        <h2>Le Cadre réglementaire marocain : une impulsion structurante</h2>
        <p>La loi-cadre 99-12 sur la Charte nationale de l'environnement et du développement durable impose aux entreprises marocaines d'intégrer des pratiques écoresponsables.</p>
        <p>Des référentiels comme ISO 26000 offrent aux organisations un guide clair pour structurer leur démarche RSE autour de 7 grands principes, notamment :</p>
        
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li>La gouvernance</li>
          <li>Les droits de l'homme</li>
          <li>L'environnement</li>
          <li>Les relations et conditions de travail</li>
        </ul>
  
        <h2>RSE : comment passer à l'action ?</h2>
        <ol class="list-decimal pl-6 space-y-3 my-4">
          <li class="pl-2"><strong>Identifier les parties prenantes</strong><br>Clients, salariés, fournisseurs, communautés locales : il faut les impliquer, les écouter et intégrer leurs attentes.</li>
          <li class="pl-2"><strong>Fixer des objectifs concrets et mesurables</strong><br>Ex. : réduire de 25% sa consommation d'eau en 3 ans ou atteindre la parité dans les postes de direction.</li>
          <li class="pl-2"><strong>Adopter un système de reporting RSE</strong><br>Le standard GRI (Global Reporting Initiative) permet de structurer les rapports et de garantir la transparence.</li>
          <li class="pl-2"><strong>Former et sensibiliser en interne</strong><br>La culture RSE doit s'enraciner à tous les niveaux hiérarchiques.</li>
        </ol>
  
        <h3>Focus : les défis spécifiques au contexte marocain</h3>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li><strong>Jeunesse & emploi</strong> : le taux de chômage des jeunes reste élevé. Les entreprises peuvent créer des ponts via des programmes d'insertion et de formation.</li>
          <li><strong>Égalité des genres</strong> : promouvoir les femmes aux postes de décision est à la fois un enjeu social et un levier de performance.</li>
          <li><strong>Pressions environnementales</strong> : épuisement des ressources, pollution industrielle, gestion des déchets... autant de domaines à structurer par des actions RSE ciblées.</li>
        </ul>
  
        <h2>Les bénéfices concrets pour les entreprises marocaines</h2>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li>Réduction des coûts grâce à l'éco-efficience (énergie, eau, déchets)</li>
          <li>Meilleure image de marque et attractivité RH</li>
          <li>Meilleure gestion des risques juridiques et réputationnels</li>
          <li>Accès facilité aux marchés internationaux et aux financements responsables</li>
        </ul>
  
        <h2>Bonnes pratiques : des exemples à suivre</h2>
        <ul class="list-disc pl-6 space-y-2 my-4">
          <li>Intégrer des technologies propres dans les process industriels</li>
          <li>Mettre en œuvre des politiques de diversité</li>
          <li>Développer des partenariats avec des ONG locales</li>
          <li>Adopter des chartes internes éthiques</li>
        </ul>
  
        <h2>Conclusion</h2>
        <p>La RSE, loin d'être une contrainte, est un levier puissant pour créer de la valeur partagée. Dans un Maroc en pleine mutation, les entreprises qui auront su intégrer la durabilité dans leur ADN seront les leaders de demain.</p>
        
        <p>La RSE n'est pas une tendance, c'est un mouvement de fond, une transformation profonde du rôle de l'entreprise dans la société. Le moment est venu pour les entreprises marocaines de bâtir des modèles économiques plus humains, plus durables, plus inclusifs.</p>
        
        <p class="font-semibold italic">Et vous, votre entreprise est-elle prête à devenir actrice d'un développement durable et équitable ?</p>
      </article>
    `
  },
  {
    id: '2',
    title: "ISO 27001",
    excerpt: "Un pilier stratégique pour la cybersécurité en Afrique et au Maroc",
    image: "/images/blog/blog-2.jpg",
    category: "Réglementations",
    date: "2025-02-03",
    readingTime: "6 min",
    featured: true,
    content: `<article class="prose prose-lg max-w-4xl mx-auto py-8 px-4 text-gray-800">
  <header class="mb-12">
    <span class="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
      Cybersécurité & Gouvernance
    </span>
    <h1 class="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
      ISO 27001 : un pilier stratégique pour la cybersécurité en Afrique et au Maroc
    </h1>
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-b pb-6">
      <p><strong class="text-gray-700">Rédaction :</strong> Expert cybersécurité & gouvernance des données</p>
      <p><strong class="text-gray-700">Date :</strong> Lundi 03 février 2025</p>
      <p><strong class="text-gray-700">Temps de lecture :</strong> 8 min</p>
    </div>
  </header>

  <section class="mb-10">
    <p class="text-lg leading-relaxed mb-6">
      À l'ère où les données sont le nouvel or noir, leur protection est devenue un enjeu central pour les entreprises,
      les administrations et les États. En Afrique, où la transformation numérique s'accélère, la maîtrise de la
      cybersécurité est désormais un levier de souveraineté et de compétitivité. Et au cœur de cette dynamique :
      la norme ISO/IEC 27001.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-primary-dark)]">Qu'est-ce que l'ISO 27001 ?</h2>
    <p class="mb-4">
      L'ISO 27001 est une norme internationale qui définit les exigences pour établir, mettre en œuvre, maintenir
      et améliorer un Système de Management de la Sécurité de l'Information (SMSI).
    </p>
    <p>
      En d'autres termes, c'est la boîte à outils globale pour sécuriser les données sensibles, prévenir les cyberattaques
      et répondre aux exigences de conformité réglementaire.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Pourquoi est-elle essentielle pour les pays africains ?</h2>
    
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
          La digitalisation s'accélère, les risques aussi
        </h3>
        <p>
          En Afrique, le boom du numérique touche tous les secteurs : fintech, e-gouvernement, santé, agriculture intelligente...
          Mais cette expansion rapide crée aussi une surface d'attaque accrue : ransomware, phishing, fuites de données,
          espionnage industriel.
        </p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
          Des infrastructures vulnérables
        </h3>
        <p>
          Les systèmes d'information en Afrique sont souvent hétérogènes, sous-financés et manquent de cadres normalisés.
          L'ISO 27001 fournit une structure claire pour évaluer les risques, organiser les mesures de sécurité et garantir
          la résilience numérique.
        </p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
          Un besoin croissant de confiance
        </h3>
        <p>
          Les donneurs d'ordre internationaux exigent des garanties sur la gestion des données. Être certifié ISO 27001,
          c'est envoyer un signal fort de fiabilité aux partenaires, investisseurs, clients et régulateurs.
        </p>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Le Maroc : une ambition numérique à sécuriser</h2>
    <p class="mb-4">
      Le Royaume du Maroc a fait de la transformation digitale un axe stratégique national, porté par la Stratégie Maroc Digital
      et des initiatives comme la CNDP (Commission Nationale de contrôle de la protection des Données à caractère Personnel).
    </p>
    <p class="mb-6">
      Mais face à la multiplication des cybermenaces et à la sensibilité croissante des données (santé, éducation, téléservices…),
      l'implémentation de l'ISO 27001 devient un enjeu de gouvernance numérique.
    </p>

    <h3 class="text-xl font-semibold mb-4">Le contexte marocain en 3 points :</h3>
    <ul class="list-disc pl-6 space-y-2 mb-6">
      <li class="pl-2"><strong>L'économie numérique</strong> pèse de plus en plus dans le PIB</li>
      <li class="pl-2"><strong>Les administrations</strong> basculent vers l'e-gouvernement</li>
      <li class="pl-2"><strong>Les entreprises marocaines</strong> veulent conquérir des marchés internationaux</li>
    </ul>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Les bénéfices concrets de l'ISO 27001</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-[var(--color-primary-light)]">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Avantage</th>
            <th class="px-6 py-3 text-left font-semibold">Impact</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Cartographie des risques</td>
            <td class="px-6 py-4">Vision claire des failles et vulnérabilités</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Plan de continuité</td>
            <td class="px-6 py-4">Meilleure résilience en cas de cyberattaque</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Conformité RGPD et lois locales</td>
            <td class="px-6 py-4">Réduction des risques juridiques et financiers</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Image de marque renforcée</td>
            <td class="px-6 py-4">Gage de sérieux auprès des partenaires</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Réduction des pertes financières</td>
            <td class="px-6 py-4">Prévention proactive plutôt que réaction coûteuse</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Mettre en œuvre l'ISO 27001 : une démarche structurée</h2>
    <ol class="list-decimal pl-6 space-y-3 mb-6">
      <li class="pl-2"><strong>Engagement de la direction</strong> - Nécessite une implication au plus haut niveau</li>
      <li class="pl-2"><strong>Identification des actifs critiques</strong> - Quelles données protéger en priorité ?</li>
      <li class="pl-2"><strong>Évaluation des risques</strong> - Analyse des vulnérabilités et menaces</li>
      <li class="pl-2"><strong>Définition de politiques de sécurité</strong> - Cadre formel des bonnes pratiques</li>
      <li class="pl-2"><strong>Contrôles techniques, organisationnels et physiques</strong> - Mise en place des protections</li>
      <li class="pl-2"><strong>Audit interne & amélioration continue</strong> - Vérification et ajustements</li>
      <li class="pl-2"><strong>Certification par un organisme agréé</strong> - Validation externe</li>
    </ol>
    <div class="bg-blue-50 border-l-4 border-[var(--color-primary)] p-4 italic">
      <strong>Astuce :</strong> ne pas viser la conformité pour la conformité, mais comme levier de performance globale.
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Et pour les PME africaines ?</h2>
    <p class="mb-4">
      L'ISO 27001 n'est pas réservée aux multinationales. Avec l'essor du cloud, des plateformes SaaS et du travail à distance,
      les PME sont aussi des cibles vulnérables. De plus en plus d'appels d'offres exigent des preuves de sécurité des données.
    </p>
    <p class="mb-6">Des démarches adaptées aux ressources des petites structures existent :</p>
    <ul class="list-disc pl-6 space-y-2 mb-6">
      <li class="pl-2"><strong>Audit simplifié</strong> - Approche allégée pour les petites structures</li>
      <li class="pl-2"><strong>SMSI modulaire</strong> - Mise en œuvre progressive</li>
      <li class="pl-2"><strong>Mutualisation avec d'autres certifications</strong> (ISO 9001, 22301…) - Optimisation des coûts</li>
    </ul>
    <p class="text-lg leading-relaxed">
      Adopter la norme ISO 27001, c'est faire le choix de la rigueur, de la transparence et de la maturité numérique.
      Pour les États africains comme pour les entreprises marocaines, c'est un signal fort en faveur d'un développement
      numérique maîtrisé, résilient et éthique.
    </p>
  </section>
</article>
  `,
  },
  {
    id: '3',
    title: "L’économie bleue au Maroc ",
    excerpt: "Cap vers un modèle résilient et durable",
    image: "/images/blog/blog-3.jpg",
    category: "Economie Bleue",
    date: "2025-03-06",
    readingTime: "10 min",
    content: `<article class="prose prose-lg max-w-4xl mx-auto py-8 px-4 text-gray-800">
  <header class="mb-12">
    <span class="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
      Climat & Développement Durable
    </span>
    <h1 class="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
      L’économie bleue au Maroc : cap vers un modèle résilient et durable
    </h1>
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-b pb-6">
      <p><strong class="text-gray-700">Rédaction :</strong> Expert en climat, économie circulaire et transitions durables</p>
      <p><strong class="text-gray-700">Date :</strong> Jeudi 06 mars 2025</p>
      <p><strong class="text-gray-700">Temps de lecture :</strong> 7 min</p>
    </div>
  </header>

  <section class="mb-10">
    <p class="text-lg leading-relaxed mb-6">
      À l’heure où les limites planétaires sont franchies les unes après les autres – réchauffement climatique, effondrement de la biodiversité, acidification des océans – l’urgence d’un nouveau modèle économique s’impose. 
      Le Maroc, bordé par plus de 3 500 kilomètres de côtes, est idéalement placé pour devenir un acteur de premier plan de l’économie bleue durable.
    </p>
    <p class="text-lg leading-relaxed">
      Mais que signifie réellement l’économie bleue, et comment le Royaume peut-il en faire un levier de résilience écologique, de justice sociale et de prospérité économique ?
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-primary-dark)]">Qu’est-ce que l’économie bleue ?</h2>
    <p class="mb-4">
      L’économie bleue désigne un modèle économique basé sur l’exploitation durable des ressources marines et côtières, tout en préservant les écosystèmes océaniques.
      Elle s’étend bien au-delà de la pêche et inclut :
    </p>
    <ul class="list-disc pl-6 space-y-2">
      <li>L’aquaculture durable</li>
      <li>Les ports verts et la logistique bas carbone</li>
      <li>L’énergie marine renouvelable (houle, marée, offshore)</li>
      <li>La biotechnologie marine</li>
      <li>Le tourisme côtier écoresponsable</li>
      <li>La protection des écosystèmes (zones humides, coraux, posidonies)</li>
    </ul>
    <p class="mt-4">
      L’économie bleue croise donc les enjeux de l’économie circulaire, de la neutralité carbone et de la régénération des écosystèmes.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Le Maroc face à un potentiel immense mais sous-exploité</h2>
    <p class="mb-4">
      Avec ses façades atlantique et méditerranéenne, le Maroc dispose de ressources maritimes riches mais fragiles. 
      Le secteur halieutique représente à lui seul près de 3% du PIB, faisant du pays l’un des premiers exportateurs africains de produits de la mer.
    </p>
    <p class="mb-6">
      Pourtant, la surexploitation des stocks, la pollution plastique et le changement climatique menacent directement cette richesse bleue.
    </p>
    <h3 class="text-xl font-semibold mb-4">Enjeux clés :</h3>
    <ul class="list-disc pl-6 space-y-2">
      <li>Réchauffement des eaux et acidification</li>
      <li>Déclin de certaines espèces marines</li>
      <li>Pollution industrielle et urbaine non traitée</li>
      <li>Invasion du plastique sur les littoraux</li>
    </ul>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Une stratégie nationale en construction</h2>
    <p class="mb-4">
      Le Maroc a initié plusieurs chantiers structurants pour encadrer son économie bleue :
    </p>
    <ul class="list-disc pl-6 space-y-2 mb-4">
      <li><strong>Plan Halieutis</strong> : modernisation du secteur de la pêche, lutte contre la pêche illicite</li>
      <li><strong>Stratégie nationale de développement durable (SNDD 2030)</strong> : intégration des écosystèmes marins dans les politiques publiques</li>
      <li><strong>Initiatives pour des ports verts</strong> à Agadir, Dakhla ou Casablanca</li>
      <li><strong>Collaboration</strong> avec la FAO et l’UICN sur la protection des zones marines</li>
    </ul>
    <p>
      Mais pour réussir ce tournant, une approche circulaire, régénérative et territorialisée est indispensable.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Économie circulaire et justice climatique : le duo gagnant</h2>
    <p class="mb-4">
      L’économie bleue ne doit pas répéter les erreurs de l’économie grise ou verte fondée sur l’extraction. 
      Elle doit s’appuyer sur :
    </p>
    <ul class="list-disc pl-6 space-y-2 mb-4">
      <li><strong>Boucles locales de valeur</strong> : valorisation des déchets de pêche, recyclage des plastiques marins, éco-conception des navires</li>
      <li><strong>Innovation responsable</strong> : bioplastiques à base d’algues, production d’énergie marine renouvelable</li>
      <li><strong>Inclusion sociale</strong> : implication des pêcheurs artisans, des femmes dans la chaîne de valeur, formation des jeunes aux métiers marins durables</li>
    </ul>
    <p>
      L’économie bleue doit contribuer à la résilience des territoires côtiers, souvent touchés par la précarité et les effets du changement climatique.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Des projets inspirants à valoriser</h2>
    <ul class="list-disc pl-6 space-y-2 mb-6">
      <li><strong>À Dakhla</strong>, des projets pilotes d’aquaculture durable (huîtres, algues) montrent que production et régénération peuvent aller de pair.</li>
      <li><strong>Le port de Tanger Med</strong> s’oriente vers un modèle de logistique maritime à faible émission.</li>
      <li><strong>Des associations locales</strong> nettoient les plages, sensibilisent les jeunes et développent des coopératives féminines dans la transformation des produits de la mer.</li>
    </ul>
    <p class="text-lg leading-relaxed">
      L’économie bleue n’est pas un secteur de niche, c’est une vision systémique qui combine protection des océans, innovation, inclusion et développement durable.
    </p>
    <p class="text-lg leading-relaxed mt-4">
      Le Maroc a les atouts pour devenir un leader africain de la transition bleue, à condition d’investir dans une gouvernance marine intégrée, des financements durables, et une vraie articulation avec les Objectifs de Développement Durable (ODD 13, 14, 8 et 12).
    </p>
  </section>
</article>
`
  },
  {
    id: '4',
    title: "Économie verte au Maroc : moteur d’un développement durable, inclusif et résilient",
    excerpt: "Le Maroc, comme nombre de pays africains, n’a plus le choix : il doit transformer en profondeur son modèle de développement.",
    image: "/images/blog/blog-4.jpg",
    category: "Economie Verte",
    date: "2025-04-08",
    readingTime: "7 min",
    content: `<article class="prose prose-lg max-w-4xl mx-auto py-8 px-4 text-gray-800">
  <header class="mb-12">
    <span class="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
      Climat & Économie Durable
    </span>
    <h1 class="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
      Économie verte au Maroc : moteur d’un développement durable, inclusif et résilient
    </h1>
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-b pb-6">
      <p><strong class="text-gray-700">Rédaction :</strong> Expert en changement climatique, limites planétaires et économie circulaire</p>
      <p><strong class="text-gray-700">Date :</strong> Mardi 08 avril 2025</p>
      <p><strong class="text-gray-700">Temps de lecture :</strong> 7 min</p>
    </div>
  </header>

  <section class="mb-10">
    <p class="text-lg leading-relaxed mb-6">
      Face à l’intensification des sécheresses, à la dégradation des sols, à la pression sur les ressources naturelles et aux bouleversements climatiques, le Maroc, comme nombre de pays africains, n’a plus le choix : il doit transformer en profondeur son modèle de développement.
    </p>
    <p class="text-lg leading-relaxed">
      C’est là qu’intervient l’économie verte, non pas comme un secteur à part, mais comme un nouveau paradigme transversal conciliant croissance économique, préservation des écosystèmes et inclusion sociale.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-primary-dark)]">Définir l’économie verte : bien plus qu’un label écologique</h2>
    <p class="mb-4">
      L’économie verte est définie par le PNUE comme "une économie qui entraîne une amélioration du bien-être humain et de l’équité sociale, tout en réduisant significativement les risques environnementaux."
    </p>
    <p class="mb-4">Elle s’articule autour de 5 grands piliers :</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Gestion durable des ressources naturelles</li>
      <li>Emplois verts et formation</li>
      <li>Économie circulaire et éco-innovation</li>
      <li>Transition énergétique propre</li>
      <li>Justice climatique et inclusion territoriale</li>
    </ul>
    <p class="mt-4">
      L’économie verte ne se limite donc pas aux énergies renouvelables : elle réinvente l’ensemble des chaînes de valeur en intégrant les limites planétaires et les Objectifs de Développement Durable (ODD).
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Le Maroc : un terrain fertile pour l’économie verte</h2>
    <p class="mb-4">
      Le Royaume affiche depuis une décennie une volonté politique forte de transition :
    </p>
    <ul class="list-disc pl-6 space-y-2">
      <li><strong>Stratégie Nationale de Développement Durable (SNDD 2030)</strong></li>
      <li><strong>Nouvelle Charte de l’investissement</strong> incluant des critères durables</li>
      <li><strong>Loi sur les énergies renouvelables</strong> et montée en puissance des programmes solaires (Noor) et éoliens</li>
      <li><strong>Initiatives d’adaptation climatique</strong> dans les territoires ruraux</li>
    </ul>
    <p class="mt-4">
      Mais pour que l’économie verte devienne le cœur du modèle marocain, il faut aller plus loin qu’un empilement de projets. Il faut bâtir une vision intégrée, intersectorielle et inclusive.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Quels leviers pour accélérer l’économie verte au Maroc ?</h2>
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
          Agriculture durable et intelligente
        </h3>
        <p>
          Repenser les systèmes de production agricole avec des pratiques agroécologiques, l’agriculture régénérative, la valorisation des déchets organiques et une gestion optimisée de l’eau.
        </p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
          Éco-construction et efficacité énergétique
        </h3>
        <p>
          Favoriser les matériaux biosourcés (terre, chanvre, argile), les bâtiments passifs, les villes compactes et résilientes au climat.
        </p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
          Déchets comme ressources
        </h3>
        <p>
          Passer du "tout jeter" à une économie circulaire territorialisée : tri, recyclage, compostage, écoconception, filières locales de réemploi.
        </p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">4</span>
          Énergies renouvelables pour tous
        </h3>
        <p>
          Accélérer l’accès à des solutions solaires et éoliennes pour les entreprises, les écoles rurales, les zones isolées.
        </p>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">5</span>
          Formation & inclusion des jeunes
        </h3>
        <p>
          Développer les métiers verts de demain : technicien.ne solaire, artisan.e recyclage, facilitateur.trice d’économie circulaire, ingénieur.e écosystèmes...
        </p>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Des projets inspirants déjà en marche</h2>
    <ul class="list-disc pl-6 space-y-2 mb-6">
      <li>Des coopératives de recyclage à Casablanca et Marrakech, qui emploient des femmes et valorisent des tonnes de déchets</li>
      <li>Des programmes d’adaptation agricole dans le Souss et les zones oasiennes</li>
      <li>Le développement de clusters d’innovation verte à Rabat et dans la région de l’Oriental</li>
      <li>L’initiative de "Territoires verts inclusifs" pilotée avec les collectivités locales et des ONG</li>
    </ul>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Pourquoi l’économie verte est un pari gagnant ?</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-[var(--color-primary-light)]">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Bénéfices</th>
            <th class="px-6 py-3 text-left font-semibold">Impacts</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Création d’emplois locaux</td>
            <td class="px-6 py-4">Insertion des jeunes et inclusion des femmes</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Résilience aux chocs climatiques</td>
            <td class="px-6 py-4">Sécurisation de l’agriculture et des écosystèmes</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Atténuation carbone</td>
            <td class="px-6 py-4">Contribution aux engagements climatiques (COP)</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Nouveaux marchés internationaux</td>
            <td class="px-6 py-4">Compétitivité accrue à l’export</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Amélioration de la qualité de vie</td>
            <td class="px-6 py-4">Santé, environnement, cohésion sociale</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Articuler économie verte et souveraineté</h2>
    <p class="text-lg leading-relaxed mb-4">
      L’économie verte est aussi une stratégie de souveraineté : alimentaire, énergétique, industrielle. Elle permet au Maroc de réduire ses dépendances, de sécuriser ses ressources et d’inventer un développement enraciné dans ses territoires.
    </p>
    <p class="text-lg leading-relaxed">
      Le Maroc a toutes les cartes en main pour devenir un leader africain de l’économie verte. Ce qui manque aujourd’hui, ce n’est pas l’ambition, mais l’intégration systémique de cette logique dans l’ensemble des politiques publiques, des formations, des investissements et des stratégies d’entreprise.
    </p>
  </section>
</article>
`
  },
  {
    id: '5',
    title: "Transition écologique : catalyseur d’un Maroc résilient, sobre et inclusif",
    excerpt: "Face à l’escalade des impacts du dérèglement climatique , la transition climatique devient un impératif stratégique, économique et humain.",
    image: "/images/blog/blog-5.jpg",
    category: "Transition Écologique",
    date: "2025-05-05",
    readingTime: "15 min",
    content: `<article class="prose prose-lg max-w-4xl mx-auto py-8 px-4 text-gray-800">
  <header class="mb-12">
    <span class="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
      Transition Écologique
    </span>
    <h1 class="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
      Transition écologique : catalyseur d’un Maroc résilient, sobre et inclusif
    </h1>
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-b pb-6">
      <p><strong class="text-gray-700">Rédaction :</strong> Expert en transitions durables, économie circulaire et climat</p>
      <p><strong class="text-gray-700">Date :</strong> Lundi 05 mai 2025</p>
      <p><strong class="text-gray-700">Temps de lecture :</strong> 6 min</p>
    </div>
  </header>

  <section class="mb-10">
    <p class="text-lg leading-relaxed mb-6">
      La transition écologique n’est pas un luxe ni une mode. Elle est une réponse vitale aux limites planétaires franchies, à l’urgence climatique, à la raréfaction des ressources, et aux inégalités territoriales qui minent la résilience des sociétés.
    </p>
    <p class="text-lg leading-relaxed">
      Le Maroc, en tant que pays pionnier en matière d’énergies renouvelables, de stratégie climatique et de développement durable, a un rôle clé à jouer en Afrique. Mais réussir cette transition exige une mutation profonde des politiques publiques, des modèles économiques, des comportements citoyens… et des mentalités.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-primary-dark)]">Qu’est-ce que la transition écologique ?</h2>
    <p class="mb-4">
      C’est une transformation structurelle et progressive de notre modèle de développement, pour passer d’une économie extractive, carbonée et linéaire à une économie sobre en ressources, décarbonée, circulaire et inclusive.
    </p>
    <p class="mb-4">Elle touche tous les domaines :</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Climat et énergie</li>
      <li>Urbanisme et mobilité</li>
      <li>Agriculture et biodiversité</li>
      <li>Déchets et économie circulaire</li>
      <li>Emploi et justice sociale</li>
    </ul>
    <p class="mt-4">
      Ce n’est pas une “transition verte” au sens marketing, mais une transition systémique, centrée sur la soutenabilité à long terme et l’équité.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Pourquoi le Maroc est à la croisée des chemins ?</h2>
    <p class="mb-4 font-semibold text-gray-700">Les avancées :</p>
    <ul class="list-disc pl-6 space-y-2 mb-6">
      <li>Stratégie nationale de développement durable 2030</li>
      <li>Feuille de route bas-carbone visant la neutralité climatique à l’horizon 2050</li>
      <li>Leadership en énergies renouvelables (Noor, Tarfaya, Midelt)</li>
      <li>Initiatives locales d’économie circulaire, de reboisement, d’agroécologie</li>
    </ul>
    <p class="mb-4 font-semibold text-gray-700">Mais aussi des défis :</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Stress hydrique croissant</li>
      <li>Urbanisation non planifiée</li>
      <li>Pollutions industrielles</li>
      <li>Inégalités sociales et territoriales</li>
      <li>Dépendance aux énergies fossiles importées</li>
    </ul>
    <p class="mt-4">
      La transition écologique est donc une urgence stratégique pour protéger la souveraineté du pays, la santé des populations et la stabilité sociale.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Comment réussir une transition écologique au Maroc ?</h2>
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
          Réorienter l’économie vers la durabilité
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Financer les PME vertes</li>
          <li>Intégrer des critères ESG et RSE dans les marchés publics</li>
          <li>Stimuler l’investissement dans l’innovation verte</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
          Transformer les infrastructures
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Développer la mobilité décarbonée (train, vélo, transport collectif)</li>
          <li>Rénover les bâtiments pour les rendre plus sobres</li>
          <li>Éco-concevoir les villes autour de la résilience climatique</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
          Gérer durablement les ressources
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Réutilisation des eaux usées</li>
          <li>Optimisation de l’irrigation agricole</li>
          <li>Lutte contre l’érosion et désertification</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">4</span>
          Mobiliser les territoires et les citoyens
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Éduquer à la transition dès l’école</li>
          <li>Soutenir les projets communautaires (énergies, compostage, coopératives)</li>
          <li>Créer des emplois verts et équitables</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Quels bénéfices attendre d’une transition écologique bien menée ?</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-[var(--color-primary-light)]">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Domaine</th>
            <th class="px-6 py-3 text-left font-semibold">Impact positif</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Économie</td>
            <td class="px-6 py-4">Création d’emplois verts, souveraineté énergétique</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Climat</td>
            <td class="px-6 py-4">Réduction des émissions, résilience face aux chocs</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Santé</td>
            <td class="px-6 py-4">Réduction des pollutions, meilleure qualité de vie</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Territoires</td>
            <td class="px-6 py-4">Développement local, justice sociale</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Image internationale</td>
            <td class="px-6 py-4">Leadership africain sur les ODD et le climat</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Un Maroc leader de la transition verte en Afrique ?</h2>
    <p class="text-lg leading-relaxed mb-4">
      Le Maroc est souvent cité en exemple sur la scène internationale. Pour passer du discours à l’impact, il faut désormais :
    </p>
    <ul class="list-disc pl-6 space-y-2 mb-4">
      <li>Accélérer la gouvernance environnementale</li>
      <li>Financer massivement les solutions locales</li>
      <li>Adopter une logique de co-construction avec les citoyens</li>
    </ul>
    <p class="text-lg leading-relaxed">
      La transition écologique ne peut pas être pilotée d’en haut. Elle doit s’enraciner dans les territoires, les entreprises, les écoles, les foyers.
    </p>
    <p class="text-lg leading-relaxed mt-4 font-semibold text-[var(--color-primary-dark)]">
      La transition écologique n’est pas un coût, c’est un investissement. C’est une vision stratégique au service du vivant, de la justice sociale et des générations futures.
    </p>
  </section>
</article>
`
  },
  {
    id: '6',
    title: "Transition climatique au Maroc : urgence, adaptation et opportunités pour un avenir résilient",
    excerpt: "La transition écologique n’est pas un luxe ni une mode. Elle est une réponse vitale aux limites planétaires franchies, à ...",
    image: "/images/blog/blog-6.jpg",
    category: "Transition Climatique",
    date: "2025-04-10",
    readingTime: "10 min",
    content: `<article class="prose prose-lg max-w-4xl mx-auto py-8 px-4 text-gray-800">
  <header class="mb-12">
    <span class="text-sm font-semibold text-[var(--color-primary)] uppercase tracking-wider">
      Transition climatique
    </span>
    <h1 class="text-3xl md:text-4xl font-bold mt-2 mb-4 leading-tight">
      Transition climatique au Maroc : urgence, adaptation et opportunités pour un avenir résilient
    </h1>
    <div class="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 border-b pb-6">
      <p><strong class="text-gray-700">Rédaction :</strong> Expert en climat, stratégie bas carbone et résilience territoriale</p>
      <p><strong class="text-gray-700">Date :</strong> Lundi 02 juin 2025</p>
      <p><strong class="text-gray-700">Temps de lecture :</strong> 6 min</p>
    </div>
  </header>

  <section class="mb-10">
    <p class="text-lg leading-relaxed mb-6">
      Face à l’escalade des impacts du dérèglement climatique – sécheresses prolongées, stress hydrique, feux de forêt, perte de biodiversité – la transition climatique devient un impératif stratégique, économique et humain.
    </p>
    <p class="text-lg leading-relaxed">
      Le Maroc, déjà confronté à l’augmentation des températures, à la raréfaction de l’eau et à la fragilité de ses écosystèmes, doit non seulement s’adapter à cette nouvelle réalité, mais aussi accélérer sa décarbonation. C’est un double défi : protéger le présent tout en préparant l’avenir.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-4 text-[var(--color-primary-dark)]">Transition climatique : de quoi parle-t-on ?</h2>
    <p class="mb-4">
      La transition climatique désigne l’ensemble des actions entreprises pour réduire les émissions de gaz à effet de serre (<strong>atténuation</strong>) et pour se préparer aux effets du changement climatique (<strong>adaptation</strong>).
    </p>
    <p class="mb-4">C’est une transformation systémique qui touche :</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>L’énergie (production, usage, efficacité)</li>
      <li>L’agriculture et la gestion de l’eau</li>
      <li>Les transports et la mobilité</li>
      <li>Le bâti, les villes et les infrastructures</li>
      <li>Les modèles de consommation</li>
    </ul>
    <p class="mt-4">
      Elle ne se limite pas à la technologie : c’est aussi une question de gouvernance, de justice sociale et d’anticipation territoriale.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Le Maroc en première ligne du changement climatique</h2>
    <p class="mb-4 font-semibold text-gray-700">Impacts déjà visibles :</p>
    <ul class="list-disc pl-6 space-y-2 mb-6">
      <li>Hausse de +1,5°C des températures moyennes</li>
      <li>Réduction des ressources hydriques de 70% d’ici 2050</li>
      <li>Menaces sur l’agriculture, l’élevage et la sécurité alimentaire</li>
      <li>Régression de la biodiversité et des zones forestières</li>
      <li>Élévation du niveau marin et érosion côtière</li>
    </ul>
    <p class="mb-4 font-semibold text-gray-700">Réponses nationales :</p>
    <ul class="list-disc pl-6 space-y-2">
      <li>Stratégie climat 2050 et Contribution Déterminée au niveau National (CDN)</li>
      <li>Stratégie Énergétique du Maroc (52% d’énergies renouvelables visées à l’horizon 2030)</li>
      <li>Plan National d’Adaptation (PNA)</li>
      <li>Programmes territoriaux d’économie d’eau et de résilience agricole</li>
    </ul>
    <p class="mt-4">
      Mais les défis sont colossaux. Il ne s’agit plus de réagir, mais de transformer en profondeur nos systèmes.
    </p>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">5 leviers pour accélérer la transition climatique au Maroc</h2>
    <div class="space-y-6">
      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">1</span>
          Décarboner les secteurs stratégiques
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Accélérer le mix renouvelable (solaire, éolien, hydraulique)</li>
          <li>Promouvoir l’hydrogène vert et les carburants propres</li>
          <li>Électrifier les transports et l’industrie</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">2</span>
          Adapter les territoires au stress hydrique
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Réutilisation des eaux usées traitées</li>
          <li>Agriculture résiliente (agroécologie, semences locales)</li>
          <li>Solutions fondées sur la nature (restauration des oasis, zones humides)</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">3</span>
          Construire des villes bas carbone
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Urbanisme compact et végétalisé</li>
          <li>Bâtiments bioclimatiques et efficacité énergétique</li>
          <li>Mobilité douce, transport collectif, smart cities</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">4</span>
          Sensibiliser, former, impliquer
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Éducation climatique dans les écoles</li>
          <li>Formations aux métiers verts</li>
          <li>Dialogue avec les jeunes, les agriculteurs, les communes</li>
        </ul>
      </div>

      <div>
        <h3 class="text-xl font-semibold mb-3 flex items-start">
          <span class="inline-block bg-[var(--color-primary)] text-white rounded-full w-6 h-6 flex items-center justify-center mr-3">5</span>
          Financer la transition
        </h3>
        <ul class="list-disc pl-6 space-y-1">
          <li>Mobiliser les financements climat internationaux</li>
          <li>Éco-conditionnalité des subventions et investissements publics</li>
          <li>Financement participatif, coopératif et territorial</li>
        </ul>
      </div>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Transition climatique : un coût ou une opportunité ?</h2>
    <div class="overflow-x-auto">
      <table class="min-w-full border border-gray-200 rounded-lg overflow-hidden">
        <thead class="bg-[var(--color-primary-light)]">
          <tr>
            <th class="px-6 py-3 text-left font-semibold">Aspect</th>
            <th class="px-6 py-3 text-left font-semibold">Risques si inaction</th>
            <th class="px-6 py-3 text-left font-semibold">Bénéfices de l’action</th>
          </tr>
        </thead>
        <tbody class="bg-white">
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Économie</td>
            <td class="px-6 py-4">Perte de productivité, coûts extrêmes</td>
            <td class="px-6 py-4">Nouveaux marchés, emplois verts, innovation locale</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Social</td>
            <td class="px-6 py-4">Vulnérabilité des populations rurales</td>
            <td class="px-6 py-4">Inclusion territoriale, sécurité alimentaire</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Environnement</td>
            <td class="px-6 py-4">Dégradation irréversible</td>
            <td class="px-6 py-4">Régénération, résilience écologique</td>
          </tr>
          <tr class="hover:bg-gray-50">
            <td class="px-6 py-4">Diplomatie</td>
            <td class="px-6 py-4">Dépendance, marginalisation</td>
            <td class="px-6 py-4">Leadership africain et crédibilité internationale</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>

  <section class="mb-12">
    <h2 class="text-2xl font-bold mb-6 text-[var(--color-primary-dark)]">Le Maroc peut devenir un laboratoire africain de la résilience climatique</h2>
    <p class="text-lg leading-relaxed mb-4">
      Le Royaume dispose de nombreux atouts : vision stratégique, engagement international, ressources naturelles, intelligence territoriale. Il lui faut maintenant :
    </p>
    <ul class="list-disc pl-6 space-y-2 mb-4">
      <li>Décliner la stratégie climat dans chaque région</li>
      <li>Renforcer la coopération Sud-Sud autour de l’adaptation</li>
      <li>Impliquer les collectivités, les entreprises et la jeunesse dans la transition</li>
    </ul>
    <p class="text-lg leading-relaxed">
      Le Maroc n’est pas spectateur du changement climatique : il en est déjà victime… mais peut aussi devenir un acteur de référence de la transformation.
    </p>
    <p class="text-lg leading-relaxed mt-4 font-semibold text-[var(--color-primary-dark)]">
      La transition climatique n’est pas une contrainte. C’est un levier pour une société plus juste, une économie plus résiliente et un avenir vivable.
    </p>
  </section>
</article>
`
  },
  
];
