<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";

  import ArrowRight from "lucide-svelte/icons/arrow-right";
  import Check from "lucide-svelte/icons/check";
  import X from "lucide-svelte/icons/x";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  import { signupFormController as sfc } from "./state.svelte";
  import { FormStates as FormState } from "./types";
</script>

<Button
  size="icon"
  class="rounded-full"
  type="submit"
  form="signupform"
  id="signupform-submit-button"
>
  {#if sfc.formState === FormState.LOADING}
    <LoaderCircle class="animate-spin" />
  {:else if sfc.formState === FormState.ERROR}
    <X color="red" />
  {:else if sfc.formState === FormState.SUCCESS}
    <Check color="green" />
  {:else}
    <ArrowRight />
  {/if}
</Button>
