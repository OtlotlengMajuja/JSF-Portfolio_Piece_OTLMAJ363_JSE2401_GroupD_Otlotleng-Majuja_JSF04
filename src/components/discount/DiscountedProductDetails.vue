<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-xl">
      Error: {{ error }}
    </div>
    <div v-else class="bg-primary-medium rounded-lg shadow overflow-hidden">
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
          <p class="text-lg mb-4">{{ product.description }}</p>
          <p class="text-xl font-semibold mb-2">
            <span class="line-through">${{ product.price.toFixed(2) }}</span>
            <span class="ml-2 text-primary-accent2"
              >${{ product.discountedPrice.toFixed(2) }}</span
            >
          </p>
          <p class="text-lg font-bold text-primary-accent2 mb-4">
            {{ product.discountPercentage }}% OFF
          </p>
          <p class="mb-4">
            <span class="font-semibold">Category:</span> {{ product.category }}
          </p>
          <p class="mb-4">
            <span class="font-semibold">Sale Ends:</span>
            {{ product.saleEndDate }}
          </p>
          <div class="flex items-center mb-4">
            <star-rating :rating="product.rating.rate"></star-rating>
            <span class="ml-2"
              >{{ product.rating.rate }} ({{
                product.rating.count
              }}
              reviews)</span
            >
          </div>
          <button
            @click="addToCart"
            class="bg-primary-accent2 text-primary-light px-4 py-2 rounded hover:bg-primary-accent1 transition-colors duration-300 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import StarRating from "../StarRating.vue";

export default {
  name: "DiscountedProductDetails",
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const loading = ref(true);
    const error = ref(null);

    const product = computed(() => {
      const productId = parseInt(route.params.id);
      return store.getters.discountedProducts.find((p) => p.id === productId);
    });

    onMounted(async () => {
      try {
        if (store.getters.discountedProducts.length === 0) {
          await store.dispatch("fetchProducts");
          await store.dispatch("generateDiscountedProducts");
        }
        loading.value = false;
      } catch (err) {
        console.error("Error fetching product:", err);
        error.value = err.message;
        loading.value = false;
      }
    });

    const addToCart = () => {
      try {
        store.dispatch("addToCart", product.value);
        alert("Product added to cart!");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      product,
      loading,
      error,
      addToCart,
    };
  },
};
</script>
