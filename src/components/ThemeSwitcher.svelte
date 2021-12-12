<script lang="ts">
  import { onMount } from 'svelte';

  const Themes = [
    {
      id: 0,
      name: 'dark',
      icon: 'fas fa-moon',
    },
    {
      id: 1,
      name: 'light',
      icon: 'fas fa-sun',
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
    theme = Themes.find(
      ({ name }) => name === (target.dataset.theme ?? 'light')
    )!;
  });
</script>

<button
  on:click={changeTheme}
  aria-label="change theme"
  title={`Toggle ${theme.name} mode`}
>
  <i class={theme.icon} />
</button>

<style lang="scss">
  @use '../styles' as *;

  button {
    border: 0;
    outline: none;
    background: white;
    padding: 0.5rem;

    border: 2px $primary solid;
    box-shadow: 0.3rem 0.3rem 0 0 $secondary;

    &:hover i {
      color: $accent;
    }
  }
</style>
