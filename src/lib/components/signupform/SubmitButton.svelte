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
    authResponse,
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
    console.log("submit button clicked");
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

  authResponse.subscribe((response) => {
    if (response.success) {
      currentState = ButtonStates.SUCCESS;
      toast.success("Sign-up successful.", {
        description: "You'll be redirected shortly.",
      });
      resetToNeutralState();
    } else {
      currentState = ButtonStates.ERROR;
      toast.error("Sign-up failed.", {
        description: response.msg ? response.msg : "Something went wrong.",
      });
      resetToNeutralState();
    }
  });
</script>

<Button
  size="icon"
  on:click={onSumitButtonClick}
  class="rounded-full"
  type="submit"
>
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
