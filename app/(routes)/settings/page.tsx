"use client";

import { useState, useTransition, useEffect } from "react";
import { useSession } from "next-auth/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SettingsSchema } from "@/schemas";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import axios from "axios";
import { settings } from "@/actions/settings";
import { useCurrentUser } from "@/hooks/use-current-user";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

import { FormSuccess } from "@/app/components/form-success";
import { FormError } from "@/app/components/form-error";

import {
  User,
  Mail,
  Lock,
  Calendar,
  MapPin,
  CreditCard,
  BookOpen,
  Shield,
  Save,
  Settings as SettingsIcon,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";

interface Registration {
  id: string;
  formationName: string;
  status: string;
  paymentStatus: string;
  createdAt: string;
  currency: string;
  amountMAD: number;
  amountEUR: number;
  sessionStartDate: string;
  sessionEndDate: string;
  location: string;
}

const Settings = () => {
  const user = useCurrentUser();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [activeTab, setActiveTab] = useState("profile");

  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || false,
    },
  });

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const response = await axios.get('/api/registrations/user');
        setRegistrations(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des inscriptions:', error);
      }
    };

    fetchRegistrations();
  }, []);

  const handleCancelRegistration = async (registrationId: string) => {
    try {
      await axios.post(`/api/registrations/${registrationId}/cancel`);
      const response = await axios.get('/api/registrations/user');
      setRegistrations(response.data);
      setSuccess("L'inscription a été annulée avec succès");
    } catch {
      setError("Erreur lors de l'annulation de l'inscription");
    }
  };

  const onSubmit = (values: z.infer<typeof SettingsSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      settings(values)
        .then((data) => {
          if (data.error) {
            setError(data.error);
          }
          if (data.success) {
            setSuccess(data.success);
            update();
          }
        })
        .catch(() => {
          setError("Une erreur est survenue");
        });
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'destructive';
      default:
        return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle className="h-4 w-4 mr-1" />;
      case 'pending':
        return <Clock className="h-4 w-4 mr-1" />;
      case 'cancelled':
        return <AlertTriangle className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  const renderStatusBadge = (status: string) => {
    const icon = getStatusIcon(status);
    const label = status === 'pending' ? 'En attente' :
                 status === 'confirmed' ? 'Confirmée' : 'Annulée';

    return (
      <Badge variant={getStatusColor(status)} className="flex items-center gap-1">
        {icon}
        {label}
      </Badge>
    );
  };

  const renderPaymentBadge = (status: string) => {
    const isPaid = status === 'completed';

    return (
      <Badge variant={isPaid ? 'success' : 'warning'} className="flex items-center gap-1">
        {isPaid ?
          <CheckCircle className="h-4 w-4 mr-1" /> :
          <Clock className="h-4 w-4 mr-1" />}
        {isPaid ? 'Payé' : 'En attente'}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold mb-2">Tableau de bord personnel</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Gérez votre profil et suivez vos inscriptions aux formations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-3">
            <Card className="sticky top-6 shadow-lg border-0 dark:bg-gray-800/60 backdrop-blur-sm">
              <CardContent className="p-0">
                <div className="flex flex-col items-center p-6 border-b">
                  <div className="h-20 w-20 rounded-full bg-gradient-to-r from-green-50 to-green-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                  <h3 className="font-medium text-lg">{user?.name || "Utilisateur"}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{user?.email}</p>
                </div>

                <div className="py-2">
                  <Button
                    variant={activeTab === "profile" ? "default" : "ghost"}
                    className="w-full justify-start px-6 py-3 rounded-none"
                    onClick={() => setActiveTab("profile")}
                  >
                    <User className="mr-2 h-5 w-5" />
                    Mon Profil
                  </Button>
                  <Button
                    variant={activeTab === "registrations" ? "default" : "ghost"}
                    className="w-full justify-start px-6 py-3 rounded-none"
                    onClick={() => setActiveTab("registrations")}
                  >
                    <BookOpen className="mr-2 h-5 w-5" />
                    Mes Inscriptions
                    {registrations.length > 0 && (
                      <Badge className="ml-2 bg-green-500" variant="secondary">
                        {registrations.length}
                      </Badge>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsContent value="profile" className="mt-0">
                <Card className="shadow-lg border-0 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b">
                    <div className="flex items-center">
                      <SettingsIcon className="h-5 w-5 mr-2 text-green-500" />
                      <CardTitle>Paramètres du profil</CardTitle>
                    </div>
                    <CardDescription>
                      Mettez à jour vos informations personnelles et vos préférences de sécurité
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pt-6">
                    <Form {...form}>
                      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField
                              control={form.control}
                              name="name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center">
                                    <User className="h-4 w-4 mr-2 text-green-500" />
                                    Nom complet
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="Votre nom"
                                      disabled={isPending}
                                      className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />

                            {!user?.isOAuth && (
                              <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <Mail className="h-4 w-4 mr-2 text-green-500" />
                                      Email
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="email"
                                        placeholder="votre@email.com"
                                        disabled={isPending}
                                        className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>

                          {!user?.isOAuth && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <Lock className="h-4 w-4 mr-2 text-green-500" />
                                      Mot de passe actuel
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isPending}
                                        className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />

                              <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel className="flex items-center">
                                      <Lock className="h-4 w-4 mr-2 text-green-500" />
                                      Nouveau mot de passe
                                    </FormLabel>
                                    <FormControl>
                                      <Input
                                        type="password"
                                        placeholder="••••••••"
                                        disabled={isPending}
                                        className="border-gray-300 focus:ring-green-500 focus:border-green-500"
                                        {...field}
                                      />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            </div>
                          )}

                          {!user?.isOAuth && (
                            <FormField
                              control={form.control}
                              name="isTwoFactorEnabled"
                              render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 shadow-sm">
                                  <div className="space-y-0.5">
                                    <FormLabel className="flex items-center">
                                      <Shield className="h-4 w-4 mr-2 text-green-500" />
                                      Authentification à deux facteurs
                                    </FormLabel>
                                    <FormDescription>
                                      Renforcez la sécurité de votre compte avec une vérification en deux étapes
                                    </FormDescription>
                                  </div>
                                  <FormControl>
                                    <Switch
                                      disabled={isPending}
                                      checked={field.value}
                                      onCheckedChange={field.onChange}
                                    />
                                  </FormControl>
                                </FormItem>
                              )}
                            />
                          )}
                        </div>

                        {(error || success) && (
                          <div className="mt-4">
                            <FormSuccess message={success} />
                            <FormError message={error} />
                          </div>
                        )}

                        <Button
                          type="submit"
                          className="w-full sm:w-auto btn-primary "
                          disabled={isPending}
                        >
                          <Save className="mr-2 h-4 w-4" />
                          Enregistrer les modifications
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="registrations" className="mt-0">
                <Card className="shadow-lg border-0 dark:bg-gray-800/60 backdrop-blur-sm">
                  <CardHeader className="pb-4 border-b">
                    <div className="flex items-center">
                      <BookOpen className="h-5 w-5 mr-2 text-green-500" />
                      <CardTitle>Mes inscriptions aux formations</CardTitle>
                    </div>
                    <CardDescription>
                      Consultez et gérez vos inscriptions aux différentes sessions de formation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    {registrations.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
                          <BookOpen className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">Aucune inscription</h3>
                        <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                          Vous n'avez pas encore d'inscriptions à des formations.
                          Découvrez notre catalogue pour trouver des formations qui correspondent à vos besoins.
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-50 dark:bg-gray-800">
                              <TableHead>Formation</TableHead>
                              <TableHead>Session</TableHead>
                              <TableHead>Lieu</TableHead>
                              <TableHead>Statut</TableHead>
                              <TableHead>Paiement</TableHead>
                              <TableHead>Montant</TableHead>
                              {/*<TableHead className="text-right">Actions</TableHead>*/}
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {registrations.map((registration) => (
                              <TableRow key={registration.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                                <TableCell className="font-medium">
                                  {registration.formationName}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <Calendar className="h-4 w-4 mr-2 text-gray-500" />
                                    <div className="flex flex-col">
                                      <span className="font-medium">
                                        {format(new Date(registration.sessionStartDate), 'dd MMM yyyy', { locale: fr })}
                                      </span>
                                      <span className="text-xs text-gray-500 dark:text-gray-400">
                                        au {format(new Date(registration.sessionEndDate), 'dd MMM yyyy', { locale: fr })}
                                      </span>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1 text-gray-500" />
                                    {registration.location}
                                  </div>
                                </TableCell>
                                <TableCell>
                                  {renderStatusBadge(registration.status)}
                                </TableCell>
                                <TableCell>
                                  {renderPaymentBadge(registration.paymentStatus)}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center">
                                    <CreditCard className="h-4 w-4 mr-1 text-gray-500" />
                                    <span className="font-medium">
                                      {registration.currency === 'EUR' 
                                          ? `${registration.amountEUR} €` 
                                          : `${registration.amountMAD} MAD`
                                      }
                                    </span>
                                  </div>
                                </TableCell>
                                {/*<TableCell className="text-right">
                                  {registration.status !== 'cancelled' && (
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                              <Button variant="destructive" size="sm" className="inline-flex gap-1">
                                                <AlertTriangle className="h-4 w-4" />
                                                Annuler
                                              </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent className="max-w-md">
                                              <AlertDialogHeader>
                                                <AlertDialogTitle>Confirmer l'annulation</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                  Cette action annulera votre inscription à la formation
                                                  <span className="font-medium"> {registration.formationName}</span>.
                                                  {registration.paymentStatus === 'completed' &&
                                                    " Un remboursement sera initié automatiquement selon nos conditions générales."}
                                                </AlertDialogDescription>
                                              </AlertDialogHeader>
                                              <AlertDialogFooter>
                                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                                <AlertDialogAction
                                                  className="bg-red-600 hover:bg-red-700"
                                                  onClick={() => handleCancelRegistration(registration.id)}
                                                >
                                                  Confirmer l'annulation
                                                </AlertDialogAction>
                                              </AlertDialogFooter>
                                            </AlertDialogContent>
                                          </AlertDialog>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                          Annuler cette inscription
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
                                  )}
                                </TableCell>*/}
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    )}

                    {(error || success) && (
                      <div className="mt-6">
                        <FormSuccess message={success} />
                        <FormError message={error} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
