<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";

  import SignUpForm from "$lib/components/signupform/SignUpForm.svelte";

  import { goto } from "$app/navigation";

  import { authResponse } from "$lib/components/signupform/stores";
  import type { AuthResponse } from "$lib/types";

  function submitForm(): SubmitFunction | any {
    return async ({ result, update }: { result: any; update: any }) => {
      console.log(result.type, result.data);
      const response: AuthResponse = result.data;
      if (response.success) {
        setTimeout(async () => await goto("/dashboard"), 0);
      }
      $authResponse = response;
      await update({ reset: false });
    };
  }
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <SignUpForm {submitForm} />
</div>
