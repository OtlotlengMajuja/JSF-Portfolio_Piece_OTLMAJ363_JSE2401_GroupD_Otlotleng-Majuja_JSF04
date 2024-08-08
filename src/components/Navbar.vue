<template>
  <nav class="bg-primary-medium border-primary-dark sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img
              src="../../public/logo.png"
              class="h-8 w-8"
              alt="Emercom Logo"
            />
            <span class="ml-2 text-black text-lg font-semibold">Emercom</span>
          </router-link>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              to="/products"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >Products</router-link
            >
            <template v-if="isAuthenticated">
              <span
                class="text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
              >
                Welcome, {{ currentUser.username }}
              </span>
              <button
                @click="logout"
                class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </template>
            <router-link
              v-else
              to="/login"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
            >
              Login
            </router-link>
          </div>
        </div>
        <div class="md:hidden">
          <button @click="toggleMenu" class="text-gray-400 hover:text-white">
            <svg
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div :class="{ hidden: !isMenuOpen }" class="md:hidden">
      <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        <router-link
          to="/products"
          class="text-black hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          >Products</router-link
        >
        <router-link
          v-if="isAuthenticated"
          to="/cart"
          class="text-black hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
        >
          Cart ({{ cartItemsCount }})
        </router-link>
        <template v-if="isAuthenticated">
          <span
            class="text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Welcome, {{ currentUser.username }}
          </span>
          <button
            @click="logout"
            class="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left"
          >
            Logout
          </button>
        </template>
        <router-link
          v-else
          to="/login"
          class="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

/**
 * Navbar component
 *
 * This component represents the navigation bar for the application.
 *
 * @component
 * @property {boolean} isMenuOpen - Indicates whether the mobile menu is open.
 * @property {boolean} isAuthenticated - Indicates whether the user is authenticated.
 * @property {Object} currentUser - The current authenticated user.
 */
export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isMenuOpen = ref(false);

    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const currentUser = computed(() => store.getters.currentUser);

    /**
     * Toggles the mobile menu open/closed state.
     */
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    /**
     * Logs out the current user.
     */
    const logout = () => {
      store.dispatch("logout");
      router.push("/login");
      if (isMenuOpen.value) {
        toggleMenu();
      }
    };

    return {
      isMenuOpen,
      isAuthenticated,
      currentUser,
      toggleMenu,
      logout,
    };
  },
};
</script>
