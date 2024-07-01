<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import EyeIcon from "lucide-svelte/icons/eye";
  import EyeOffIcon from "lucide-svelte/icons/eye-off";

  import { signupFormController as sfc } from "./state.svelte";

  let isPasswordVisible = $state(false);
</script>

<div class="flex flex-col max-w-sm w-full gap-2.5">
  <div class="grid gap-2.5">
    <Label for="password">Password</Label>
    <div class="relative">
      <Input
        id="password"
        form="signupform"
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Abc@1234"
        bind:value={sfc.password}
        on:input={() => sfc.validatePassword()}
        class={`border ${!sfc.emailExists && sfc.password.length > 0 && !sfc.isPasswordValid ? "border-red-500" : "border-gray-300"}`}
      />
      <Button
        variant="ghost"
        size="icon"
        class="absolute right-0.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
        on:click={() => (isPasswordVisible = !isPasswordVisible)}
        disabled={sfc.password.length === 0}
      >
        {#if isPasswordVisible}
          <EyeOffIcon class="w-4 h-4" />
        {:else}
          <EyeIcon class="w-4 h-4" />
        {/if}
      </Button>
    </div>
    <!-- {#if warningMsgPassword} -->
    <p class="text-sm text-red-500">
      {!sfc.emailExists ? sfc.passwordValidationError : ""}
    </p>
    <!-- {/if} -->
  </div>
  {#if sfc.isEmailValid && !sfc.emailExists}
    <div class="grid gap-2.5">
      <Label for="confirm-password">Confirm password</Label>
      <Input
        id="confirm-password"
        name="confirmPassword"
        type="password"
        placeholder="Abc@1234"
        bind:value={sfc.confirmPassword}
        on:blur={() => sfc.matchPasswords()}
        class="border border-gray-300"
      />
    </div>
    <!-- {#if errorMsgConfirmPassword} -->
    <p class="text-sm text-red-500">
      {sfc.confirmPasswordValidationError}
    </p>
    <!-- {/if} -->
  {/if}
</div>
