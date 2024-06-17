<script lang="ts">
  import SignUpForm from "$lib/components/signupform/SignUpForm.svelte";

  import { signInRequest } from "./api";
  import { goto } from "$app/navigation";

  import {
    isSubmittable,
    email,
    password,
    authResponse,
  } from "$lib/components/signupform/stores";

  async function submitForm(email: string, password: string) {
    const response = await signInRequest(email, password);
    if (response.success) {
      setTimeout(async () => await goto("/dashboard"), 3000);
    }
    return response;
  }

  isSubmittable.subscribe(async (value) => {
    if (value) {
      $authResponse = await submitForm($email, $password);
    }
  });
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <SignUpForm />
</div>
