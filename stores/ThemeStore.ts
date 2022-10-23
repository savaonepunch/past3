export const useThemeStore = defineStore(
  "ThemeStore",
  () => {
    const darkMode = ref(true);

    return { darkMode };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useThemeStore, import.meta.hot));
}