<!-- src/routes/services/vault/+page.svelte -->

<script lang="ts">
  import type { PageData, ActionData } from "./$types";
  import type { ActionResult } from "@sveltejs/kit";

  import AddPasswordsSheet from "$lib/components/vault/AddPasswordsSheet.svelte";
  import { enhance } from "$app/forms";

  import { toast } from "svelte-sonner";

  let { data }: { data: PageData } = $props();
  let passwords = $state(data.passwords);

  function submitAddPasswordsForm() {
    return async ({
      result,
      update,
    }: {
      result: ActionResult;
      update: any;
    }) => {
      switch (result.type) {
        case "success":
          let resultData = result.data as ActionData;
          // The below code is temporary until the backend is updated.
          if (resultData) {
            passwords.unshift(
              ...(resultData.passwords as {
                id: string;
                passwordName: string;
                decryptedPassword: string;
              }[])
            );
            toast.success("Passwords added.");
            await update();
          }
          // end of temporary code
          break;
        case "failure":
          toast.error("Could not add passwords.", {
            description: "Please try again.",
          });
          await update({ reset: false });
          break;
        default:
          toast.error("Something went wrong.", {
            description: "Please try again.",
          });
          await update({ reset: false });
          break;
      }
    };
  }
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <form
    method="POST"
    action="?/store"
    name="addpasswords"
    id="addpasswords"
    use:enhance={submitAddPasswordsForm}
  >
    <AddPasswordsSheet />
  </form>
  {#if passwords && passwords.length === 0}
    <p>No passwords found.</p>
  {:else if passwords}
    {#each passwords as password (password.id)}
      <p>{password.passwordName}</p>
    {/each}
  {/if}
</div>
