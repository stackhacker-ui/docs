export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/docs" || to.path === "/docs/") {
    return navigateTo("/getting-started", { redirectCode: 301 });
  }

  if (to.path.startsWith("/docs/")) {
    return navigateTo(to.fullPath.replace(/^\/docs/, ""), { redirectCode: 301 });
  }
});
