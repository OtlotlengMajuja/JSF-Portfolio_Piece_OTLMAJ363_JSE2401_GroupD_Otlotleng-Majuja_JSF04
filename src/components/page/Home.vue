<template>
  <div class="container mx-auto px-6 py-8">
    <h1 class="text-4xl font-bold mb-6">Welcome to Emercom</h1>
    <p class="text-lg mb-4">
      Discover our wide range of products and amazing deals!
    </p>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-primary-medium p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Featured Products</h2>
        <ul class="list-disc list-inside">
          <li>Latest Electronics</li>
          <li>Trendy Fashion</li>
          <li>Home Essentials</li>
        </ul>
      </div>
      <div class="bg-primary-medium p-6 rounded-lg shadow-md">
        <h2 class="text-2xl font-semibold mb-4">Why Choose Us?</h2>
        <p>Top-quality products</p>
        <p>Excellent customer service</p>
        <p>Fast and reliable shipping</p>
      </div>
    </div>
    <router-link
      to="/products"
      class="bg-primary-accent2 text-primary-light font-semibold py-2 px-4 rounded hover:bg-primary-accent1 transition-colors duration-300"
    >
      Shop Now
    </router-link>
  </div>
</template>

<script>
/**
 * The Home component serves as the main landing page for the Emercom e-commerce site.
 * It provides an introduction to the site, highlights featured products, and emphasizes the company's strengths.
 *
 * @component
 */
export default {
  name: "Home",
};
console.log("Hello from branch");
</script>
