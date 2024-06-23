<!-- src/routes/services/vault/+page.svelte -->

<script lang="ts">
  import type { PageData } from "./$types";

  import AddPasswordsSheet from "$lib/components/vault/AddPasswordsSheet.svelte";

  let { data } = $props<{ data: PageData }>();
  console.log("data", data.passwords);
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <AddPasswordsSheet />
  {#if data.passwords && data.passwords.length === 0}
    <p>No passwords found.</p>
  {:else}
    {#each data.passwords as password}
      <p>{password.password}</p>
    {/each}
  {/if}
</div>
