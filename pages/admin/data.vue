<script setup lang="ts">
import type { People } from '~/interfaces/people.type';

const { getPeoples, peoples, deletePeople } = usePeopleFirestore();

await getPeoples();

const columns = [
  {
    key: "id",
    label: "ID",
    class: 'uppercase dark:text-rose-500'
  },
  {
    key: "name",
    label: "User name",
    class: 'uppercase dark:text-rose-500'
  },
  {
    key: "title",
    label: "Job position",
    class: 'uppercase dark:text-rose-500'
  },
  {
    key: "email",
    label: "Email",
    class: 'uppercase dark:text-rose-500'
  },
  {
    key: "role",
    label: "Role",
    class: 'uppercase dark:text-rose-500'
  },
  {
    key: "actions",
    label: "Actions",
    class: 'uppercase dark:text-rose-500'
  },
];

const items = (row: People) => [
  [
    {
      label: "Edit",
      icon: "i-heroicons-pencil-square-20-solid",
      click: () => console.log("Edit", row.id),
    },
  ],
  [
    {
      label: "Delete",
      icon: "i-heroicons-trash-20-solid",
      click: async () => await deletePeople(row.id),
    },
  ],
];
</script>

<template>
  <PeopleForm />
  <UTable :rows="peoples" :columns="columns">
    <template #actions-data="{ row }">
      <UDropdown :items="items(row)">
        <UButton
          color="gray"
          variant="ghost"
          icon="i-heroicons-ellipsis-horizontal-20-solid"
        />
      </UDropdown>
    </template>
  </UTable>
</template>

