<script lang="ts">
  interface ContactProp {
    id: string;
    icon: string;
    href: string;
  }
  export let contact: ContactProp;
</script>

<a
  href={contact.href}
  title={contact.id}
  rel="noopener noreferrer nofollow"
  target="_blank"
  aria-label={'Link to ' + contact.id}
>
  <img src={contact.icon} alt={contact.id} />
</a>

<style lang="scss">
  @use '../styles/mixins' as *;
  @use '../styles/functions' as *;

  a {
    display: grid;
    place-items: center;
    -moz-user-select: none;
    -webkit-user-select: none;
  }

  img {
    @include set(width height, s(2));
  }
</style>
