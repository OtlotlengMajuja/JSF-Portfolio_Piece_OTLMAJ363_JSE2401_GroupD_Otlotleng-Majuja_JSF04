<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-2xl font-bold mb-4">Your Shopping Cart</h1>
    <div v-if="cartItems.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="item in cartItems"
        :key="item.id"
        class="flex items-center justify-between border-b py-4"
      >
        <div>
          <h2 class="text-lg font-semibold">{{ item.title }}</h2>
          <p class="text-gray-600">Quantity: {{ item.quantity }}</p>
          <p class="text-gray-600">
            Price: ${{ (item.price * item.quantity).toFixed(2) }}
          </p>
        </div>
        <button
          @click="removeFromCart(item.id)"
          class="text-red-500 hover:text-red-700"
        >
          Remove
        </button>
      </div>
      <div class="mt-4 text-right">
        <p class="text-xl font-bold">Total: ${{ cartTotal.toFixed(2) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  name: "CartView",
  setup() {
    const store = useStore();

    const cartItems = computed(() => store.getters.cartItems);
    const cartTotal = computed(() => store.getters.cartTotal);

    const removeFromCart = (productId) => {
      store.dispatch("removeFromCart", productId);
    };

    return {
      cartItems,
      cartTotal,
      removeFromCart,
    };
  },
};
</script>
