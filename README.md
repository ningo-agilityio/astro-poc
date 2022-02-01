# ASTRO POC
MATERIAL: https://astro.build/

## Definitions
- [Astro](https://astro.build/): Is a new kind of static site builder for the modern web. Powerful developer experience meets lightweight output.

## Getting started
### Quick start:
1 - Online playgrounds:
https://astro.new/

- Sample for Blog structure: [link](https://codesandbox.io/s/github/withastro/astro/tree/latest/examples/blog-multiple-authors) 
- Sample for components package: [link](https://codesandbox.io/s/github/withastro/astro/tree/latest/examples/component)

2 - Checkout on local machine:
```
pnpm init astro
```
## Astro components
### Components
- Are foundation of server side templating in Astro. Its syntax is HTML enhanced with JavaScript.
- SFC (Single-File Component) - a single `.astro` file represents a single Astro component.
### CSS
- We can reuse class names across multiple components without worrying about conflicts.
- Should only have one `<style>` tag per Astro component.
- Style can go at the top-level of your template.
- If you'd like scoped styles to apply to children, you can use the special `:global` 

```
/* Scoped to current component only */
h1 {
  color: red;
}

/* Scoped to all descendents of the scoped .blog-post class */
.blog-post :global(h1) {
  color: blue;
}
```

- Global styles withing style tag:

```
<style global>
  /* Applies to all h1 tags in your entire site */
  h1 {
    font-size: 32px;
  }
</style>
```

or

```
/* Applies to all h1 tags in your entire site */
:global(h1) {
  font-size: 32px;
}
```

### Frontmatter
- Is a common pattern in Markdown, where some config/metadata is contained inside a code fence (---) at the top of file.
- Astro is a server-side templating language, so component script will run during the build but only the HTML is rendered to the browser. To send JS to the browser, you can use a `<script>` tag in your HTML template.

### Component props
- Props are available on the `Astro.props` global in your frontmatter script.
- You can define your props with TS by exporting a `Props` type interface. Astro will automatically pick up any exported `Props` interface and give type warnings/errors for your project.
- Using `<slot>` tag to enable component composition. (same as children concept in React)

```
---
export interface Props {
  name: string;
  greeting?: string;
}

const { greeting = 'Hello', name } = Astro.props;
---
<div>
  <h1>{greeting}, {name}!</h1>
  <slot /  >
</div>
```

### Fragments & Multiple Elements
- Don't need to wrap everything in a single `div`

### Hoisted scripts
- A hoisted script can be withing a page or a component, and no matter how many times the component is used, the script is only be added once

```
<script src={Astro.resolve('./my-component.js')} hoist></script>
```

### URL resolution
- Option 1: Absolute URLs

```
<!-- ✅ Correct: references public/thumbnail.png -->
<img src="/thumbnail.png" />
```

- Option 2: Asset import references

```
---
//  ✅ Correct: references src/thumbnail.png
import thumbnailSrc from './thumbnail.png';
---

<img src={thumbnailSrc} />
```

## Pages
### Data Loading
Astro provides two different tools to pages to help generate pages by fetched data: fetch() & top-level await.
### Partial Hydration
- The act of only hydrating in individual components that require JS & leaving the rest of your site as static HTML. 

#### **Island architecture**
- **Benefits**:
  + Components load individually
  + Components render in isolation
- **Hydrate interactive components**
  + To hydrate components on the client at runtime, you may use any of the following `client:*`. A directive is component attribute (always with a `:`) which tells Astro how your component should be rendered: client:load, client:idle, client:visible, client:media={QUERY}, client:only

```
  <!-- "client:visible" means the component won't load any client-side
    JavaScript for the component until it becomes visible in the
    user's browser. -->
  <MyReactComponent client:visible />
```

  + To make Astro component interactive, you will need to convert it to the FE framework e.g React, Vue,...Alternative, you can add `script` tag to your Astro component HTML template and send JS to the browser that way.

### Pagination
- Astro also automatically includes pagination metadata for things like previous/next page URL, total number of pages.
- The `getStaticPath()` provides the `paginate()` function that we'll use to paginate your data.

## Run app
All commands are run from the root of the project, from a terminal:

| Command            | Action                                       |
|:----------------   |:-------------------------------------------- |
| `pnpm install`     | Installs dependencies                        |
| `pnpm run dev`     | Starts local dev server at `localhost:3000`  |
| `pnpm run build`   | Build your production site to `./dist/`      |
| `pnpm run preview` | Preview your build locally, before deploying |


