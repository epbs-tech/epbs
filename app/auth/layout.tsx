import React from "react";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] relative overflow-hidden flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
      {/* Effet de vague géométrique moderne - ajusté pour être responsive */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-white rounded-full transform -translate-x-1/2 -translate-y-1/2 scale-100 sm:scale-125 md:scale-150"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-white rounded-full transform translate-x-1/2 translate-y-1/2 scale-100 sm:scale-125 md:scale-150"></div>
      </div>

      {/* Grain subtil pour texture */}
      <div
        className="absolute inset-0 opacity-10 bg-repeat"
        style={{
          backgroundImage:
            "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjZmZmIj48L3JlY3Q+CjxyZWN0IHdpZHRoPSIxIiBoZWlnaHQ9IjEiIGZpbGw9IiMwMDAiPjwvcmVjdD4KPC9zdmc+')",
        }}
      ></div>

      {/* Contenu centré - avec largeurs responsives selon la taille d'écran */}
      <div className="relative z-10 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto my-4">
        {children}
      </div>
    </div>
  );
}