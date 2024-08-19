<template>
  <div class="bg-white shadow rounded-lg overflow-hidden">
    <img
      :src="product.image"
      :alt="product.title"
      class="h-48 w-full object-contain p-4"
    />
    <div class="p-4">
      <h2 class="text-lg font-semibold mb-2 truncate">{{ product.title }}</h2>
      <p class="text-gray-600 mb-2">${{ product.price.toFixed(2) }}</p>
      <p class="text-sm text-gray-500 mb-2">{{ product.category }}</p>
      <router-link
        :to="{ name: 'ProductDetails', params: { id: product.id } }"
        class="bg-black text-white px-4 py-2 rounded hover:bg-pink-600"
      >
        View Details
      </router-link>
      <div class="flex space-x-2">
        <button
          @click="addToWishlist"
          class="p-2 rounded-full hover:bg-pink-600"
          title="Add to Wishlist"
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
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <button
          @click="addToCart"
          class="p-2 rounded-full hover:bg-pink-600"
          title="Add to Cart"
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
      </div>
    </div>
  </div>
</template>

<script>
/**
 * ProductCard component
 *
 * This component represents a card that displays product details.
 *
 * @component
 * @prop {Object} product - The product object containing details to be displayed.
 * @prop {string} product.image - The URL of the product image.
 * @prop {string} product.title - The title of the product.
 * @prop {number} product.price - The price of the product.
 * @prop {string} product.category - The category of the product.
 * @prop {Object} product.rating - The rating object of the product.
 * @prop {number} product.rating.rate - The average rating of the product.
 * @prop {number} product.rating.count - The number of ratings the product has received.
 */
export default {
  name: "ProductCard",
  props: {
    /**
     * The product object containing details to be displayed.
     *
     * @type {Object}
     * @required
     */
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
