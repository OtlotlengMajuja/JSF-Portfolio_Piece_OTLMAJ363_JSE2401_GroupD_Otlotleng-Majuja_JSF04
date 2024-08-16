<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">My Wishlist</h1>
    <div v-if="wishlistItems.length === 0" class="text-center text-xl">
      Your wishlist is empty.
    </div>
    <div v-else>
      <div class="mb-4 flex justify-between items-center">
        <div>
          <label for="sort" class="mr-2">Sort by:</label>
          <select v-model="sortBy" class="border rounded p-2">
            <option value="name">Name</option>
            <option value="price">Price</option>
          </select>
        </div>
        <button
          @click="clearWishlist"
          class="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Wishlist
        </button>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        <div
          v-for="item in sortedWishlistItems"
          :key="item.id"
          class="bg-white rounded-lg shadow p-4"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="w-full h-48 object-contain mb-4"
          />
          <h2 class="text-lg font-semibold mb-2">{{ item.title }}</h2>
          <p class="text-gray-600 mb-2">${{ item.price.toFixed(2) }}</p>
          <div class="flex justify-between">
            <button
              @click="addToCart(item)"
              class="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
            <button
              @click="removeFromWishlist(item.id)"
              class="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  name: "WishlistView",
  setup() {
    const store = useStore();
    const sortBy = ref("name");

    const wishlistItems = computed(() => store.getters.wishlistItems);
    const sortedWishlistItems = computed(() => {
      return [...wishlistItems.value].sort((a, b) => {
        if (sortBy.value === "name") {
          return a.title.localeCompare(b.title);
        } else if (sortBy.value === "price") {
          return a.price - b.price;
        }
        return 0;
      });
    });

    const addToCart = (product) => {
      try {
        store.dispatch("addToCart", product);
        alert("Product added to cart!");
      } catch (error) {
        alert(error.message);
      }
    };

    const removeFromWishlist = (productId) => {
      try {
        store.dispatch("removeFromWishlist", productId);
      } catch (error) {
        alert(error.message);
      }
    };

    const clearWishlist = () => {
      try {
        store.dispatch("clearWishlist");
      } catch (error) {
        alert(error.message);
      }
    };

    return {
      wishlistItems,
      sortedWishlistItems,
      sortBy,
      addToCart,
      removeFromWishlist,
      clearWishlist,
    };
  },
};
</script>
