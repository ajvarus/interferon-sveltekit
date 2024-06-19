<script>
  import { Button } from "$lib/components/ui/button/index";
  import { Separator } from "$lib/components/ui/separator/index";

  import MenubarButton from "./MenubarButton.svelte";
  import LogoutButton from "./LogoutButton.svelte";

  import ZapOff from "lucide-svelte/icons/zap-off";
  import Home from "lucide-svelte/icons/home";
  import Vault from "lucide-svelte/icons/vault";
  import CircleUserRound from "lucide-svelte/icons/circle-user-round";
  import Settings from "lucide-svelte/icons/settings";
</script>

<aside class="inset-y fixed left-0 z-20 flex h-full flex-col border-r">
  <div class="border-b p-3">
    <Button variant="outline" size="icon" aria-label="Home">
      <ZapOff class="size-7 fill-foreground" color="light-blue" />
    </Button>
  </div>
  <nav class="grid gap-3 p-3">
    <MenubarButton name="Dashboard">
      <Home class="size-7" />
    </MenubarButton>
    <Separator class="my-0" />
    <MenubarButton name="Vault">
      <Vault class="size-7" />
    </MenubarButton>
  </nav>
  <nav class="mt-auto grid gap-3 p-3">
    <MenubarButton name="Profile">
      <CircleUserRound class="size-7" />
    </MenubarButton>
    <MenubarButton name="Settings">
      <Settings class="size-7" />
    </MenubarButton>
    <LogoutButton />
  </nav>
</aside>
