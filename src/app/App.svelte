<script lang="ts">
  import ThemeSwitcher from '@components/ThemeSwitcher.svelte';
  import Contact from '@components/Contact.svelte';
  import Cursor from '@components/Cursor.svelte';
  import { Contacts } from '../lib/Data';
</script>

<Cursor />

<main>
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
        {#each Contacts as contact}
          <Contact {contact} />
        {/each}
        <ThemeSwitcher />
      </div>
      <img
        width="341px"
        height="53px"
        style="width: 21.3125rem !important: height: 3.3125rem !important;"
        loading="lazy"
        src="/underconstruction.gif"
        alt="under construction sign"
      />
    </div>
  </section>
</main>

<style lang="scss" global>
  @import './App.scss';
</style>
