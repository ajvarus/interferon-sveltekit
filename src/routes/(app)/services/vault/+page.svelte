<!-- src/routes/services/vault/+page.svelte -->

<script lang="ts">
  import type { PageData, ActionData } from "./$types";

  import AddPasswordsSheet from "$lib/components/vault/AddPasswordsSheet.svelte";
  import PasswordsCarousel from "$lib/components/vault/PasswordsCarousel.svelte";

  import { toast } from "svelte-sonner";

  import type {
    Password,
    DeletedPassword,
  } from "$lib/components/vault/types.svelte";
  import {
    addPasswordsController as apc,
    updatePasswordsController as upc,
  } from "$lib/components/vault/state.svelte";
  import { untrack } from "svelte";

  let { data, form }: { data: PageData; form: ActionData } = $props();
  let passwords = $state((data?.passwords as Password[]) || []);

  let storePasswordsResponse = $derived(form?.passwords as Password[]);
  let updatePasswordsResponse = $derived(form?.updatedPasswords as Password[]);
  let deletePasswordsResponse = $derived(
    form?.deletedPasswords as DeletedPassword[]
  );

  // Below effects are used to sync passwords state with server responses.
  $effect(() => {
    if (storePasswordsResponse) {
      untrack(() => {
        passwords.unshift(...storePasswordsResponse);
      });
      toast.success("Passwords added.");
      apc.closeDrawer();
      apc.resetPasswords();
    }

    if (updatePasswordsResponse) {
      untrack(() => {
        const updatedPasswordMap = new Map(
          updatePasswordsResponse.map((p) => [p.id, p])
        );

        passwords = passwords.map((p) => {
          if (updatedPasswordMap.has(p.id)) {
            return updatedPasswordMap.get(p.id) as Password;
          }
          return p;
        });
      });
      upc.closeDrawer();
      toast.success("Password updated.");
    }

    if (deletePasswordsResponse) {
      untrack(() => {
        const idsToDelete = new Set(deletePasswordsResponse.map((p) => p.id));
        passwords = passwords.filter((p) => !idsToDelete.has(p.id));
      });
      toast.success("Passwords deleted.");
    }
  });

  // Below effects are used to derive states from passwords.
  $effect(() => {
    apc.groupPasswords(passwords);
    apc.mapUniquePasswords(passwords);
  });
</script>

<div
  class="flex flex-col justify-space-around items-center h-screen gap-2.5 mt-[65px] pt-5 ml-[65px] pl-5"
>
  <div class="flex justify-center w-full max-w-sm">
    <AddPasswordsSheet />
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
