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
          <div class="mb-6">
            <label
              for="password"
              class="block text-gray-700 text-sm font-bold mb-2"
              >Password</label
            >
            <input
              type="password"
              id="password"
              v-model="password"
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              :class="{ 'border-red-500': passwordError }"
              :disabled="isLoading"
              required
            />
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
import { useRouter } from "vue-router";

export default {
  name: "Login",
  setup() {
    const store = useStore();
    const router = useRouter();
    const username = ref("");
    const password = ref("");
    const error = ref("");
    const usernameError = ref("");
    const passwordError = ref("");
    const isLoading = ref(false);

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
        router.push("/products");
      } catch (err) {
        error.value =
          "Login failed. Please check your username and password and try again.";
      } finally {
        isLoading.value = false;
      }
    };

    return {
      username,
      password,
      error,
      usernameError,
      passwordError,
      isLoading,
      submitForm,
    };
  },
};
</script>
