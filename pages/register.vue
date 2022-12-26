<template>
    <div class="container">
        <form @submit.prevent="handleRegistration" class="auth-container">
            <Icon v-if="registering" id="spinner-icon" name="gg:spinner"></Icon>
            <p v-if="apiError" id="apiError">API error: {{ apiError.data || apiError }}</p>
            <p v-if="apiSuccess" id="apiSuccess">Succesfully registered! You can now
                <span>
                    <NuxtLink to="/login">login</NuxtLink>
                </span> with your new credentials.
            </p>
            <h1 class="title">Register</h1>
            <h2 class="greet">Make an account to view, edit
                and delete your pastes!</h2>
            <div class="input-container">
                <label for="name">Name: </label>
                <input :class="{ inputError: nameError }" v-model="nameInput" type="text" id="name"
                    required="required" />
                <span class="validationError" v-if="nameError">{{ nameError }}</span>
            </div>
            <div class="input-container">
                <label for="email">Email: </label>
                <input :class="{ inputError: emailError }" v-model="emailInput" type="text" id="email"
                    required="required" />
                <span class="validationError" v-if="emailError">{{ emailError }}</span>

            </div>
            <div class="input-container">
                <label for="password">Password: </label>
                <input :class="{ inputError: passwordError }" v-model="passwordInput" type="password" id="password"
                    required="required" />
                <span class="validationError" v-if="passwordError">{{ passwordError }}</span>

            </div>
            <div class="input-container">
                <label for="confirmPassword">Confirm Password: </label>
                <input :class="{ inputError: confirmPasswordError }" v-model="confirmPasswordInput" type="password"
                    id="confirmPassword" required="required" />
                <span class="validationError" v-if="confirmPasswordError">{{ confirmPasswordError }}</span>

            </div>
            <button :disabled="inputErrors || registering ? true : null" id="registerButton">Register</button>
            <p @click="handleRegisterCTA" id="signup-cta">Already have an account? Login!</p>
            <span id="or">- OR -</span>
            <p @click="handleGuestCTA" id="guest-cta">Continue as a guest.</p>
        </form>
    </div>
</template>

<script setup>
const nameInput = ref(null);
const emailInput = ref(null);
const passwordInput = ref(null);
const confirmPasswordInput = ref(null);
const apiError = ref(null);
const apiSuccess = ref(null);
const registering = ref(null);

const nameError = ref('');
const emailError = ref('');
const passwordError = ref('');
const confirmPasswordError = ref('');
const inputErrors = computed(() => {
    return nameError.value || emailError.value || passwordError.value || confirmPasswordError.value;
})

watch(emailInput, () => {
    if (emailInput.value && !(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(emailInput.value))) emailError.value = 'Invalid email.';
    else emailError.value = '';
})


watch(nameInput, () => {
    if (nameInput.value && nameInput.value.length < 3) nameError.value = 'Name must be at least 3 characters long.';
    else if (nameInput.value.length > 30) nameError.value = 'Name must be smaller than 30 characters long.';
    else nameError.value = '';
})

watch(passwordInput, () => {
    if (passwordInput.value && passwordInput.value.length < 6) passwordError.value = 'Password must be at least 6 characters long.';
    else if (passwordInput.value.length > 255) passwordError.value = 'Password must be smaller than 255 characters.';
    else passwordError.value = '';
    if (confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value) confirmPasswordError.value = 'Passwords do not match.';
    else confirmPasswordError.value = '';
})

watch(confirmPasswordInput, () => {
    if (confirmPasswordInput.value && confirmPasswordInput.value !== passwordInput.value) confirmPasswordError.value = 'Passwords do not match.';
    else confirmPasswordError.value = '';
})

const handleRegisterCTA = async () => {
    await navigateTo(`/login`);
}

const handleGuestCTA = async () => {
    await navigateTo(`/`);
}

const handleRegistration = async () => {
    console.log(nameInput.value, emailInput.value, passwordInput.value, confirmPasswordInput.value);

    if (inputErrors.value) {
        return;
    }

    try {
        registering.value = true;
        const res = await $fetch('https://past3-api.onrender.com/auth/register', {
            method: 'POST',
            body: {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            }
        });

        registering.value = false;
        console.log(res);
        apiError.value = '';
        apiSuccess.value = true;
    } catch (error) {
        registering.value = false;
        apiSuccess.value = false;
        apiError.value = error;
        console.log(error.data);
    }
}

</script>

<style lang="scss" scoped>
@-webkit-keyframes rotating

/* Safari and Chrome */
    {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

#spinner-icon {
    font-size: 2em;
    margin-bottom: 10px;

    -webkit-animation: rotating 1.5s linear infinite;
    -moz-animation: rotating 1.5s linear infinite;
    -ms-animation: rotating 1.5s linear infinite;
    -o-animation: rotating 1.5s linear infinite;
    animation: rotating 1.5s linear infinite;

}

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

div.container {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: 30px;
    box-sizing: border-box;

    & form.auth-container {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        max-width: 500px;
        height: 900px;
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
            height: 930px;
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
            display: flex;
            flex-direction: column;
            text-align: left;
            width: 100%;
            margin-bottom: 30px;
            position: relative;

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

        button#registerButton {
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

        & span#or {
            opacity: 50%;
        }

    }
}
</style>