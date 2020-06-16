<script>
  import { annotate } from "rough-notation";
  import { onMount } from "svelte";
  let container;

  export let visible = false;

  // Built-in fields. Use this instead of $$restProps so that properties set
  // only after component creation will be passed through.
  export let animate = undefined;
  export let animationDuration = undefined;
  export let animationDelay = undefined;
  export let color = undefined;
  export let strokeWidth = undefined;
  export let padding = undefined;
  export let iterations = undefined;
  export let multiline = undefined;
  // This is undocumented but makes animation groups work.
  export let _animationGroupDelay = undefined;
  // Same as above, but for versions after 0.3.1.
  export let _animationDelay = undefined;

  // Emulate rough-notation API
  export const show = () => (visible = true);
  export const hide = () => (visible = false);
  export const isShowing = () => visible;

  export let annotation = undefined;
  onMount(() => {
    annotation = annotate(container, {
      animate,
      animationDuration,
      animationDelay,
      color,
      strokeWidth,
      padding,
      iterations,
      multiline,
      // Graceful fallback for if new props are added
      ...$$restProps,
    });
    return () => annotation.remove();
  });

  $: if (annotation) {
    if (visible) {
      annotation.show();
    } else {
      annotation.hide();
    }
  }

  $: if (annotation && animate !== undefined) {
    annotation.animate = animate;
  }

  $: if (annotation && animationDuration !== undefined) {
    annotation.animationDuration = animationDuration;
  }

  $: if (annotation && animationDelay !== undefined) {
    annotation.animationDelay = animationDelay;
  }

  $: if (annotation && color !== undefined) {
    annotation.color = color;
  }

  $: if (annotation && strokeWidth !== undefined) {
    annotation.strokeWidth = strokeWidth;
  }

  $: if (annotation && padding !== undefined) {
    annotation.padding = padding;
  }

  $: if (annotation && iterations !== undefined) {
    annotation.iterations = iterations;
  }

  $: if (annotation && _animationGroupDelay !== undefined) {
    annotation._animationGroupDelay = _animationGroupDelay;
  }

  $: if (annotation && _animationDelay !== undefined) {
    annotation._animationDelay = _animationDelay;
  }

  // TODO Add multiline once rough-notation supports updating it
</script>

<svelte:options accessors={true} />
<div style="display:inline" bind:this={container}>
  <slot />
</div>
