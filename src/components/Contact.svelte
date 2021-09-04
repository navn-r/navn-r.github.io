<script lang="ts">
  import ICONS from '../assets/Icons';

  const Contacts = [
    {
      id: 'GitHub: navn-r',
      href: 'https://github.com/navn-r',
      icon: ICONS.github,
    },
    {
      id: 'LinkedIn: in/navn-r',
      href: 'https://linkedin.com/in/navn-r',
      icon: ICONS.linkedin,
    },
    {
      id: 'Email: me@navn.me',
      href: 'mailto:me@navn.me',
      icon: ICONS.email,
    },
    {
      id: 'Resume: html/pdf',
      href: './resume',
      icon: ICONS.resume,
    },
  ];
</script>

<div>
  <img loading="lazy" src="/computer.gif" alt="computer" />
  {#each Contacts as contact}
    <a
      href={contact.href}
      title={contact.id}
      rel="noopener noreferrer nofollow"
      target="_blank"
      aria-label={'Link to ' + contact.id}
    >
      {@html contact.icon}
    </a>
  {/each}
</div>

<style lang="scss">
  @use '../styles' as *;
  div {
    column-gap: 2.25rem;
    margin: 2.25rem 0;
    display: grid;
    width: min-content;
    align-items: center;
    grid-template-columns: repeat(5, 1fr);
  }

  img {
    width: 3.375rem;
    height: 3.375rem;
    user-select: none;
    transform: scale(1.25) rotate(11.25deg);
    z-index: -1; // Fixes mouseover
  }

  a {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;
  }
</style>
