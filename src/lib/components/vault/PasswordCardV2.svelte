<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import { Button } from "$lib/components/ui/button/index";

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

<div class="grid gap-2">
  <Input
    type="text"
    name={`passwords[${index}].name`}
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
          name={`passwords[${index}].username`}
          value=""
        />
      </div>
      <div class="flex flex-col space-y-1.5">
        <Label for="password">Password</Label>
        <Input
          id="password"
          type="text"
          name={`passwords[${index}].password`}
          value=""
        />
      </div>
    </Card.Content>
    <Card.Footer>
      <Button class="w-full">Delete</Button>
    </Card.Footer>
  </Card.Root>
</div>
