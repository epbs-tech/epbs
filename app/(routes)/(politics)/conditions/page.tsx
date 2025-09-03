import LegalLayout from '@/components/politique/legal-layout';

export const metadata = {
  title: "Conditions Générales | EPBS Consulting",
  description: "Conditions d'utilisation de notre site web et services",
};

export default function ConditionsPage() {
  return (
    <LegalLayout title="Conditions Générales d'Utilisation du Site Web" lastUpdated="21 mai 2025">
      <div className="prose max-w-4xl mx-auto py-12 px-4">
        <h2 className='font-bold '>1. Introduction</h2>
        <p>
          Les présentes Conditions Générales d'Utilisation (ci-après, les « Conditions ») régissent l'accès et l'utilisation du site web officiel 
          de EPBS Consulting Maroc (ci-après « EPBS », « nous », « notre » ou « nos ») accessible à l'adresse : www.epbs-consulting.com (le « Site »).
        </p>
        <p>
          En accédant à ce Site, vous acceptez sans réserve les présentes Conditions ainsi que notre Politique de confidentialité, notre Politique 
          d'utilisation des cookies, et toutes autres politiques ou avis légaux affichés sur le Site. Si vous n'êtes pas d'accord avec l'un quelconque 
          de ces termes, veuillez ne pas utiliser le Site.
        </p>

        <h2 className='font-bold '>2. Propriété intellectuelle</h2>
        <p>
          L'ensemble du contenu présent sur le Site, incluant mais non limité aux textes, images, graphismes, logos, vidéos, documents téléchargeables, 
          base de données, codes sources, et marques, est la propriété exclusive de EPBS ou de ses partenaires. Ce contenu est protégé par les lois 
          marocaines et internationales relatives à la propriété intellectuelle.
        </p>
        <p>
          Aucun élément du Site ne peut être copié, reproduit, modifié, diffusé, transmis, publié ou utilisé, en tout ou partie, à des fins commerciales 
          ou publiques sans notre autorisation écrite expresse.
        </p>

        <h2 className='font-bold '>3. Conditions d'utilisation</h2>
        <p>
          Vous vous engagez à :
        </p>
        <ul>
          <li>Utiliser le Site uniquement à des fins licites, personnelles et informatives</li>
          <li>Ne pas tenter de porter atteinte à la sécurité, la stabilité ou à l'intégrité du Site</li>
          <li>Ne pas introduire de logiciels malveillants (virus, trojans, etc.)</li>
          <li>Ne pas accéder à des informations non autorisées ou interférer avec les systèmes ou données d'autres utilisateurs</li>
        </ul>

        <h2 className='font-bold '>4. Compte utilisateur (le cas échéant)</h2>
        <p>
          Si la création d'un compte est proposée sur le Site :
        </p>
        <ul>
          <li>Vous devez fournir des informations exactes et à jour</li>
          <li>Vous êtes responsable de la confidentialité de vos identifiants</li>
          <li>Toute activité réalisée via votre compte est présumée être effectuée par vous</li>
          <li>Vous devez nous informer immédiatement de tout usage non autorisé de votre compte</li>
        </ul>

        <h2 className='font-bold '>5. Contenu généré par l'utilisateur</h2>
        <p>
          Lorsque vous publiez ou transmettez tout contenu via le Site (commentaire, formulaire, fichier), vous garantissez :
        </p>
        <ul>
          <li>Détenir tous les droits sur ce contenu</li>
          <li>Que ce contenu est licite, non diffamatoire, non offensant et ne viole aucun droit de tiers</li>
        </ul>
        <p>
          Vous accordez à EPBS une licence non exclusive, gratuite, mondiale et perpétuelle pour utiliser, reproduire, modifier ou publier ce contenu 
          dans le cadre de ses activités.
        </p>

        <h2 className='font-bold '>6. Liens vers des sites tiers</h2>
        <p>
          Le Site peut contenir des liens vers des sites externes. EPBS n'est pas responsable du contenu, des pratiques de confidentialité ou de sécurité 
          de ces sites tiers. Nous vous encourageons à consulter leurs conditions et politiques respectives.
        </p>

        <h2 className='font-bold '>7. Limitations de responsabilité</h2>
        <p>
          Malgré le soin apporté à l'exactitude des informations diffusées, EPBS ne garantit ni leur exhaustivité, ni leur actualité.
        </p>
        <p>
          Nous ne pourrons être tenus responsables de :
        </p>
        <ul>
          <li>Tout dommage direct ou indirect résultant de l'usage du Site</li>
          <li>L'interruption ou l'indisponibilité temporaire du Site</li>
          <li>L'utilisation non autorisée de vos données d'accès ou de votre compte</li>
        </ul>

        <h2 className='font-bold '>8. Indemnisation</h2>
        <p>
          Vous vous engagez à indemniser et à dégager de toute responsabilité EPBS, ses dirigeants, collaborateurs ou partenaires, en cas de réclamation 
          liée à votre non-respect des présentes Conditions ou à l'usage abusif que vous feriez du Site.
        </p>

        <h2 className='font-bold '>9. Suspension ou résiliation</h2>
        <p>
          Nous nous réservons le droit de suspendre ou de supprimer l'accès à tout ou partie du Site, sans préavis, en cas de violation des présentes 
          Conditions ou pour des raisons techniques, de maintenance ou de sécurité.
        </p>

        <h2 className='font-bold '>10. Droit applicable et juridiction compétente</h2>
        <p>
          Les présentes Conditions sont régies par la législation marocaine. En cas de litige, compétence exclusive est attribuée aux tribunaux de Rabat.
        </p>

        <h2 className='font-bold '>11. Modification des conditions</h2>
        <p>
          EPBS se réserve le droit de modifier les présentes Conditions à tout moment. Les modifications seront publiées sur le Site avec une date de mise 
          à jour. Il est de votre responsabilité de consulter régulièrement cette page. Votre utilisation continue du Site constitue votre acceptation des 
          modifications.
        </p>

        <h2 className='font-bold '>12. Contact</h2>
        <p>
          Pour toute question ou demande relative à ces Conditions, veuillez nous contacter à :
        </p>
        <address className="not-italic">
          <a href="mailto:contact@epbsconsulting.com" className="text-[var(--color-primary)]">
            contact@epbsconsulting.com
          </a>
          <br />
          EPBS Consulting Maroc<br />
          15 avenue Al Abtal-Agdal, 10090 Rabat. Maroc
        </address>
      </div>
    </LegalLayout>
  );
}