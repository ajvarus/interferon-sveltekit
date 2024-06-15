<script>
  import * as Card from "$lib/components/ui/card";

  import EmailField from "$lib/components/signupform/EmailField.svelte";
  import PasswordField from "$lib/components/signupform/PasswordField.svelte";
  import SubmitButton from "$lib/components/signupform/SubmitButton.svelte";
</script>

<Card.Root class="mx-auto max-w-sm">
  <Card.Header>
    <Card.Title class="text-2xl">Sign-in</Card.Title>
    <Card.Description
      >We'll sign you up if you're new or log you in if you aren't.</Card.Description
    >
  </Card.Header>
  <Card.Content>
    <div class="flex flex-col items-center gap-3">
      <EmailField />
      <PasswordField />
      <SubmitButton />
    </div>
  </Card.Content>
</Card.Root>
