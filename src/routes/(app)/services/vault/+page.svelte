<!-- src/routes/services/vault/+page.svelte -->

<script lang="ts">
  import type { PageData } from "./$types";

  let { data } = $props<{ data: PageData }>();
  console.log("data", data.passwords);
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <h1>Passwords</h1>
  {#if data.passwords && data.passwords.length === 0}
    <p>No passwords found.</p>
  {:else}
    {#each data.passwords as password}
      <p>{password.password}</p>
    {/each}
  {/if}
</div>
