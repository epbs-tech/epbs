"use client";

import {useState, useEffect, use} from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { SessionSelect } from '@/components/formations/session-select';
import { PaymentMethods } from '@/components/payment/payment-methods';
import {RegistrationSchema} from '@/schemas';
import {Formation, Session} from "@prisma/client";
import RegistrationLoading from "@/app/(routes)/formations/[id]/inscription/loading";
import { Calendar, MapPin, User, Phone, Briefcase, CreditCard, CheckCircle, Clock } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { CGVModal } from "@/components/CGVModal";
import { useCurrency } from "@/hooks/useCurrency";


type RegistrationFormValues = z.infer<typeof RegistrationSchema>;

export default function RegistrationPage({params}: {params: Promise<{ id: string }>}) {
  const { id } = use(params);
  const router = useRouter();
  const [step, setStep] = useState<'form' | 'payment'>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formation, setFormation] = useState<Formation>();
  const [sessions, setSessions] = useState<Session[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showCGV, setShowCGV] = useState(false);
  const { currency } = useCurrency();
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(RegistrationSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      sessionId: '',
      acceptCGV: false
    }
  });

  // Charger les données de manière asynchrone avec useEffect
  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);

        // Récupération de la formation
        const formationRes = await fetch(`/api/formations/${id}`);
        const formationData = await formationRes.json();

        // Récupération des sessions par formation id
        const sessionsRes = await fetch(`/api/formations/${id}/sessions`);
        const sessionsData = await sessionsRes.json();

        // Mise à jour des états
        setFormation(formationData);
        setSessions(sessionsData);

        // Redirections si nécessaire
        if (!formationData) {
          router.push('/formations');
          return;
        }

        if (sessionsData.length === 0) {
          router.push(`/formations/${id}`);
          return;
        }
      } catch (error) {
        console.error("Erreur lors du chargement des données:", error);
        toast.error("Erreur", {
          description: "Impossible de charger les informations de la formation"
        });
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [id, router]);

  const [registrationId, setRegistrationId] = useState<string | null>(null);
    const [registrationData, setRegistrationData] = useState<RegistrationFormValues | null>(null);

  const onSubmit = async (data: RegistrationFormValues) => {
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/registrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data, currency}),
      });

      if (!response.ok) {
        throw new Error('Failed to submit registration');
      }

      const registrationData = await response.json();
      setRegistrationId(registrationData.id);
      setRegistrationData(registrationData)
      setStep('payment');

      // Scroll to top when moving to payment step
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch  {
      toast.error("Erreur", {
        description: "Une erreur est survenue lors de l'inscription. Veuillez réessayer."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePaymentMethodSelect = async (method: 'creditCard' | 'bankTransfer') => {
    if (!registrationId) {
      toast.error("Erreur", {
        description: "Identifiant d'inscription introuvable. Veuillez réessayer."
      });
      return;
    }

    try {
      // Pour le virement bancaire, on met à jour directement
      if (method === 'bankTransfer') {
        const response = await fetch('/api/registrations', {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            registrationId: registrationId,
            paymentMethod: method,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to update payment method');
        }

        toast.success("Devis généré", {
          description: "Un devis a été généré et envoyé à votre adresse email."
        });

        //router.push(`/formations/${id}/confirmation`);
      }
      // Pour la carte bancaire, c'est géré directement par le composant PaymentMethods
    } catch (error) {
      console.error("Payment method selection error:", error);
      toast.error("Erreur", {
        description: "Une erreur est survenue lors du paiement. Veuillez réessayer."
      });
    }
  };

  // Afficher un état de chargement pendant la récupération des données
  if (isLoading) {
    return <RegistrationLoading />;
  }

  // Gérer le cas où la formation n'existe pas (redondant avec useEffect mais par sécurité)
  if (!formation) {
    return null;
  }

  const selectedSession = sessions.find(s => s.id === form.watch('sessionId'));

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link href={`/formations/${id}`} className="inline-flex items-center text-primary hover:text-primary/80 font-medium transition-colors group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 group-hover:transform group-hover:-translate-x-1 transition-transform">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour aux détails de la formation
          </Link>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3 text-gray-800">
              Inscription à la formation
            </h1>
            <p className="text-lg text-gray-600 font-medium">{formation.title}</p>
          </div>

          <div className="mb-12">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t-2 border-gray-200"></div>
              </div>
              <div className="relative flex justify-between">
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold
                    ${step === 'form' ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-primary text-white'}
                    transition-all duration-300
                  `}>
                    1
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700">Informations</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className={`
                    flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold
                    ${step === 'payment' ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-gray-200 text-gray-600'}
                    transition-all duration-300
                  `}>
                    2
                  </div>
                  <span className="mt-2 text-sm font-medium text-gray-700">Paiement</span>
                </div>
              </div>
            </div>
          </div>

          {step === 'form' ? (
            <Card className="shadow-lg border-0 overflow-hidden animate-fadeIn">
              <div className="bg-primary/10 px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-lg text-gray-800">Informations personnelles</h2>
                <p className="text-sm text-gray-600">Veuillez remplir tous les champs requis pour votre inscription</p>
              </div>

              <CardContent className="p-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <User className="w-4 h-4 mr-2 text-primary" />
                              Prénom
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre prénom"
                                className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <User className="w-4 h-4 mr-2 text-primary" />
                              Nom
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre nom"
                                className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-primary">
                                <rect width="20" height="16" x="2" y="4" rx="2" />
                                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                              </svg>
                              Email
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="votre@email.com"
                                className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center text-gray-700">
                              <Phone className="w-4 h-4 mr-2 text-primary" />
                              Téléphone
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Votre numéro de téléphone"
                                className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-red-500" />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="company"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700">
                            <Briefcase className="w-4 h-4 mr-2 text-primary" />
                            Entreprise (optionnel)
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Nom de votre entreprise"
                              className="border-gray-300 focus:border-primary focus:ring focus:ring-primary/20"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sessionId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-gray-700">
                            <Calendar className="w-4 h-4 mr-2 text-primary" />
                            Sélectionnez une session
                          </FormLabel>
                          <FormControl>
                            <SessionSelect
                              sessions={sessions}
                              onSessionSelect={field.onChange}
                              defaultValue={field.value}
                            />
                          </FormControl>
                          <FormMessage className="text-red-500" />
                        </FormItem>
                      )}
                    />

                    {selectedSession && (
                      <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                          <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                          Récapitulatif de votre session
                        </h3>
                        <div className="space-y-3 pl-7">
                          <p className="text-sm text-gray-700 flex items-start">
                            <span className="text-gray-500 min-w-24 inline-block">Formation :</span>
                            <span className="font-medium">{formation.title}</span>
                          </p>
                          <p className="text-sm text-gray-700 flex items-start">
                            <span className="text-gray-500 min-w-24 inline-block">Dates :</span>
                            <span className="font-medium">
                              Du {new Date(selectedSession.startDate).toLocaleDateString('fr-FR')} au {new Date(selectedSession.endDate).toLocaleDateString('fr-FR')}
                            </span>
                          </p>
                          <p className="text-sm text-gray-700 flex items-start">
                            <span className="text-gray-500 min-w-24 inline-block">Lieu :</span>
                            <span className="font-medium">{selectedSession.location}</span>
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-blue-200 mt-2">
                            <span className="text-gray-700">Prix total :</span>
                            <span className="text-xl font-bold text-primary">{currency === 'EUR' ? `${selectedSession.priceEUR} € `  : `${selectedSession.priceMAD} MAD`}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="acceptCGV"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 border rounded-lg p-4 bg-gray-50">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            className="mt-1"
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel className="text-sm text-gray-600">
                                            J'accepte les{" "}
                                            <button
                                                type="button"
                                                onClick={() => setShowCGV(true)}
                                                className="text-primary hover:underline focus:outline-none font-medium"
                                            >
                                                conditions générales de vente
                                            </button>
                                            {" "}et confirme avoir pris connaissance des modalités de formation,
                                            d'annulation et de paiement.
                                        </FormLabel>
                                        <FormMessage />
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>


                    <Button
                      type="submit"
                      className="w-full py-6 btn-primary hover:bg-primary/90 text-white font-medium text-base transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/20"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <div className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enregistrement...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          Continuer vers le paiement
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
                            <path d="M5 12h14"/>
                            <path d="m12 5 7 7-7 7"/>
                          </svg>
                        </div>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Card className="shadow-lg border-0 overflow-hidden animate-fadeIn">
              <div className="bg-primary/10 px-6 py-4 border-b border-gray-100">
                <h2 className="font-bold text-lg text-gray-800">Finaliser votre inscription</h2>
                <p className="text-sm text-gray-600">Choisissez votre méthode de paiement préférée</p>
              </div>

              <CardContent className="p-6">
                <div className="mb-8 bg-blue-50 p-5 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                    Récapitulatif de commande
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <Calendar className="w-4 h-4 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">{formation.title}</p>
                        {selectedSession && (
                          <p className="text-sm text-gray-600">
                            Du {new Date(selectedSession.startDate).toLocaleDateString('fr-FR')} au {new Date(selectedSession.endDate).toLocaleDateString('fr-FR')}
                          </p>
                        )}
                      </div>
                    </div>

                    {selectedSession && (
                      <div className="flex items-start">
                        <MapPin className="w-4 h-4 text-primary mr-3 mt-1 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium text-gray-800">Lieu de formation</p>
                          <p className="text-sm text-gray-600">{selectedSession.location}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start">
                      <Clock className="w-4 h-4 text-primary mr-3 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-800">Durée</p>
                        <p className="text-sm text-gray-600">{formation.duration || "3 jours"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center font-medium mt-4 pt-4 border-t border-blue-200">
                    <span className="text-gray-700">Total à payer</span>
                    <span className="text-xl font-bold text-primary">{currency === 'EUR' ? `${selectedSession?.priceEUR} € `  : `${selectedSession?.priceMAD} MAD`}</span>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6">
                  <h3 className="font-medium text-gray-800 mb-4 flex items-center">
                    <CreditCard className="w-5 h-5 mr-2 text-primary" />
                    Choisissez votre méthode de paiement
                  </h3>

                  <PaymentMethods
                    onSelectPaymentMethod={handlePaymentMethodSelect}
                    registrationId={registrationId!}
                    sessionId={selectedSession?.id!}
                    price={currency==='EUR' ? selectedSession?.priceEUR! : selectedSession?.priceMAD!}
                    currency={currency}
                    formationTitle={formation.title}
                    formationDates={`Du ${new Date(selectedSession?.startDate!).toLocaleDateString('fr-FR')} au ${new Date(selectedSession?.endDate!).toLocaleDateString('fr-FR')}`}
                    customerName={registrationData?.firstName + ' ' + registrationData?.lastName}
                    customerEmail={registrationData?.email || ''}
                  />
                </div>

                <div className="text-center mt-4">
                  <Button
                    variant="outline"
                    className="text-gray-600 hover:text-primary border-gray-300 hover:border-primary/50"
                    onClick={() => setStep('form')}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="m15 18-6-6 6-6"/>
                    </svg>
                    Revenir aux informations personnelles
                  </Button>
                  <Button asChild className="btn-primary ml-4">
                    <Link href={`/formations/${id}/confirmation`}>
                      Terminer l'inscription
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      <CGVModal
          isOpen={showCGV}
          onClose={() => setShowCGV(false)}
      />

    </div>
  );
}