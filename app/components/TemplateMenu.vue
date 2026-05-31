<script setup lang="ts">
import { Check, ChevronDown } from "lucide-vue-next";
import { Button } from "~/components/ui/button";

const items = [
  { label: "Starter", href: "https://starter-template.stackhacker.io/" },
  { label: "Chat", href: "https://chat-template.stackhacker.io/" },
  { label: "Docs", href: "https://docs-template.stackhacker.io/", current: true },
  { label: "Landing", href: "https://landing-template.stackhacker.io/" },
  { label: "Portfolio", href: "https://portfolio-template.stackhacker.io/" },
  { label: "SaaS", href: "https://saas-template.stackhacker.io/" },
  { label: "Changelog", href: "https://changelog-template.stackhacker.io/" },
];
</script>

<template>
  <details class="group relative">
    <Button
      as="summary"
      variant="secondary"
      size="sm"
      class="h-7 cursor-pointer rounded-full px-3 text-xs font-semibold"
    >
      Docs
      <ChevronDown
        class="size-3.5 transition-transform group-open:rotate-180"
        aria-hidden="true"
      />
    </Button>
    <div class="bg-popover text-popover-foreground border-border absolute left-0 z-20 mt-2 w-48 rounded-md border p-1 shadow-md">
      <a
        v-for="item in items"
        :key="item.label"
        :href="item.href"
        target="_blank"
        rel="noopener noreferrer"
        class="hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-sm px-2 py-1.5 text-sm"
        :class="item.current && 'text-primary'"
      >
        <Check
          v-if="item.current"
          class="size-3.5"
          aria-hidden="true"
        />
        <span
          v-else
          class="size-3.5"
          aria-hidden="true"
        />
        {{ item.label }}
      </a>
    </div>
  </details>
</template>
