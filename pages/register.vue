<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const toast = useToast()

const { register } = useFirebaseAuth();

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  password: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    await register(event.data.email, event.data.password);
    toast.add({
      title: "Registrado, ahora inicia sesion...",
      timeout: 2500,
      callback: async() => {
        await navigateTo('/login')
      }
    })
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">
    <UFormGroup label="Email" name="email">
      <UInput v-model.trim="state.email" />
    </UFormGroup>

    <UFormGroup label="Password" name="password">
      <UInput v-model.trim="state.password" type="password" />
    </UFormGroup>

    <UButton type="submit"> Submit </UButton>
  </UForm>
</template>