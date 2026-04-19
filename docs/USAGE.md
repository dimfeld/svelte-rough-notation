# svelte-rough-notation — Usage Guide

A complete guide to using `svelte-rough-notation` in your Svelte 5 application. This package wraps the [rough-notation](https://github.com/rough-stuff/rough-notation) library, giving you hand-drawn, sketchy annotations on any DOM element.

---

## Table of Contents

- [Installation](#installation)
- [Two Ways to Annotate](#two-ways-to-annotate)
- [Annotation Types](#annotation-types)
  - [Underline](#underline)
  - [Box](#box)
  - [Circle](#circle)
  - [Highlight](#highlight)
  - [Strike-Through](#strike-through)
  - [Crossed-Off](#crossed-off)
  - [Bracket](#bracket)
- [Props and Configuration](#props-and-configuration)
- [Controlling Visibility](#controlling-visibility)
- [Reactive Updates](#reactive-updates)
- [Annotation Groups](#annotation-groups)
- [Multiline Text](#multiline-text)
- [Real-World Examples](#real-world-examples)
  - [Hero Section with Highlighted Keyword](#hero-section-with-highlighted-keyword)
  - [Pricing Page Emphasis](#pricing-page-emphasis)
  - [Staggered Reveal on Scroll](#staggered-reveal-on-scroll)
  - [Interactive Toggle](#interactive-toggle)
  - [Annotated Code Review / Notes](#annotated-code-review--notes)
  - [Call-to-Action Button Annotation](#call-to-action-button-annotation)
- [Tips and Best Practices](#tips-and-best-practices)

---

## Installation

```bash
npm install svelte-rough-notation rough-notation
```

`rough-notation` is a peer dependency that provides the underlying annotation engine.

---

## Two Ways to Annotate

### 1. Wrapper Component

The `<Annotation>` component wraps your content and manages the annotation lifecycle.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';

  let visible = $state(true);
</script>

<Annotation {visible} type="underline" color="red">
  Important text
</Annotation>
```

Use the component when you need:
- `bind:this` to call `show()` / `hide()` imperatively
- `bind:annotation` to access the raw annotation object (for groups)
- Two-way binding on `visible`

### 2. Svelte Action

The `use:annotate` action applies an annotation directly to any element.

```svelte
<script>
  import { annotate } from 'svelte-rough-notation';
</script>

<span use:annotate={{ type: 'underline', color: 'red', visible: true }}>
  Important text
</span>
```

Use the action when you want:
- A lightweight, directive-based approach
- No extra wrapper `<div>` around your element
- Simple one-off annotations

> **Note:** The action does not support annotation groups.

---

## Annotation Types

### Underline

A hand-drawn line beneath the text.

```svelte
<!-- Component -->
<Annotation visible={true} type="underline" color="red">
  underlined text
</Annotation>

<!-- Action -->
<span use:annotate={{ type: 'underline', color: 'red', visible: true }}>
  underlined text
</span>
```

### Box

A rectangle drawn around the element.

```svelte
<Annotation visible={true} type="box" color="blue" padding={5}>
  boxed text
</Annotation>
```

### Circle

A rough circle/ellipse around the element.

```svelte
<Annotation visible={true} type="circle" color="green" padding={10}>
  circled text
</Annotation>
```

### Highlight

A background highlight, like a marker pen.

```svelte
<Annotation visible={true} type="highlight" color="yellow">
  highlighted text
</Annotation>
```

### Strike-Through

A horizontal line through the middle of the text.

```svelte
<Annotation visible={true} type="strike-through" color="red">
  deleted text
</Annotation>
```

### Crossed-Off

An "X" pattern drawn across the element.

```svelte
<Annotation visible={true} type="crossed-off" color="red">
  removed text
</Annotation>
```

### Bracket

Brackets drawn on one or more sides. Use the `brackets` prop to specify which sides.

```svelte
<!-- Left and right brackets -->
<Annotation visible={true} type="bracket" color="orange" brackets={['left', 'right']}>
  bracketed text
</Annotation>

<!-- Single bracket on the left -->
<Annotation visible={true} type="bracket" color="purple" brackets={['left']}>
  side note
</Annotation>

<!-- Top and bottom -->
<Annotation visible={true} type="bracket" color="blue" brackets={['top', 'bottom']}>
  enclosed text
</Annotation>
```

Valid bracket values: `'left'`, `'right'`, `'top'`, `'bottom'`.

---

## Props and Configuration

All props work on both the `<Annotation>` component and the `use:annotate` action config object.

| Prop | Type | Default | Description |
|---|---|---|---|
| `visible` | `boolean` | `false` | Show or hide the annotation. Supports `bind:visible`. |
| `type` | `string` | — | Annotation type: `'underline'`, `'box'`, `'circle'`, `'highlight'`, `'strike-through'`, `'crossed-off'`, `'bracket'`. |
| `color` | `string` | — | Stroke/fill color. Any CSS color value (`'red'`, `'#ff0000'`, `'rgb(255,0,0)'`). |
| `strokeWidth` | `number` | `1` | Width of the annotation stroke. |
| `padding` | `number` | `5` | Space between the element and the annotation in pixels. |
| `iterations` | `number` | `2` | Number of drawing passes. Higher = rougher/sketchier look. |
| `animate` | `boolean` | `true` | Whether to animate the annotation drawing. |
| `animationDuration` | `number` | `800` | Duration of the draw animation in milliseconds. |
| `animationDelay` | `number` | `0` | Delay before the animation starts in milliseconds. |
| `multiline` | `boolean` | `false` | Enable multiline support for text that wraps across lines. |
| `brackets` | `string[]` | `['right']` | Which sides to draw brackets on (only for `type="bracket"`). |

### Component-only props

| Prop | Type | Description |
|---|---|---|
| `annotation` | `object` | The underlying rough-notation instance. Use `bind:annotation` to access it. |

### Component-only methods (via `bind:this`)

| Method | Description |
|---|---|
| `show()` | Make the annotation visible. |
| `hide()` | Hide the annotation. |
| `isShowing()` | Returns `true` if the annotation is currently visible. |

---

## Controlling Visibility

There are three ways to show/hide annotations:

### 1. Reactive prop binding

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';

  let visible = $state(false);
</script>

<button onclick={() => visible = !visible}>Toggle</button>

<Annotation bind:visible type="highlight" color="yellow">
  Toggle me
</Annotation>
```

### 2. Imperative methods via `bind:this`

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';

  let rn;
</script>

<button onclick={() => rn.show()}>Show</button>
<button onclick={() => rn.hide()}>Hide</button>

<Annotation bind:this={rn} type="circle" color="blue">
  Show or hide me
</Annotation>
```

### 3. Direct config (action)

```svelte
<script>
  import { annotate } from 'svelte-rough-notation';

  let show = $state(false);
</script>

<button onclick={() => show = !show}>Toggle</button>

<span use:annotate={{ type: 'box', color: 'red', visible: show }}>
  Annotated text
</span>
```

---

## Reactive Updates

All props update reactively. Change a value and the annotation updates live — no need to destroy and recreate.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';

  let color = $state('red');
  let strokeWidth = $state(1);
  let iterations = $state(2);
</script>

<div>
  <label>
    Color:
    <select bind:value={color}>
      <option>red</option>
      <option>blue</option>
      <option>green</option>
      <option>purple</option>
    </select>
  </label>

  <label>
    Stroke Width:
    <input type="range" min="1" max="10" bind:value={strokeWidth} />
    {strokeWidth}
  </label>

  <label>
    Iterations:
    <input type="range" min="1" max="10" bind:value={iterations} />
    {iterations}
  </label>
</div>

<Annotation visible={true} type="underline" {color} {strokeWidth} {iterations}>
  Customize me live
</Annotation>
```

The same works with the action:

```svelte
<span use:annotate={{ type: 'box', visible: true, color, strokeWidth, iterations }}>
  Customize me live
</span>
```

---

## Annotation Groups

Annotation groups let you sequence multiple annotations so they animate one after another. This uses rough-notation's `annotationGroup` directly.

Use `bind:annotation` on each `<Annotation>` component to get the raw annotation object, then pass them to `annotationGroup()`.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';
  import { annotationGroup } from 'rough-notation';
  import { onMount } from 'svelte';

  let annotations = $state([]);
  let ag;

  onMount(() => {
    ag = annotationGroup(annotations);
  });

  function showAll() {
    ag.show();
  }

  function hideAll() {
    ag.hide();
  }
</script>

<button onclick={showAll}>Show All</button>
<button onclick={hideAll}>Hide All</button>

<p>
  This has an
  <Annotation bind:annotation={annotations[0]} type="underline" color="red">
    underline
  </Annotation>,
  a
  <Annotation bind:annotation={annotations[1]} type="circle" color="green">
    circle
  </Annotation>,
  and a
  <Annotation bind:annotation={annotations[2]} type="highlight" color="yellow">
    highlight
  </Annotation>.
</p>
```

When you call `ag.show()`, each annotation animates in sequence (underline first, then circle, then highlight).

> **Note:** Annotation groups only work with the `<Annotation>` component, not the `use:annotate` action.

---

## Multiline Text

When annotating text that wraps across multiple lines, set `multiline={true}`. This is especially useful for `highlight` and `underline` types.

```svelte
<div style="max-width: 300px;">
  <Annotation visible={true} type="highlight" color="lightgreen" multiline={true} padding={1}>
    This is a long paragraph of text that will wrap across multiple lines, and the
    highlight will follow each line individually rather than drawing one big rectangle.
  </Annotation>
</div>
```

With the action:

```svelte
<p style="max-width: 300px;">
  <span use:annotate={{ type: 'highlight', color: 'lightyellow', visible: true, multiline: true, padding: 1 }}>
    Long wrapping text gets highlighted line by line for a natural marker effect.
  </span>
</p>
```

---

## Real-World Examples

### Hero Section with Highlighted Keyword

Draw attention to a key word in your landing page headline.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    setTimeout(() => visible = true, 500);
  });
</script>

<h1 style="font-size: 3rem;">
  Build
  <Annotation {visible} type="highlight" color="#ffe08a" animationDuration={1500} multiline={true}>
    beautiful
  </Annotation>
  web apps with Svelte
</h1>
```

### Pricing Page Emphasis

Circle the recommended plan and underline the price.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';
  import { annotationGroup } from 'rough-notation';
  import { onMount } from 'svelte';

  let annotations = $state([]);
  let ag;

  onMount(() => {
    ag = annotationGroup(annotations);
    ag.show();
  });
</script>

<div style="text-align: center; padding: 2rem;">
  <h2>
    <Annotation bind:annotation={annotations[0]} type="circle" color="green" padding={15} strokeWidth={3}>
      Pro Plan
    </Annotation>
  </h2>
  <p style="font-size: 2rem;">
    <Annotation bind:annotation={annotations[1]} type="underline" color="green" strokeWidth={3} iterations={3}>
      $19/month
    </Annotation>
  </p>
  <p>
    <Annotation bind:annotation={annotations[2]} type="highlight" color="#d4edda">
      Most popular choice
    </Annotation>
  </p>
</div>
```

### Staggered Reveal on Scroll

Show annotations when the user scrolls an element into view.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';

  let visible = $state(false);
  let section;

  $effect(() => {
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  });
</script>

<div bind:this={section} style="padding: 4rem 0;">
  <h2>
    Our platform is
    <Annotation {visible} type="underline" color="red" strokeWidth={3} animationDuration={1200}>
      trusted by thousands
    </Annotation>
    of developers worldwide.
  </h2>
</div>
```

### Interactive Toggle

Let users toggle annotations on and off for a teaching or documentation interface.

```svelte
<script>
  import { annotate } from 'svelte-rough-notation';

  let showNotes = $state(false);
</script>

<label>
  <input type="checkbox" bind:checked={showNotes} />
  Show annotations
</label>

<pre style="padding: 1rem; background: #f5f5f5; border-radius: 4px;">
  <code>
    function
    <span use:annotate={{ type: 'box', color: 'blue', visible: showNotes, padding: 2 }}>
      fetchData</span>(url) &#123;
      return
      <span use:annotate={{ type: 'highlight', color: '#ffe08a', visible: showNotes }}>
        fetch(url)</span>
        .then(r => r.json());
    &#125;
  </code>
</pre>
```

### Annotated Code Review / Notes

Use brackets and boxes to add review-style annotations to content.

```svelte
<script>
  import { Annotation } from 'svelte-rough-notation';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    visible = true;
  });
</script>

<div style="max-width: 600px; line-height: 2;">
  <p>
    <Annotation {visible} type="bracket" color="red" brackets={['left']} strokeWidth={2}>
      This paragraph needs revision. The argument here is weak
      and should be supported with data.
    </Annotation>
  </p>

  <p>
    <Annotation {visible} type="highlight" color="#d4edda" multiline={true}>
      This section is well-written and can stay as-is.
    </Annotation>
  </p>

  <p>
    <Annotation {visible} type="strike-through" color="red">
      Remove this paragraph entirely.
    </Annotation>
  </p>
</div>
```

### Call-to-Action Button Annotation

Draw a rough circle around a CTA button to make it stand out.

```svelte
<script>
  import { annotate } from 'svelte-rough-notation';
  import { onMount } from 'svelte';

  let visible = $state(false);

  onMount(() => {
    setTimeout(() => visible = true, 1000);
  });
</script>

<div style="text-align: center; padding: 3rem;">
  <p>Ready to get started?</p>
  <button
    use:annotate={{ type: 'circle', color: '#ff6b6b', visible, padding: 12, strokeWidth: 3, animationDuration: 1500 }}
    style="font-size: 1.2rem; padding: 0.8rem 2rem; cursor: pointer;">
    Sign Up Free
  </button>
</div>
```

---

## Tips and Best Practices

- **Use `padding`** to give annotations breathing room, especially for `circle` and `box` types. A value of `5`–`15` usually looks good.

- **Increase `iterations`** for a rougher, sketchier look. The default `2` is subtle; `5`–`10` gives a more hand-drawn feel.

- **Use `animationDelay`** when combining multiple standalone annotations to stagger them without needing a full annotation group.

- **Prefer the action** (`use:annotate`) for simple, one-off annotations where you don't need groups or imperative control. It avoids an extra wrapper `<div>`.

- **Prefer the component** (`<Annotation>`) when you need annotation groups, `bind:this` for imperative show/hide, or `bind:annotation` to access the raw annotation object.

- **Multiline text** requires `multiline={true}`. Without it, a single annotation shape covers the entire bounding box, which looks wrong for wrapped text.

- **Color opacity** works well for highlights. Try `color="rgba(255, 255, 0, 0.4)"` for a softer marker effect.

- **The annotation renders as an SVG** positioned absolutely over your content. It does not affect layout. Keep this in mind with `overflow: hidden` containers — the annotation may be clipped.

- **Annotations are visual-only** and not announced to screen readers. If the annotation conveys meaning (e.g., a strikethrough indicating deletion), ensure the meaning is also communicated through text or ARIA attributes.
