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
  @use "./styles" as *;

  #app {
    opacity: 0;
    visibility: hidden;
    background-color: var(--bg);

    &,
    &:before,
    &:after {
      @include tr(background-color);
    }
  }

  header {
    display: grid;
    align-items: center;
    justify-content: right;
    width: calc(100% - min(10%, 9rem));
    height: calc(3 * #{s()});
    padding-top: s();
    margin: 0 auto;
  }

  main {
    display: grid;
  }

  section {
    display: grid;
    align-items: center;
    min-height: 100vh;
    width: calc(100% - min(20%, 18rem));
    margin: 0 auto;
  }
</style>
