<!-- src/routes/services/vault/+page.svelte -->

<script lang="ts">
  import type { PageData, ActionData } from "./$types";

  import AddPasswordsSheet from "$lib/components/vault/AddPasswordsSheet.svelte";
  import PasswordsCarousel from "$lib/components/vault/PasswordsCarousel.svelte";
  import { enhance } from "$app/forms";

  import { toast } from "svelte-sonner";

  import type {
    Password,
    DeletedPassword,
  } from "$lib/components/vault/types.svelte";
  import { addPasswordsController as apc } from "$lib/components/vault/state.svelte";
  import { untrack } from "svelte";

  let { data, form }: { data: PageData; form: ActionData } = $props();
  let passwords = $state((data?.passwords as Password[]) || []);

  let storePasswordsResponse = $derived(form?.passwords as Password[]);
  let deletePasswordsResponse = $derived(
    form?.deletedPasswords as DeletedPassword[]
  );
  $effect(() => {
    if (storePasswordsResponse) {
      untrack(() => {
        passwords.unshift(...storePasswordsResponse);
      });
      toast.success("Passwords added.");
      apc.closeDrawer();
      apc.resetPasswords();
    }
    if (deletePasswordsResponse) {
      untrack(() => {
        const idsToDelete = new Set(deletePasswordsResponse.map((p) => p.id));
        passwords = passwords.filter((p) => !idsToDelete.has(p.id));
      });
      toast.success("Passwords deleted.");
    }
  });
</script>

<div
  class="flex flex-col justify-space-around items-center h-screen gap-2.5 mt-[65px] pt-5 ml-[65px] pl-5"
>
  <div class="flex justify-center w-full max-w-sm">
    <form method="POST" action="?/store" id="addpasswords" use:enhance>
      <AddPasswordsSheet />
    </form>
  </div>
  <div class="w-full max-w-sm pt-10">
    {#if passwords && passwords.length === 0}
      <div class="flex flex-col items-center">
        <p>No passwords found.</p>
        <p>Start by adding passwords using the button above.</p>
      </div>
    {:else if passwords}
      <PasswordsCarousel {passwords} />
    {/if}
  </div>
</div>
