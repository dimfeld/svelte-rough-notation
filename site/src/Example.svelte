<script>
  import Annotation from "svelte-rough-notation";

  let { text, type, show, ...rest } = $props();
</script>

<Annotation visible={show} {...rest} {type}>{text}</Annotation>
