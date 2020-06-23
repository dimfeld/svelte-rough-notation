<script>
  import { default as Annotation, annotate } from 'svelte-rough-notation';
  import { annotationGroup } from 'rough-notation';
  import { onMount, tick } from 'svelte';

  const types = [
    { type: 'underline', color: 'red' },
    { type: 'box', color: 'blue' },
    { type: 'circle', color: 'green' },
    { type: 'highlight', color: 'yellow' },
    { type: 'strike-through', color: 'black' },
    { type: 'crossed-off', color: 'rebeccapurple' },
    {
      type: 'bracket',
      color: 'orange',
      extra: { brackets: ['left', 'right'] },
    },
  ];

  let showSimple = true;

  let ag;
  let groupAnnotations = [];
  onMount(() => {
    ag = annotationGroup(groupAnnotations);
  });

  function showGroup(checked) {
    if (checked) {
      ag.show();
    } else {
      ag.hide();
    }
  }

  let strokeWidth = 1;
  let iterations = 1;
  let useActions = true;
</script>

<style>
  main {
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
  }

  h1 {
    text-transform: uppercase;
    font-size: 2em;
    font-weight: 100;
  }

  section {
    margin-top: 2rem;
    margin-left: auto;
    margin-right: auto;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }

  label {
    display: inline;
  }
</style>

<main>

  <h1>Single Annotations</h1>

  <p>
    <input id="show-simple" type="checkbox" bind:checked={showSimple} />
    <label style="display:inline" for="show-simple">Show Annotations</label>
  </p>

  <div>
    <div>
      <input
        id="use-components"
        type="radio"
        bind:group={useActions}
        value={false} />
      <label style="display:inline" for="use-components">
        Use Wrapper Component
      </label>
    </div>
    <div>
      <input
        id="use-actions"
        type="radio"
        bind:group={useActions}
        value={true} />
      <label style="display:inline" for="use-actions">Use Svelte Actions</label>
    </div>
  </div>

  <p>
    <span>Stroke Width: {strokeWidth}</span>
    <button
      style="margin-left:2rem;width:2rem"
      on:click={() => (strokeWidth = Math.max(1, strokeWidth - 1))}>
      -
    </button>
    <button style="width:2rem" on:click={() => (strokeWidth = strokeWidth + 1)}>
      +
    </button>
  </p>

  <p>
    <span>Iterations: {iterations}</span>
    <button
      style="margin-left:2rem;width:2rem"
      on:click={() => (iterations = Math.max(1, iterations - 1))}>
      -
    </button>
    <button style="width:2rem" on:click={() => (iterations = iterations + 1)}>
      +
    </button>
  </p>

  {#each types as { type, color, extra }, index}
    <section>
      {#if useActions}
        <span
          use:annotate={{ visible: showSimple, strokeWidth, iterations, color, type, ...(extra || {}) }}>
          {type}
        </span>
      {:else}
        <Annotation
          visible={showSimple}
          {strokeWidth}
          {iterations}
          {color}
          {type}
          {...extra || {}}>
          {type}
        </Annotation>
      {/if}
    </section>
  {/each}

  <section style="max-width:10ch">
    {#if useActions}
      <span
        use:annotate={{ visible: showSimple, multiline: true, padding: 1, iterations, strokeWidth, color: 'lightgreen', type: 'highlight' }}>
        This is a long wrapping multiline bit of text
      </span>
    {:else}
      <Annotation
        visible={showSimple}
        multiline={true}
        {strokeWidth}
        {iterations}
        padding={1}
        color="lightgreen"
        type="highlight">
        This is a long wrapping multiline bit of text.
      </Annotation>
    {/if}
  </section>

  <h1>Annotation Group</h1>

  <span>
    <input
      id="show-group"
      type="checkbox"
      on:change={(e) => showGroup(e.target.checked)} />
    <label for="show-group">Show Annotation Group</label>
  </span>

  {#each types as { type, color }, index}
    <section>
      <Annotation
        bind:this={groupAnnotations[index]}
        {strokeWidth}
        {iterations}
        {color}
        {type}>
        {type}
      </Annotation>
    </section>
  {/each}

</main>
