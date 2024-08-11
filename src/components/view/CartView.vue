<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">Your Shopping Cart</h1>
      <router-link
        to="/products"
        class="bg-black text-white px-4 py-2 rounded hover:bg-black"
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
            class="text-red-500 hover:text-red-700 mt-2"
          >
            Remove
          </button>
        </div>
      </div>
      <div class="mt-4 flex justify-between items-center">
        <p class="text-xl font-bold">Total: ${{ cartTotal.toFixed(2) }}</p>
        <button
          @click="clearCart"
          class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors duration-300"
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

export default {
  name: "CartView",
  setup() {
    const store = useStore();
    const router = useRouter();

    const cartItems = computed(() => store.getters.cartItems);
    const cartTotal = computed(() => store.getters.cartTotal);

    const removeFromCart = (productId) => {
      store.dispatch("removeFromCart", productId);
    };

    const updateQuantity = (productId, quantity) => {
      if (quantity < 1) {
        removeFromCart(productId);
      } else {
        store.dispatch("updateCartItemQuantity", { productId, quantity });
      }
    };

    const clearCart = () => {
      store.dispatch("clearCart");
    };

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
