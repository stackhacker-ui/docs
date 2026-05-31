<script setup lang="ts">
import { ArrowRight, Layers, Moon, Navigation, Palette, Search, Type } from "lucide-vue-next";
import { Button } from "~/components/ui/button";

const features = [
  {
    icon: Palette,
    title: "100+ UI Components",
    description: "Use owned shadcn-vue components as the foundation for accessible documentation interfaces.",
  },
  {
    icon: Type,
    title: "Beautiful Typography",
    description: "Keep prose readable with consistent spacing, page headers, cards, and responsive content width.",
  },
  {
    icon: Layers,
    title: "Rich Prose Components",
    description: "Compose cards, callouts, steps, and code examples from local source that teams can customize.",
  },
  {
    icon: Search,
    title: "Built-in Search Entry",
    description: "Expose desktop and mobile search affordances so readers can jump between documentation sections quickly.",
  },
  {
    icon: Navigation,
    title: "Smart Navigation",
    description: "Use sidebar, mobile navigation, table of contents, and page-to-page flow for predictable docs browsing.",
  },
  {
    icon: Moon,
    title: "Dark Mode Ready",
    description: "Use semantic tokens so light and dark modes stay aligned with Stackhacker UI styles.",
  },
];
</script>

<template>
  <div>
    <section class="container grid gap-10 py-16 md:py-24 lg:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] lg:items-center">
      <div class="text-center lg:text-left">
        <h1 class="max-w-[13ch] text-5xl font-semibold tracking-tight text-balance sm:text-6xl md:text-7xl lg:mx-0 lg:max-w-[12ch]">
          Ship Beautiful <span class="text-primary">Documentation</span>.
        </h1>
        <p class="text-muted-foreground mx-auto mt-6 max-w-[60ch] text-lg leading-8 text-pretty lg:mx-0">
          Build professional documentation with Stackhacker UI's owned components, enhanced typography, and Nuxt-powered application structure.
        </p>
        <div class="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
          <Button
            as="a"
            href="/getting-started"
            size="lg"
          >
            Get started
            <ArrowRight
              class="size-4"
              aria-hidden="true"
            />
          </Button>
          <Button
            as="a"
            href="https://github.com/stackhacker-ui/docs"
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            size="lg"
          >
            <Icon
              name="mdi:github"
              size="24"
              class="shrink-0"
              aria-hidden="true"
            />
            Use this template
          </Button>
        </div>
      </div>

      <div class="border-grid bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
        <div class="bg-muted/70 border-grid flex items-center gap-2 border-b px-4 py-3">
          <span class="size-3 rounded-full bg-red-400" />
          <span class="size-3 rounded-full bg-yellow-400" />
          <span class="size-3 rounded-full bg-green-400" />
          <span class="text-muted-foreground ml-2 text-xs">nuxt.config.ts</span>
        </div>
        <pre class="overflow-x-auto p-5 text-left text-sm leading-7"><code>export default defineNuxtConfig({
  modules: [
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxtjs/color-mode'
  ],

  css: ['~/assets/css/main.css']
})</code></pre>
      </div>
    </section>

    <section class="border-grid border-t">
      <div class="container py-16 md:py-20">
        <div class="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 class="text-3xl font-semibold tracking-tight text-balance md:text-4xl">
              Powered by Stackhacker UI components
            </h2>
            <p class="text-muted-foreground mt-4 max-w-2xl text-pretty">
              Build with copyable shadcn-vue components, semantic tokens, and a Nuxt application structure that stays easy to customize after installation.
            </p>
          </div>
          <Button
            as="a"
            href="/getting-started"
            variant="secondary"
            class="w-fit"
          >
            Explore docs
            <ArrowRight
              class="size-4"
              aria-hidden="true"
            />
          </Button>
        </div>

        <dl class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="feature in features"
            :key="feature.title"
            class="border-grid bg-card rounded-xl border p-5"
          >
            <dt class="flex items-center gap-3 font-medium">
              <component
                :is="feature.icon"
                class="text-primary size-5"
                aria-hidden="true"
              />
              <span>{{ feature.title }}</span>
            </dt>
            <dd class="text-muted-foreground mt-3 text-sm leading-6 text-pretty">
              {{ feature.description }}
            </dd>
          </div>
        </dl>
      </div>
    </section>

    <section class="border-grid border-t">
      <div class="container py-16 md:py-20">
        <div class="bg-muted/40 border-grid mx-auto max-w-4xl rounded-xl border p-8 text-center md:p-12">
          <h2 class="mx-auto max-w-[28ch] text-3xl font-semibold tracking-tight text-balance">
            Ready to build an amazing documentation?
          </h2>
          <p class="text-muted-foreground mx-auto mt-4 max-w-[58ch] text-pretty">
            Start with a polished documentation shell, then adapt the navigation, prose sections, and source-owned components to your project.
          </p>
          <div class="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button
              as="a"
              href="/getting-started"
            >
              Start building
              <ArrowRight
                class="size-4"
                aria-hidden="true"
              />
            </Button>
            <Button
              as="a"
              href="https://github.com/stackhacker-ui/docs"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
            >
              <Icon
                name="mdi:github"
                size="24"
                class="shrink-0"
                aria-hidden="true"
              />
              View on GitHub
            </Button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
