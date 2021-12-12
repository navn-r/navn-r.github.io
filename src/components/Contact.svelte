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
  <img src="/computer.gif" alt="computer" />
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
    grid-template-columns: repeat(6, 1fr);
  }

  img {
    width: 3.375rem;
    height: 3.375rem;
    user-select: none;
    transform: scale(1.25) rotate(11.25deg);

    // prevents inversion
    :global(html[data-theme='dark']) & {
      mix-blend-mode: difference;
    }
  }

  a {
    display: grid;
    place-items: center;
    width: 2.25rem;
    height: 2.25rem;

    &:hover i {
      color: $accent;
    }
  }
</style>
