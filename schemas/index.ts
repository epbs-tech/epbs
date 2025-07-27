import * as z from "zod";


export const SyllabusSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  content: z.array(z.string().min(1, "Le contenu est requis"))
});

export const FormationSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  duration: z.string().min(1, "La durée est requise"),
  category: z.string().min(1, "La catégorie est requise"),
  image: z.string().min(1, "L'image est requise"),
  isActive: z.boolean(),
  detailedDescription: z.string().optional(),
  objectives: z.array(z.string()).optional(),
  prerequisites: z.array(z.string()).optional(),
  syllabus: z.array(SyllabusSchema).optional(),
  level: z.string().optional(),
  targetAudience: z.string().optional(),
  teachingMethod: z.string().optional(),
});

export const RegistrationSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  company: z.string().optional(),
  sessionId: z.string().min(1, "Veuillez sélectionner une session"),
  acceptCGV: z.boolean().refine((val) => val === true, {
    message: "Vous devez accepter les conditions générales de vente"
  })

});

export const SessionSchema = z.object({
  formationId: z.string().min(1, "Veuillez sélectionner une formation"),
  startDate: z.string().min(1, "La date de début est requise"),
  endDate: z.string().min(1, "La date de fin est requise"),
  priceEUR: z.coerce.number().min(0, "Le prix doit être positif"),
  priceMAD: z.coerce.number().min(0, "Le prix doit être positif"),
  location: z.string().min(1, "Le lieu est requis"),
  maxParticipants: z.coerce.number().min(1, "Le nombre de participants doit être supérieur à 0"),
  isOpen: z.boolean()
});

// Type explicite pour l'utilisation dans les formulaires
export type SessionFormValues = z.infer<typeof SessionSchema>;


export const PodcastSchema = z.object({
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  imageUrl: z.string().optional(),
  author: z.string().optional(),
  language: z.string(),
  explicit: z.boolean(),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  feedUrl: z.string().url().optional().or(z.literal("")),
});

export const EpisodeSchema = z.object({
  podcastId: z.string(),
  title: z.string().min(1, "Le titre est requis"),
  description: z.string().min(1, "La description est requise"),
  audioUrl: z.string(),
  imageUrl: z.string().min(1, "L'image est requise"),
  duration: z.number().min(0),
  episodeNumber: z.number().min(1).optional(),
  seasonNumber: z.number().min(1).optional(),
});







///_______________________________________________





export const SettingsSchema = z.object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
})
    .refine((data) => {
        if (data.password && !data.newPassword) {
            return false;
        }

        return true;
    },{
        message: "New password is required",
        path: ["newPassword"],
    })
    .refine((data) => {
        if (!data.password && data.newPassword) {
            return false;
        }

        return true;
    },{
        message: "Password is required",
        path: ["password"],
    })

export const NewPasswordSchema = z.object({
  password: z.string().min(6,{
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  password: z.string().min(1,{
    message: "Password is required",
  }),

  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required"
  }),
  name: z.string().min(1,{
    message: "Name is required",
  }),
  password: z.string().min(6,{
    message: "Minimum 6 characters required",
  }),
});