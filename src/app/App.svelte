<script lang="ts">
  import Contact from '../lib/Contact.svelte';
  import Cursor from '../lib/Cursor.svelte';
  import email from '../assets/icons/email.svg';
  import github from '../assets/icons/github.svg';
  import linkedin from '../assets/icons/linkedin.svg';
  import resume from '../assets/icons/resume.svg';

  const Contacts = [
    {
      id: 'github',
      href: 'https://github.com/navn-r',
      icon: github,
    },
    {
      id: 'linkedin',
      href: 'https://linkedin.com/in/navn-r',
      icon: linkedin,
    },
    {
      id: 'email',
      href: 'mailto:me@navn.me',
      icon: email,
    },
    {
      id: 'resume',
      href: './resume',
      icon: resume,
    },
  ];
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
