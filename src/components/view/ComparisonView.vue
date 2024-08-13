<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Product Comparison</h1>
    <div v-if="comparisonList.length === 0" class="text-center text-gray-500">
      Your comparison list is empty.
    </div>
    <div v-else class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead>
          <tr>
            <th class="px-4 py-2 border">Feature</th>
            <th
              v-for="product in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              <div class="w-48 truncate">{{ product.title }}</div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="px-4 py-2 border font-semibold">Image</td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              <img
                :src="product.image"
                :alt="product.title"
                class="w-32 h-32 object-contain mx-auto"
              />
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-semibold">Description</td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              <div class="max-h-40 overflow-y-auto">
                {{ product.description }}
              </div>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-semibold">Price</td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              ${{ product.price.toFixed(2) }}
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-semibold">Rating</td>
            <td
              v-for="products in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              <star-rating :rating="product.rating.rate"></star-rating>
              <span>({{ product.rating.count }} reviews)</span>
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-semibold">Category</td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              {{ product.category }}
            </td>
          </tr>
          <tr>
            <td class="px-4 py-2 border font-semibold">Actions</td>
            <td
              v-for="product in comparisonList"
              :key="product.id"
              class="px-4 py-2 border"
            >
              <button
                @click="removeFromComparison(product.id)"
                class="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-4">
      <button
        @click="clearComparisonList"
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Clear Comparison List
      </button>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import StarRating from "../StarRating.vue";

export default {
  name: "ComparisonView",
  components: {
    StarRating,
  },
  setup() {
    const store = useStore();

    const comparisonList = computed(() => store.getters.comparisonList);

    const removeFromComparison = (productId) => {
      store.dispatch("removeFromComparisonList", productId);
    };

    const clearComparisonList = () => {
      store.dispatch("clearComparisonList");
    };

    return {
      comparisonList,
      removeFromComparison,
      clearComparisonList,
    };
  },
};
</script>
