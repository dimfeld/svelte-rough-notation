<script>
  import { annotate } from 'rough-notation';
  import { onMount } from 'svelte';

  let {
    visible = $bindable(false),
    // Built-in fields. Use this instead of rest props so that properties set
    // only after component creation will be passed through.
    animate = undefined,
    animationDuration = undefined,
    animationDelay = undefined,
    color = undefined,
    strokeWidth = undefined,
    padding = undefined,
    iterations = undefined,
    multiline = undefined,
    brackets = undefined,
    // This is undocumented but makes animation groups work.
    _animationGroupDelay = undefined,
    // Same as above, but for versions after 0.3.1.
    _animationDelay = undefined,
    annotation = $bindable(undefined),
    children,
    // Graceful fallback for if new props are added
    ...rest
  } = $props();

  let container;

  // Emulate rough-notation API
  export function show() { visible = true; }
  export function hide() { visible = false; }
  export function isShowing() { return visible; }

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
      brackets,
      ...rest,
    });
    return () => annotation.remove();
  });

  $effect(() => {
    if (annotation) {
      if (visible) {
        annotation.show();
      } else {
        annotation.hide();
      }
    }
  });

  $effect(() => {
    if (annotation && animate !== undefined) {
      annotation.animate = animate;
    }
  });

  $effect(() => {
    if (annotation && animationDuration !== undefined) {
      annotation.animationDuration = animationDuration;
    }
  });

  $effect(() => {
    if (annotation && animationDelay !== undefined) {
      annotation.animationDelay = animationDelay;
    }
  });

  $effect(() => {
    if (annotation && color !== undefined) {
      annotation.color = color;
    }
  });

  $effect(() => {
    if (annotation && strokeWidth !== undefined) {
      annotation.strokeWidth = strokeWidth;
    }
  });

  $effect(() => {
    if (annotation && padding !== undefined) {
      annotation.padding = padding;
    }
  });

  $effect(() => {
    if (annotation && iterations !== undefined) {
      annotation.iterations = iterations;
    }
  });

  $effect(() => {
    if (annotation && brackets !== undefined) {
      annotation.brackets = brackets;
    }
  });

  $effect(() => {
    if (annotation && _animationGroupDelay !== undefined) {
      annotation._animationGroupDelay = _animationGroupDelay;
    }
  });

  $effect(() => {
    if (annotation && _animationDelay !== undefined) {
      annotation._animationDelay = _animationDelay;
    }
  });
</script>

<div style="display:inline" bind:this={container}>
  {@render children?.()}
</div>
