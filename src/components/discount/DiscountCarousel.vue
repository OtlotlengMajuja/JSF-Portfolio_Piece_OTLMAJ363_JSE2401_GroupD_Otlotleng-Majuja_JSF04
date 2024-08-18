<template>
  <div class="discount-carousel">
    <h2 class="text-2xl font-bold mb-4">Special Offers</h2>
    <div class="carousel-container overflow-x-auto whitespace-nowrap">
      <div
        v-for="product in discountedProducts"
        :key="product.id"
        class="inline-block mx-2 w-64"
      >
        <div class="bg-primary-medium p-4 rounded-lg shadow-md">
          <img
            :src="product.image"
            :alt="product.title"
            class="w-full h-48 object-contain mb-2"
          />
          <h3 class="text-lg font-semibold mb-1 truncate">
            {{ product.title }}
          </h3>
          <p class="text-sm mb-1">
            <span class="line-through">{{ product.price.toFixed(2) }}</span>
            <span class="font-bold ml-2"
              >${{ product.discountedPrice.toFixed(2) }}</span
            >
          </p>
          <p class="text-sm text-primary-accent2 font-bold mb-2">
            {{ product.discountPercentage }}% OFF
          </p>
          <router-link
            :to="{
              name: 'DiscountedProductDetails',
              params: { id: product.id },
            }"
            class="btn block text-center py-1 px-2 rounded"
          >
            View Details
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "DiscountCarousel",
  setup() {
    const store = useStore();
    const discountedProducts = computed(() => store.getters.discountedProducts);

    return {
      discountedProducts,
    };
  },
};
</script>

<style scoped>
.carousel-container {
  scroll-behavior: smooth;
  -webkit-overflow-scrolling: touch;
}
</style>
