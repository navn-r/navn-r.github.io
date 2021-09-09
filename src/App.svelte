<script lang="ts">
  import ThemeSwitcher from '@components/ThemeSwitcher.svelte';
  import Cursor from '@components/Cursor.svelte';
  import Contact from '@components/Contact.svelte';
</script>

<Cursor />

<header>
  <ThemeSwitcher />
</header>

<main>
  <section>
    <h1>Hey, I'm <em>Navinn.</em></h1>
    <p>
      I'm a Software Engineer, now in my third year studying Computer Science
      and Statistics at the
      <a
        href="https://www.utoronto.ca/"
        rel="noopener noreferrer nofollow"
        target="_blank">University of Toronto</a
      >
      in Canada. I've had the pleasure to work at
      <a
        href="https://www.caseware.com/ca"
        rel="noopener noreferrer nofollow"
        target="_blank">CaseWare</a
      >,
      <a
        href="https://www.halo.science/"
        rel="noopener noreferrer nofollow"
        target="_blank">Halo Science</a
      >, and at the
      <a
        href="https://fellowship.mlh.io"
        rel="noopener noreferrer nofollow"
        target="_blank">MLH Fellowship</a
      >.
    </p>
    <p>
      Whether if it's a hackathon, party or a job offer, I'm always looking for
      new opportunities. Want to connect? Reach out below!
    </p>
    <Contact />
  </section>
</main>

<style lang="scss">
  @use "./styles" as *;

  /** Global Styles */

  @keyframes -global-fade {
    100% {
      opacity: 100%;
      visibility: visible;
    }
  }

  :global(*) {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    cursor: none;
  }

  :global(html) {
    font-size: clamp(12px, 1.5vw, 16px);
  }

  :global(body) {
    opacity: 0;
    visibility: hidden;
    background-color: var(--bg);
    &,
    &:before,
    &:after {
      transition: background-color $ease;
    }
  }

  // For Icons.ts
  :global(.icon) {
    color: var(--primary);
    user-select: none;
    width: inherit;
    height: inherit;
    transition: all $ease;
  }

  *::selection {
    background-color: rgba(map-get(map-get($themes, light), secondary), 0.5);
  }

  /** App Styles */

  main {
    display: grid;
    min-height: 100vh;
    max-width: 1600px;
    margin: -6rem auto 0; // Fill screen without absolute header
    padding: 0 min(10%, 7.5rem);

    * {
      transition: color $ease;
    }
  }

  section {
    height: max-content;
    margin: auto 0;
  }

  header {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 3rem;
    height: 6rem;
  }

  h1 {
    font-size: 7.59375rem;
    font-family: $serif;
    color: var(--primary);
    letter-spacing: -0.02rem;

    em {
      color: var(--accent);
    }
  }

  p {
    font-family: $sans-serif;
    color: var(--secondary);
    font-size: 1.5rem;
    line-height: 1.5;
    margin: 1.5rem 0;
    width: min(100%, 60ch);
  }

  a {
    color: currentColor;

    &:focus-visible {
      outline: none;
    }

    &:hover {
      text-decoration: none;
    }
  }
</style>
