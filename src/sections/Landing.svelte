<script lang="ts">
  import Contact from '@components/Contact.svelte';
  import { Contacts } from '../lib/Data';
</script>

<section>
  <div>
    <h1>Hey, I'm <em>Navinn.</em></h1>
    <p>
      I'm a Software Engineer, now in my third year studying Computer Science and Statistics at the
      <a href="https://www.utoronto.ca/" rel="noopener noreferrer nofollow" target="_blank">University of Toronto</a>
      in Canada. Currently, I'm working as a
      <a href="https://www.halo.science/" rel="noopener noreferrer nofollow" target="_blank"
        >Full Stack Engineer at Halo Science</a
      >
      for my Summer 2021 Internship.
    </p>
    <div class="contacts">
      <img loading="lazy" src="/underconstruction.gif" alt="under construction sign" />
      {#each Contacts as contact}
        <Contact {contact} />
      {/each}
    </div>
  </div>
</section>

<style lang="scss">
  @use '../styles/functions' as *;

  section {
    min-height: calc(100vh - 2 * 3 * #{s()});
    margin-bottom: calc(3 * #{s()});
  }

  .contacts {
    column-gap: s(2);
    margin: s(2) 0;
    display: grid;
    width: min-content;
    grid-template-columns: repeat(5, 1fr);

    img {
      height: s(3);
    }
  }
</style>
