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

    /**
     * Computed property that determines if the dark mode is active.
     * @type {boolean}
     */
    const isDarkMode = computed(() => store.getters.currentTheme === "dark");

    /**
     * Computed property that returns the current theme.
     * @type {string}
     */
    const theme = computed(() => store.getters.currentTheme);

    /**
     * Lifecycle hook that runs when the component is mounted.
     *
     * Dispatches Vuex actions to check authentication, load the comparison list, and initialize the theme.
     */
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
/**
 * Root variables defining the color scheme for light mode.
 */
:root {
  --primary-dark: #121425;
  --primary-medium: #4f2c2c;
  --primary-light: #fcfcfc;
  --primary-accent1: #8c4433;
  --primary-accent2: #c95c3b;
  --bg-color: #ffffff;
  --text-color: #000000;
}

/**
 * Base styles for the body element.
 *
 * These styles set the default background and text colors, as well as
 * ensuring a minimum height and smooth transitions between color changes.
 */
body {
  font-family: BDSans-Regular, sans-serif !important;
  background-color: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  transition: background-color 0.3s, color 0.3s;
}

/**
 * Dark mode styles.
 *
 * Overrides the light mode variables with dark mode equivalents.
 */
.dark-mode {
  --primary-dark: #fcfcfc;
  --primary-medium: #a07373;
  --primary-light: #121425;
  --primary-accent1: #d99b8c;
  --primary-accent2: #e6a38f;
  --bg-color: #121425;
  --text-color: #fcfcfc;
}

/**
 * Global transition for background and text colors.
 */
* {
  transition: background-color 0.3s, color 0.3s;
}

/**
 * Styles for buttons.
 *
 * Buttons use the primary accent color for their background and the primary light color for text.
 */
.btn {
  background-color: var(--primary-accent2);
  color: var(--primary-light);
}

/**
 * Styles for card components.
 *
 * Cards have a background color and text color matching the theme, with a border
 * matching the primary medium color.
 */
.card {
  background-color: var(--bg-color);
  color: var(--text-color);
  border: 1px solid var(--primary-medium);
}
</style>
