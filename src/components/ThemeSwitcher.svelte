<script lang="ts">
  import ICONS from '../assets/Icons';
  import { onMount } from 'svelte';

  const Themes = [
    {
      id: 0,
      name: 'dark',
      icon: ICONS.moon,
    },
    {
      id: 1,
      name: 'light',
      icon: ICONS.sun,
    },
  ];

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

<button on:click={changeTheme} aria-label="change theme">
  {@html theme.icon}
</button>

<style lang="scss">
  button {
    border: 0;
    outline: none;
    background: none;
    height: 2.25rem;
    width: 2.25rem;
  }
</style>
