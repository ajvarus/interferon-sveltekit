<script lang="ts">
  import type { SubmitFunction } from "@sveltejs/kit";

  import SignUpForm from "$lib/components/signupform/SignUpForm.svelte";
  import { toast } from "svelte-sonner";

  import { goto } from "$app/navigation";

  import { signupFormController as sfc } from "$lib/components/signupform/state.svelte";
  import { FormStates as FormState } from "$lib/components/signupform/types";
  import type { AuthResponse } from "$lib/types";

  function submitForm({
    cancel,
  }: {
    cancel: () => void;
  }): SubmitFunction | any {
    sfc.formState = FormState.LOADING;
    if (!sfc.emailExists && !sfc.validateForm()) {
      cancel();
      sfc.formState = FormState.ERROR;
      toast.error("Check all fields.", {
        description: "Please make sure all fields are valid.",
      });
      sfc.resetFormState();
    } else if (
      sfc.emailExists &&
      (!sfc.isEmailValid || sfc.password.length === 0)
    ) {
      cancel();
      sfc.formState = FormState.ERROR;
      toast.error("Invalid email or password.", {
        description: "Please make sure all fields are valid.",
      });
      sfc.resetFormState();
    }
    return async ({ result, update }: { result: any; update: any }) => {
      const response: AuthResponse = result.data;
      if (response.success) {
        sfc.formState = FormState.SUCCESS;
        if (!sfc.emailExists) toast.success("Sign-up successful");
        await goto("/dashboard");
        sfc.resetFormState();
      } else {
        sfc.formState = FormState.ERROR;
        toast.error("Sign-up failed.", {
          description: "Please try again.",
        });
        sfc.resetFormState();
      }
      await update({ reset: false });
    };
  }
</script>

<div class="flex flex-col justify-center items-center h-screen gap-2.5">
  <SignUpForm {submitForm} />
</div>
