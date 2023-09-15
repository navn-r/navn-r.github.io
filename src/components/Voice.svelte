<script lang="ts">
  let audio: HTMLAudioElement;
  let isPlaying = false;

  /**
   * @see http://ipa-reader.xyz/?text=n%C3%A6v%C9%AAn
   */
  const fetchAudio = async () => {
    const IPA_READER_API_URL =
      'https://iawll6of90.execute-api.us-east-1.amazonaws.com/production';

    const payload = {
      text: 'nævɪn',
      voice: 'Brian',
    };

    const voice = await fetch(IPA_READER_API_URL, {
      method: 'POST',
      body: JSON.stringify(payload),
    }).then((res) => res.json());

    return 'data:audio/mp3;base64,' + voice;
  };

  const onPlay = async () => {
    if (!audio || isPlaying) return;

    isPlaying = true;
    audio.src ||= await fetchAudio();
    await audio.play();
    setTimeout(() => (isPlaying = false), 300);
  };
</script>

<button on:click={onPlay} aria-label="Play Voice">
  <i class="fas fa-volume-up" class:playing={isPlaying} />
</button>
<audio bind:this={audio} />

<style lang="scss">
  @use '../styles' as *;

  button {
    background: none;
    border: none;
  }
  

  i {
    font-size: 1.25rem;
    transform: translateY(0.025rem);

    @media (hover: hover) {
      &:hover {
        color: $accent;
      }
    }
  }

  .playing {
    animation: teeter 300ms linear alternate;
  }

  @keyframes teeter {
    0% {
      transform: translateY(0.025rem) rotate(0deg);
    }
    25% {
      transform: translateY(0.025rem) rotate(11.25deg);
    }
    50% {
      transform: translateY(0.025rem) rotate(0deg);
    }
    75% {
      transform: translateY(0.025rem) rotate(-11.25deg);
    }
    100% {
      transform: translateY(0.025rem) rotate(0deg);
    }
  }
</style>
