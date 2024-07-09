<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index";

  import CollapsiblePasswordsGroup from "./CollapsiblePasswordsGroup.svelte";
  import PasswordCardV2 from "./PasswordCardV2.svelte";

  import type { Password } from "./types.svelte";
  import {
    passwordsController as pc,
    addPasswordsController as apc,
  } from "./state.svelte";

  let { passwords = $bindable([]) }: { passwords: Password[] } = $props();
  let groupedPasswords = $derived(pc.groupPasswords(passwords));
</script>

<div class="relative pt-8 pb-8">
  <Carousel.Root orientation="vertical" class="w-full max-w-sm relative">
    <Carousel.Content class="h-[650px]">
      {#each Object.entries(groupedPasswords) as [groupId, passwords] (groupId)}
        <Carousel.Item class="basis-1/6">
          <CollapsiblePasswordsGroup
            passwordName={apc.passwordGroupsMap.has(groupId)
              ? apc.passwordGroupsMap.get(groupId)?.passwordName as string
              : ""}
            passwordsCount={passwords.length}
          >
            {#each passwords as password, index (password.id)}
              <PasswordCardV2 bind:password={passwords[index]} />
            {/each}
          </CollapsiblePasswordsGroup>
        </Carousel.Item>
      {/each}
    </Carousel.Content>
    <Carousel.Previous />
    <Carousel.Next />
  </Carousel.Root>
</div>
