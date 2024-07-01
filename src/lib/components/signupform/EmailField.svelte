<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import Check from "lucide-svelte/icons/check";

  import { signupFormController as sfc } from "./state.svelte";

  let isBlurred = $state(false);

  async function onBlur() {
    isBlurred = true;
    sfc.validateEmail();
    if (sfc.isEmailValid) {
      await sfc.checkIfEmailExists();
    }
  }
</script>

<div class="flex max-w-sm w-full flex-col gap-3">
  <Label for="email-2">Email</Label>
  <div class="relative">
    <Input
      type="email"
      form="signupform"
      id="email-2"
      placeholder="name@example.com"
      name="email"
      bind:value={sfc.email}
      on:blur={async () => await onBlur()}
      on:focus={() => isBlurred == false}
      class={`border ${isBlurred && !sfc.isEmailValid ? "border-red-500" : ""}`}
    />
    {#if sfc.isEmailValid && !sfc.emailExists}
      <Check
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4"
      />
    {/if}
  </div>
  <!-- {#if $email && !$isValidEmail && errorMsg} -->
  <p class="text-sm text-red-500">
    {isBlurred ? sfc.emailValidationError : ""}
  </p>
  <!-- {/if} -->
</div>
