<script lang="ts">
  import { onMount } from 'svelte';

  let inner: HTMLElement;
  let outer: HTMLElement;

  const MOBILE_REGEX =
    /mobile|android|webos|iphone|ipad|ipod|blackberry|bb|playbook|iemobile|windows phone|kindle|silk|opera mini/i;

  onMount(() => {
    /** Remove custom cursor if on mobile */
    if (
      navigator.userAgent.toLowerCase().match(MOBILE_REGEX) ||
      window.matchMedia('(hover: none)').matches
    ) {
      inner.remove();
      outer.remove();
      return;
    }

    /** Setup custom cursor */
    document.documentElement.style.setProperty('--cursor', 'none');
    document.addEventListener('mouseup', () => setDimensions(inner, 10));
    document.addEventListener('mousedown', () => setDimensions(inner, 25));
    document.addEventListener(
      'mousemove',
      ({ clientX: x, clientY: y }: MouseEvent) => {
        setPosition(inner, x, y);
        setPosition(outer, x, y);
      }
    );

    /** Grow inner on hover links */
    Array.from(document.querySelectorAll('a, i, button')).forEach((e) => {
      e.addEventListener('mouseover', () => setDimensions(inner, 25));
      e.addEventListener('mouseleave', () => setDimensions(inner, 10));
    });
  });

  const setPosition = (e: HTMLElement, x: number, y: number) => {
    if (e?.style) {
      e.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    }
  };

  const setDimensions = (e: HTMLElement, size: number = 0) => {
    if (e?.style) {
      e.style.height = `${size}px`;
      e.style.width = `${size}px`;
    }
  };
</script>

<div class="inner" bind:this={inner} />
<div class="outer" bind:this={outer} />

<style lang="scss">
  div {
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
    border-radius: 50%;
    pointer-events: none;
    z-index: 1000;
  }

  .inner {
    width: 10px;
    height: 10px;
    background: #ffffff;
    transition:
      width 0.3s,
      height 0.3s;
  }

  .outer {
    width: 25px;
    height: 25px;
    border: 1px solid #ffffff;
    transition: all 0.1s;
  }
</style>
