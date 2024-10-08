<template>
  <nav class="bg-primary-medium border-primary-dark sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="flex items-center">
            <img src="/logo.png" class="h-8 w-8" alt="Emercom Logo" />
            <span class="ml-2 text-black text-lg font-semibold">Emercom</span>
          </router-link>
        </div>
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <router-link
              to="/products"
              class="text-black hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              @click="toggleMenu"
              >Products</router-link
            >
            <template v-if="isAuthenticated">
              <span class="text-black px-3 py-2 rounded-md text-sm font-medium">
                Welcome, {{ currentUser.username }}
              </span>
              <router-link
                to="/cart"
                class="text-black hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                @click="toggleMenu"
              >
                Cart ({{ cartItemsCount }})
              </router-link>
              <router-link
                v-if="isAuthenticated"
                to="/comparison"
                class="text-black hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                @click="toggleMenu"
                >Compare ({{ comparisonListCount }})
              </router-link>
              <router-link
                v-if="isAuthenticated"
                to="/wishlist"
                class="text-black hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                @click="toggleMenu"
              >
                Wishlist ({{ wishlistItemsCount }})
              </router-link>
              <button
                @click="logout"
                class="text-black hover:bg-pink-600 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </template>
            <router-link
              v-else
              to="/login"
              class="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              @click="toggleMenu"
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
          class="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
          @click="toggleMenu"
          >Products</router-link
        >
        <template v-if="isAuthenticated">
          <span
            class="text-black block px-3 py-2 rounded-md text-base font-medium"
          >
            Welcome, {{ currentUser.username }}
          </span>
          <router-link
            to="/cart"
            class="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click="toggleMenu"
          >
            Cart ({{ cartItemsCount }})
          </router-link>
          <router-link
            v-if="isAuthenticated"
            to="/comparison"
            class="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click="toggleMenu"
            >Compare ({{ comparisonListCount }})
          </router-link>
          <router-link
            v-if="isAuthenticated"
            to="/wishlist"
            class="text-black hover:bg-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
            @click="toggleMenu"
          >
            Wishlist ({{ wishlistItemsCount }})
          </router-link>
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
          @click="toggleMenu"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
  <button
    @click="toggleTheme"
    class="ml-4 p-2 rounded-full hover:bg-primary-accent1"
    :aria-label="isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    <svg
      v-if="isDarkMode"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  </button>
</template>

<style scoped>
.theme-toggle {
  position: fixed;
  bottom: 20px;
  right: 20px;
  padding: 10px;
  background-color: var(--primary-medium);
  color: var(--primary-light);
  border-radius: 50%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.1);
}

@media (max-width: 768px) {
  .theme-toggle {
    bottom: 10px;
    right: 10px;
  }
}
</style>

<script>
import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

/**
 * Navbar component
 *
 * This component represents the navigation bar for the application.
 * It includes links to different sections of the application such as products, cart, comparison, and wishlist.
 * It also supports user authentication with login/logout functionality.
 *
 * @component
 */
export default {
  name: "Navbar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const isMenuOpen = ref(false);

    /**
     * Computed property to check if the user is authenticated.
     *
     * @type {import('vue').ComputedRef<boolean>}
     */
    const isAuthenticated = computed(() => store.getters.isAuthenticated);

    /**
     * Computed property to get the current authenticated user.
     *
     * @type {import('vue').ComputedRef<Object>}
     */
    const currentUser = computed(() => store.getters.currentUser);

    /**
     * Computed property to get the count of items in the cart.
     *
     * @type {import('vue').ComputedRef<number>}
     */
    const cartItemsCount = computed(() => store.getters.cartItemsCount);

    /**
     * Computed property to get the count of items in the comparison list.
     *
     * @type {import('vue').ComputedRef<number>}
     */
    const comparisonListCount = computed(
      () => store.getters.comparisonListCount
    );

    /**
     * Computed property to check if the current theme is dark mode.
     *
     * @type {import('vue').ComputedRef<boolean>}
     */
    const isDarkMode = computed(() => store.getters.currentTheme === "dark");

    /**
     * Computed property to get the count of items in the wishlist.
     *
     * @type {import('vue').ComputedRef<number>}
     */
    const wishlistItemsCount = computed(() => store.getters.wishlistItemsCount);

    /**
     * Toggles the mobile menu open/closed state.
     *
     * @function
     */
    const toggleMenu = () => {
      isMenuOpen.value = !isMenuOpen.value;
    };

    /**
     * Logs out the current user and redirects to the login page.
     *
     * @function
     */
    const logout = () => {
      store.dispatch("logout");
      router.push("/login");
      toggleMenu();
    };

    /**
     * Toggles the application theme between light and dark mode.
     *
     * @function
     */
    const toggleTheme = () => {
      store.dispatch("toggleTheme");
    };

    return {
      isMenuOpen,
      isAuthenticated,
      currentUser,
      cartItemsCount,
      comparisonListCount,
      isDarkMode,
      toggleMenu,
      logout,
      toggleTheme,
      wishlistItemsCount,
    };
  },
};
</script>
