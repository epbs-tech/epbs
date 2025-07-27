import LegalLayout from '@/components/politique/legal-layout';

export const metadata = {
  title: "Politique de Cookies | EPBS Consulting",
  description: "Comment nous utilisons les cookies sur notre site",
};

export default function CookiesPage() {
  return (
    <LegalLayout title="Politique d'Utilisation des Cookies" lastUpdated="21 mai 2025">
      <div className="prose max-w-4xl mx-auto py-12 px-4">
        <h2 className='font-bold'>1. Qu'est-ce qu'un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte placé sur votre appareil (ordinateur, mobile ou tablette) 
          lors de la visite d'un site web. Il permet de mémoriser certaines informations à votre sujet, 
          telles que vos préférences de navigation, afin d'améliorer votre expérience utilisateur.
        </p>
        <p>
          Il existe plusieurs types de cookies :
        </p>
        <ul>
          <li><strong>Cookies nécessaires</strong> : indispensables au bon fonctionnement du site</li>
          <li><strong>Cookies de performance</strong> : analysent l'utilisation du site afin d'en améliorer l'efficacité</li>
          <li><strong>Cookies fonctionnels</strong> : mémorisent vos préférences</li>
          <li><strong>Cookies de ciblage ou publicitaires</strong> : suivent votre navigation à des fins marketing</li>
        </ul>

        <h2 className='font-bold'>2. Pourquoi utilisons-nous des cookies ?</h2>
        <p>
          Nous utilisons des cookies pour plusieurs raisons :
        </p>
        <ul>
          <li>Assurer le bon fonctionnement et la sécurité de notre site web</li>
          <li>Faciliter votre navigation et améliorer l'expérience utilisateur</li>
          <li>Analyser l'audience et mesurer la performance de notre contenu</li>
          <li>Adapter notre communication selon vos centres d'intérêt</li>
        </ul>
        <p>
          Certains cookies sont essentiels et ne peuvent être désactivés. D'autres sont optionnels et font l'objet de votre consentement préalable.
        </p>

        <h2 className='font-bold'>3. Quelles données sont collectées ?</h2>
        <p>
          Les cookies peuvent collecter :
        </p>
        <ul>
          <li>Votre adresse IP</li>
          <li>Le type de navigateur et d'appareil utilisé</li>
          <li>Les pages visitées et le temps de navigation</li>
          <li>Vos préférences linguistiques</li>
          <li>Les liens cliqués</li>
          <li>Les données liées à vos interactions avec nos contenus</li>
        </ul>
        <p>
          Lorsque ces données permettent de vous identifier, elles sont traitées conformément à notre Politique de confidentialité.
        </p>

        <h2 className='font-bold'>4. Qui a accès aux cookies ?</h2>
        <p>
          <strong>Cookies internes</strong> : gérés directement par EPBS Consulting Maroc.
        </p>
        <p>
          <strong>Cookies tiers</strong> : placés par des partenaires (Google, LinkedIn, Meta, etc.) pour des fonctionnalités comme l'analyse de trafic, 
          le partage sur les réseaux sociaux ou le ciblage publicitaire.
        </p>
        <p>
          Nous ne contrôlons pas les cookies tiers, mais nous vous donnons accès aux paramètres pour les activer ou les désactiver. 
          Nous vous recommandons de consulter les politiques de confidentialité de ces partenaires.
        </p>

        <h2 className='font-bold' id="preferences">5. Vos choix et le contrôle des cookies</h2>
        <p>
          Vous pouvez à tout moment :
        </p>
        <ul>
          <li>Gérer votre consentement via notre bannière de gestion des cookies, accessible lors de votre première visite ou via le lien en bas de page du site</li>
          <li>Configurer votre navigateur pour accepter ou refuser certains cookies</li>
          <li>Supprimer vos cookies à tout moment depuis les paramètres de votre navigateur</li>
        </ul>
        <p className="bg-yellow-50 p-4 rounded">
          <strong>Important</strong> : Le blocage de certains cookies peut altérer certaines fonctionnalités du site.
        </p>
        <p>
          Vos préférences sont conservées pour une durée maximale de 12 mois, après quoi nous vous solliciterons à nouveau pour recueillir votre consentement.
        </p>

        <h2 className='font-bold'>6. Cookies de tiers et sites externes</h2>
        <p>
          Le site peut contenir des liens vers des plateformes externes (sondages, candidatures, paiements, etc.). Ces sites peuvent appliquer leurs propres 
          politiques en matière de cookies. EPBS Consulting Maroc ne peut être tenu responsable de l'usage qui y est fait de vos données. Nous vous invitons 
          à consulter leurs politiques respectives.
        </p>

        <h2 className='font-bold'>7. Mises à jour de la politique</h2>
        <p>
          Nous pouvons mettre à jour cette politique pour refléter l'évolution de nos pratiques ou des exigences réglementaires. Toute mise à jour sera publiée 
          sur cette page, avec indication de la date de modification.
        </p>

        <h2 className='font-bold'>8. Nous contacter</h2>
        <p>
          Pour toute question relative à notre Politique d'utilisation des cookies, ou pour exercer vos droits, vous pouvez nous contacter via les coordonnées 
          disponibles dans notre Politique de confidentialité ou directement à :
        </p>
        <address className="not-italic">
          <a href="mailto:contact@epbs-consulting.com" className="text-[var(--color-primary)]">
            contact@epbs-consulting.com
          </a>
          <br />
          EPBS Consulting – Maroc<br />
          15 avenue Al Abtal-Agdal, 10090 Rabat. Maroc
        </address>
      </div>
    </LegalLayout>
  );
}