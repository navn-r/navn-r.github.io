<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';

  import Voice from './components/Voice.svelte';
  import Contact from './components/Contact.svelte';
  import Cursor from './components/Cursor.svelte';

  let loaded = false;
  onMount(() => (loaded = true));
</script>

<Cursor />

<main>
  {#if loaded}
    <section in:fade={{ delay: 300, duration: 300 }}>
      <h3>Just another...</h3>
      <h1>Software Engineer.</h1>
      <p>Hey, my name is <strong>Navinn</strong> (/nɜvɪn/) <Voice /></p>
      <p>
        I'm a Software Engineer at <a
          href="https://meta.com"
          rel="noopener noreferrer nofollow"
          target="_blank">Meta</a
        > in New York, originally from Toronto, Canada.
      </p>
      <p>
        I graduated with a degree in Computer Science from the
        <a
          href="https://www.utoronto.ca/"
          rel="noopener noreferrer nofollow"
          target="_blank">University of Toronto</a
        >
        in 2024. During my undergrad, I was a Teaching Assistant and had the pleasure
        of doing multiple internships. My course notes are available
        <a href="/notes" rel="noopener noreferrer nofollow" target="_blank"
          >here</a
        >.
      </p>
      <p>
        Whether if it's a hackathon, party or a job offer, I'm always looking
        for new opportunities. Want to connect? Reach out below!
      </p>
      <Contact />
    </section>
  {/if}
</main>

<style lang="scss">
  @use './styles' as *;

  *::selection {
    background-color: rgba($primary, 0.25);
  }

  main {
    height: 100%;
    margin: 0 auto;

    display: grid;
    place-items: center;

    font-family: $sans-serif;
    font-size: clamp(1rem, 3vw, 1.25rem);
    color: $primary;
  }

  section {
    padding: clamp(2rem, 5vw, 5rem);
    @media (min-width: 850px) {
      @include blur;

      border-top: 1px solid rgba($accent, 0.75);
      border-left: 1px solid rgba($accent, 0.75);
      border-bottom: 1px solid rgba($invert, 0.75);
      border-right: 1px solid rgba($invert, 0.75);

      position: relative;
      border-radius: 1rem;
      overflow: hidden;

      &::before,
      &::after {
        content: '';
        position: absolute;
        z-index: -1;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        filter: blur(100px);
      }

      &::before {
        top: -6rem;
        left: -6rem;
        background: $accent;
      }

      &::after {
        bottom: -6rem;
        right: -6rem;
        background: $invert;
      }
    }
  }

  h3 {
    font-family: $serif;
    letter-spacing: -0.02rem;
    font-weight: 400;
    font-size: 2.5rem;
  }

  h1 {
    font-family: $funky;
    font-size: clamp(2.5rem, 10vw, 4.25rem);

    background: linear-gradient(45deg, $accent 40%, $invert 60%);
    background-size: 200% 200%;
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    animation: gradient 3s linear alternate infinite;
  }

  @keyframes gradient {
    0% {
      background-position: 100% 0%;
    }
    100% {
      background-position: 0% 100%;
    }
  }

  p {
    max-width: 60ch;
    margin: 1rem 0;
    line-height: 1.5;
    color: $secondary;

    a {
      background-image: linear-gradient(90deg, $primary, $primary);
      background-size: 100% 1px;
      background-repeat: no-repeat;
      background-position: left bottom;
      transition: background-size $ease;

      @media (hover: hover) {
        &:hover {
          background-size: 0 1px;
        }
      }
    }

    strong {
      color: $primary;
    }
  }
</style>
