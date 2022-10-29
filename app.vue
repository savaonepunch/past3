<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup>
const themeStore = useThemeStore();

onMounted(() => {
    document.documentElement.classList.toggle("dark-theme", themeStore.darkMode);
});
</script>