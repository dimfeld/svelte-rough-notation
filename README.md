This is a Svelte 5 wrapper around the [rough-notation](https://github.com/rough-stuff/rough-notation) library.

It exposes both a wrapper component using snippets, and an action that can be used on a DOM element with Svelte's `use:` syntax.

> **Note:** Version 0.2.0+ requires Svelte 5. For Svelte 3/4 support, use version 0.1.5.

# Wrapper Component

The component can be toggled by setting the `visible` boolean property, or through the same `show` and `hide` API exposed by the original component. It also has properties for each configuration option exposed by rough-notation, and these can be updated after the component is created.

```html
<script>
  import Annotation from 'svelte-rough-notation';
  import { onMount } from 'svelte';

  let rn;
  let visible = $state(false);
  onMount(() => {
    setTimeout(() => {
      visible = true; // or rn.show()
    }, 1000);
  });
</script>

<Annotation bind:visible bind:this={rn} type="box" padding={10}>Some text</Annotation>
```

Annotation groups work as well. Use `bind:annotation` to get the underlying rough-notation annotation object, and pass those directly to the annotation group.

```html
<script>
  import Annotation from "svelte-rough-notation";
  import { annotationGroup } from "rough-notation";
  import { onMount } from "svelte";

  let groupAnnotations = $state([]);
  let ag;
  onMount(() => {
    ag = annotationGroup(groupAnnotations);
  });
</script>

<button onclick={() => ag.show()}>Show Group</button>
Here we have
<Annotation bind:annotation={groupAnnotations[0]} type="underline" color="red">some important things</Annotation>
and also
<Annotation bind:annotation={groupAnnotations[1]} type="box" color="green">some more things</Annotation>
```

# Svelte Action

The action's configuration can contain all the options exposed by rough-notation, as well as a `visible` property that controls the show/hide behavior of the annotation. Updates to the configuration will be applied to the annotation.

Annotation groups are not supported with the action version of the Svelte wrapper.

```html
<script>
  import { annotate } from 'svelte-rough-notation';
</script>

<span use:annotate={{ type: 'box', iterations: 2, visible: true }}>Some text</span>
```

# Documentation

For a comprehensive guide with all annotation types, full props reference, annotation groups, and real-world examples (hero sections, pricing pages, scroll reveals, and more), see the [Usage Guide](docs/USAGE.md).

# Example

There is a small sample app in the `site` directory of this repository, or you can check it out in the [Svelte Playground](https://svelte.dev/playground/09b4ebbd7afa48e085aeeca76b717df4?version=latest)!
