import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-green-100">
              <svg 
                className="h-8 w-8 text-green-600" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-6">
            Votre préinscription a été enregistrée
          </h1>
          
          <div className="bg-card border rounded-lg p-8 mb-8">
            <p className="text-lg mb-6">
              Merci pour votre préinscription à notre formation. 
              Un email de confirmation vous a été envoyé avec tous les détails.
            </p>
            
            <div className="space-y-4 text-left mb-6">
              <div className="border-b pb-2">
                <p className="text-muted-foreground mb-1">Statut</p>
                <p className="font-medium">
                  <span className="inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">
                    En attente
                  </span>
                </p>
              </div>
            </div>
            
            <div className="text-left mb-8">
              <h3 className="font-semibold mb-2">Prochaines étapes</h3>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Vérifiez votre boîte de réception pour l'email de confirmation</li>
                <li>Si vous avez choisi le paiement par virement, suivez les instructions dans l'email pour finaliser votre inscription</li>
                <li>Nous vous contacterons quelques jours avant la formation avec les derniers détails</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className=" btn-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition-colors"
            >
              Retour à l'accueil
            </Link>
            <Link href="/formations"
                  className="bg-secondary text-secondary-foreground px-6 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Découvrir d'autres formations
            </Link>


          </div>
        </div>
      </div>
    </div>
  );
}