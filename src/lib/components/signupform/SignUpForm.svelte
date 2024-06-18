<script lang="ts">
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";

  import * as Card from "$lib/components/ui/card";

  import EmailField from "$lib/components/signupform/EmailField.svelte";
  import PasswordField from "$lib/components/signupform/PasswordField.svelte";
  import SubmitButton from "$lib/components/signupform/SubmitButton.svelte";

  let { submitForm } = $props<{ submitForm: SubmitFunction }>();
</script>

<Card.Root class="mx-auto max-w-sm">
  <Card.Header>
    <Card.Title class="text-2xl">Sign-in</Card.Title>
    <Card.Description
      >We'll sign you up if you're new or log you in if you aren't.</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <form
      name="signupform"
      id="signupform"
      method="POST"
      action="/signin"
      use:enhance={submitForm}
      class="flex flex-col items-center gap-3"
    >
      <EmailField />
      <PasswordField />
      <SubmitButton />
    </form>
  </Card.Content>
</Card.Root>
