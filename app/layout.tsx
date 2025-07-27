import type { Metadata } from "next";
import "./globals.css";
import clsx from "clsx";
import  Footer  from '@/sections/Footer';
import { Montserrat } from 'next/font/google';
import { Lato } from 'next/font/google';
import ConditionalProgressButton from "./components/conditional-progress-button";
import {SessionProvider} from "next-auth/react";
import {auth} from "@/auth";
import { Toaster } from "sonner";
import Header2 from "@/sections/Header2";

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-montserrat',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-lato',
});


// const dmSans = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EPBS Consulting",
  description: "We help companies evolve through smart prospecting, business strategy, and customer-centric solutions.",
  icons: {
    icon: '/assests/EPBS_icon.png',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="fr" className="relative">
      <body className={clsx(montserrat.variable, lato.variable, "font-sans antialiased bg-[#EAEEFE]")}>
       
       <SessionProvider session={session}>
        <Header2/>
        <Toaster />
        {children}
       
        <ConditionalProgressButton/>
        <Footer/>
        </SessionProvider>
      </body>
    </html>
  );
}
