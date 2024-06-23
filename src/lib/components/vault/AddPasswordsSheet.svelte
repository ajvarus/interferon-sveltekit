<script>
  import * as Sheet from "$lib/components/ui/sheet/index";
  import { Button } from "$lib/components/ui/button/index";
  import { Input } from "$lib/components/ui/input/index";
  import { Label } from "$lib/components/ui/label/index";

  import CirclePlus from "lucide-svelte/icons/circle-plus";
</script>

<Sheet.Root>
  <Sheet.Trigger asChild let:builder>
    <Button builders={[builder]} variant="outline"
      ><CirclePlus color="green" /></Button
    >
  </Sheet.Trigger>
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Add passwords</Sheet.Title>
      <Sheet.Description>
        Add passwords manually or import from a .txt file. Click on save when
        you're done.
      </Sheet.Description>
    </Sheet.Header>
    <div class="grid gap-4 py-4">
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="name" class="text-right">Name</Label>
        <Input id="name" value="Pedro Duarte" class="col-span-3" />
      </div>
      <div class="grid grid-cols-4 items-center gap-4">
        <Label for="username" class="text-right">Username</Label>
        <Input id="username" value="@peduarte" class="col-span-3" />
      </div>
    </div>
    <Sheet.Footer>
      <Sheet.Close asChild let:builder>
        <Button builders={[builder]} type="submit">Save changes</Button>
      </Sheet.Close>
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
