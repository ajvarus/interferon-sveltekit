<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  import EyeIcon from "lucide-svelte/icons/eye";
  import EyeOffIcon from "lucide-svelte/icons/eye-off";

  import {
    email,
    password,
    isValidEmail,
    emailExists,
    isPasswordValid,
    isConfirmPasswordValid,
  } from "./stores";

  import { SignUpManager as sm } from "./SignUpManager";

  let confirmPassword = $state("");
  let isPasswordVisible = $state(false);
  let warningMsgPassword = $state("");
  let errorMsgConfirmPassword = $state("");

  function onPasswordInput() {
    $isPasswordValid = sm.validatePassword($password);
    if ($isPasswordValid) {
      warningMsgPassword = "";
    } else {
      warningMsgPassword = "Password is weak.";
    }
  }

  function onConfirmPasswordBlur() {
    $isConfirmPasswordValid = sm.matchPasswords($password, confirmPassword);
    if ($isConfirmPasswordValid) {
      errorMsgConfirmPassword = "";
    } else {
      errorMsgConfirmPassword = "Passwords don't match.";
    }
  }

  function onEyeButtonClick() {
    isPasswordVisible = !isPasswordVisible;
    console.log(!$isPasswordValid);
  }
</script>

<div class="flex flex-col max-w-sm w-full gap-2.5">
  <div class="grid gap-2.5">
    <Label for="password">Password</Label>
    <div class="relative">
      <Input
        id="password"
        name="password"
        type={isPasswordVisible ? "text" : "password"}
        placeholder="abc@1234"
        bind:value={$password}
        on:input={onPasswordInput}
        class={`border ${$password.length > 0 && !$isPasswordValid ? "border-red-500" : "border-gray-300"}`}
      />
      <Button
        variant="ghost"
        size="icon"
        class="absolute right-0.5 top-1/2 transform -translate-y-1/2 cursor-pointer"
        on:click={onEyeButtonClick}
        disabled={$password.length === 0}
      >
        {#if isPasswordVisible}
          <EyeOffIcon class="w-4 h-4" />
        {:else}
          <EyeIcon class="w-4 h-4" />
        {/if}
      </Button>
    </div>
    {#if warningMsgPassword}
      <p class="text-sm text-red-500">{warningMsgPassword}</p>
    {/if}
  </div>
  {#if $email && $isValidEmail && !$emailExists}
    <div class="grid gap-2.5">
      <Label for="confirm-password">Confirm password</Label>
      <Input
        id="confirm-password"
        name="confirmPassword"
        type="password"
        placeholder="abc@1234"
        bind:value={confirmPassword}
        on:blur={onConfirmPasswordBlur}
        class="border border-gray-300"
      />
    </div>
    {#if errorMsgConfirmPassword}
      <p class="text-sm text-red-500">{errorMsgConfirmPassword}</p>
    {/if}
  {/if}
</div>
