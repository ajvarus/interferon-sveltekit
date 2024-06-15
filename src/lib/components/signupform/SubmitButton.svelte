<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { toast } from "svelte-sonner";

  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import Check from "lucide-svelte/icons/check";
  import X from "lucide-svelte/icons/x";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  import {
    isValidEmail,
    isPasswordValid,
    isConfirmPasswordValid,
    emailExists,
    isSubmittable,
  } from "./stores";

  import { SignUpManager as sm } from "./SignUpManager";

  const ButtonStates = {
    NEUTRAL: "neutral",
    LOADING: "loading",
    SUCCESS: "succes",
    ERROR: "error",
  };

  let currentState = $state(ButtonStates.NEUTRAL);

  function resetToNeutralState() {
    setTimeout(() => {
      currentState = ButtonStates.NEUTRAL;
    }, 2000);
  }

  function onSumitButtonClick() {
    $isSubmittable = sm.validateForm(
      $isValidEmail,
      $isPasswordValid,
      $isConfirmPasswordValid,
      $emailExists
    );

    if ($isSubmittable) {
      currentState = ButtonStates.LOADING;
    } else {
      currentState = ButtonStates.ERROR;
      toast.error("Sign-up failed.", {
        description: "Please make sure all fields are valid.",
      });
      resetToNeutralState();
    }
  }
</script>

<Button size="icon" on:click={onSumitButtonClick} class="rounded-full">
  {#if currentState === ButtonStates.LOADING}
    <LoaderCircle class="animate-spin" />
  {:else if currentState === ButtonStates.NEUTRAL}
    <ArrowRight />
  {:else if currentState === ButtonStates.SUCCESS}
    <Check />
  {:else}
    <X />
  {/if}
</Button>
