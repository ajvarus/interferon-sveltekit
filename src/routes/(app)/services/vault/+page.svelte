<!-- src/routes/services/vault/+page.svelte -->

<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props<{ data: PageData }>();

  // let passwords = $state([]);

  // $effect(() => {
  //   passwords = data.passwords;
  // })
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <h1>Passwords</h1>
  {#if data.passwords.length === 0}
    <p>No passwords found.</p>
  {:else}
    {#each data.passwords as password}
      <div>
        <h2>{password.passwordName}</h2>
        <p>ID: {password.id}</p>
        <p>Password: {password.decryptedPassword}</p>
      </div>
    {/each}
  {/if}
</div>
