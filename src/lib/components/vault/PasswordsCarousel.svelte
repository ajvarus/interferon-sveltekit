<script lang="ts">
  import * as Carousel from "$lib/components/ui/carousel/index";
  import { ScrollArea } from "$lib/components/ui/scroll-area/index";

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
  <ScrollArea class="w-full max-w-sm h-[650px] pr-2 pb-2 border-b">
      {#each Object.entries(groupedPasswords) as [groupId, passwords] (groupId)}
      <div class="mb-10">
          <CollapsiblePasswordsGroup
            passwordName={apc.passwordGroupsMap.has(groupId)
              ? apc.passwordGroupsMap.get(groupId)?.passwordName as string
              : ""}
            passwordsCount={passwords.length}
          >
            {#each passwords as password, index (password.id)}
            <div class="mb-2">
              <PasswordCardV2 bind:password={passwords[index]} />
            </div>
            {/each}
          </CollapsiblePasswordsGroup>
        </div>
      {/each}
  </ScrollArea>
</div>
