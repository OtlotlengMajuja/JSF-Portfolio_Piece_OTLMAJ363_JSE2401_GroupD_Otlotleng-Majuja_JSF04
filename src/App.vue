<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }" :key="theme">
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { onMounted, computed } from "vue";
import { useStore } from "vuex";

/**
 * The root component of the application.
 *
 * This component serves as the main entry point for the application, rendering
 * the navigation bar and the router view where different pages will be displayed.
 *
 * @component
 */
export default {
  name: "App",
  components: {
    /**
     * Navbar component
     */
    Navbar,
  },
  setup() {
    const store = useStore();
    const isDarkMode = computed(() => store.state.theme === "dark");
    const theme = computed(() => store.state.theme);

    onMounted(() => {
      store.dispatch("checkAuth");
      store.dispatch("loadComparisonList");
      store.dispatch("initTheme");
    });

    return {
      isDarkMode,
      theme,
    };
  },
};
</script>

<style>
:root {
  --primary-dark: #121425;
  --primary-medium: #4f2c2c;
  --primary-light: #fcfcfc;
  --primary-accent1: #8c4433;
  --primary-accent2: #c95c3b;
  --bg-color: #ffffff;
  --text-color: #000000;
}

body {
  font-family: BDSans-Regular, sans-serif !important;
  background-color: var(--bg-color);
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

.dark-mode {
  --primary-dark: #fcfcfc;
  --primary-medium: #a07373;
  --primary-light: #121425;
  --primary-accent1: #d99b8c;
  --primary-accent2: #e6a38f;
  --bg-color: #121425;
  --text-color: #fcfcfc;
}

* {
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  transition: background-color 0.3s, color 0.3s;
}
</style>
