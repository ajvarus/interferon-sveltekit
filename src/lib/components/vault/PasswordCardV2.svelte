<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import { Button } from "$lib/components/ui/button/index";
  import { enhance } from "$app/forms";

  type Password = {
    id: string;
    passwordName: string;
    decryptedPassword: string;
  };

  let {
    password = $bindable(),
    index,
  }: {
    password: Password;
    index: number;
  } = $props();
</script>

<form method="POST" action="?/delete" id={`passwords[${index}]`} use:enhance>
  <div class="grid gap-2">
    <Input
      type="hidden"
      form={`passwords[${index}]`}
      name="index"
      bind:value={password.id}
    ></Input>
    <Input
      type="text"
      form={`passwords[${index}]`}
      name={`passwords[${password.id}].name`}
      placeholder="Password name"
      bind:value={password.passwordName}
      class="text-md border-dashed cursor-text">Password Name</Input
    >
    <Card.Root class="pt-4">
      <Card.Content class="grid gap-4">
        <div class="flex flex-col space-y-1.5">
          <Label for="username">Username/email</Label>
          <Input
            id="username"
            type="text"
            form={`passwords[${index}]`}
            name={`passwords[${password.id}].username`}
            value=""
          />
        </div>
        <div class="flex flex-col space-y-1.5">
          <Label for="password">Password</Label>
          <Input
            id="password"
            type="text"
            form={`passwords[${index}]`}
            name={`passwords[${password.id}].password`}
            value=""
          />
        </div>
      </Card.Content>
      <Card.Footer>
        <Button type="submit" form={`passwords[${index}]`} class="w-full"
          >Delete</Button
        >
      </Card.Footer>
    </Card.Root>
  </div>
</form>
