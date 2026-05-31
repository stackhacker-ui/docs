<script setup lang="ts">
import { docsPages } from "~/data/docs";

const open = defineModel<boolean>("open", { default: false });
const query = ref("");
const inputRef = ref<HTMLInputElement | null>(null);

function collectSearchText(page: typeof docsPages[number]) {
  return page.sections.flatMap(section => [
    section.title,
    ...section.body,
    ...(section.list || []),
    ...(section.cards || []).flatMap(card => [card.title, card.body]),
    ...(section.callouts || []).flatMap(callout => [callout.title, callout.body]),
    ...(section.codeExamples || []).flatMap(example => [example.filename || "", example.language, example.code]),
    ...(section.inlineExamples || []).flatMap(example => [example.label, example.markdown, example.result]),
    ...(section.media || []).flatMap(item => [item.title, item.body]),
    ...(section.steps || []).flatMap(step => [step.title, step.body, step.code || ""]),
    ...(section.table ? [...section.table.columns, ...section.table.rows.flat()] : []),
    section.quote || "",
  ]);
}

const searchablePages = computed(() => [
  {
    title: "Home",
    description: "Docs template landing page.",
    path: "/",
    section: "Overview",
    content: "documentation template landing page",
  },
  ...docsPages.map(page => ({
    title: page.title,
    description: page.description,
    path: page.path,
    section: page.headline,
    content: collectSearchText(page).join(" "),
  })),
]);

const results = computed(() => {
  const term = query.value.trim().toLowerCase();

  if (!term) {
    return searchablePages.value;
  }

  return searchablePages.value.filter((page) => {
    const haystack = `${page.title} ${page.description} ${page.section} ${page.content}`.toLowerCase();
    return haystack.includes(term);
  });
});

function closeSearch() {
  open.value = false;
  query.value = "";
}

function onKeydown(event: KeyboardEvent) {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault();
    open.value = true;
  }

  if (event.key === "Escape" && open.value) {
    closeSearch();
  }
}

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
});

watch(open, async (value) => {
  if (value) {
    await nextTick();
    inputRef.value?.focus();
  }
});
</script>

<template>
  <Teleport to="body">
    <div
      v-if="open"
      class="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label="Search documentation"
    >
      <button
        class="absolute inset-0 bg-background/80 backdrop-blur-sm"
        aria-label="Close search"
        @click="closeSearch"
      />

      <div class="relative mx-auto mt-20 w-[calc(100%-2rem)] max-w-2xl overflow-hidden rounded-xl border border-border bg-popover text-popover-foreground shadow-xl">
        <div class="flex items-center gap-3 border-b border-border px-4 py-3">
          <Icon
            name="i-lucide-search"
            size="18"
            class="text-muted-foreground"
            aria-hidden="true"
          />
          <input
            ref="inputRef"
            v-model="query"
            type="search"
            placeholder="Search documentation..."
            class="h-10 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          >
          <kbd class="bg-muted text-muted-foreground hidden h-6 select-none items-center rounded border px-2 font-mono text-xs sm:inline-flex">Esc</kbd>
        </div>

        <div class="max-h-[min(28rem,calc(100vh-10rem))] overflow-y-auto p-2">
          <NuxtLink
            v-for="result in results"
            :key="result.path"
            :to="result.path"
            class="hover:bg-accent hover:text-accent-foreground block rounded-lg p-3"
            @click="closeSearch"
          >
            <div class="flex items-center justify-between gap-3">
              <p class="font-medium">
                {{ result.title }}
              </p>
              <span class="text-muted-foreground text-xs">{{ result.section }}</span>
            </div>
            <p class="text-muted-foreground mt-1 line-clamp-2 text-sm">
              {{ result.description }}
            </p>
          </NuxtLink>

          <p
            v-if="!results.length"
            class="text-muted-foreground px-3 py-8 text-center text-sm"
          >
            No results found.
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>
