<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import logo from '../assets/svelte.png';
  import Counter from '../lib/Counter.svelte';

  let visible: boolean = false;

  onMount(() => (visible = true));
</script>

<main>
  {#if visible}
    <div transition:fade={{ duration: 1000 }}>
      <img src={logo} alt="Svelte Logo" />
      <h1>Hi, I'm Navinn.</h1>
      <Counter />
      <p>
        Visit <a href="https://svelte.dev">svelte.dev</a> to learn how to build Svelte apps.
      </p>
      <p>
        Check out <a href="https://github.com/sveltejs/kit#readme">SvelteKit</a> for the officially supported framework,
        also powered by Vite!
      </p>
    </div>
  {/if}
</main>

<style src="./App.scss"></style>
