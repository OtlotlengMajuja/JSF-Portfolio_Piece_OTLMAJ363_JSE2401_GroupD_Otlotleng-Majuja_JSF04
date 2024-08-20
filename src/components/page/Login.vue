<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="submitForm">
          <div class="mb-4">
            <label
              for="username"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Username</label
            >
            <input
              type="text"
              id="username"
              v-model="username"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': usernameError }"
              :disabled="isLoading"
              required
            />
            <p v-if="usernameError" class="text-red-500 text-xs italic mt-1">
              {{ usernameError }}
            </p>
          </div>
          <div class="mb-6 relative">
            <label
              for="password"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Password</label
            >
            <input
              :type="showPassword ? 'text' : 'password'"
              id="password"
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline pr-10"
              :class="{ 'border-red-500': passwordError }"
              :disabled="isLoading"
              required
            />
            <button
              type="button"
              @click="togglePasswordVisibility"
              class="absolute inset-y-0 right-0 top-6 pr-3 flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-gray-500"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                />
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
            <p v-if="passwordError" class="text-red-500 text-xs italic mt-1">
              {{ passwordError }}
            </p>
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-black hover:bg-primary-medium text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              :disabled="isLoading"
            >
              {{ isLoading ? "Signing In..." : "Sign In" }}
            </button>
          </div>
        </form>
        <div v-if="isLoading" class="mt-4 text-center">
          <p class="text-primary-medium">Authenticating... Please wait.</p>
        </div>
        <div
          v-if="error"
          class="mt-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded"
        >
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

/**
 * The Login component handles user authentication. It allows users to input their
 * username and password, and provides feedback for validation and errors. It uses
 * Vuex for state management and Vue Router for navigation.
 *
 * @component
 */
export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const route = useRoute();

    const username = ref("");
    const password = ref("");
    const error = ref("");
    const usernameError = ref("");
    const passwordError = ref("");
    const isLoading = ref(false);
    const showPassword = ref(false);

    /**
     * Handles the form submission process.
     * Validates the form, attempts login via Vuex store, and handles errors.
     *
     * @returns {Promise<void>}
     */
    const submitForm = async () => {
      if (!validateForm()) {
        return;
      }

      isLoading.value = true;
      error.value = "";

      try {
        await store.dispatch("login", {
          username: username.value.trim(),
          password: password.value.trim(),
        });

        // Redirect to the intended page or default to ProductList
        const redirectPath = route.query.redirect || "/products";
        router.push(redirectPath);
      } catch (err) {
        /*console.log("err = ", err);
        console.log("error = ", error);*/
        error.value =
          "Login failed. Please check your username and password and try again.";
      } finally {
        isLoading.value = false;
      }
    };

    /**
     * Validates the form fields and updates error messages.
     *
     * @returns {boolean} True if the form is valid, false otherwise.
     */
    const validateForm = () => {
      let isValid = true;
      usernameError.value = "";
      passwordError.value = "";

      if (!username.value.trim()) {
        usernameError.value = "Username is required";
        isValid = false;
      }

      if (!password.value.trim()) {
        passwordError.value = "Password is required";
        isValid = false;
      }

      return isValid;
    };

    /**
     * Toggles the visibility of the password input field.
     */
    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    return {
      username,
      password,
      error,
      usernameError,
      passwordError,
      isLoading,
      showPassword,
      submitForm,
      togglePasswordVisibility,
    };
  },
};
</script>
