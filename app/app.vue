<script setup lang="ts">
useHead({
  meta: [
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ],
  link: [
    { rel: "icon", href: "/favicon.ico" },
  ],
  htmlAttrs: {
    lang: "en",
  },
});

const route = useRoute();
const { public: { siteUrl: rawSiteUrl } } = useRuntimeConfig();
const siteUrl = rawSiteUrl.replace(/\/$/, "");
const canonicalUrl = computed(() => `${siteUrl}${route.path === "/" ? "/" : route.path}`);
const previewImage = `${siteUrl}/screenshots/docs-light.png`;
const title = "Stackhacker UI Docs Template";
const description = "Build documentation sites with Nuxt 4, shadcn-vue, Tailwind CSS v4, and Stackhacker UI conventions.";

useHead({
  link: [
    { rel: "canonical", href: canonicalUrl },
  ],
});

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogImage: previewImage,
  ogUrl: canonicalUrl,
  twitterCard: "summary_large_image",
  twitterImage: previewImage,
});
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader />

    <main class="border-grid border-y">
      <NuxtPage />
    </main>

    <SiteFooter />
  </div>
</template>
