<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { Button } from "$lib/components/ui/button/index";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";

  import CirclePlus from "lucide-svelte/icons/circle-plus";
  import FilePlus2 from "lucide-svelte/icons/file-plus-2";
  import Check from "lucide-svelte/icons/check";

  import PasswordCard from "./PasswordCard.svelte";

  import { addPasswordsController as apc } from "./state.svelte";
  import { toast } from "svelte-sonner";
  import { enhance } from "$app/forms";

  function validateAndAddPassword(addPassword: boolean = true): boolean {
    let index = 0;
    let valid = apc.validatePassword(index);
    let isDuplicate = apc.isDuplicatePassword(index);
    if (valid && !isDuplicate) {
      if (addPassword) apc.addPassword();
      return true;
    } else if (valid && isDuplicate) {
      toast.error("Duplicate password!", {
        description:
          "A password with this signature already exists. If this was deliberate, considering updating the existing password.",
        duration: 7000,
      });
    }
    return false;
  }
</script>

<form
  method="POST"
  action="?/store"
  id="addpasswords"
  use:enhance={({ cancel }) => {
    if (!validateAndAddPassword(false)) {
      cancel();
      return;
    }
  }}
>
  <Sheet.Root
    open={apc.drawerOpen}
    onOpenChange={() => apc.toggleDrawer()}
    closeOnOutsideClick={true}
  >
    <Button
      size="icon"
      on:click={() => apc.openDrawer()}
      variant="outline"
      class="rounded-full"><CirclePlus color="green" /></Button
    >
    <Sheet.Content side="right" class="flex flex-col h-[100dvh]">
      <Sheet.Header>
        <Sheet.Title>Add passwords</Sheet.Title>
        <Sheet.Description>
          Add passwords manually or import from a .txt file. Click on save when
          you're done.
        </Sheet.Description>
        <div class="flex justify-center space-x-2">
          <Button
            size="icon"
            variant="outline"
            on:click={() => validateAndAddPassword()}
            class="rounded-full"><CirclePlus color="green" /></Button
          >
          <Button size="icon" variant="outline" class="rounded-full"
            ><FilePlus2 /></Button
          >
          <Button
            size="icon"
            variant="outline"
            type="submit"
            form="addpasswords"
            class="rounded-full"><Check /></Button
          >
        </div>
      </Sheet.Header>
      <ScrollArea class="flex-grow min-h-[300px] border p-2 rounded-s">
        <div class="grid gap-4">
          {#each apc.addedPasswords as _, i (i)}
            <PasswordCard
              bind:password={apc.addedPasswords[i]}
              removePassword={() => apc.removePassword(i)}
              index={i}
            />
          {/each}
        </div>
      </ScrollArea>
      <Sheet.Footer class="flex-shrink-0">
        <Button type="submit" form="addpasswords">Save passwords</Button>
      </Sheet.Footer>
    </Sheet.Content>
  </Sheet.Root>
</form>
