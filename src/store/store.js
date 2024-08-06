import { createStore } from 'vuex';

export default createStore({
    state: {
        /**
         * List of products.
         * @type {Array<Object>}
         */
        products: [],

        /**
         * Loading state.
         * @type {boolean}
         */
        loading: true,

        /**
         * Selected category for filtering.
         * @type {string}
         */
        selectedCategory: "",

        /**
         * Sort order for products.
         * @type {string}
         */
        sortOrder: "",

        /**
         * List of product categories.
         * @type {Array<string>}
         */
        categories: [],
        user: null,
        token: null,
    },
    mutations: {
        /**
         * Sets the list of products.
         * @param {Object} state - Vuex state.
         * @param {Array<Object>} products - List of products.
         */
        setProducts(state, products) {
            state.products = products;
        },

        /**
         * Sets the loading state.
         * @param {Object} state - Vuex state.
         * @param {boolean} loading - Loading state.
         */
        setLoading(state, loading) {
            state.loading = loading;
        },

        /**
         * Sets the selected category for filtering.
         * @param {Object} state - Vuex state.
         * @param {string} category - Selected category.
         */
        setSelectedCategory(state, category) {
            state.selectedCategory = category;
        },

        /**
         * Sets the sort order for products.
         * @param {Object} state - Vuex state.
         * @param {string} order - Sort order.
         */
        setSortOrder(state, order) {
            state.sortOrder = order;
        },

        /**
         * Sets the list of categories.
         * @param {Object} state - Vuex state.
         * @param {Array<string>} categories - List of categories.
         */
        setCategories(state, categories) {
            state.categories = categories;
        },

        /**
         * Resets the selected category and sort order filters.
         * @param {Object} state - Vuex state.
         */
        resetFilters(state) {
            state.selectedCategory = "";
            state.sortOrder = "";
        },

        setUser(state, user) {
            state.user = user;
        },
        setToken(state, token) {
            state.token = token;
        },
    },
    actions: {
        /**
         * Fetches product categories from the API and commits them to the state.
         * @param {Object} context - Vuex action context.
         */
        async fetchCategories({ commit }) {
            try {
                const response = await fetch("https://fakestoreapi.com/products/categories");
                const categories = await response.json();
                commit('setCategories', categories);
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        },

        /**
         * Fetches products from the API and commits them to the state.
         * @param {Object} context - Vuex action context.
         */
        async fetchProducts({ commit }) {
            commit('setLoading', true);
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                const products = await response.json();
                commit('setProducts', products);
                commit('setLoading', false);
            } catch (error) {
                console.error("Error fetching products:", error);
                commit('setLoading', false);
            }
        },

        async login({ commit }, { username, password }) {
            try {
                const response = await fetch("https://fakestoreapi.com/auth/login", {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username, password }),
                });

                if (!response.ok) {
                    throw new Error('Login failed');
                }

                const data = await response.json();
                commit('setToken', data.token);
                commit('setUser', { username }); // We don't get user details from the API, so we're just storing the username
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ username }));
            } catch (error) {
                console.error("Error logging in:", error);
                throw error;
            }
        },

        logout({ commit }) {
            commit('setUser', null);
            commit('setToken', null);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        checkAuth({ commit }) {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            if (token && user) {
                commit('setToken', token);
                commit('setUser', user);
            }
        },
    },
    getters: {
        /**
         * Filters and sorts products based on selected category and sort order.
         * @param {Object} state - Vuex state.
         * @returns {Array<Object>} Filtered and sorted products.
         */
        filteredProducts(state) {
            let tempProducts = state.products;

            if (state.selectedCategory) {
                tempProducts = tempProducts.filter(
                    (product) => product.category === state.selectedCategory
                );
            }

            if (state.sortOrder === "asc") {
                tempProducts = tempProducts.sort((a, b) => a.price - b.price);
            } else if (state.sortOrder === "desc") {
                tempProducts = tempProducts.sort((a, b) => b.price - a.price);
            }

            return tempProducts;
        },

        isAuthenticated: state => !!state.token,
        currentUser: state => state.user,
    },
});
