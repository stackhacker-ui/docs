<script setup lang="ts">
import { Button } from "~/components/ui/button";
</script>

<template>
  <footer class="border-grid border-t">
    <div class="container flex min-h-16 flex-col items-start justify-between gap-4 py-4 sm:flex-row sm:items-center">
      <p class="text-muted-foreground flex flex-wrap items-center gap-2 text-sm">
        <span>Built with Stackhacker UI</span>
        <span aria-hidden="true">•</span>
        <span>© {{ new Date().getFullYear() }}</span>
      </p>
      <div class="flex items-center gap-1">
        <Button
          as="a"
          href="https://github.com/stackhacker-ui/docs"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          title="GitHub"
          variant="ghost"
          size="icon"
          class="text-muted-foreground hover:text-foreground"
        >
          <Icon
            name="mdi:github"
            size="20"
            class="shrink-0"
            aria-hidden="true"
          />
        </Button>
        <Button
          as="a"
          href="https://ui.stackhacker.io/docs/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Documentation"
          title="Documentation"
          variant="ghost"
          size="icon"
          class="text-muted-foreground hover:text-foreground"
        >
          <Icon
            name="i-lucide-book-open"
            size="19"
            class="shrink-0"
            aria-hidden="true"
          />
        </Button>
      </div>
    </div>
  </footer>
</template>
