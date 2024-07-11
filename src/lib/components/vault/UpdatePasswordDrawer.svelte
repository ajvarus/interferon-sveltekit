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

<Drawer.Root
  open={upc.drawerOpen}
  onOpenChange={() => upc.toggleDrawer()}
  closeOnOutsideClick={true}
>
  <Button
    size="icon"
    variant="outline"
    on:click={() => {
      if (isUnlocked) upc.openDrawer();
      else
        toast.error("Password locked", {
          description: "Please unlock to edit.",
          duration: 5000,
        });
    }}><Pencil class="w-4 h-4" /></Button
  >
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Update password</Drawer.Title>
      </Drawer.Header>
      <PasswordUpdateCard {password} />
      <Drawer.Footer>
        <Button variant="outline" on:click={() => upc.closeDrawer()}
          >Cancel</Button
        >
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
