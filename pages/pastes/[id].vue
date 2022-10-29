<template>
    <div class="container">
        <p>Title: <span>{{ paste.title }}</span></p>
        <p>Author: <span>{{ paste.author }}</span></p>
        <div id="paste">
            <textarea readonly>{{paste.paste}}</textarea>
        </div>
        <button @click="handleNewPaste">New Paste</button>
    </div>
</template>

<script setup>
const route = useRoute()

const { data: paste } = await useAsyncData(route.params.id, () => $fetch(`http://192.168.50.237:8000/pastes/${route.params.id}`))

// const { data: paste } = await useFetch(`http://localhost:8000/pastes/${route.params.id}`);

useHead({
    meta: [
        { name: 'og:site_name', content: paste.value.author },
        { name: 'og:title', content: paste.value.title },
        { name: 'og:description', content: paste.value.paste },
    ]
});

onMounted(() => {
    console.log(route.params.id);
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
div#paste {
    & textarea {
        background-color: var(--background-color-secondary);
        color: white;
        width: 100%;
        max-width: 500px;
        height: 500px;
        margin: 30px 0px;
    }
}
</style>