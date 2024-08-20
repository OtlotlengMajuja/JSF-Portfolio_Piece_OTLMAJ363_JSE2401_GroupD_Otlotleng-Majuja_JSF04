<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-xl">
      Error: {{ error }}
    </div>
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="md:flex">
        <div class="md:flex-shrink-0">
          <img
            :src="product.image"
            :alt="product.title"
            class="h-48 w-full object-contain md:h-full md:w-48 p-4"
          />
        </div>
        <div class="p-8">
          <h2 class="text-2xl font-bold mb-4">
            {{ product.title }}
          </h2>
          <p class="text-gray-600 mb-4">{{ product.description }}</p>
          <p class="text-xl font-semibold mb-4">
            ${{ product.price.toFixed(2) }}
          </p>
          <p class="mb-4">
            <span class="font-semibold">Category:</span> {{ product.category }}
          </p>
          <div class="flex items-center mb-4">
            <star-rating :rating="product.rating.rate"></star-rating>
            <span class="ml-2">({{ product.rating.count }} reviews)</span>
          </div>
          <button
            @click="addToCart"
            class="p-2 rounded-full hover:bg-pink-600 transition-colors duration-300 mt-4"
          >
            <svg
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
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </button>
          <button
            @click="addToWishlist"
            class="p-2 rounded-full hover:bg-pink-600 transition-colors duration-300 mt-4 ml-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              :fill="isInWishlist ? 'currentColor' : 'none'"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <button
            @click="addToComparisonList"
            class="p-2 rounded-full hover:bg-pink-600 transition-colors duration-300 mt-4 ml-2"
          >
            <svg
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
          </button>
          <button
            class="bg-black text-white px-4 py-2 rounded hover:bg-pink-600 transition-colors duration-300 mt-4 ml-2"
          >
            <router-link to="/products"> Back to Products </router-link>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import StarRating from "../StarRating.vue";
import { useStore } from "vuex";

/**
 * ProductDetails component
 *
 * This component fetches and displays the details of a single product, including the title, description, price, category, and rating.
 * It also allows users to add the product to the cart, wishlist, or comparison list.
 *
 * @component
 */
export default {
  name: "ProductDetails",
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    /**
     * The product details.
     *
     * @type {import('vue').Ref<object>}
     */
    const product = ref({});

    /**
     * Indicates whether the product data is loading.
     *
     * @type {import('vue').Ref<boolean>}
     */
    const loading = ref(true);

    /**
     * Stores any error that occurs during the fetch operation.
     *
     * @type {import('vue').Ref<string | null>}
     */
    const error = ref(null);

    /**
     * Fetches the product details based on the given ID.
     *
     * @async
     * @function fetchProduct
     * @param {number} id - The ID of the product to fetch.
     * @returns {Promise<void>}
     */
    const fetchProduct = async (id) => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        product.value = await response.json();
      } catch (err) {
        console.error("Error fetching product:", err);
        error.value = err.message;
      } finally {
        loading.value = false;
      }
    };

    /**
     * Fetch the product when the component is mounted.
     *
     * @see https://vuejs.org/api/composition-api-lifecycle.html#onmounted
     */
    onMounted(() => {
      fetchProduct(route.params.id);
    });

    /**
     * Adds the product to the shopping cart.
     *
     * @function addToCart
     */
    const addToCart = () => {
      try {
        store.dispatch("addToCart", product.value);
        alert("Product added to cart!");
      } catch (error) {
        alert(error.message);
      }
    };

    /**
     * Adds the product to the comparison list.
     *
     * @function addToComparisonList
     */
    const addToComparisonList = () => {
      try {
        store.dispatch("addToComparisonList", product.value);
        alert("Product added to comparison list!");
      } catch (error) {
        alert(error.message);
      }
    };

    /**
     * Adds the product to the wishlist.
     *
     * @function addToWishlist
     */
    const addToWishlist = () => {
      try {
        store.dispatch("addToWishlist", product.value);
        alert("Product added to wishlist!");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      product,
      loading,
      error,
      addToCart,
      addToComparisonList,
      addToWishlist,
    };
  },
};
</script>
