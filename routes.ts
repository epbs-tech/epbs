/*
* An array of routes that are accessible to the public
* These routes do not require authentification
* @type {string[]}
*/

export const publicRoutes = [
    "/",
    "/auth/new-verification",
    "/auth",
    "/catalogue",
    "/formations",
    "/formations/[id]",
    "/formations/[id]/sessions",
    "/formations/[id]/sessions/[sessionId]",
    "/blogs",
    "/blogs/[slug]",
    "/contact",
    "/about",
    "/about#expertises-details",
    "/podcast",
    "/podcasts",
    "/podcasts/[id]",
    "/confidentalite",
    "/cookies",
    "/conditions",
];

/*
* An array of routes that are used for authentication
* These routes will redirect logged-in users to /settings
* @type {string[]}
*/

export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
];

/*
* The prefix for API authentication routes
* Routes that start with this prefix are used for API authentication purposes
* @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/*
* The default redirect route after a successful login
* @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";