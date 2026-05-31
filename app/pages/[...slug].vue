<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { docsNavigation, docsPages, findDocsPage } from "~/data/docs";

const route = useRoute();

function normalizeSlug(slug: string | string[] | undefined) {
  return Array.isArray(slug) ? slug : slug ? [slug] : [];
}

const path = computed(() => `/${normalizeSlug(route.params.slug).join("/")}`);
const page = computed(() => findDocsPage(path.value));

watch(page, (currentPage) => {
  if (!currentPage) {
    showError({ statusCode: 404, statusMessage: "Page not found", fatal: true });
  }
}, { immediate: true });

const currentIndex = computed(() => docsPages.findIndex(item => item.path === page.value?.path));
const previousPage = computed(() => currentIndex.value > 0 ? docsPages[currentIndex.value - 1] : undefined);
const nextPage = computed(() => currentIndex.value < docsPages.length - 1 ? docsPages[currentIndex.value + 1] : undefined);
const metaTitle = computed(() => page.value?.title || "Page not found");
const metaDescription = computed(() => page.value?.description || "The requested documentation page could not be found.");

useSeoMeta({
  title: metaTitle,
  description: metaDescription,
  ogTitle: metaTitle,
  ogDescription: metaDescription,
});
</script>

<template>
  <div
    v-if="page"
    class="container lg:grid lg:grid-cols-[240px_minmax(0,1fr)_220px] lg:gap-10"
  >
    <aside class="border-grid sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto border-r py-8 pr-6 lg:block">
      <nav class="grid gap-6">
        <div
          v-for="group in docsNavigation"
          :key="group.title"
          class="grid gap-2"
        >
          <NuxtLink
            :to="group.path"
            class="flex items-center gap-2 text-sm font-medium"
          >
            <Icon
              v-if="group.icon"
              :name="group.icon"
              size="16"
              class="text-muted-foreground"
              aria-hidden="true"
            />
            {{ group.title }}
          </NuxtLink>
          <div class="grid gap-1 pl-6">
            <NuxtLink
              v-for="item in group.children"
              :key="item.path"
              :to="item.path"
              class="text-muted-foreground hover:text-foreground rounded-md px-2 py-1.5 text-sm"
              :class="item.path === page.path && 'bg-accent text-accent-foreground'"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </div>
      </nav>
    </aside>

    <main class="min-w-0 py-8 lg:py-10">
      <details class="border-grid mb-8 rounded-lg border p-4 lg:hidden">
        <summary class="cursor-pointer text-sm font-medium">
          Documentation navigation
        </summary>
        <nav class="mt-4 grid gap-4">
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
              :class="item.path === page.path && 'bg-accent text-accent-foreground'"
            >
              {{ item.title }}
            </NuxtLink>
          </div>
        </nav>
      </details>

      <header class="border-grid border-b pb-8">
        <p class="text-primary text-sm font-medium">
          {{ page.headline }}
        </p>
        <div class="mt-3 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 class="text-4xl font-semibold tracking-tight text-balance">
              {{ page.title }}
            </h1>
            <p class="text-muted-foreground mt-4 max-w-2xl text-lg text-pretty">
              {{ page.description }}
            </p>
          </div>
          <div
            v-if="page.links?.length"
            class="flex flex-wrap gap-2"
          >
            <Button
              v-for="link in page.links"
              :key="link.href"
              as="a"
              :href="link.href"
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              size="sm"
            >
              {{ link.label }}
            </Button>
          </div>
        </div>
      </header>

      <article class="prose-docs py-8">
        <section
          v-for="section in page.sections"
          :id="section.id"
          :key="section.id"
          class="scroll-mt-24"
        >
          <h2 v-if="section.id !== 'intro'">
            {{ section.title }}
          </h2>
          <p
            v-for="(paragraph, paragraphIndex) in section.body"
            :key="`${section.id}-body-${paragraphIndex}`"
          >
            {{ paragraph }}
          </p>

          <div
            v-if="section.cards"
            class="not-prose mt-6 grid gap-4 sm:grid-cols-2"
          >
            <a
              v-for="card in section.cards"
              :key="card.href"
              :href="card.href"
              target="_blank"
              rel="noopener noreferrer"
              class="border-grid hover:bg-accent/50 rounded-xl border p-4 transition-colors"
            >
              <div class="flex items-center gap-2 font-medium">
                <Icon
                  name="i-lucide-external-link"
                  size="16"
                  class="text-muted-foreground"
                  aria-hidden="true"
                />
                {{ card.title }}
              </div>
              <p class="text-muted-foreground mt-2 text-sm leading-6">{{ card.body }}</p>
            </a>
          </div>

          <ul v-if="section.list">
            <li
              v-for="(item, itemIndex) in section.list"
              :key="`${section.id}-list-${itemIndex}`"
            >
              {{ item }}
            </li>
          </ul>

          <div
            v-if="section.inlineExamples"
            class="not-prose mt-6 overflow-hidden rounded-xl border border-border/60"
          >
            <div
              v-for="(example, exampleIndex) in section.inlineExamples"
              :key="`${section.id}-inline-${exampleIndex}`"
              class="grid gap-3 border-b border-border/60 p-4 last:border-b-0 sm:grid-cols-[140px_minmax(0,1fr)_minmax(0,1fr)] sm:items-center"
            >
              <p class="text-sm font-medium">
                {{ example.label }}
              </p>
              <code class="block min-w-0 overflow-x-auto rounded-md bg-muted px-2 py-1 text-sm whitespace-nowrap text-foreground">
                {{ example.markdown }}
              </code>
              <span class="text-sm text-muted-foreground">
                {{ example.result }}
              </span>
            </div>
          </div>

          <div
            v-if="section.callouts"
            class="not-prose mt-6 grid gap-3"
          >
            <div
              v-for="(callout, calloutIndex) in section.callouts"
              :key="`${section.id}-callout-${calloutIndex}`"
              class="rounded-xl border border-border/60 bg-card p-4 text-card-foreground"
            >
              <div class="flex items-start gap-3">
                <Icon
                  :name="callout.icon || 'i-lucide-info'"
                  size="18"
                  class="mt-0.5 text-primary"
                  aria-hidden="true"
                />
                <div>
                  <p class="text-sm font-medium">
                    {{ callout.title }}
                  </p>
                  <p class="mt-1 text-sm leading-6 text-muted-foreground">
                    {{ callout.body }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="section.table"
            class="not-prose mt-6 overflow-x-auto rounded-xl border border-border/60"
          >
            <table class="w-full min-w-[520px] text-left text-sm">
              <thead class="bg-muted text-foreground">
                <tr>
                  <th
                    v-for="column in section.table.columns"
                    :key="column"
                    class="px-4 py-3 font-medium"
                  >
                    {{ column }}
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y divide-border/60">
                <tr
                  v-for="(row, rowIndex) in section.table.rows"
                  :key="rowIndex"
                >
                  <td
                    v-for="(cell, cellIndex) in row"
                    :key="`${rowIndex}-${cellIndex}`"
                    class="px-4 py-3 text-muted-foreground"
                  >
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <blockquote
            v-if="section.quote"
            class="not-prose mt-6 border-l-4 border-primary/40 bg-muted/50 py-3 pl-4 text-muted-foreground"
          >
            {{ section.quote }}
          </blockquote>

          <div
            v-if="section.steps"
            class="not-prose mt-6 grid gap-5"
          >
            <div
              v-for="(step, index) in section.steps"
              :key="`${section.id}-step-${index}`"
              class="relative pl-10"
            >
              <div class="absolute left-0 top-0 flex size-7 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
                {{ index + 1 }}
              </div>
              <h3 class="text-base font-medium">
                {{ step.title }}
              </h3>
              <p class="mt-1 text-sm leading-6 text-muted-foreground">
                {{ step.body }}
              </p>
              <pre
                v-if="step.code"
                class="mt-3 overflow-x-auto rounded-lg bg-muted p-3 text-sm text-foreground"
              ><code>{{ step.code }}</code></pre>
            </div>
          </div>

          <div
            v-if="section.media"
            class="not-prose mt-6 grid gap-4"
          >
            <figure
              v-for="(item, mediaIndex) in section.media"
              :key="`${section.id}-media-${mediaIndex}`"
              class="overflow-hidden rounded-xl border border-border/60 bg-card"
            >
              <img
                v-if="item.type === 'image'"
                :src="item.src"
                :alt="item.title"
                class="aspect-video w-full object-cover"
                loading="lazy"
              >
              <div
                v-else-if="item.type === 'embed'"
                class="flex aspect-video items-center justify-center bg-muted text-muted-foreground"
              >
                <Icon
                  name="i-lucide-play"
                  size="36"
                  aria-hidden="true"
                />
              </div>
              <figcaption class="border-t border-border/60 p-4">
                <p class="text-sm font-medium">
                  {{ item.title }}
                </p>
                <p class="mt-1 text-sm leading-6 text-muted-foreground">
                  {{ item.body }}
                </p>
              </figcaption>
            </figure>
          </div>

          <div
            v-if="section.codeExamples"
            class="not-prose mt-6 grid gap-4"
          >
            <div
              v-for="(example, exampleIndex) in section.codeExamples"
              :key="`${section.id}-code-${exampleIndex}`"
              class="overflow-hidden rounded-xl border border-border/60 bg-card"
            >
              <div class="flex items-center justify-between gap-3 border-b border-border/60 bg-muted px-4 py-2 text-xs text-muted-foreground">
                <span>{{ example.filename || example.language }}</span>
                <span class="uppercase tracking-wide">{{ example.language }}</span>
              </div>
              <pre class="overflow-x-auto p-4 text-sm leading-6 text-card-foreground"><code>{{ example.code }}</code></pre>
            </div>
          </div>
        </section>
      </article>

      <div class="border-grid grid gap-3 border-t pt-6 sm:grid-cols-2">
        <NuxtLink
          v-if="previousPage"
          :to="previousPage.path"
          class="border-grid hover:bg-accent/50 rounded-lg border p-4"
        >
          <span class="text-muted-foreground text-xs">Previous</span>
          <p class="mt-1 font-medium">{{ previousPage.title }}</p>
        </NuxtLink>
        <div v-else />
        <NuxtLink
          v-if="nextPage"
          :to="nextPage.path"
          class="border-grid hover:bg-accent/50 rounded-lg border p-4 text-right"
        >
          <span class="text-muted-foreground text-xs">Next</span>
          <p class="mt-1 font-medium">{{ nextPage.title }}</p>
        </NuxtLink>
      </div>
    </main>

    <aside class="sticky top-16 hidden h-[calc(100vh-4rem)] overflow-y-auto py-8 lg:block">
      <div class="grid gap-6 text-sm">
        <div
          v-if="page.toc.length"
          class="grid gap-3"
        >
          <p class="font-medium">
            Table of Contents
          </p>
          <a
            v-for="item in page.toc"
            :key="item.id"
            :href="`#${item.id}`"
            class="text-muted-foreground hover:text-foreground"
          >
            {{ item.title }}
          </a>
        </div>
        <div class="border-grid grid gap-3 border-t pt-5">
          <p class="font-medium">
            Community
          </p>
          <a
            class="text-muted-foreground hover:text-foreground"
            href="https://github.com/stackhacker-ui/docs"
            target="_blank"
            rel="noopener noreferrer"
          >Star on GitHub</a>
          <a
            class="text-muted-foreground hover:text-foreground"
            href="https://ui.stackhacker.io/docs/getting-started"
            target="_blank"
            rel="noopener noreferrer"
          >Stackhacker UI docs</a>
        </div>
      </div>
    </aside>
  </div>
</template>
