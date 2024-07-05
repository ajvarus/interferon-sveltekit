<!-- src/lib/components/vault/PasswordTimeoutCircle.svelte -->

<script lang="ts">
  import { ProgressCircle } from "svelte-progress-circles";

  import { tweened } from "svelte/motion";
  import { cubicOut } from "svelte/easing";

  type DecryptionState = "encrypted" | "decrypting" | "decrypted";

  const totalDuration = 30;

  let {
    isDecrypted = $bindable("encrypted"),
  }: { isDecrypted: DecryptionState } = $props();

  let progress = tweened(0, {
    duration: totalDuration * 1000,
  });

  let secondsLeft = $derived(
    Math.ceil(totalDuration - $progress * totalDuration)
  );

  function startTimer() {
    progress.set(1).then(() => resetTimer());
  }

  function resetTimer() {
    progress.set(0);
    isDecrypted = "encrypted";
  }

  $effect(() => {
    if (isDecrypted === "decrypted") {
      startTimer();
    }
  });
  $effect(() => {
    if (isDecrypted === "encrypted") {
      resetTimer();
    }
  });
</script>

<div class="w-4 h-4">
  <ProgressCircle
    progress={$progress * 100}
    fullness={100}
    fgColor="black"
    bgColor="white"
    text={secondsLeft.toString()}
  />
</div>
