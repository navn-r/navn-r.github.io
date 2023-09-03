<script lang="ts">
  import { fade } from 'svelte/transition';

  import Contact from './components/Contact.svelte';
  import Cursor from './components/Cursor.svelte';
</script>

<Cursor />

<main>
  <section in:fade={{ delay: 200, duration: 300 }}>
    <h1>A Software Engineer, studying <span>Computer Science.</span></h1>
    <p>
      Hey, my name is <strong>Navinn</strong> (/nævɪn/). I am in my final year
      <s>studying</s>
      surviving at the
      <a
        href="https://www.utoronto.ca/"
        rel="noopener noreferrer nofollow"
        target="_blank">University of Toronto</a
      >
      in Canada. I have over 20 months of work experience, with major contributions
      in startup, enterprise and open source development teams.
    </p>
    <p>
      For Fall 2023, I'm currently working as a Software Engineer Intern at <a
        href="https://www.americanexpress.com/en-ca/"
        rel="noopener noreferrer nofollow"
        target="_blank">American Express</a
      >
      and a Teaching Assistant for
      <a
        href="https://utsc.calendar.utoronto.ca/course/cscD01h3"
        rel="noopener noreferrer nofollow"
        target="_blank">CSCD01: Engineering Large Software Systems</a
      >. I'm also actively seeking internship and new-grad positions for 2024.
      I've had the pleasure to work at
      <a
        href="https://hubspot.com"
        rel="noopener noreferrer nofollow"
        target="_blank">HubSpot</a
      >,
      <a
        href="https://www.rbc.com"
        target="_blank"
        rel="noopener noreferrer nofollow">RBC</a
      >,
      <a
        href="https://mlh.io"
        rel="noopener noreferrer nofollow"
        target="_blank">MLH</a
      >,
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
      border: 1px solid rgba($invert, 0.5);
    }
  }

  h1 {
    font-family: $serif;
    letter-spacing: -0.02rem;
    font-weight: 400;
    font-size: clamp(2.5rem, 10vw, 4rem);
    margin-bottom: 2.25rem;
    max-width: 24ch;

    span {
      font-family: $funky;
      font-size: clamp(2.5rem, 10vw, 4.5rem);

      background: linear-gradient(45deg, $accent 50%, $invert 70%);
      background-size: 200% 200%;
      background-clip: text;
      -webkit-background-clip: text;
      color: transparent;
      animation: gradient 3s linear alternate infinite;
    }
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

      &:hover {
        background-size: 0 1px;
      }
    }

    strong {
      color: $primary;
    }
  }
</style>
