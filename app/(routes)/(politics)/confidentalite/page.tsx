import LegalLayout from '@/components/politique/legal-layout';

export const metadata = {
  title: "Politique de Confidentialité | EPBS Consulting",
  description: "Comment nous protégeons vos données personnelles",
};

export default function ConfidentialitePage() {
  return (
    <LegalLayout title="Politique de Protection de la Vie Privée" lastUpdated="21 mai 2025">
      <div className="prose max-w-4xl mx-auto py-12 px-4">
        <h2 className='font-bold'>1. Introduction</h2>
        <p>
          Chez EPBS Consulting, nous attachons une grande importance à la confidentialité et à la protection de vos données personnelles. 
          La présente politique a pour but de vous informer sur la manière dont nous collectons, utilisons, partageons et protégeons 
          vos informations personnelles lorsque vous visitez notre site web ou interagissez avec nous dans le cadre de nos activités 
          de conseil en RSE, RSO et ESG.
        </p>

        <h2 className='font-bold'>2. Portée</h2>
        <p>
          Cette politique s'applique à toute personne naviguant sur le site web officiel de EPBS Consulting Maroc (https://www.epbsconsulting.ma), 
          ou entrant en contact avec nous via ce site, par formulaire, email, ou autres canaux numériques. Elle couvre aussi les échanges liés 
          à des demandes de services, de partenariats ou de recrutement.
        </p>

        <h2 className='font-bold'>3. Consentement</h2>
        <p>
          En utilisant notre site web ou en nous communiquant vos informations personnelles, vous acceptez les pratiques décrites dans cette politique. 
          Vous avez le droit de retirer votre consentement à tout moment, conformément aux lois applicables au Maroc et aux standards internationaux 
          (notamment RGPD, pour les visiteurs européens).
        </p>

        <h2 className='font-bold'>4. Qui sommes-nous</h2>
        <p>
          EPBS Consulting est une société de conseil basée au Maroc, spécialisée en responsabilité sociétale des organisations (RSO), RSE et ESG. 
          Nous intervenons localement et à l'international, avec un fort ancrage en Afrique.
        </p>
        <p>
          EPBS agit en tant que responsable du traitement des données personnelles collectées via son site web ou tout autre canal numérique officiel.
        </p>

        <h2 className='font-bold'>5. Collecte de vos données personnelles</h2>
        <h3>5.1 Données collectées directement :</h3>
        <ul>
          <li>Nom, prénom</li>
          <li>Adresse e-mail</li>
          <li>Numéro de téléphone</li>
          <li>Nom de l'entreprise ou organisation</li>
          <li>Fonction et secteur d'activité</li>
          <li>Contenu de vos messages (formulaire de contact, demande de devis, etc.)</li>
        </ul>

        <h3>5.2 Données collectées automatiquement :</h3>
        <ul>
          <li>Adresse IP</li>
          <li>Navigateur et système d'exploitation</li>
          <li>Données de navigation (pages visitées, durée de consultation, etc.)</li>
          <li>Cookies et technologies similaires (voir Politique de cookies)</li>
        </ul>

        <h3>5.3 Données collectées via des tiers :</h3>
        <p>
          Dans certains cas, nous pouvons recevoir des données vous concernant de la part de partenaires, événements, réseaux sociaux, 
          ou sources accessibles publiquement, conformément à la législation applicable.
        </p>

        <h2 className='font-bold'>6. Utilisation de vos données</h2>
        <p>
          Nous utilisons vos données personnelles pour :
        </p>
        <ul>
          <li>Répondre à vos demandes d'information ou de devis</li>
          <li>Proposer des services adaptés à vos besoins</li>
          <li>Vous tenir informé(e) de nos actualités, publications, événements ou offres</li>
          <li>Améliorer notre site web et l'expérience utilisateur</li>
          <li>Respecter nos obligations légales et réglementaires</li>
        </ul>

        <h2 className='font-bold'>7. Partage de vos données</h2>
        <p>
          Nous ne partageons vos données personnelles qu'avec :
        </p>
        <ul>
          <li>Nos consultants et collaborateurs internes, dans le strict cadre de leur mission</li>
          <li>Nos prestataires techniques (hébergement, maintenance web, emailings), sous contrat de confidentialité</li>
          <li>Les autorités compétentes, si requis légalement</li>
        </ul>
        <p>
          Aucun transfert de vos données à des fins commerciales ne sera effectué sans votre consentement exprès.
        </p>

        <h2 className='font-bold'>8. Stockage et sécurité</h2>
        <p>
          Vos données sont hébergées sur des serveurs sécurisés. Nous mettons en place des mesures techniques et organisationnelles 
          conformes aux normes internationales pour prévenir tout accès non autorisé, perte ou divulgation.
        </p>

        <h2 className='font-bold'>9. Durée de conservation</h2>
        <p>
          Nous conservons vos données personnelles uniquement le temps nécessaire pour atteindre les finalités décrites dans cette politique, 
          sauf obligation légale contraire.
        </p>

        <h2 className='font-bold'>10. Vos droits</h2>
        <p>
          Conformément à la loi marocaine n°09-08 relative à la protection des personnes physiques à l'égard du traitement des données 
          à caractère personnel, ainsi qu'aux normes internationales :
        </p>
        <ul>
          <li>Vous avez le droit d'accéder à vos données personnelles</li>
          <li>Vous pouvez demander leur rectification, leur suppression ou vous opposer à leur traitement</li>
          <li>Vous pouvez également demander une copie de vos données</li>
        </ul>
        <p>
          Pour exercer ces droits, merci de nous contacter (voir article 12).
        </p>

        <h2 className='font-bold'>11. Cookies et technologies similaires</h2>
        <p>
          Notre site peut utiliser des cookies pour améliorer l'expérience utilisateur, mesurer l'audience et personnaliser le contenu. 
          Vous pouvez gérer vos préférences depuis votre navigateur. Une politique spécifique de gestion des cookies est disponible sur notre site.
        </p>

        <h2 className='font-bold'>12. Contact</h2>
        <address className="not-italic">
          <strong>Délégué à la protection des données (DPO)</strong><br />
          EPBS Consulting Maroc<br />
          15 avenue Al Abtal-Agdal, 10090 Rabat. Maroc<br />
          <a href="mailto:contact@epbsconsulting.com" className="text-[var(--color-primary)]">
            contact@epbsconsulting.com
          </a>
        </address>

        <h2 className='font-bold'>13. Modifications de la politique</h2>
        <p>
          Cette politique peut être mise à jour à tout moment pour refléter l'évolution de nos pratiques, ou pour se conformer à de nouvelles 
          obligations légales. Toute modification sera publiée sur cette page avec une date de mise à jour.
        </p>
      </div>
    </LegalLayout>
  );
}