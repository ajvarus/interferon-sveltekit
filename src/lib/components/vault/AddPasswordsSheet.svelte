<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { Button } from "$lib/components/ui/button/index";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";

  import CirclePlus from "lucide-svelte/icons/circle-plus";
  import FilePlus2 from "lucide-svelte/icons/file-plus-2";
  import Check from "lucide-svelte/icons/check";

  import PasswordCard from "./PasswordCard.svelte";

  type PasswordEntry = {
    name: string;
    username: string;
    password: string;
  };

  let addedPasswords: PasswordEntry[] = $state([
    { name: "", username: "", password: "" },
  ]);

  function addPassword() {
    addedPasswords.unshift({ name: "", username: "", password: "" });
  }

  function removePassword(index: number) {
    addedPasswords.splice(index, 1);
  }
</script>

<Sheet.Root>
  <Sheet.Trigger asChild let:builder>
    <Button
      size="icon"
      builders={[builder]}
      variant="outline"
      class="rounded-full"><CirclePlus color="green" /></Button
    >
  </Sheet.Trigger>
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
          on:click={addPassword}
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
        {#each addedPasswords as password, i (i)}
          <PasswordCard
            bind:password={addedPasswords[i]}
            {removePassword}
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
