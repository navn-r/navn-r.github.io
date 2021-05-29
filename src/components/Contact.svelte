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
  <img class="icon" loading="lazy" src={contact.icon} alt={contact.id} />
</a>

<style lang="scss">
  a {
    display: grid;
    place-items: center;
  }
</style>
