<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const { postPeople } = usePeopleFirestore();

const roles = ["Admin", "Member", "Owner"]

const schema = z.object({
  name: z.string().min(3, "Too short").max(50, "Too long"),
  title: z.string().min(3, "Too short").max(50, "Too long"),
  email: z.string().email("Invalid email"),
  role: z.enum(roles)
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: undefined,
  role: "Owner",
  name: undefined,
  title: undefined,
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
    await postPeople({
        name: event.data.name,
        title: event.data.title,
        email: event.data.email,
        role: event.data.role
    });
}
</script>

<template>
  <UForm :schema="schema" :state="state" class="space-y-4" @submit="onSubmit">

    <UFormGroup label="Name" name="name">
      <UInput v-model="state.name" type="text" />
    </UFormGroup>

    <UFormGroup label="Title" name="title">
      <UInput v-model="state.title" type="text" />
    </UFormGroup>

    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

    <UFormGroup label="Role" name="role">
      <USelect v-model="state.role" :options="roles" />
    </UFormGroup>

    <UButton type="submit"> Add People </UButton>
  </UForm>
</template>

