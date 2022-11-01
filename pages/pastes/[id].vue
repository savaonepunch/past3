<template>
    <div class="container">
        <div v-if="paste">
            <p>Title: <span>{{ paste.title }}</span></p>
            <p>Author: <span>{{ paste.author }}</span></p>
            <div id="paste">
                <!-- <p>{{paste.syntax}}</p> -->
                <prism id="prism" :language="'poop'">{{paste.paste}}</prism>
                <!-- <textarea readonly>{{paste.paste}}</textarea>
                <textarea readonly>{{paste.syntax}}</textarea> -->
            </div>
        </div>
        <p v-else>Couldn't find paste with ID: {{route.params.id}}</p>

        <button @click="handleNewPaste">
            New Paste
            <Icon id="icon" name="material-symbols:add-box-rounded" />
        </button>
    </div>
</template>

<script setup>
import Prism from 'vue-prism-component'

const route = useRoute();
const loadSyntax = ref(false);

const { data: paste } = await useAsyncData(route.params.id, () => $fetch(`https://past3-api.onrender.com/pastes/${route.params.id}`))

// const { data: paste } = await useFetch(`http://localhost:8000/pastes/${route.params.id}`);

useHead({
    meta: [
        { name: 'og:site_name', content: paste.value?.author ? paste.value.author : "N/A" },
        { name: 'og:title', content: paste.value?.title ? paste.value.title : "N/A" },
        { name: 'og:description', content: paste.value?.paste ? paste.value.paste : "N/A" },
    ]
});

onBeforeMount(() => {
    console.log(paste.value.syntax);
})

onMounted(() => {
    console.log(paste.value.syntax);
    // console.log(route.params.id);
    // setTimeout(() => {
    //     loadSyntax.value = true;
    // }, 3000);
})

const handleNewPaste = async () => {
    await navigateTo('/')
}
</script>

<style lang="scss" scoped>
div.container {
    box-sizing: border-box;
    padding: 30px;

    & p {
        margin-top: 0px;
        margin-bottom: 0px;
        font-family: Gilroy-Bold;
    }

    & span {
        font-family: Gilroy-Medium;
    }
}

#prism {
    margin: 30px 0;
    height: 600px;
    transition: box-shadow .2s ease-in-out;

    &:hover {
        box-shadow: var(--shadow) 0px 7px 29px 0px;
    }
}

button {
    all: unset;
    background-color: var(--background-color-secondary);
    border: 1px solid var(--accent-color);
    border-radius: 15px;
    height: 60px;
    color: var(--text-color-primary);
    transition: box-shadow .2s ease-in-out;
    width: 150px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:first-of-type {
        margin-right: 20px;
    }


    &:hover {
        box-shadow: var(--shadow) 0px 7px 29px 0px;
        cursor: pointer;
    }

    & #icon {
        color: var(--text-color-primary);
        margin-left: 15px;
        font-size: 1.5em;
    }
}
</style>