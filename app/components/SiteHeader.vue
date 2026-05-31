<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { docsNavigation } from "~/data/docs";

const searchOpen = ref(false);
</script>

<template>
  <header class="border-grid bg-background/85 sticky top-0 z-40 border-b backdrop-blur supports-[backdrop-filter]:bg-background/70">
    <div class="container flex h-16 items-center gap-4">
      <div class="flex min-w-0 flex-1 items-center gap-3 lg:flex-none">
        <details class="lg:hidden">
          <summary class="hover:bg-accent hover:text-accent-foreground -ml-2 flex size-9 cursor-pointer list-none items-center justify-center rounded-md text-muted-foreground [&::-webkit-details-marker]:hidden">
            <Icon
              name="i-lucide-menu"
              size="20"
              aria-hidden="true"
            />
            <span class="sr-only">Open navigation</span>
          </summary>
          <div class="bg-background border-grid fixed inset-x-0 top-16 max-h-[calc(100vh-4rem)] overflow-auto border-b p-4 shadow-lg">
            <nav class="grid gap-5">
              <div
                v-for="group in docsNavigation"
                :key="group.title"
                class="grid gap-2"
              >
                <p class="text-sm font-medium">
                  {{ group.title }}
                </p>
                <NuxtLink
                  v-for="item in group.children"
                  :key="item.path"
                  :to="item.path"
                  class="text-muted-foreground hover:text-foreground rounded-md px-2 py-1.5 text-sm"
                >
                  {{ item.title }}
                </NuxtLink>
              </div>
            </nav>
          </div>
        </details>

        <div class="flex items-center gap-3">
          <AppLogo class="h-6 w-auto" />
          <span class="sr-only">Stackhacker UI Docs</span>
        </div>

        <TemplateMenu class="hidden sm:block" />
      </div>

      <div class="hidden flex-1 justify-center lg:flex">
        <button
          class="border-input bg-background text-muted-foreground flex h-9 w-full max-w-md items-center gap-2 rounded-md border px-3 text-left text-sm shadow-xs"
          type="button"
          @click="searchOpen = true"
        >
          <Icon
            name="i-lucide-search"
            size="16"
            aria-hidden="true"
          />
          <span class="flex-1">Search documentation...</span>
          <kbd class="bg-muted text-muted-foreground pointer-events-none hidden h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium opacity-100 xl:inline-flex">⌘K</kbd>
        </button>
      </div>

      <div class="flex items-center gap-1 sm:gap-2">
        <Button
          variant="ghost"
          size="icon"
          class="lg:hidden"
          aria-label="Search"
          title="Search"
          @click="searchOpen = true"
        >
          <Icon
            name="i-lucide-search"
            size="19"
            aria-hidden="true"
          />
        </Button>
        <ModeSwitcher />
        <Button
          as="a"
          href="https://github.com/stackhacker-ui/docs"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          variant="ghost"
          size="icon"
        >
          <Icon
            name="mdi:github"
            size="20"
            class="shrink-0"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>

    <SiteSearch v-model:open="searchOpen" />
  </header>
</template>
