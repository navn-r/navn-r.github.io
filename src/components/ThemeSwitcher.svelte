<script lang="ts">
  import { onMount } from 'svelte';
  import { Themes } from '../lib/Data';

  let theme = Themes[0];
  const target: HTMLElement = document.documentElement;

  const changeTheme = () => {
    theme = Themes[(theme.id + 1) % Themes.length];
    target.dataset.theme = theme.name;
    window.localStorage.setItem('theme', theme.name);
  };

  onMount(() => {
    theme = Themes.find(({ name }) => name === target.dataset.theme!)!;
  });
</script>

<button on:click={changeTheme}>
  {@html theme.icon}
</button>

<style lang="scss">
  button {
    border: 0;
    outline: none;
    background: none;
  }
</style>
