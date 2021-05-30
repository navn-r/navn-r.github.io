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
  {@html contact.icon}
</a>

<style lang="scss">
  a {
    display: grid;
    place-items: center;
  }
</style>
