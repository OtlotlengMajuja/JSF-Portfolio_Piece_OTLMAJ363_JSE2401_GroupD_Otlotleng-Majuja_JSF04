<template>
  <div class="container mx-auto px-4 py-8">
    <div class="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <div class="p-6">
        <h2 class="text-2xl font-bold mb-6 text-center">Login</h2>
        <form @submit.prevent="login">
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
              required
            />
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
              required
            />
          </div>
          <div class="flex items-center justify-between">
            <button
              type="submit"
              class="bg-black hover:bg-primary-medium text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>
          </div>
        </form>
        <p v-if="error" class="text-red-500 text-xs italic mt-4">{{ error }}</p>
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

    const login = async () => {
      try {
        await store.dispatch("login", {
          username: username.value,
          password: password.value,
        });
        router.push("/products");
      } catch (err) {
        error.value = "Invalid username or password";
      }
    };

    return {
      username,
      password,
      error,
      login,
    };
  },
};
</script>
