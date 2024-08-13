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
        theme: 'light',

        /**
         * List of product categories.
         * @type {Array<string>}
         */
        categories: [],
        user: null,
        token: null,
        cart: [],
        comparisonList: [],
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

        setTheme(state, theme) {
            state.theme = theme;
            localStorage.setitem('theme', theme);
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

        setCart(state, cart) {
            state.cart = cart;
        },

        addToCart(state, product) {
            const existingItem = state.cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.cart.push({ ...product, quantity: 1 });
            }
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        removeFromCart(state, productId) {
            state.cart = state.cart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(state.cart));
        },

        clearCart(state) {
            state.cart = [];
            localStorage.removeItem('cart');
        },

        updateCartItemQuantity(state, { productId, quantity }) {
            const item = state.cart.find(i => i.id === productId);
            if (item) {
                item.quantity = quantity;
                localStorage.setItem('cart', JSON.stringify(state.cart));
            }
        },

        clearCart(state) {
            state.cart = [];
            localStorage.removeItem('cart');
        },

        addToComparisonList(state, product) {
            if (state.comparisonList.length < 4 && !state.comparisonList.some(item => item.id === product.id)) {
                state.comparisonList.push(product);
                localStorage.setItem('comparisonList', JSON.stringify(state.comparisonList));
            }
        },

        removeFromComparisonList(state, productId) {
            state.comparisonList = state.comparisonList.filter(item => item.id !== productId);
            localStorage.setItem('comparisonList', JSON.stringify(state.comparisonList));
        },

        clearComparisonList(state) {
            state.comparisonList = [];
            localStorage.removeItem('comparisonList');
        },

        setComparisonList(state, list) {
            state.comparisonList = list;
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
                console.log(data);
                commit('setToken', data.token);
                commit('setUser', { username });

                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify({ username }));
            } catch (error) {
                console.error("Error logging in:", error);
                throw error;
            }

            /** const data = await response.json();
            const decodedToken = jwtDecode(data.token);
            commit('setToken', data.token);
            commit('setUser', { username, id: decodedToken.sub }); // Include user ID

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify({ username, id: decodedToken.sub }));*/

            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                commit('setCart', JSON.parse(savedCart));
            }
        },

        logout({ commit }) {
            commit('setUser', null);
            commit('setToken', null);

            localStorage.removeItem('token');
            localStorage.removeItem('user');

            commit('clearCart');
        },

        checkAuth({ commit }) {
            const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            if (token && user) {
                commit('setToken', token);
                commit('setUser', user);
            }

            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                commit('setCart', JSON.parse(savedCart));
            }
        },

        addToCart({ commit, state }, product) {
            if (state.user) {
                commit('addToCart', product);
            } else {
                throw new Error('User must be logged in to add items to cart');
            }
        },

        removeFromCart({ commit, state }, productId) {
            if (state.user) {
                commit('removeFromCart', productId);
            } else {
                throw new Error('User must be logged in to remove items from cart');
            }
        },

        updateCartItemQuantity({ commit, state }, { productId, quantity }) {
            if (state.user) {
                commit('updateCartItemQuantity', { productId, quantity });
            } else {
                throw new Error('User must be logged in to update cart items');
            }
        },
        clearCart({ commit, state }) {
            if (state.user) {
                commit('clearCart');
            } else {
                throw new Error('User must be logged in to clear the cart');
            }
        },

        addToComparisonList({ commit, state }, product) {
            if (state.user) {
                if (state.comparisonList.length < 4) {
                    commit('addToComparisonList', product);
                } else {
                    throw new Error('Comparison list is full. Remove an item before adding a new one');
                }
            } else {
                throw new Error('User must be logged in to add items to comparison list')
            }

        },

        removeFromComparisonList({ commit, state }, productId) {
            if (state.user) {
                commit('removeFromComparisonList', productId);
            } else {
                throw new Error('User must be logged in to remove items from comparison list');
            }
        },

        clearComparisonList({ commit, state }) {
            if (state.user) {
                commit('clearComparisonList');
            } else {
                throw new Error('User must be logged in to clear comparison list');
            }
        },

        loadComparisonList({ commit }) {
            const savedList = localStorage.getItem('comparisonList');
            if (savedList) {
                commit('setComparisonList', JSON.parse(savedList));
            }
        },

        toggleTheme({ commit, state }) {
            const newTheme = state.theme === 'light' ? 'dark' : 'light';
            commit('setTheme', newTheme);
        },

        initTheme({ commit }) {
            const savedTheme = localStorage.getItem('theme') || 'light';
            commit('settheme', savedTheme);
        }
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
            } else if (state.sortOrder === "default") {
                tempProducts = [...state.products];
            }

            return tempProducts;
        },

        isAuthenticated: state => !!state.token,
        currentUser: state => state.user,

        cartItems: state => state.cart,
        cartTotal: state => state.cart.reduce((total, item) => total + item.price * item.quantity, 0),
        cartItemsCount: state => state.cart.reduce((total, item) => total + item.quantity, 0),

        comparisonList: state => state.comparisonList,
        comparisonListCount: state => state.comparisonList.length,

        currentTheme: state => state.theme,
    },
});
