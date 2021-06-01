<script lang="ts">
  /** Sections */
  import Landing from '@sections/Landing.svelte';

  /** Components */
  import ThemeSwitcher from '@components/ThemeSwitcher.svelte';
  import Cursor from '@components/Cursor.svelte';
</script>

<Cursor />

<header>
  <ThemeSwitcher />
</header>

<main>
  <Landing />
</main>

<style lang="scss" global>
  @import './App.scss';
</style>
