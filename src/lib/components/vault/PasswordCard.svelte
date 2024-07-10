<!-- src/lib/components/vault/PasswordCard.svelte-->

<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import { Button } from "$lib/components/ui/button/index";
  import PasswordNameCombobox from "./PasswordNameCombobox.svelte";

  import type { PasswordEntry } from "./types.svelte";

  let {
    password = $bindable({ name: "", username: "", password: "" }),
    index,
    removePassword,
  }: {
    password: PasswordEntry;
    index: number;
    removePassword: (index: number) => void;
  } = $props();
</script>

<div class="grid gap-2">
  <PasswordNameCombobox bind:passwordName={password.name} />
  <Input
    type="hidden"
    form="addpasswords"
    name={`passwords[${index}].name`}
    placeholder="Password name"
    value={password.name}
    class="text-md border-dashed cursor-text">Password Name</Input
  >
  <p class="text-xs text-red-500">
    {password.errors?.name}
  </p>
  <Card.Root class="pt-4">
    <Card.Content class="grid gap-4">
      <div class="flex flex-col space-y-1.5">
        <Label for="username">Username/email</Label>
        <Input
          id="username"
          type="text"
          form="addpasswords"
          name={`passwords[${index}].username`}
          bind:value={password.username}
        />
        <p class="text-xs text-red-500">
          {password.errors?.username}
        </p>
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="text"
          form="addpasswords"
          name={`passwords[${index}].password`}
          bind:value={password.password}
        />
        <p class="text-xs text-red-500">
          {password.errors?.password}
        </p>
      </div>
    </Card.Content>
    <Card.Footer>
      <Button onclick={() => removePassword(index)} class="w-full"
        >Delete</Button
      >
    </Card.Footer>
  </Card.Root>
</div>
