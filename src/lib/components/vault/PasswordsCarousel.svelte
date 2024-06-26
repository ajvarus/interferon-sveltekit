<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index";

  import PasswordCardV2 from "./PasswordCardV2.svelte";

  type Password = {
    id: string;
    passwordName: string;
    decryptedPassword: string;
  };

  let { passwords = $bindable([]) }: { passwords: Password[] } = $props();
</script>

<div class="relative pt-8 pb-8">
  <Carousel.Root orientation="vertical" class="w-full max-w-sm relative">
    <Carousel.Content class="h-[650px]">
      {#each passwords as password, index (password.id)}
        <Carousel.Item class="basis-1/2">
          <PasswordCardV2 bind:password={passwords[index]} />
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>
