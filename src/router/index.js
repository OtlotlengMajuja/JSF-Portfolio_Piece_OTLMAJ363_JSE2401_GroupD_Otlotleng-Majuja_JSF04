import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/page/Home.vue'
import ProductList from '../components/products/ProductList.vue';
import ProductDetails from '../components/page/ProductDetails.vue';
import Login from '../components/page/Login.vue';
import CartView from '../components/view/CartView.vue';
import ComparisonView from '../components/view/ComparisonView.vue';
import store from '../store/store';

/**
 * Array of route objects.
 * Each route object defines a route for the application.
 * 
 * @type {Array<Object>}
 * @property {string} path - The URL path for the route.
 * @property {string} [name] - The name of the route.
 * @property {Object} component - The component to be rendered for the route.
 */
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    /**
     * Route for the product list page.
     * 
     * @type {Object}
     * @property {string} path - The URL path for the route.
     * @property {string} name - The name of the route.
     * @property {Object} component - The component to be rendered for the route.
     */
    {
        path: '/products',
        name: 'ProductList',
        component: ProductList
    },
    /**
     * Route for the product details page.
     * 
     * @type {Object}
     * @property {string} path - The URL path for the route.
     * @property {string} name - The name of the route.
     * @property {Object} component - The component to be rendered for the route.
     */
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: ProductDetails
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/cart',
        name: 'Cart',
        component: CartView,
        meta: { requiresAuth: true }
    },
    {
        path: '/comparison',
        name: 'Comparison',
        component: ComparisonView,
        meta: { requiresAuth: true }
    }
];

/**
 * Creates a router instance.
 * 
 * @function
 * @returns {Object} - Vue Router instance.
 */
const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router;
