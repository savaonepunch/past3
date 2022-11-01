<template>
  <div>
    <NuxtPage/>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script setup>
import 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'

const themeStore = useThemeStore();

onMounted(() => {
    document.documentElement.classList.toggle("dark-theme", themeStore.darkMode);
});
</script>