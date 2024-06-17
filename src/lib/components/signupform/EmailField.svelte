<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import Check from "lucide-svelte/icons/check";

  import { Validator as v } from "./validator";
  import { email, isValidEmail, emailExists } from "./stores";

  let errorMsg = $state("");

  let hasBlurred = $state(false);

  async function onBlur() {
    hasBlurred = true;
    let result = v.validateEmail($email);
    $isValidEmail = result.isValid;
    errorMsg = result.isValid ? "" : String(result.error);
    if ($isValidEmail) {
      emailExists.set(await v.checkIfEmailExists($email));
    }
  }

  const onFocus = () => {
    hasBlurred = false;
    errorMsg = "";
  };
</script>

<div class="flex max-w-sm w-full flex-col gap-3">
  <Label for="email-2">Email</Label>
  <div class="relative">
    <Input
      type="email"
      id="email-2"
      placeholder="name@example.com"
      name="email"
      bind:value={$email}
      on:blur={onBlur}
      on:focus={onFocus}
      class={`border ${$email && hasBlurred && !$isValidEmail ? "border-red-500" : ""}`}
    />
    {#if $email && $isValidEmail && !$emailExists}
      <Check
        class="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-500 w-4 h-4"
      />
    {/if}
  </div>
  {#if $email && !$isValidEmail && errorMsg}
    <p class="text-sm text-red-500">{errorMsg}</p>
  {/if}
</div>
