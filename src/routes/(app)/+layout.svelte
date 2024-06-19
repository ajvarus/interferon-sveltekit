<!-- src/routes/dashboard/+layout.svelte -->

<script lang="ts">
  import Frame from "$lib/components/frame/Frame.svelte";
  import { toast } from "svelte-sonner";

  import type { LayoutServerData } from "./$types";
  import type { AuthResponse } from "$lib/types";

  import { goto } from "$app/navigation";

  // let { data } = $props<{ data: LayoutServerData }>();

  // $effect(() => {
  //   const response: AuthResponse = data;
  //   if (response.success) {
  //     toast.success("Logout successful.", {
  //       description: "You'll be redirected shortly.",
  //     });
  //     setTimeout(async () => await goto("/"), 2000);
  //   } else {
  //     toast.success("Logout failed.", {
  //       description: "Please try again.",
  //     });
  //   }
  // });

  import type { SubmitFunction } from "@sveltejs/kit";
  function submitForm(): SubmitFunction | any {
    return async ({ result, update }: { result: any; update: any }) => {
      console.log(result.type, result.data);
      const response: AuthResponse = result.data;
      if (response.success) {
        setTimeout(async () => await goto("/"), 3000);
      }
      await update({ reset: false });
    };
  }
</script>

<Frame />
<slot></slot>
