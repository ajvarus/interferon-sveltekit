<!-- src/lib/components/vault/PasswordNameCombobox.svelte -->

<script lang="ts">
  import { Combobox } from "bits-ui";
  import { Button } from "$lib/components/ui/button/index";

  import CircleChevronDown from "lucide-svelte/icons/circle-chevron-down";

  import { addPasswordsController as apc } from "./state.svelte";

  let {
    passwordName = $bindable(""),
    index,
  }: { passwordName: string; index: number } = $props();

  let passwordNames = $derived(
    apc.passwordGroups.map((group) => ({
      value: group.passwordName,
      label: group.passwordName,
    }))
  );
  let filterdPasswordNames = $state([] as typeof passwordNames);

  let touchedInput = $state(false);
  let isComboxboxOpen = $state(false);
  let showFullList = $state(false);

  $effect(() => {
    showFullList = false;
    if (passwordName || (passwordName && touchedInput)) {
      filterdPasswordNames = passwordNames.filter((pn) =>
        pn.value.toLowerCase().includes(passwordName.toLowerCase())
      );
      isComboxboxOpen = true;
    } else {
      filterdPasswordNames = passwordNames;
      isComboxboxOpen = false;
    }
  });
</script>

<Combobox.Root
  items={showFullList ? passwordNames : filterdPasswordNames}
  bind:inputValue={passwordName}
  bind:touchedInput
  open={isComboxboxOpen}
>
  <div class="relative">
    <Combobox.Input
      placeholder="Password name"
      class="w-full h-10 pl-3 pr-10 text-sm border rounded-md"
      disabled={index !== 0}
    />
    <Button
      size="icon"
      variant="ghost"
      class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4"
      on:click={() => {
        isComboxboxOpen = !isComboxboxOpen;
        showFullList = isComboxboxOpen;
      }}
      disabled={index !== 0}
    >
      <CircleChevronDown />
    </Button>
  </div>
  <Combobox.Content
    class="w-full max-h-52 overflow-auto rounded-md border bg-background shadow-md z-50"
  >
    {#each showFullList ? passwordNames : filterdPasswordNames as pn, i (i)}
      <Combobox.Item
        value={pn.value}
        label={pn.label}
        class="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none"
        >{pn.label}</Combobox.Item
      >
    {/each}
  </Combobox.Content>
</Combobox.Root>
