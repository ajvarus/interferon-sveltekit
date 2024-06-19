<!-- src/lib/components/frame/LogoutButton.svelte -->

<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import MenubarButton from "./MenubarButton.svelte";
  import { Button } from "$lib/components/ui/button/index";

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
      <form action="/auth/logout" name="logout">
        <Button
          type="submit"
          form="logout"
          on:click={async () => {
            const response = await fetch("/auth/logout", {
              method: "GET",
            });
            console.log("Logout button clicked", await response.json());
          }}>Logout</Button
        >
      </form>
      <!--<AlertDialog.Action on:click={logout}>Logout</AlertDialog.Action>-->
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
