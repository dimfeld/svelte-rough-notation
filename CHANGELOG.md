# 0.2.0

- **Breaking:** Migrate to Svelte 5 runes mode. Requires Svelte 5+.
- Replace `export let` props with `$props()` and `$bindable()` runes
- Replace `<slot />` with `{@render children()}` snippets
- Replace `$:` reactive statements with `$effect()`
- Remove `<svelte:options accessors={true} />`
- Replace `$$restProps` with `...rest` from `$props()` destructuring
- **Breaking:** Annotation groups now use `bind:annotation` instead of `bind:this` to pass raw annotation objects to `annotationGroup()`
- Update demo site to Svelte 5 syntax (`$state`, `onclick`, `mount()`)
- Update site build dependencies (Rollup 4, rollup-plugin-svelte 7.2, etc.)
- Add `peerDependencies` for `svelte ^5.0.0`

# 0.1.5

- Add exports field to package.json and perform other cleanup

# 0.1.4

- Support new `bracket` type and `brackets` argument
- Update to `rough-notation ^0.4.0`

# 0.1.3

- Add a Svelte action version that can be used with Svelte's `use:` syntax.

# 0.1.2

- Support iterations and multiline properties when `rough-notation` 0.3.3 is used.

# 0.1.1

Accidental publish. No changes.

# 0.1.0

- Update to `rough-notation ^0.3.0`
- Support changing configuration values after the component is created
- No longer need to pass the component's `annotation` property when making an annotation group. Passing just the component instance will work. See README for an example.
