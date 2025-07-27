import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import {
    DEFAULT_LOGIN_REDIRECT,
    apiAuthPrefix,
    authRoutes,
    publicRoutes,
} from "@/routes";

const {auth} = NextAuth(authConfig);

// Optimisation : Pré-compilation des routes au chargement du module
const staticPublicRoutes = new Set(publicRoutes.filter(route => !route.includes('[')));
const dynamicPublicRoutes = publicRoutes
    .filter(route => route.includes('['))
    .map(route => ({
        original: route,
        regex: new RegExp(`^${route.replace(/\[([^\]]+)\]/g, '([^/]+)')}$`)
    }));

// Fonction optimisée pour vérifier les routes publiques
function isPublicRoute(pathname: string): boolean {
    // Vérification rapide O(1) pour les routes statiques
    if (staticPublicRoutes.has(pathname)) {
        return true;
    }
    
    // Vérification O(n) seulement pour les routes dynamiques si nécessaire
    return dynamicPublicRoutes.some(({ regex }) => regex.test(pathname));
}

export default auth((req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;

    // Routes API spécifiques (early returns pour performance)
    if (nextUrl.pathname === '/api/webhooks/stripe') {
        return;
    }
    if (nextUrl.pathname === "/api/blogs" || nextUrl.pathname.startsWith("/api/blogs/")) {
        return;
    }
    if (nextUrl.pathname.startsWith('/api/registrations/') && nextUrl.pathname.endsWith('/cancel')) {
        return;
    }
    if (nextUrl.pathname.startsWith("/podcasts/")) {
        return;
    }
    if (nextUrl.pathname === "/api/podcasts" || nextUrl.pathname.startsWith("/api/podcasts/")) {
        return;
    }
    if (nextUrl.pathname === "/api/test" || nextUrl.pathname.startsWith("/api/test/")) {
        return;
    }
    if (nextUrl.pathname.startsWith("/api/hidrive/files/")) {
        return;
    }
    if (nextUrl.pathname.startsWith("/images/")) {
        return;
    }
    if (nextUrl.pathname.startsWith("/api/download/brochure")) {
        return;
    }
    if (nextUrl.pathname.startsWith("/blogs/")) {
        return;
    }

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRouteMatch = isPublicRoute(nextUrl.pathname);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isApiAuthRoute) {
        return;
    }
    
    if(isAuthRoute){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return;
    }

    if (!isLoggedIn && !isPublicRouteMatch) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search){
            callbackUrl += nextUrl.search;
        }

        const encodeCallbackUrl = encodeURIComponent(callbackUrl)

        return Response.redirect(new URL(
            `/auth/login?callbackUrl=${encodeCallbackUrl}`,
            nextUrl));
    }
    return;
})

export const config = {
    matcher: [
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        '/(api|trpc)(.*)',
    ],
}
