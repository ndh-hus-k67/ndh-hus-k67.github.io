import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async ({ url }, next) => {
  if (url.pathname === "/404") {
    return next();
  }

  return Response.redirect(new URL("/404", url), 404);
});
