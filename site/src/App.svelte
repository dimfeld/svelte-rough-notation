<script>
  import Annotation from "svelte-rough-notation";
  import { annotationGroup } from "rough-notation";
  import { onMount } from "svelte";

  const types = [
    { type: "underline", color: "red" },
    { type: "box", color: "blue" },
    { type: "circle", color: "green" },
    { type: "highlight", color: "yellow" },
    { type: "strike-through", color: "black" },
    { type: "crossed-off", color: "rebeccapurple" },
  ];

  let showSimple = false;

  let ag;
  let simpleAnnotations = [];
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
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>

  <h1>Single Annotations</h1>

  <p>
    <input id="show-simple" type="checkbox" bind:checked={showSimple} />
    <label style="display:inline" for="show-simple">Show Annotations</label>
  </p>

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

  {#each types as { type, color }, index}
    <section>
      <Annotation
        bind:this={simpleAnnotations[index]}
        visible={showSimple}
        {strokeWidth}
        {iterations}
        {color}
        {type}>
        {type}
      </Annotation>
    </section>
  {/each}

  <section style="width:min-content;margin-left:auto;margin-right:auto">
    <Annotation
      bind:this={simpleAnnotations.multiline}
      visible={showSimple}
      {strokeWidth}
      {iterations}
      color="red"
      type="box">
      <p>This is some</p>
      <p>Multiline text</p>

    </Annotation>
  </section>

  <h1>Annotation Group</h1>

  <span>
    <input
      id="show-group"
      type="checkbox"
      on:change={(e) => showGroup(e.target.checked)} />
    <label style="display:inline" for="show-group">Show Annotation Group</label>
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
