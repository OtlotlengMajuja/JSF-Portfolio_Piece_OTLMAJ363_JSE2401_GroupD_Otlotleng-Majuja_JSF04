import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/page/Home.vue';
import ProductList from '../components/products/ProductList.vue';
import ProductDetails from '../components/page/ProductDetails.vue';
import Login from '../components/page/Login.vue';
import CartView from '../components/view/CartView.vue';
import ComparisonView from '../components/view/ComparisonView.vue';
import WishlistView from '../components/view/WishlistView.vue';
import store from '../store/store';

/**
 * @typedef {Object} RouteRecord
 * @property {string} path - The URL path for the route.
 * @property {string} [name] - The name of the route.
 * @property {Object} component - The component to be rendered for the route.
 * @property {Object} [meta] - Additional meta information for the route.
 * @property {boolean} [meta.requiresAuth] - If true, the route requires authentication.
 */

/**
 * Array of route objects.
 * Each route object defines a route for the application.
 * 
 * @type {Array<RouteRecord>}
 */
const routes = [
    /**
     * Route for the home page.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    /**
     * Route for the product list page.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/products',
        name: 'ProductList',
        component: ProductList
    },
    /**
     * Route for the product details page.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/product/:id',
        name: 'ProductDetails',
        component: ProductDetails
    },
    /**
     * Route for the login page.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    /**
     * Route for the cart view page. Requires authentication.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/cart',
        name: 'Cart',
        component: CartView,
        meta: { requiresAuth: true }
    },
    /**
     * Route for the comparison view page. Requires authentication.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/comparison',
        name: 'Comparison',
        component: ComparisonView,
        meta: { requiresAuth: true }
    },
    /**
     * Route for the wishlist view page. Requires authentication.
     * 
     * @type {RouteRecord}
     */
    {
        path: '/wishlist',
        name: 'Wishlist',
        component: WishlistView,
        meta: { requiresAuth: true }
    },
];

/**
 * Creates a router instance.
 * 
 * @function
 * @returns {Object} Vue Router instance.
 */
const router = createRouter({
    history: createWebHistory(),
    routes
});

/**
 * Navigation guard to check for authentication before accessing certain routes.
 * 
 * @function
 * @param {Object} to - The target Route Object being navigated to.
 * @param {Object} from - The current Route being navigated away from.
 * @param {Function} next - This function must be called to resolve the hook. 
 */
router.beforeEach((to, from, next) => {
    const isAuthenticated = store.getters.isAuthenticated;

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        next({ name: 'Login', query: { redirect: to.fullPath } });
    } else {
        next();
    }
});

export default router;
