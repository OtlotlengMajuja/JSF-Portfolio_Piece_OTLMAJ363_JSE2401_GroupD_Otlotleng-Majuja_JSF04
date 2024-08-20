<template>
  <div class="container mx-auto px-4 py-8">
    <div v-if="loading" class="text-center text-xl">Loading...</div>
    <div v-else-if="error" class="text-center text-red-500 text-xl">
      Error: {{ error }}
    </div>
    <div v-else class="bg-white rounded-lg shadow overflow-hidden">
      <div class="md:flex">
        <!-- Product details section-->
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

      <!-- Reviews section -->
      <div class="p-8 border-t">
        <h3 class="text-xl font-bold mb-4">Reviews</h3>

        <!-- Add review form for logged-in users -->
        <div v-if="isLoggedIn" class="mb-6">
          <h4 class="text-lg font-semibold mb-2">Leave a Review</h4>
          <div class="mb-2">
            <label class="block mb-1">Rating:</label>
            <select v-model="newReview.rating" class="border rounded p-1">
              <option v-for="i in 5" :key="i" :value="i">{{ i }} stars</option>
            </select>
          </div>
          <div class="mb-2">
            <label class="block mb-1">Comment:</label>
            <textarea
              v-model="newReview.comment"
              class="w-full border rounded p-2"
              rows="3"
            ></textarea>
          </div>
          <button
            @click="submitReview"
            class="bg-black text-white px-4 py-2 rounded hover:bg-pink-600"
          >
            Submit Review
          </button>
        </div>

        <!-- Review sorting options -->
        <div class="mb-4">
          <label class="mr-2">Sort by:</label>
          <select v-model="sortOption" class="border rounded p-1">
            <option value="default">Default</option>
            <option value="date">Date</option>
            <option value="rating">Rating</option>
          </select>
        </div>

        <!-- List of reviews -->
        <div
          v-for="review in sortedReviews"
          :key="review.id"
          class="mb-4 p-4 border rounded"
        >
          <div class="flex justify-between items-center mb-2">
            <div>
              <star-rating :rating="review.rating"></star-rating>
              <span class="ml-2 text-sm text-gray-600">{{
                formatDate(review.timestamp)
              }}</span>
            </div>
            <div v-if="isCurrentUserReview(review)">
              <button @click="openEditModal(review)" class="text-black mr-2">
                Edit
              </button>
              <button @click="deleteReview(review)" class="text-pink-600">
                Delete
              </button>
            </div>
          </div>
          <p class="mb-2">{{ review.comment }}</p>
          <p class="text-sm text-gray-600">
            By: {{ review.userName }} {{ review.userSurname }}
          </p>
        </div>
      </div>
    </div>

    <!-- Edit Review Modal -->
    <div
      v-if="showEditModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-6 rounded-lg">
        <h3 class="text-xl font-bold mb-4">Edit Review</h3>
        <div class="mb-2">
          <label class="block mb-1">Rating:</label>
          <select v-model="editingReview.rating" class="border rounded p-1">
            <option v-for="i in 5" :key="i" :value="i">{{ i }} stars</option>
          </select>
        </div>
        <div class="mb-2">
          <label class="block mb-1">Comment:</label>
          <textarea
            v-model="editingReview.comment"
            class="w-full border rounded p-2"
            rows="3"
          ></textarea>
        </div>
        <div class="flex justify-end">
          <button
            @click="cancelEdit"
            class="bg-black text-white px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            @click="saveEdit"
            class="bg-pink-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>

    <!-- Notification component -->
    <div
      v-if="notification"
      class="fixed bottom-4 right-4 p-4 rounded-lg shadow-lg"
      :class="notificationClass"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
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

    const reviews = ref([]);
    const sortOption = ref("date");
    const newReview = ref({ rating: 5, comment: "" });
    const showEditModal = ref(false);
    const editingReview = ref(null);
    const notification = ref(null);

    const isLoggedIn = computed(() => store.getters.isAuthenticated);
    const currentUser = computed(() => store.getters.currentUser);

    const isInWishlist = computed(() => {
      return store.getters.wishlistItems.some(
        (item) => item.id === product.value.id
      );
    });

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
        loadReviews();
      } catch (err) {
        console.error("Error fetching product:", err);
        error.value = err.message;
        showNotification("error", "Failed to load product. Please try again.");
      } finally {
        loading.value = false;
      }
    };

    const loadReviews = () => {
      const storedReviews = localStorage.getItem(`reviews_${product.value.id}`);
      if (storedReviews) {
        reviews.value = JSON.parse(storedReviews) || [];
      } else {
        reviews.value = [];
      }
    };

    const saveReviews = () => {
      localStorage.setItem(
        `reviews_${product.value.id}`,
        JSON.stringify(reviews.value)
      );
    };

    const validateReview = (review) => {
      if (review.rating < 1 || review.rating > 5) {
        throw new Error("Rating must be between 1 and 5");
      }
      if (review.comment.trim().length < 5) {
        throw new Error("Comment must be at least 5 characters long");
      }
    };

    const submitReview = () => {
      if (!isLoggedIn.value) {
        showNotification("error", "You must be logged in to leave a review.");
        return;
      }

      try {
        validateReview(newReview.value);

        const review = {
          id: Date.now(),
          ...newReview.value,
          userName: currentUser.value.username,
          userSurname: "", // Add surname if available in user object
          timestamp: new Date().toISOString(),
        };

        reviews.value.push(review);
        saveReviews();
        newReview.value = { rating: 5, comment: "" };
        showNotification(
          "success",
          "Your review has been submitted successfully!"
        );
      } catch (err) {
        showNotification("error", err.message);
      }
    };

    const openEditModal = (review) => {
      editingReview.value = { ...review };
      showEditModal.value = true;
    };

    const cancelEdit = () => {
      editingReview.value = null;
      showEditModal.value = false;
    };

    const saveEdit = () => {
      try {
        validateReview(editingReview.value);

        const index = reviews.value.findIndex(
          (r) => r.id === editingReview.value.id
        );
        if (index !== -1) {
          reviews.value[index] = {
            ...editingReview.value,
            timestamp: new Date().toISOString(),
          };
          saveReviews();
          showNotification(
            "success",
            "Your review has been updated successfully!"
          );
        }
        cancelEdit();
      } catch (err) {
        showNotification("error", err.message);
      }
    };

    const deleteReview = (review) => {
      if (confirm("Are you sure you want to delete this review?")) {
        reviews.value = reviews.value.filter((r) => r.id !== review.id);
        saveReviews();
        showNotification("success", "Your review has been deleted.");
      }
    };

    const isCurrentUserReview = (review) => {
      return isLoggedIn.value && currentUser.value.username === review.userName;
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    };

    const sortedReviews = computed(() => {
      return [...reviews.value].sort((a, b) => {
        if (sortOption.value === "date") {
          return new Date(b.timestamp) - new Date(a.timestamp);
        } else if (sortOption.value === "rating") {
          return b.rating - a.rating;
        } else {
          return 0;
        }
      });
    });

    const showNotification = (type, message) => {
      notification.value = { type, message };
      setTimeout(() => {
        notification.value = null;
      }, 3000);
    };

    const notificationClass = computed(() => {
      if (!notification.value) return "";
      return notification.value.type === "success"
        ? "bg-green-500 text-white"
        : "bg-red-500 text-white";
    });

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
      reviews,
      sortOption,
      newReview,
      isLoggedIn,
      submitReview,
      openEditModal,
      cancelEdit,
      saveEdit,
      deleteReview,
      isCurrentUserReview,
      formatDate,
      sortedReviews,
      showEditModal,
      editingReview,
      notification,
      notificationClass,
      isInWishlist,
    };
  },
};
</script>
