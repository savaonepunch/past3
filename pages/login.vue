<template>
    <div class="container">
        <form @submit.prevent="handleLogin" class="auth-container">
            <p v-if="loggingIn">Logging in...</p>
            <p v-if="apiError" id="apiError">Error:
                {{ apiError.data.message || apiError.data || apiError }}
            </p>
            <p v-if="apiSuccess" id="apiSuccess">Logged In! Redirecting...</p>
            <h1 class="title">Login</h1>
            <h2 class="greet">Welcome back!</h2>
            <div class="input-container">
                <label for="email">Email: </label>
                <input required :class="{ inputError: emailError }" v-model="emailInput" type="text" id="email" />
                <span class="validationError" v-if="emailError">{{ emailError }}</span>
            </div>
            <div class="input-container">
                <label for="password">Password: </label>
                <input required :class="{ inputError: passwordError }" v-model="passwordInput" type="password"
                    id="password" />
                <span class="validationError" v-if="passwordError">{{ passwordError }}</span>

            </div>
            <button :disabled="inputErrors ? true : null" id="loginButton">Login</button>
            <p @click="handleRegisterCTA" id="signup-cta">Don’t have an account? Sign up!</p>
            <span>- OR -</span>
            <p @click="handleGuestCTA" id="guest-cta">Continue as a guest.</p>
        </form>
    </div>
</template>

<script setup>
const authStore = useAuthStore();

const emailInput = ref(null);
const passwordInput = ref(null);
const apiError = ref(null);
const apiSuccess = ref(null);
const loggingIn = ref(false);

const emailError = ref('');
const passwordError = ref('');

const inputErrors = computed(() => {
    return emailError.value || passwordError.value;
})

watch(emailInput, () => {
    if (emailInput.value && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailInput.value))) emailError.value = 'Invalid email.';
    else emailError.value = '';
})

watch(passwordInput, () => {
    if (passwordInput.value && passwordInput.value.length < 6) passwordError.value = 'Password must be at least 6 characters long.';
    else if (passwordInput.value.length > 255) passwordError.value = 'Password must be smaller than 255 characters.';
    else passwordError.value = '';
})

const handleLogin = async () => {
    if (inputErrors.value) {
        return;
    }

    loggingIn.value = true;

    try {
        const res = await $fetch('https://past3-api.onrender.com/auth/login', {
            method: 'POST',
            body: {
                email: emailInput.value,
                password: passwordInput.value,
            }
        });

        console.log(res);
        loggingIn.value = false;
        apiError.value = '';
        apiSuccess.value = true;
        authStore.token = res.token;
        await navigateTo(`/`);
    } catch (error) {
        apiSuccess.value = false;
        apiError.value = error;
        console.log(error);
        loggingIn.value = false;
    }
};

const handleRegisterCTA = async () => {
    await navigateTo(`/register`);
};

const handleGuestCTA = async () => {
    await navigateTo(`/`);
};

</script>

<style lang="scss" scoped>
span.validationError {
    margin-left: 30px;
    margin-top: 15px;
    position: absolute;
    bottom: -20px;
    color: red;
    opacity: 100% !important;
    font-size: .8em;
}

p#apiError {
    color: red;
    top: 0px;
    font-size: 1em;
    margin: 0;
}

p#apiSuccess {
    color: rgb(15, 184, 0);
}

div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 30px;
    box-sizing: border-box;

    & form.auth-container {
        box-sizing: border-box;
        width: 100%;
        max-width: 500px;
        height: 650px;
        background-color: var(--background-color-secondary);
        border-radius: 20px;
        transition: box-shadow .2s ease-in-out;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        border: 1px solid var(--accent-color);
        padding: 0 50px;

        @media only screen and (max-width: 500px) {
            padding: 0 20px;
        }

        &:hover {
            box-shadow: var(--shadow) 0px 7px 29px 0px;
        }

        & h1.title {
            font-family: Gilroy-Bold;
            font-size: 2.5em;
            margin: 0;

        }

        & h2.greet {
            font-family: Gilroy-Medium;
            font-size: 1.1em;
            opacity: 80%;
            font-weight: 100;
            margin-bottom: 50px;
        }

        & label {
            font-family: Gilroy-Medium;
            font-size: 1.1em;
            opacity: 80%;
            margin-bottom: 15px;
            margin-left: 30px;
        }

        & div.input-container {
            position: relative;
            display: flex;
            flex-direction: column;
            text-align: left;
            width: 100%;
            margin-bottom: 30px;

            & input {
                padding: 15px 30px;
                border: none;
                border-radius: 100px;
                font-size: 1em;
                background-color: var(--background-color-primary);
                color: var(--text-primary-color);
                outline: none;

                &:hover,
                &:focus {
                    outline: 1px solid var(--accent-color);
                }

                &.inputError {
                    outline: 1px solid red;

                }
            }


        }

        button#loginButton {
            all: unset;
            width: 100%;
            padding: 15px 0;
            font-family: Gilroy-Medium;
            font-size: 1.1em;
            color: var(--background-color-primary);
            background-color: var(--text-primary-color);
            border-radius: 100px;
            margin-top: 15px;
            transition: opacity .2s ease-in-out;

            &:hover {
                cursor: pointer;
                opacity: 80%;
            }

            &:disabled {
                opacity: 80%;
                cursor: not-allowed;
            }
        }

        & p#signup-cta {
            margin-top: 30px;
            margin-bottom: 5px;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        & p#guest-cta {
            margin-top: 5px;

            &:hover {
                text-decoration: underline;
                cursor: pointer;
            }
        }

        & span {
            opacity: 50%;
        }

    }
}
</style>