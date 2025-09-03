"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { z } from "zod";
// Schéma de validation Zod
const contactSchema = z.object({
  fullName: z
    .string()
    .min(1, "Le nom complet est requis")
    .min(2, "Le nom doit contenir au moins 2 caractères")
    .max(100, "Le nom ne peut pas dépasser 100 caractères")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Le nom ne peut contenir que des lettres, espaces, apostrophes et tirets"),

  email: z
    .string()
    .min(1, "L'email est requis")
    .email("Format d'email invalide")
    .max(255, "L'email ne peut pas dépasser 255 caractères"),

  phone: z
    .string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true; // Optionnel
      // Regex pour formats internationaux : +33 6 12 34 56 78, +212 6 67 18 51 85, etc.
      return /^(\+\d{1,3}\s?)?\d{1,3}(\s?\d{2,3}){3,4}$/.test(val.replace(/\s+/g, ' '));
    }, "Format de téléphone invalide (ex: +33 6 12 34 56 78)"),

  message: z
    .string()
    .min(1, "Le message est requis")
    .min(10, "Le message doit contenir au moins 10 caractères")
    .max(1000, "Le message ne peut pas dépasser 1000 caractères")
});

type ContactFormData = z.infer<typeof contactSchema>;

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Mettre à jour les données
    setFormData(prev => ({ ...prev, [name]: value }));

    // Effacer l'erreur pour ce champ si elle existe
    if (errors[name as keyof ContactFormData]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    // Validation en temps réel pour une meilleure UX
    try {
      contactSchema.pick({ [name]: true } as any).parse({ [name]: value });
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({
          ...prev,
          [name]: error.errors[0]?.message
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});
    setSubmitStatus({ success: false, message: '' });

    try {
      // Validation avec Zod
      const validatedData = contactSchema.parse(formData);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({ success: true, message: 'Message envoyé avec succès ! Nous vous contacterons bientôt.' });
        setFormData({ fullName: '', email: '', phone: '', message: '' });
      } else {
        throw new Error(result.message);
      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        // Erreurs de validation Zod
        const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as keyof ContactFormData] = err.message;
          }
        });
        setErrors(fieldErrors);
        setSubmitStatus({
          success: false,
          message: 'Veuillez corriger les erreurs dans le formulaire.'
        });
      } else {
        console.error('Erreur lors de l\'envoi:', error);
        setSubmitStatus({
          success: false,
          message: "Une erreur s'est produite lors de l'envoi. Veuillez réessayer plus tard."
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 lg:py-28">
      {/* Background solide */}
      <div
        className="absolute inset-0 -z-[1] h-full w-full lg:h-[50%] xl:h-[55%]"
        style={{ backgroundColor: "var(--color-primary)" }}
      ></div>

      <div className="container mx-auto px-4 mt">
        <div className="flex flex-wrap items-start">
          {/* Left Section */}
          <motion.div
            className="w-full lg:w-7/12 xl:w-8/12 mt-10"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
          >
            {/* Header avec ligne décorative */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 flex items-center gap-4"
            >
              <div className="h-0.5 w-12 bg-[var(--color-accent)]"></div>
              <span className="font-sans text-xl font-semibold uppercase tracking-wider text-[var(--color-accent)]">
                EPBS Consulting
              </span>
            </motion.div>

            {/* Titre principal */}
            <div className="mb-12 lg:mb-16">
              <motion.span
                className="mb-3 block text-sm font-semibold uppercase tracking-wider text-white opacity-90"
                variants={fadeInLeft}
              >
                CONTACTEZ-NOUS
              </motion.span>
              <motion.h2
                className="text-4xl font-bold leading-tight text-white md:text-5xl lg:max-w-[80%]"
                variants={fadeInLeft}
                style={{
                  background: "linear-gradient(to right, white, var(--color-light))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent"
                }}
              >
                Parlons de vos besoins
              </motion.h2>

              {/* Citations dans la partie blanche */}
              <div className="space-y-8 lg:p-10">
                <motion.blockquote
                  className="text-lg italic text-[var(--color-light)] md:text-xl"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <div className="mb-2 h-1 w-12 bg-[var(--color-accent)]"></div>
                  <p>"Des projets accompagnés vers la durabilité en Europe et en Afrique"</p>
                </motion.blockquote>
              </div>
            </div>

            {/* Blocs d'information */}
            <div className="grid gap-8 sm:grid-cols-2 mt-32">
              {/* Location */}
              <motion.div
                className="flex"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                <div className="mr-6 text-3xl text-[var(--color-accent)]">
                  <motion.svg
                    width="29"
                    height="35"
                    viewBox="0 0 29 35"
                    className="fill-current"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path d="M14.5 0.710938C6.89844 0.710938 0.664062 6.72656 0.664062 14.0547C0.664062 19.9062 9.03125 29.5859 12.6406 33.5234C13.1328 34.0703 13.7891 34.3437 14.5 34.3437C15.2109 34.3437 15.8672 34.0703 16.3594 33.5234C19.9688 29.6406 28.3359 19.9062 28.3359 14.0547C28.3359 6.67188 22.1016 0.710938 14.5 0.710938ZM14.9375 32.2109C14.6641 32.4844 14.2812 32.4844 14.0625 32.2109C11.3828 29.3125 2.57812 19.3594 2.57812 14.0547C2.57812 7.71094 7.9375 2.625 14.5 2.625C21.0625 2.625 26.4219 7.76562 26.4219 14.0547C26.4219 19.3594 17.6172 29.2578 14.9375 32.2109Z" />
                    <path d="M14.5 8.58594C11.2734 8.58594 8.59375 11.2109 8.59375 14.4922C8.59375 17.7188 11.2187 20.3984 14.5 20.3984C17.7812 20.3984 20.4062 17.7734 20.4062 14.4922C20.4062 11.2109 17.7266 8.58594 14.5 8.58594ZM14.5 18.4297C12.3125 18.4297 10.5078 16.625 10.5078 14.4375C10.5078 12.25 12.3125 10.4453 14.5 10.4453C16.6875 10.4453 18.4922 12.25 18.4922 14.4375C18.4922 16.625 16.6875 18.4297 14.5 18.4297Z" />
                  </motion.svg>
                </div>
                <div>
                  <motion.h3
                    className="mb-3 text-lg font-semibold text-[var(--color-accent)]"
                    whileHover={{ scale: 1.02 }}
                  >
                    Notre Adresse
                  </motion.h3>
                  <motion.p
                    className="text-base font-medium leading-relaxed text-white md:text-[var(--color-primary-dark)]/50"
                    whileHover={{ x: 5 }}
                  >
                    15 avenue Al Abtal-Agdal, <br />
                    10090 Rabat. Maroc
                  </motion.p>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                className="flex"
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: 0.2 }}
              >
                <div className="mr-6 text-3xl text-[var(--color-accent)]">
                  <motion.svg
                    width="34"
                    height="25"
                    viewBox="0 0 34 25"
                    className="fill-current"
                    whileHover={{ scale: 1.1 }}
                  >
                    <path d="M30.5156 0.710938H3.17188C1.42188 0.710938 0 2.38281 0 4.13281V20.9219C0 22.6719 1.42188 24.0938 3.17188 24.0938H30.5156C32.2656 24.0938 33.6875 22.6719 33.6875 20.9219V4.13281C33.6875 2.38281 32.2656 0.710938 30.5156 0.710938ZM30.5156 2.875C30.7891 2.875 31.0078 2.92969 31.2266 3.09375L17.6094 11.3516C17.1172 11.625 16.5703 11.625 16.0781 11.3516L2.46094 3.09375C2.67969 2.98438 2.89844 2.875 3.17188 2.875H30.5156ZM30.5156 22.125H3.17188C2.51562 22.125 1.91406 21.5781 1.91406 20.8672V5.00781L15.0391 12.9922C15.5859 13.3203 16.1875 13.4844 16.7891 13.4844C17.3906 13.4844 17.9922 13.3203 18.5391 12.9922L31.6641 5.00781V20.8672C31.7734 21.5781 31.1719 22.125 30.5156 22.125Z" />
                  </motion.svg>
                </div>
                <div>
                  <motion.h3
                    className="mb-3 text-lg font-semibold text-[var(--color-accent)]"
                    whileHover={{ scale: 1.02 }}
                  >
                    Nous contacter
                  </motion.h3>
                  <motion.p
                    className="text-base font-medium leading-relaxed text-white md:text-[var(--color-primary-dark)]/50"
                    whileHover={{ x: 5 }}
                  >
                    contact@epbsconsulting.com
                  </motion.p>
                  <motion.p
                    className="mt-1 text-base font-medium leading-relaxed text-white md:text-[var(--color-primary-dark)]/50"
                    whileHover={{ x: 5 }}
                  >
                    FR : +33 06 45 91 81 92 <br />
                    MA : +212 6 67 18 51 85
                  </motion.p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Section - Formulaire */}
          <motion.div
            className="mt-12 w-full lg:mt-0 lg:w-5/12 xl:w-4/12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
          >
            <motion.div
              className="rounded-xl bg-white p-8 shadow-xl sm:p-10 md:p-12"
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.1)",
                border: "1px solid rgba(0, 0, 0, 0.05)"
              }}
              variants={fadeInRight}
            >
              <h3 className="mb-8 text-2xl font-bold text-[var(--color-primary)]">
                Envoyez-nous un message
              </h3>
              <motion.form
                variants={fadeInUp}
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                {/* Full Name */}
                <div>
                  <label htmlFor="fullName" className="mb-2 block text-sm font-medium text-[var(--color-primary)]">
                    Nom Complet*
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Votre nom"
                    className={`w-full border-0 border-b-2 pb-2 focus:outline-none transition-colors ${
                      errors.fullName 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'focus:border-[var(--color-accent)]'
                    }`}
                    style={{
                      borderColor: errors.fullName ? '#ef4444' : "var(--color-gray)",
                      color: "var(--color-primary)",
                      backgroundColor: "transparent",
                    }}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-[var(--color-primary)]">
                    Email*
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="votre@email.com"
                    className={`w-full border-0 border-b-2 pb-2 focus:outline-none transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'focus:border-[var(--color-accent)]'
                    }`}
                    style={{
                      borderColor: errors.email ? '#ef4444' : "var(--color-gray)",
                      color: "var(--color-primary)",
                      backgroundColor: "transparent",
                    }}
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[var(--color-primary)]">
                    Téléphone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+33 6 12 34 56 78"
                    className={`w-full border-0 border-b-2 pb-2 focus:outline-none transition-colors ${
                      errors.phone 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'focus:border-[var(--color-accent)]'
                    }`}
                    style={{
                      borderColor: errors.phone ? '#ef4444' : "var(--color-gray)",
                      color: "var(--color-primary)",
                      backgroundColor: "transparent",
                    }}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-[var(--color-primary)]">
                    Message*
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Parlez nous de vos besoins ..."
                    className={`w-full resize-none border-0 border-b-2 pb-2 focus:outline-none transition-colors ${
                      errors.message 
                        ? 'border-red-500 focus:border-red-500' 
                        : 'focus:border-[var(--color-accent)]'
                    }`}
                    style={{
                      borderColor: errors.message ? '#ef4444' : "var(--color-gray)",
                      color: "var(--color-primary)",
                      backgroundColor: "transparent",
                    }}
                  ></textarea>
                  {errors.message && (
                    <p className="mt-1 text-sm text-red-500">{errors.message}</p>
                  )}
                </div>

                {/* Status Message */}
                {submitStatus.message && (
                  <div className={`text-sm font-medium ${submitStatus.success ? 'text-green-600' : 'text-red-600'}`}>
                    {submitStatus.message}
                  </div>
                )}

                {/* Submit Button */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="pt-2"
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full px-6 py-4 text-base font-semibold transition-opacity"
                    style={{
                      background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                      color: "white",
                      borderRadius: "8px",
                      opacity: isSubmitting ? 0.7 : 1,
                      cursor: isSubmitting ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Envoi en cours...
                      </span>
                    ) : 'Envoyer le message'}
                  </button>
                </motion.div>
              </motion.form>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;