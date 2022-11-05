<template>
    <div class="container">
        <p v-if="apiError">Api error: {{ apiError }}</p>
        <div v-if="authStore.loggedIn">
            <p v-if="loadingPastes">Loading pastes...</p>
            <p id="no-pastes" v-if="noPastesFound">You have no pastes. Click <span>
                    <NuxtLink to="/">here</NuxtLink>
                </span> to make some!</p>
            <div v-else-if="!loadingPastes" class="pastes-container">
                <ul>
                    <NuxtLink v-for="paste in pastes" :to="`/pastes/${paste._id}`">
                        <li>
                            <div id="title"><span id="title">Title:</span> {{ paste.title }}</div>
                            <div id="title"><span id="title">Author:</span> {{ paste.author }}</div>
                            <div id="date"><span id="title">Added date:</span> {{ paste.addedDate.slice(0, 10) }}</div>
                        </li>
                    </NuxtLink>
                </ul>
            </div>
        </div>
        <div v-else>
            <p>You need to have an account to see your pastes.</p>
        </div>

    </div>
</template>

<script setup>
import VueJwtDecode from 'vue-jwt-decode'

const authStore = useAuthStore();

const pastes = ref([]);
const noPastesFound = ref(null);
const loadingPastes = ref(true);
const apiError = ref(null);

onMounted(async () => {
    try {
        loadingPastes.value = true;

        const data = {
            method: 'GET',
            headers: {
                'auth-token': authStore.token
            }
        }

        const userId = VueJwtDecode.decode(authStore.token).userId;
        console.log(userId);

        const res = await $fetch(`https://past3-api.onrender.com/pastes/user/${userId}`, data);
        pastes.value = res;

        noPastesFound.value = false;
        loadingPastes.value = false;
        apiError.value = null;
    } catch (error) {
        console.log(error);
        noPastesFound.value = true;
        // apiError.value = null;
        loadingPastes.value = false;
    }
});

</script>

<style lang="scss" scoped>
div.container {
    box-sizing: border-box;
    padding: 30px;
    min-height: 100vh;

    p#no-pastes {
        margin-top: 0;

        & span {
            & a {
                all: unset;
                text-decoration: underline;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

}

div.pastes-container {
    display: flex;
    justify-content: center;

    & a {
        all: unset;

        &:hover {
            cursor: pointer;
        }
    }

    & ul {
        all: unset;
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 600px;
        gap: 30px;

        & li {
            all: unset;
            box-sizing: border-box;
            background-color: var(--background-color-secondary);
            border-radius: 20px;
            width: 100%;
            height: fit-content;
            padding: 30px;
            overflow-wrap: break-word;
            transition: box-shadow .2s ease-in-out;
            display: flex;
            flex-direction: column;
            gap: 20px;

            &:hover {
                box-shadow: var(--shadow) 0px 7px 29px 0px;
            }

            & div#title,
            & div#author,
            & div#date {
                & span {
                    font-weight: bold;
                }
            }
        }
    }
}
</style>