<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";

  import LoaderCircle from "lucide-svelte/icons/loader-circle";

  let isLoading = $state(false);
</script>

<form class="flex w-full max-w-sm items-center space-x-2">
  <Input type="email" placeholder="email" />
  <Button type="submit" on:click={() => (isLoading = !isLoading)}>
    {#if isLoading}
      <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
    {/if}
    Subscribe</Button
  >
</form>
