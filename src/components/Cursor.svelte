<script lang="ts">
  import { onMount } from 'svelte';

  let inner: HTMLElement;
  let outer: HTMLElement;

  const MOBILE_REGEX =
    /mobile|android|webos|iphone|ipad|ipod|blackberry|bb|playbook|iemobile|windows phone|kindle|silk|opera mini/i;

  onMount(() => {
    /** Remove custom cursor if on mobile */
    if (navigator.userAgent.toLowerCase().match(MOBILE_REGEX)) {
      setDimensions(inner);
      setDimensions(outer);
      return;
    }

    /** Setup custom cursor */
    document.addEventListener('mouseup', () => setDimensions(inner, 10));
    document.addEventListener('mousedown', () => setDimensions(inner, 25));
    document.addEventListener('mousemove', ({ clientX: x, clientY: y }: MouseEvent) => {
      setPosition(inner, x, y);
      setPosition(outer, x, y);
    });

    /** Grow inner on hover links */
    Array.from(document.querySelectorAll('a, button')).forEach((e) => {
      e.addEventListener('mouseover', () => setDimensions(inner, 25));
      e.addEventListener('mouseleave', () => setDimensions(inner, 10));
    });
  });

  const setPosition = (e: HTMLElement, x: number, y: number) => {
    if (!!e) {
      e.style.top = `${y}px`;
      e.style.left = `${x}px`;
    }
  };

  const setDimensions = (e: HTMLElement, size: number = 0) => {
    if (!!e) {
      e.style.height = `${size}px`;
      e.style.width = `${size}px`;
    }
  };
</script>

<div class="inner" bind:this={inner} />
<div class="outer" bind:this={outer} />

<style lang="scss">
  @use '../styles/utils' as *;

  div {
    @include set(left width height, 10px);
    position: fixed;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
  }

  .inner {
    background: #ffffff;
    transition: width 0.5s, height 0.5s;
  }

  .outer {
    @include set(width height, 25px);
    border: 1px solid #ffffff;
  }
</style>
