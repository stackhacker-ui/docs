<script setup lang="ts">
import type { NuxtError } from "#app";

import { Button } from "~/components/ui/button";

const props = defineProps<{
  error: NuxtError;
}>();

const statusCode = computed(() => props.error.statusCode || 500);
const isNotFound = computed(() => statusCode.value === 404);
const title = computed(() => isNotFound.value ? "Page not found" : "Something went wrong");
const heading = computed(() => isNotFound.value ? "Documentation page not found" : "Something went wrong");
const description = computed(() => isNotFound.value
  ? "The page may have moved, or it may not be part of this static docs template yet. Start from the docs overview or return home."
  : "The application hit an unexpected error. Return home or try reloading the page.");

useSeoMeta({
  title,
  description,
});

const handleError = () => clearError({ redirect: "/getting-started" });
const handleHome = () => clearError({ redirect: "/" });
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <SiteHeader />

    <main class="border-grid border-y">
      <section class="container flex min-h-[60vh] items-center py-16 sm:py-24">
        <div class="mx-auto max-w-2xl text-center">
          <p class="text-sm font-medium text-primary">
            {{ statusCode }}
          </p>
          <h1 class="mt-3 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {{ heading }}
          </h1>
          <p class="mt-4 text-lg text-muted-foreground text-pretty">
            {{ description }}
          </p>
          <div class="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              v-if="isNotFound"
              as="a"
              href="/getting-started"
              @click.prevent="handleError"
            >
              Go to docs
            </Button>
            <Button
              as="a"
              href="/"
              variant="outline"
              @click.prevent="handleHome"
            >
              Back to home
            </Button>
          </div>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
