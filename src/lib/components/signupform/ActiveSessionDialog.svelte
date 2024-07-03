<!--  src/lib/components/signupform/ActiveSessionDialog.svelte  -->

<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog";
  import { Button } from "$lib/components/ui/button/index.js";
  import { toast } from "svelte-sonner";

  import { signupFormController as sfc } from "$lib/components/signupform/state.svelte";
  import type { AuthResponse } from "$lib/types";

  import { page } from "$app/stores";
  import { enhance } from "$app/forms";
</script>

<form
  method="POST"
  action="?/terminate"
  id="terminateform"
  use:enhance={({ formData, cancel }: { formData: FormData; cancel: () => void }) => {
    if (!formData.get("user_id")) {
        toast.error("Something went wrong. Please try again.");
        sfc.resetFormState();
        sfc.closeActiveSessionDialog();
        cancel();
        return;
    }
    sfc.closeActiveSessionDialog();
    return async ({ result, update }: { result: any; update: any }) => {
      const response: AuthResponse = result.data;
      if (response.success) {
        const submitButton = document.getElementById('signupform-submit-button') as HTMLButtonElement;
        if (submitButton) {
            submitButton.click();
        } else {
            toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      await update();
    };
  }}
>
  <input
    type="hidden"
    name="user_id"
    form="terminateform"
    value={$page.form?.user_id}
  />
  <Dialog.Root open={sfc.activeSessionDialogOpen} closeOnOutsideClick={false} closeOnEscape={false}>
    <Dialog.Content>
      <Dialog.Header>
        <Dialog.Title>Active session detected!</Dialog.Title>
        <Dialog.Description>
          You have an active session running. For your security, proceeding will
          log you out of any existing sessions.
        </Dialog.Description>
      </Dialog.Header>
      <Dialog.Footer>
        <Button
          on:click={() => {
            sfc.resetFormState();
            sfc.closeActiveSessionDialog();
          }}>Cancel</Button
        >
        <Button
          type="submit"
          form="terminateform">Proceed</Button
        >
      </Dialog.Footer>
      <Dialog.Close class="hidden"/>
    </Dialog.Content>
  </Dialog.Root>
</form>
