<script>
  import Annotation from "svelte-rough-notation";

  export let text;
  export let type;
  export let show;
</script>

<Annotation visible={show} {...$$restProps} {type}>{text}</Annotation>
