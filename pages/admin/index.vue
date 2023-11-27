<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});

const { logout, infoCurrentUser } = useFirebaseAuth();
const toast = useToast();

async function handleLogout() {
  try {
    await logout();
    toast.add({
      title: "Adios...",
      timeout: 500,
      callback: async () => {
        await navigateTo("/login");
      },
    });
  } catch (error) {
    console.log(error);
  }
}
</script>

<template>
  <div>
    <h1>ADMIN (Ruta protegida)</h1>
    <h2>{{ infoCurrentUser?.email }}</h2>
    <h2>{{ infoCurrentUser?.uid }}</h2>
    <UButton class="mt-5" @click="handleLogout">Logout</UButton>
  </div>
</template>