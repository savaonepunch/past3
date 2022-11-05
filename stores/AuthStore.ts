export const useAuthStore = defineStore(
  "AuthStore",
  () => {
    const token = ref(false);
    const loggedIn = computed(() => token.value ? true : false)

    return { token, loggedIn };
  },
  {
    persist: true,
  }
);

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot));
}