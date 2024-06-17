<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import MenubarButton from "./MenubarButton.svelte";

  import CirclePower from "lucide-svelte/icons/circle-power";
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger
    ><MenubarButton name="Logout">
      <CirclePower class="size-7" />
    </MenubarButton></AlertDialog.Trigger
  >
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>
        Please make sure to save your work before proceeding.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Logout</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
