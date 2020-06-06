This is a Svelte wrapper around the [rough-notation](https://github.com/pshihn/rough-notation) library.

The component can be toggled by setting the `visible` boolean property, or through the same `show` and `hide` API exposed by the original component. It also has properties for each configuration option exposed by rough-notation, and these can be updated after the component is created.

```html

<script>
  import Annotation from 'svelte-rough-notation';
  import { onMount } from 'svelte';

  let rn;
  let visible = false;
  onMount(() => {
    setTimeout(() => {
      visible = true; // or rn.visible = true or rn.show()
    }, 1000);
  });
</script>

<Annotation bind:visible bind:this={rn} type="box" padding={10}>Some text</Annotation>
```

Annotation groups work as well. The `rough-notation` group implementation uses an undocumented attribute of the annotation, but this Svelte wrapper supports it, so you can just pass the component instance directly to the annotation group.

```html
<script>
  import Annotation from "svelte-rough-notation";
  import { annotationGroup } from "rough-notation";
  import { onMount } from "svelte";

  let groupAnnotations = [];
  onMount(() => {
    ag = annotationGroup(groupAnnotations);
  });

</script>


<button on:click={() => ag.show()}>Show Group</button>
Here we have
<Annotation bind:this={groupAnnotations[0]} type="underline" color="red">some important things</Annotation>
and also
<Annotation bind:this={groupAnnotations[1]} type="box" color="green">some more things</Annotation>
```

Check it out [in the Svelte REPL](https://svelte.dev/repl/e0346ec2945e4b3abbaceebf50163d2d?version=3.23.0)!
