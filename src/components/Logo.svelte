<script lang="ts">
  import { onMount } from 'svelte';
  import { isMobile } from '../lib/Utils';
  import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
  import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';
  import * as THREE from 'three';

  const OBJ_PATH: string = 'logo/logo.obj';
  const MTL_PATH: string = 'logo/logo.mtl';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const light = new THREE.PointLight(0xffffff, 1.4, 1000);
  const mltLoader = new MTLLoader();
  const objLoader = new OBJLoader();

  let el: HTMLCanvasElement;
  let logo: THREE.Group;
  let renderer: THREE.Renderer;

  camera.position.set(0, 0, 10);
  light.position.set(0, 15, 15);
  light.castShadow = true;
  scene.add(light);

  mltLoader.load(MTL_PATH, (mtls) => {
    mtls.preload();
    console.log(`[three] loaded: ${MTL_PATH}`);

    objLoader.setMaterials(mtls);
    objLoader.load(OBJ_PATH, (obj) => {
      logo = obj;

      if (isMobile()) {
        logo.rotation.y -= 0.1;
        logo.rotation.x += 0.05;
      }

      scene.add(logo);
      console.log(`[three] loaded: ${OBJ_PATH}`);
    });
  });

  const animate = () => {
    requestAnimationFrame(animate);
    if (logo) {
      // logo.rotation.x += .0002;
      // logo.rotation.y -= .0001;
      // logo.rotation.z -= .01;
    }
    renderer.render(scene, camera);
  };

  const resize = () => {
    if (el) {
      const width = window.innerWidth * 0.5;
      const height = window.innerHeight * 0.5;
      el.style.width = `${width}px`;
      el.style.height = `${height}px`;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    }
  };

  window.addEventListener('resize', resize);
  document.addEventListener('mousemove', ({ clientX: x, clientY: y }: MouseEvent) => {
    if (!isMobile() && logo) {
      // logo.rotation.x = (x / window.innerWidth);
      logo.rotation.y = (x / window.innerHeight) * 0.125;
      logo.rotation.x = (y / window.innerWidth) * 0.125;
    }
  });

  onMount(() => {
    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: el, alpha: true });
    resize();
    animate();
  });
</script>

<canvas bind:this={el} />

<style lang="scss">
  canvas {
    width: 100%;
    height: 50%;
  }
</style>
