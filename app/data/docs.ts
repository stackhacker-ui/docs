export interface NavItem {
  title: string;
  path: string;
  icon?: string;
  children?: NavItem[];
}

export interface TocItem {
  title: string;
  id: string;
}

type DocsMedia
  = | { title: string; body: string; type: "image"; src: string }
    | { title: string; body: string; type: "embed" };

export interface DocsPage {
  title: string;
  description: string;
  headline: string;
  path: string;
  links?: Array<{ label: string; href: string }>;
  toc: TocItem[];
  sections: Array<{
    id: string;
    title: string;
    body: string[];
    cards?: Array<{ title: string; href: string; body: string }>;
    callouts?: Array<{ title: string; body: string; icon?: string }>;
    codeExamples?: Array<{ filename?: string; language: string; code: string }>;
    inlineExamples?: Array<{ label: string; markdown: string; result: string }>;
    list?: string[];
    media?: DocsMedia[];
    quote?: string;
    steps?: Array<{ title: string; body: string; code?: string }>;
    table?: { columns: string[]; rows: string[][] };
  }>;
}

export const docsNavigation: NavItem[] = [
  {
    title: "Getting Started",
    path: "/getting-started",
    icon: "i-lucide-house",
    children: [
      { title: "Introduction", path: "/getting-started" },
      { title: "Installation", path: "/getting-started/installation" },
      { title: "Usage", path: "/getting-started/usage" },
    ],
  },
  {
    title: "Essentials",
    path: "/essentials/markdown-syntax",
    icon: "i-lucide-book-open",
    children: [
      { title: "Markdown Syntax", path: "/essentials/markdown-syntax" },
      { title: "Code Blocks", path: "/essentials/code-blocks" },
      { title: "Prose Components", path: "/essentials/prose-components" },
      { title: "Images & Embeds", path: "/essentials/images-embeds" },
    ],
  },
  {
    title: "AI",
    path: "/ai/mcp",
    icon: "i-lucide-sparkles",
    children: [
      { title: "MCP", path: "/ai/mcp" },
      { title: "LLMs", path: "/ai/llms" },
    ],
  },
];

const cards = [
  { title: "Nuxt", href: "https://nuxt.com", body: "The Nuxt website" },
  { title: "Stackhacker UI", href: "https://ui.stackhacker.io", body: "Components and templates for shadcn-vue applications." },
  { title: "shadcn-vue", href: "https://www.shadcn-vue.com", body: "Own your component source and compose it in your project." },
  { title: "Tailwind CSS", href: "https://tailwindcss.com", body: "Utility-first styling with CSS variables and semantic tokens." },
  { title: "Nuxt Icon", href: "https://nuxt.com/modules/icon", body: "Icon rendering for Nuxt applications." },
  { title: "Nuxt Color Mode", href: "https://color-mode.nuxtjs.org", body: "Light and dark mode support for Nuxt." },
];

export const docsPages: DocsPage[] = [
  {
    title: "Introduction",
    description: "Welcome to Stackhacker UI documentation template.",
    headline: "Getting Started",
    path: "/getting-started",
    links: [{ label: "Use this template", href: "https://github.com/stackhacker-ui/docs" }],
    toc: [{ title: "Key Features", id: "key-features" }],
    sections: [
      {
        id: "intro",
        title: "Introduction",
        body: [
          "This template is a ready-to-use documentation template made with Stackhacker UI to create beautiful and responsive Nuxt applications in minutes.",
          "The layout gives you a content-driven sidebar, page header, table of contents, and previous/next style documentation flow.",
        ],
        cards,
      },
      {
        id: "key-features",
        title: "Key Features",
        body: ["This template includes a range of features designed to streamline documentation management:"],
        list: [
          "Powered by Nuxt for optimal performance.",
          "Built with shadcn-vue owned components and Stackhacker UI conventions.",
          "Markdown-oriented information architecture for documentation content.",
          "Sidebar navigation mirrored in readable static source data for easy customization.",
          "Search entry points in the header on desktop and mobile.",
          "Dark mode, responsive navigation, and table of contents areas.",
        ],
      },
    ],
  },
  {
    title: "Installation",
    description: "Install the documentation template and start a local development server.",
    headline: "Getting Started",
    path: "/getting-started/installation",
    toc: [{ title: "Create a project", id: "create-a-project" }, { title: "Start development", id: "start-development" }],
    sections: [
      { id: "create-a-project", title: "Create a project", body: ["Use the template repository as the foundation for your documentation site."] },
      { id: "start-development", title: "Start development", body: ["Install dependencies with pnpm and run the Nuxt development server to preview changes locally."] },
    ],
  },
  {
    title: "Usage",
    description: "Learn how to organize documentation pages and shared navigation.",
    headline: "Getting Started",
    path: "/getting-started/usage",
    toc: [{ title: "Write pages", id: "write-pages" }, { title: "Maintain navigation", id: "maintain-navigation" }],
    sections: [
      { id: "write-pages", title: "Write pages", body: ["Create focused documentation pages with a title, description, body sections, and optional table of contents entries."] },
      { id: "maintain-navigation", title: "Maintain navigation", body: ["Keep the sidebar structure aligned with your documentation hierarchy so desktop and mobile navigation stay predictable."] },
    ],
  },
  {
    title: "Markdown Syntax",
    description: "Document the baseline prose patterns supported by the template.",
    headline: "Essentials",
    path: "/essentials/markdown-syntax",
    toc: [
      { title: "Headings", id: "headings" },
      { title: "Text Formatting", id: "text-formatting" },
      { title: "Links", id: "links" },
      { title: "Lists", id: "lists" },
      { title: "Tables", id: "tables" },
      { title: "Blockquotes", id: "blockquotes" },
    ],
    sections: [
      {
        id: "headings",
        title: "Headings",
        body: [
          "Use clear section headings so the right table of contents can expose the page structure.",
          "Section titles create anchors that can be linked from the static TOC on the right side of the docs layout.",
        ],
        codeExamples: [{ language: "mdc", code: "## Titles\n\n### Subtitles" }],
      },
      {
        id: "text-formatting",
        title: "Text Formatting",
        body: ["Markdown syntax can describe emphasis, inline code, and short UI labels while staying readable in source form."],
        inlineExamples: [
          { label: "Bold", markdown: "**Bold**", result: "Bold" },
          { label: "Italic", markdown: "*Italic*", result: "Italic" },
          { label: "Inline code", markdown: "`pnpm dev`", result: "pnpm dev" },
          { label: "Keyboard", markdown: ":kbd{value=\"K\"}", result: "K" },
        ],
      },
      {
        id: "links",
        title: "Links",
        body: ["Links connect docs pages together and point readers to external references when a topic needs deeper explanation."],
        codeExamples: [{ language: "mdc", code: "[Installation](/getting-started/installation)\n[Stackhacker UI](https://ui.stackhacker.io)" }],
      },
      {
        id: "lists",
        title: "Lists",
        body: ["Use ordered and unordered lists to explain installation steps, concepts, and API details."],
        list: [
          "Start with the goal of the page.",
          "Group related setup steps together.",
          "Link to follow-up pages instead of overloading one section.",
        ],
        codeExamples: [{ language: "mdc", code: "1. Install dependencies\n2. Start the dev server\n3. Open the docs route" }],
      },
      {
        id: "tables",
        title: "Tables",
        body: ["Tables are useful for compact comparisons such as props, defaults, and supported variants."],
        table: {
          columns: ["Prop", "Default", "Type"],
          rows: [
            ["name", "-", "string"],
            ["size", "md", "string"],
            ["disabled", "false", "boolean"],
          ],
        },
      },
      {
        id: "blockquotes",
        title: "Blockquotes",
        body: ["Blockquotes help distinguish cited guidance or important prose from surrounding paragraphs."],
        quote: "Documentation should make the next action obvious without forcing readers to understand the whole system first.",
      },
    ],
  },
  {
    title: "Code Blocks",
    description: "Show source snippets with filenames and readable contrast.",
    headline: "Essentials",
    path: "/essentials/code-blocks",
    toc: [{ title: "Basic", id: "basic" }, { title: "Filenames", id: "filenames" }, { title: "Groups", id: "groups" }],
    sections: [
      {
        id: "basic",
        title: "Basic",
        body: ["Code blocks should be easy to scan in both light and dark color modes."],
        codeExamples: [{ language: "ts", code: "export default defineNuxtConfig({\n  modules: ['shadcn-nuxt'],\n})" }],
      },
      {
        id: "filenames",
        title: "Filenames",
        body: ["Filenames help readers understand where a snippet belongs in the project."],
        codeExamples: [
          { filename: "nuxt.config.ts", language: "ts", code: "export default defineNuxtConfig({\n  css: ['~/assets/css/main.css'],\n  modules: ['@nuxt/icon', 'shadcn-nuxt'],\n})" },
          { filename: "app/assets/css/main.css", language: "css", code: "@import \"tailwindcss\";\n\n@layer base {\n  body {\n    @apply bg-background text-foreground;\n  }\n}" },
        ],
      },
      {
        id: "groups",
        title: "Groups",
        body: ["Grouped install commands can be represented as adjacent examples when a full tab component is not needed."],
        codeExamples: [
          { filename: "pnpm", language: "bash", code: "pnpm dlx shadcn-vue@latest add button" },
          { filename: "npm", language: "bash", code: "npx shadcn-vue@latest add button" },
        ],
        callouts: [{ title: "Customize locally", body: "Copy buttons and stateful tabs can be added later without changing the page structure shown here.", icon: "i-lucide-info" }],
      },
    ],
  },
  {
    title: "Prose Components",
    description: "Compose rich prose sections from local, owned components.",
    headline: "Essentials",
    path: "/essentials/prose-components",
    toc: [{ title: "Callouts", id: "callouts" }, { title: "Cards", id: "cards" }, { title: "Badges and keyboard", id: "badges-keyboard" }, { title: "Steps", id: "steps" }],
    sections: [
      {
        id: "callouts",
        title: "Callouts",
        body: ["Callouts emphasize contextual information with local markup that stays easy to read and customize."],
        callouts: [
          { title: "Note", body: "Use callouts for supporting details that should stay close to the related explanation.", icon: "i-lucide-info" },
          { title: "Tip", body: "Keep the markup local and copyable so template users can adjust the treatment after installation.", icon: "i-lucide-lightbulb" },
          { title: "Warning", body: "Do not hide critical setup requirements inside decorative examples.", icon: "i-lucide-triangle-alert" },
        ],
      },
      {
        id: "cards",
        title: "Cards",
        body: ["Cards, callouts, and grouped links should remain copyable and easy to customize."],
        cards: [
          { title: "Starter", href: "https://starter-template.stackhacker.io/", body: "A minimal app foundation for Stackhacker UI projects." },
          { title: "SaaS", href: "https://saas-template.stackhacker.io/", body: "A template with landing, pricing, docs, and product pages." },
          { title: "Landing", href: "https://landing-template.stackhacker.io/", body: "A landing page you can use as a starting point." },
          { title: "Docs", href: "https://docs-template.stackhacker.io/", body: "This shadcn-vue documentation template." },
        ],
      },
      {
        id: "badges-keyboard",
        title: "Badges and keyboard",
        body: ["Small inline affordances are useful for versions, statuses, shortcuts, and command hints."],
        inlineExamples: [
          { label: "Badge", markdown: "::badge\nStable\n::", result: "Stable" },
          { label: "Shortcut", markdown: ":kbd{value=\"meta\"} :kbd{value=\"K\"}", result: "Meta K" },
          { label: "Inline code", markdown: "`components.json`", result: "components.json" },
        ],
      },
      {
        id: "steps",
        title: "Steps",
        body: ["Steps describe setup flows as a visible sequence instead of relying on a hidden prose transform."],
        steps: [
          { title: "Create the project", body: "Start from the Stackhacker UI docs template or copy the relevant block into your app." },
          { title: "Install dependencies", body: "Install packages with pnpm so Nuxt can prepare types and generated imports.", code: "pnpm install" },
          { title: "Run the docs locally", body: "Start Nuxt and review the responsive docs layout before customizing content.", code: "pnpm dev" },
        ],
      },
    ],
  },
  {
    title: "Images & Embeds",
    description: "Add media to documentation pages without breaking responsive layouts.",
    headline: "Essentials",
    path: "/essentials/images-embeds",
    toc: [{ title: "Responsive media", id: "responsive-media" }, { title: "Embeds", id: "embeds" }],
    sections: [
      {
        id: "responsive-media",
        title: "Responsive media",
        body: ["Images should scale within the page body and preserve readable spacing on mobile."],
        media: [{ title: "Documentation cover image", body: "A responsive image example using public Nuxt artwork as a safe external placeholder.", type: "image", src: "https://nuxt.com/new-social.jpg" }],
        codeExamples: [{ language: "mdc", code: "![Nuxt Social Image](https://nuxt.com/new-social.jpg)" }],
      },
      {
        id: "embeds",
        title: "Embeds",
        body: ["Embeds and iframe-like surfaces should keep a stable aspect ratio and avoid overflowing the docs column."],
        media: [{ title: "Video embed placeholder", body: "A local aspect-ratio frame demonstrates how video or product demo embeds fit the docs column.", type: "embed" }],
        codeExamples: [{ language: "mdc", code: ":iframe{src=\"https://www.youtube-nocookie.com/embed/...\" title=\"YouTube video player\" style=\"aspect-ratio: 16/9;\"}" }],
      },
    ],
  },
  {
    title: "MCP",
    description: "Expose documentation context to model and agent workflows.",
    headline: "AI",
    path: "/ai/mcp",
    toc: [{ title: "Model context", id: "model-context" }],
    sections: [{ id: "model-context", title: "Model context", body: ["MCP support can expose documentation pages to model and agent workflows so external tools can list and retrieve project knowledge."] }],
  },
  {
    title: "LLMs",
    description: "Prepare documentation output for LLM-friendly consumption.",
    headline: "AI",
    path: "/ai/llms",
    toc: [{ title: "LLMs output", id: "llms-output" }],
    sections: [{ id: "llms-output", title: "LLMs output", body: ["LLM-friendly output can provide compact documentation summaries and full-page context for assistants that need to understand your project."] }],
  },
];

export function findDocsPage(path: string) {
  return docsPages.find(page => page.path === path);
}

export function flattenNavigation(items = docsNavigation): NavItem[] {
  return items.flatMap(item => [item, ...(item.children || [])]);
}
