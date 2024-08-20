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
                <p v-if="!expandedDescriptions[product.id]">
                  {{ truncateDescription(product.description) }}
                  <button
                    v-if="product.description.length > 100"
                    @click="toggleDescription(product.id)"
                    class="text-pink-600 hover:underline ml-1"
                  >
                    See more
                  </button>
                </p>
                <p v-else>
                  {{ product.description }}
                  <button
                    @click="toggleDescription(product.id)"
                    class="text-pink-600 hover:underline ml-1"
                  >
                    See less
                  </button>
                </p>
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
              v-for="product in comparisonList"
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
                @click="removeFromComparisonList(product.id)"
                class="bg-pink-600 text-white px-2 py-1 rounded hover:bg-pink-800"
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
        class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-800"
      >
        Clear Comparison List
      </button>
    </div>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useStore } from "vuex";
import StarRating from "../StarRating.vue";

/**
 * ComparisonView component
 *
 * This component displays a comparison table for products. Users can compare features, prices,
 * and other details of selected products. They can also remove products from the comparison list or clear the entire list.
 *
 * @component
 */
export default {
  name: "ComparisonView",
  components: {
    StarRating,
  },

  setup() {
    const store = useStore();

    /**
     * List of products in the comparison list.
     *
     * @type {import('vue').ComputedRef<object[]>}
     */
    const comparisonList = computed(() => store.getters.comparisonList);

    /**
     * State to manage the expansion of product descriptions.
     *
     * @type {import('vue').Ref<object>}
     */
    const expandedDescriptions = ref({});

    /**
     * Removes a product from the comparison list.
     *
     * @param {number} productId - The ID of the product to remove.
     */
    const removeFromComparisonList = (productId) => {
      store.dispatch("removeFromComparisonList", productId);
    };

    /**
     * Clears the entire comparison list.
     */
    const clearComparisonList = () => {
      store.dispatch("clearComparisonList");
    };

    /**
     * Truncates the product description to 100 characters.
     *
     * @param {string} description - The product description to truncate.
     * @returns {string} - The truncated description.
     */
    const truncateDescription = (description) => {
      return description.length > 100
        ? description.slice(0, 100) + "..."
        : description;
    };

    /**
     * Toggles the expanded state of the product description.
     *
     * @param {number} productId - The ID of the product to toggle.
     */
    const toggleDescription = (productId) => {
      expandedDescriptions.value[productId] =
        !expandedDescriptions.value[productId];
    };

    return {
      comparisonList,
      removeFromComparisonList,
      clearComparisonList,
      expandedDescriptions,
      truncateDescription,
      toggleDescription,
    };
  },
};
</script>
