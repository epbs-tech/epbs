import Link from 'next/link'
import { UserRole } from "@prisma/client";
import { currentRole } from "@/lib/auth";
import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    redirect("/unauthorized");
  }

  return (
    <div className="min-h-screen bg-muted/40">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="flex items-center text-primary hover:text-primary/80 font-medium transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m15 18-6-6 6-6"/>
            </svg>
            Retour au tableau de bord
          </Link>
        </div>
        
        {children}
      </div>
    </div>
  )
}