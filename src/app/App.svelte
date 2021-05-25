<script lang="ts">
  import Contact from '../lib/Contact.svelte';
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

<svelte:head>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    html,
    body {
      margin: 0;
      height: 100%;
    }
    body {
      background: url('src/assets/bg.jpeg');
      display: grid;
      place-items: center;
    }

    @media screen and (max-width: 800px) {
      html {
        font-size: 2vw;
      }

      body {
        place-items: initial;
        align-items: flex-end;
        padding: 2rem;
      }
    }
  </style>
</svelte:head>
<main>
  <h1>Under Construction.</h1>
  <p>I just want to sit on the beach and eat hot dogs. That's all I've ever wanted.</p>
  <div>
    {#each Contacts as contact}
      <Contact {contact} />
    {/each}
  </div>
</main>

<style src="./App.scss"></style>
