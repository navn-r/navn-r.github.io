<script lang="ts">
  import { fade } from 'svelte/transition';

  import Contact from './components/Contact.svelte';
  import Cursor from './components/Cursor.svelte';
</script>

<Cursor />

<main>
  <section in:fade={{ delay: 200, duration: 300 }}>
    <h1>A Software Engineer, studying Computer Science.</h1>
    <p>
      Hey, my name is <strong>Navinn</strong> (/nævɪn/). I am in my third year
      <s>studying</s>
      surviving at the
      <a
        href="https://www.utoronto.ca/"
        rel="noopener noreferrer nofollow"
        target="_blank">University of Toronto</a
      >
      in Canada. I have over 12 months of total work experience, with major contributions
      in startup, enterprise and open source Agile Scrums.
    </p>
    <p>
      For Winter 2022, I'm currently working as a Full Stack Developer at
      <a
        href="https://www.rbc.com"
        target="_blank"
        rel="noopener noreferrer nofollow">RBC</a
      >
      and a Pod Leader at the
      <a
        href="https://fellowship.mlh.io"
        rel="noopener noreferrer nofollow"
        target="_blank">MLH Fellowship</a
      >
      . I've also had the pleasure to work at
      <a
        href="https://www.caseware.com/ca"
        rel="noopener noreferrer nofollow"
        target="_blank">CaseWare</a
      >
      and
      <a
        href="https://www.halo.science/"
        rel="noopener noreferrer nofollow"
        target="_blank">Halo Science</a
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
  @use './styles' as *;

  *::selection {
    background-color: rgba($primary, 0.25);
  }

  main {
    width: 100%;
    height: 100%;
    max-width: 1600px;

    margin: 0 auto;

    display: grid;
    place-items: center;

    font-family: $sans-serif;
    font-size: 1.25rem;
    color: $primary;

    @media (max-width: 1000px) {
      place-items: end center;

      @media (max-height: 800px) {
        align-items: start;
      }
    }

    @media (max-width: 500px) {
      align-items: start;
    }
  }

  section {
    min-height: 500px;
    padding: 5rem;

    @media (max-width: 1000px) {
      padding: 2.5rem;
    }
  }

  h1 {
    font-family: $serif;
    letter-spacing: -0.02rem;
    font-weight: 400;
    font-size: clamp(2.5rem, 10vw, 5rem);
    margin-bottom: 2.25rem;
    max-width: 23ch;
  }

  p {
    max-width: 60ch;
    margin: 1rem 0;
    line-height: 1.5;
    color: $secondary;

    & a {
      background-image: linear-gradient(90deg, $primary, $primary);
      background-size: 100% 1.5px;
      background-repeat: no-repeat;
      background-position: left bottom;
      transition: background-size $ease;

      &:hover {
        background-size: 0 1.5px;
      }
    }

    & strong {
      color: $primary;
    }
  }
</style>
