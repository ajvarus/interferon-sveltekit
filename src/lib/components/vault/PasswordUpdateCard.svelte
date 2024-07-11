<!-- src/lib/components/vault/PasswordUpdateCard.svelte-->

<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import { Button } from "$lib/components/ui/button/index";
  import PasswordNameCombobox from "./PasswordNameCombobox.svelte";

  import type { Password, PasswordEntry } from "./types.svelte";

  import { enhance } from "$app/forms";

  import {
    addPasswordsController as apc,
    updatePasswordsController as upc,
  } from "./state.svelte";
  import { toast } from "svelte-sonner";

  let {
    password,
  }: {
    password: Password;
  } = $props();

  const id = password.id;
  let updatedPassword: PasswordEntry = $state({
    name: password.passwordName,
    username: password.username,
    password: password.decryptedPassword,
  });
</script>

<form
  action="?/update"
  method="POST"
  id={`updatepasswords[${id}]`}
  use:enhance={({ cancel }) => {
    let validationResult = upc.validatePassword(updatedPassword);

    if (
      upc.arePasswordEntriesEqual(updatedPassword, {
        name: password.passwordName,
        username: password.username,
        password: password.decryptedPassword,
      })
    ) {
      cancel();
      toast.error("No changes made.");
      return;
    } else if (validationResult.valid === false) {
      cancel();
      updatedPassword.errors = validationResult.errors;
      toast.error("Invalid password.");
      return;
    } else if (upc.isDuplicatePassword(updatedPassword, apc)) {
      cancel();
      toast.error("Duplicate password", {
        description:
          "A password with the same name and username already exists.",
        duration: 7000,
      });
      return;
    }
    return async ({ update }) => {
      await update({ reset: false });
    };
  }}
>
  <div class="grid gap-2">
    <input
      form={`updatepasswords[${id}]`}
      type="hidden"
      name="id"
      value={password.id}
    />
    <PasswordNameCombobox bind:passwordName={updatedPassword.name} index={0} />
    <Input
      type="hidden"
      form={`updatepasswords[${id}]`}
      name={`updatedPasswords[${id}].name`}
      value={updatedPassword.name}
    />
    <p class="text-xs text-red-500">
      {updatedPassword.errors?.name}
    </p>
    <Card.Root class="pt-4">
      <Card.Content class="grid gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="username">Username/email</Label>
          <Input
            id="username"
            type="text"
            form={`updatepasswords[${id}]`}
            name={`updatedPasswords[${id}].username`}
            bind:value={updatedPassword.username}
          />
          <p class="text-xs text-red-500">
            {updatedPassword.errors?.username}
          </p>
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="text"
            form={`updatepasswords[${id}]`}
            name={`updatedPasswords[${id}].password`}
            bind:value={updatedPassword.password}
          />
          <p class="text-xs text-red-500">
            {updatedPassword.errors?.password}
          </p>
        </div>
      </Card.Content>
      <Card.Footer>
        <Button type="submit" form={`updatepasswords[${id}]`} class="w-full"
          >Update</Button
        >
      </Card.Footer>
    </Card.Root>
  </div>
</form>
