<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Your Shopping Cart</h1>
      <router-link
        to="/products"
        class="bg-black text-white px-4 py-2 rounded hover:bg-pink-600"
        @click="toggleMenu"
      >
        Back to Products
      </router-link>
    </div>
    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between border-b py-4"
      >
        <div class="flex items-center">
          <img
            :src="item.image"
            :alt="item.title"
            class="w-16 h-16 object-contain mr-4"
          />
          <div>
            <h2 class="text-lg font-semibold">{{ item.title }}</h2>
            <div class="flex items-center">
              <button
                @click="updateQuantity(item.id, item.quantity - 1)"
                :disabled="item.quantity === 1"
                class="text-gray-500 hover:text-gray-700 mr-2"
              >
                -
              </button>
              <input
                type="number"
                v-model.number="item.quantity"
                min="1"
                class="w-12 text-center border border-gray-400 rounded px-2 py-1"
                @change="updateQuantity(item.id, item.quantity)"
              />
              <button
                @click="updateQuantity(item.id, item.quantity + 1)"
                class="text-gray-500 hover:text-gray-700 ml-2"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div class="flex flex-col items-end">
          <p class="text-gray-600">
            Price: ${{ (item.price * item.quantity).toFixed(2) }}
          </p>
          <button
            @click="removeFromCart(item.id)"
            class="text-pink-600 hover:text-pink-800 mt-2"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <p class="text-xl font-bold">Total: ${{ cartTotal.toFixed(2) }}</p>
        <button
          @click="clearCart"
          class="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-800 transition-colors duration-300"
        >
          Clear Cart
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

/**
 * CartView component
 *
 * This component represents the shopping cart view. It displays the list of products
 * in the cart, allows users to update quantities, remove items, and clear the cart.
 *
 * @component
 */
export default {
  name: "CartView",
  setup() {
    const store = useStore();
    const router = useRouter();

    /**
     * The list of items in the cart.
     *
     * @type {import('vue').ComputedRef<object[]>}
     */
    const cartItems = computed(() => store.getters.cartItems);

    /**
     * The total price of items in the cart.
     *
     * @type {import('vue').ComputedRef<number>}
     */
    const cartTotal = computed(() => store.getters.cartTotal);

    /**
     * Removes a product from the cart.
     *
     * @param {number} productId - The ID of the product to remove.
     */
    const removeFromCart = (productId) => {
      store.dispatch("removeFromCart", productId);
    };

    /**
     * Updates the quantity of a product in the cart.
     *
     * @param {number} productId - The ID of the product to update.
     * @param {number} quantity - The new quantity of the product.
     */
    const updateQuantity = (productId, quantity) => {
      if (quantity < 1) {
        removeFromCart(productId);
      } else {
        store.dispatch("updateCartItemQuantity", { productId, quantity });
      }
    };

    /**
     * Clears all items from the cart.
     */
    const clearCart = () => {
      store.dispatch("clearCart");
    };

    /**
     * Toggles the visibility of the menu.
     */
    const toggleMenu = () => {
      const isMenuOpen = store.state.isMenuOpen;
      store.commit("setIsMenuOpen", !isMenuOpen);
    };

    return {
      cartItems,
      cartTotal,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleMenu,
    };
  },
};
</script>
