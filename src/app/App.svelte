<script lang="ts">
  import Contact from '@components/Contact.svelte';
  import Cursor from '@components/Cursor.svelte';
  import { Contacts } from '../lib/Data';
</script>

<Cursor />

<main>
  <h1>Under Construction.</h1>
  <p>I just want to sit on the beach and eat hot dogs. That's all I've ever wanted.</p>
  <div>
    {#each Contacts as contact}
      <Contact {contact} />
    {/each}
  </div>
</main>

<style lang="scss" global>
  @import './App.scss';
</style>
