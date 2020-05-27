<script>
  import { annotate } from "rough-notation";
  import { onMount } from "svelte";
  let container;

  export let visible = false;

  // Emulate rough-notation API
  export const show = () => (visible = true);
  export const hide = () => (visible = false);
  export const isShowing = () => visible;

  export let annotation = undefined;
  onMount(() => {
    annotation = annotate(container, { ...$$restProps });
    return () => annotation.remove();
  });

  $: if (annotation) {
    if (visible) {
      annotation.show();
    } else {
      annotation.hide();
    }
  }
</script>

<svelte:options accessors={true} />
<div style="display:inline" bind:this={container}>
  <slot />
</div>
