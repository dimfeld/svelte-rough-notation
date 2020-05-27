This is a Svelte wrapper around the [rough-notation](https://github.com/pshihn/rough-notation) library.

The component can be toggled by setting the `visible` boolean property, or through the same `show` and `hide` API exposed by the original component.

```html

<script>
  import RoughNotation from 'svelte-rough-notation';
  import { onMount } from 'svelte';

  let rn;
  onMount(() => {
    rn.visible = true; // or rn.show()
  });
</script>

<RoughNotation bind:visible bind:this={rn} type="box" padding={10}>Some text</RoughNotation>
```

Any unrecognized property you apply to a `RoughNotation` component is passed through to the configuration of the underlying annotation object, so you can use any of the supported options.

Annotation groups work but aren't ideal yet. The component exposes the internal annotation object on the `annotation` property, and you have to pass that property to the annotation group.

```js
let ag = annotationGroup([rn1.annotation, rn2.annotation]);
setTimeout(() => ag.show());
```
