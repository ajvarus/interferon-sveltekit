<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip";
  import Button from "../ui/button/button.svelte";

  let { name } = $props<{ name: string }>();
</script>

<Tooltip.Root>
  <Tooltip.Trigger asChild let:builder>
    <Button
      variant="ghost"
      size="icon"
      class="rounded-lg"
      aria-label="Playground"
      builders={[builder]}
    >
      <slot />
    </Button>
  </Tooltip.Trigger>
  <Tooltip.Content side="right" sideOffset={5}>{name}</Tooltip.Content>
</Tooltip.Root>
