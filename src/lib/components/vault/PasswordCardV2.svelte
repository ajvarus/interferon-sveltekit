<!-- src/lib/components/vault/PasswordCardV2.svelte -->

<script lang="ts">
  import * as Card from "$lib/components/ui/card/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";
  import { Button } from "$lib/components/ui/button/index";

  import Lock from "lucide-svelte/icons/lock";
  import LockOpen from "lucide-svelte/icons/lock-open";
  import LoaderCircle from "lucide-svelte/icons/loader-circle";
  import PasswordTimeoutCircle from "./PasswordTimeoutCircle.svelte";

  import UpdatePasswordDrawer from "./UpdatePasswordDrawer.svelte";
  
  import { enhance } from "$app/forms";

  import type { Password, CachedPassword } from "./types.svelte";
  import { toast } from "svelte-sonner";

  type DecryptionState = "encrypted" | "decrypting" |"decrypted";
  let isDecrypted: DecryptionState = $state("encrypted");

  let {
    password = $bindable(),
  }: {
    password: Password;
  } = $props();

</script>

<!-- Below form is used to fetch passwords from cache. -->
<form method="POST" action="?/passwordscache" id={`passwordscache[${password.id}]`} use:enhance={({ cancel }) => {
  if (isDecrypted === "decrypted") {
    isDecrypted = "encrypted";
    cancel();
    return;
  }
  isDecrypted = "decrypting";
  return async ({ result, update }: { result: any; update: any }) => {
    const cachedPasswords = (await result.data?.cachedpasswords || []) as CachedPassword[];
    const cachedPassword = cachedPasswords.find((cachedPassword) => cachedPassword.id === password.id);
    if (cachedPassword) {
      password.decryptedPassword = cachedPassword.decryptedPassword;
      toast.success("Password decrypted.");
    } else {
      toast.error("Failed to decrypt password.");
    }
    isDecrypted = "decrypted";
    await update({ reset: false });
  };
}}>
  <input form={`passwordscache[${password.id}]`} type="hidden" name="id" value={password.id} />
</form>

<!-- Below form is used to delete passwords. -->
<form
  method="POST"
  action="?/delete"
  id={`passwords[${password.id}]`}
  use:enhance={() => {
    return async ({ update }) => {
      await update({ reset: false });
    }
  }}
>
  <div class="grid gap-2">
    <Input
      type="hidden"
      form={`passwords[${password.id}]`}
      name="index"
      bind:value={password.id}
    ></Input>
    <Input
      type="hidden"
      form={`passwords[${password.id}]`}
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
            form={`passwords[${password.id}]`}
            name={`passwords[${password.id}].username`}
            bind:value={password.username}
          />
        </div>
        <div class="relative">
          <div class="flex flex-col space-y-1.5">
            <Label for="password">Password</Label>
            <Input
              id="password"
              type={isDecrypted === "decrypted" ? "text" : "password"}
              form={`passwords[${password.id}]`}
              name={`passwords[${password.id}].password`}
              placeholder="*******"
              bind:value={password.decryptedPassword}
            />
          </div>
          <Button
            type="submit"
            form={`passwordscache[${password.id}]`}
            size="icon"
            variant="ghost"
            class="absolute right-0.5 top-0.5 transform translate-y-1/2 rounded-full "
          >
            {#if isDecrypted === "encrypted"}
              <Lock class="w-4 h-4" />
            {:else if isDecrypted === "decrypting"}
              <LoaderCircle class="animate-spin w-4 h-4" />
            {:else if isDecrypted === "decrypted"}
              <PasswordTimeoutCircle bind:isDecrypted={isDecrypted} />
              <!-- <LockOpen class="w-4 h-4"/> -->
            {/if}
          </Button>
        </div>
      </Card.Content>
      <Card.Footer class="gap-2">
        <Button type="submit" form={`passwords[${password.id}]`} class="w-full"
          >Delete</Button
        >
        <UpdatePasswordDrawer {password} isUnlocked={isDecrypted === "decrypted"} />
      </Card.Footer>
    </Card.Root>
  </div>
</form>