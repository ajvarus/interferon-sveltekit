<!-- src/lib/components/vault/CollapsiblePasswordsGroup.svelte -->

<script lang="ts">
  import * as Collapsible from "$lib/components/ui/collapsible";
  import { Button } from "$lib/components/ui/button/index";

  import CircleChevronDown from "lucide-svelte/icons/circle-chevron-down";

  let {
    passwordName,
    passwordsCount,
  }: { passwordName: string; passwordsCount: number } = $props();

  let isOpen = $state(false);
  let stayOpen = $state(false);
</script>

<Collapsible.Root class="w-full space-y-2">
  <div
    class="border border-gray-200 rounded-full overflow-hidden mb-2 transition-colors duration-200 ease-in-out"
    class:bg-gray-100={isOpen}
  >
    <div class="flex justify-between items-center px-4 py-1">
      <h4 class=" font-semibold">{passwordName}</h4>
      <div class="flex justify-center items-center space-x-2">
        <div
          class="w-6 h-6 rounded-full border-2 border-gray-700 flex items-center justify-center"
        >
          <span class="text-xs">{passwordsCount}</span>
        </div>
        <Collapsible.Trigger asChild let:builder>
          <Button
            builders={[builder]}
            variant="ghost"
            size="icon"
            class="w-9 h-9 p-0 rounded-full"
          >
            <CircleChevronDown class="h-6 w-6" />
          </Button>
        </Collapsible.Trigger>
      </div>
    </div>
  </div>
  <Collapsible.Content>
    <slot />
    <!-- {@render passwords()} -->
  </Collapsible.Content>
</Collapsible.Root>
