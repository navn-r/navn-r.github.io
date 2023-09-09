<script lang="ts">
  const Contacts = [
    {
      id: 'GitHub: navn-r',
      href: 'https://github.com/navn-r',
      icon: 'fab fa-github',
    },
    {
      id: 'LinkedIn: in/navn-r',
      href: 'https://linkedin.com/in/navn-r',
      icon: 'fab fa-linkedin',
    },
    {
      id: 'Email: me@navn.me',
      href: 'mailto:me@navn.me',
      icon: 'fas fa-paper-plane',
    },
    {
      id: 'Resume: html/pdf',
      href: './resume',
      icon: 'fas fa-file-pdf',
    },
  ];
</script>

<div>
  <img src="computer.gif" alt="Computer" id="computer" />
  {#each Contacts as contact}
    <a
      href={contact.href}
      title={contact.id}
      rel="noopener noreferrer nofollow"
      target="_blank"
      aria-label={'Link to ' + contact.id}
    >
      <i class={contact.icon} />
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

    @media (max-width: 500px) {
      column-gap: 1.5rem;
    }
  }

  #computer {
    width: 3.5rem;
    transform: rotate(-11.25deg);
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  a {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;

    @media (hover: hover) {
      &:hover i {
        color: $accent;
      }
    }
  }
</style>
