<template>
    <div>
        <div class="container">
            <button @click="changeTheme" id="themeToggle">
                <Icon id="icon" :name="themeStore.darkMode ? `lucide:moon` : `lucide:sun`" />
            </button>
            <div class="paste-container">
                <div class="paste">
                    <label for="paste">Your paste: </label>
                    <textarea ref="pasteInput" v-model="paste" id="paste"></textarea>
                </div>
            </div>
            <div class="options-container">
                <div class="option">
                    <label for="author">Author: </label>
                    <input ref="authorInput" v-model="author" type="text" id="author" />
                </div>

                <div class="option">
                    <label for="title">Title: </label>
                    <input ref="titleInput" v-model="title" type="text" id="title" />
                </div>

                <div class="option">
                    <label for="syntax">Syntax Highlighting: </label>
                    <div class="wrapper">
                        <select type="text" id="syntax">
                            <option value="None">None (Coming soon)</option>
                        </select>
                    </div>

                </div>

                <div class="buttons">
                    <button @click="handleSave" id="save">
                        Save
                        <Icon id="icon" name="lucide:save" />
                    </button>
                    <button @click="handleDelete" id="clear">
                        Delete
                        <Icon id="icon" name="lucide:trash" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const paste = ref('');
const title = ref('');
const author = ref('');

const pasteInput = ref(null);
const titleInput = ref(null);
const authorInput = ref(null);

// const { data: pastes } = await useAsyncData('pastes', () => $fetch('http://localhost:8000/pastes'))

// useHead({
//     meta: [
//         { name: 'og:title', content: pastes.value[0].title },
//         { name: 'og:description', content: pastes.value[0].paste },
//     ]
// });

const themeStore = useThemeStore();

const changeTheme = () => {
    themeStore.darkMode = !themeStore.darkMode;
    document.documentElement.classList.toggle("dark-theme", themeStore.darkMode);
};

const handleSave = async () => {
    try {
        console.log(paste.value);
        console.log(title.value);
        console.log(author.value);


        if (title.value && author.value && paste.value) {
            const res = await $fetch('http://192.168.50.237:8000/pastes', {
                method: 'POST',
                body: {
                    title: title.value,
                    author: author.value,
                    paste: paste.value,
                }
            });

            pasteInput.value.classList.toggle("empty-input", !paste.value);
            titleInput.value.classList.toggle("empty-input", !title.value);
            authorInput.value.classList.toggle("empty-input", !author.value);

            console.log(`Paste id: ${res.newPaste._id}`);
            await navigateTo(`/pastes/${res.newPaste._id}`);
        } else {
            pasteInput.value.classList.toggle("empty-input", !paste.value);
            titleInput.value.classList.toggle("empty-input", !title.value);
            authorInput.value.classList.toggle("empty-input", !author.value);

            console.log("Red fields cannot be empty");
        }

    } catch (error) {
        console.log(error);
    }
};

const handleDelete = () => {
    title.value = '';
    author.value = '';
    paste.value = '';
}
</script>

<style lang="scss" scoped>
.empty-input {
    border-color: red !important;
}

button#themeToggle {
    all: unset;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.1em;
    position: absolute;
    top: 20px;
    width: 40px;
    height: 40px;
    border: 1px solid var(--accent-color);
    border-radius: 10px;
    transition: background-color .2s ease-in-out;

    &:hover {
        background-color: var(--background-color-secondary);
        cursor: pointer;
    }
}

div.container {
    position: relative;
    box-sizing: border-box;
    width: 100vw;
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    @media only screen and (max-width: 900px) {
        flex-direction: column;
        padding: 70px 50px 0px 50px;
    }

    & div.paste-container {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        width: 50%;
        align-items: center;

        & div.paste {
            width: 100%;
            max-width: 80%;

            @media only screen and (max-width: 900px) {
                max-width: 100%;
            }
        }

        & textarea#paste {
            box-sizing: border-box;
            background-color: var(--background-color-secondary);
            color: var(--text-color-primary);
            margin-top: 15px;
            border-radius: 15px;
            border: 1px solid var(--accent-color);
            padding: 20px;
            resize: none;
            height: 600px;
            width: 100%;
            transition: box-shadow .2s ease-in-out;
            word-wrap: break-word;

            &:hover {
                box-shadow: var(--shadow) 0px 7px 29px 0px;
            }

            &:focus {
                outline: none;
                box-shadow: var(--shadow) 0px 7px 29px 0px;
            }

        }

        @media only screen and (max-width: 900px) {
            margin-bottom: 50px;
            width: 100%;
        }
    }

    & div.options-container {
        box-sizing: border-box;
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;

        & div.option {
            display: flex;
            flex-direction: column;
            width: 100%;
            max-width: 80%;
            margin-bottom: 50px;

            & label {
                margin-bottom: 15px;
            }

            & input {
                background-color: var(--background-color-secondary);
                border: 1px solid var(--accent-color);
                border-radius: 15px;
                padding: 0 20px;
                height: 60px;
                color: var(--text-color-primary);
                transition: box-shadow .2s ease-in-out;
                font-size: 1em;

                &:hover {
                    box-shadow: var(--shadow) 0px 7px 29px 0px;
                }

                &:focus {
                    outline: none;
                    box-shadow: var(--shadow) 0px 7px 29px 0px;
                }
            }

            & div.wrapper {
                border: 1px solid var(--accent-color);
                border-radius: 15px;

                & select {
                    background-color: var(--background-color-secondary);
                    border-radius: 15px;
                    padding: 20 0px;
                    color: var(--text-color-primary);
                    transition: box-shadow .2s ease-in-out;
                    border: none;
                    border-right: 16px solid transparent;
                    border-left: 16px solid transparent;
                    width: 100%;
                    font-size: 1em;
                    height: 60px;


                    &:hover {
                        box-shadow: var(--shadow) 0px 7px 29px 0px;
                        cursor: pointer;
                    }

                    &:focus {
                        outline: none;
                        box-shadow: var(--shadow) 0px 7px 29px 0px;
                    }
                }
            }



            @media only screen and (max-width: 900px) {
                max-width: 100%;
            }
        }

        @media only screen and (max-width: 900px) {
            margin-bottom: 50px;
            width: 100%;
        }

        div.buttons {
            display: flex;
            justify-content: center;

            button {
                all: unset;
                background-color: var(--background-color-secondary);
                border: 1px solid var(--accent-color);
                border-radius: 15px;
                height: 60px;
                color: var(--text-color-primary);
                transition: box-shadow .2s ease-in-out;
                width: 120px;
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
                    font-size: 1.2em;
                }
            }
        }
    }
}
</style>
