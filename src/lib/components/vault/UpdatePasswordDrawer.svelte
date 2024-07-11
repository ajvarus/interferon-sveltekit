<!-- src/lib/components/vault/UpdatePasswordDrawer.svelte -->

<script lang="ts">
  import * as Drawer from "$lib/components/ui/drawer";
  import { Button } from "$lib/components/ui/button";

  import Pencil from "lucide-svelte/icons/pencil";

  import PasswordUpdateCard from "./PasswordUpdateCard.svelte";

  import type { Password } from "./types.svelte";

  import { updatePasswordsController as upc } from "./state.svelte";
  import { toast } from "svelte-sonner";

  let {
    password,
    isUnlocked,
  }: {
    password: Password;
    isUnlocked: boolean;
  } = $props();
</script>

<Drawer.Root>
  <Drawer.Trigger asChild let:builder>
    <Button builders={[builder]} size="icon" variant="outline"
      ><Pencil class="w-4 h-4" /></Button
    >
  </Drawer.Trigger>
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Update password</Drawer.Title>
      </Drawer.Header>
      <PasswordUpdateCard {password} />
      <Drawer.Footer>
        <Drawer.Close asChild let:builder>
          <Button builders={[builder]} variant="outline">Cancel</Button>
        </Drawer.Close>
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
