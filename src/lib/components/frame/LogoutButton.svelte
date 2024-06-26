<!-- src/lib/components/frame/LogoutButton.svelte -->

<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog";
  import { Button } from "$lib/components/ui/button/index";
  import { toast } from "svelte-sonner";
  import type { AuthResponse } from "$lib/types";

  import CirclePower from "lucide-svelte/icons/circle-power";

  import { goto } from "$app/navigation";

  async function logout() {
    isLoading = true;
    const response = await fetch("/auth/logout", {
      method: "GET",
    });
    const res: AuthResponse = await response.json();
    if (res.success) {
      isOpen = false;
      toast.success("Logout successful.");
      setTimeout(async () => await goto("/"), 0);
    } else {
      isOpen = false;
      toast.error("Logout failed.", {
        description: "Please try again.",
      });
    }
    isLoading = false;
  }

  let isOpen = $state(false);
  let isLoading = $state(false);
</script>

<AlertDialog.Root bind:open={isOpen} closeOnOutsideClick={true}>
  <AlertDialog.Trigger asChild let:builder
    ><Button
      variant="ghost"
      size="icon"
      class="rounded-lg"
      aria-label="Playground"
      builders={[builder]}
      on:click={() => (isOpen = true)}
    >
      <CirclePower class="size-7" />
    </Button>
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you sure?</AlertDialog.Title>
      <AlertDialog.Description>
        Please make sure to save your work before proceeding.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <Button
        on:click={logout}
        class={isLoading ? "animate-bounce" : ""}
        disabled={isLoading}>Logout</Button
      >
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
