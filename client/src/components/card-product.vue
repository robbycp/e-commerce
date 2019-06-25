<template>
  <v-card hover>
    <v-img src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" height="200px"></v-img>

    <v-card-title primary-title>
      <div>
        <div class="headline">{{ product.name }}</div>
        <span class="grey--text">Rp {{ product.price }} </span>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn @click="productPage(product._id)" flat>More Details</v-btn>
      <v-btn flat color="orange">Add to Cart</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['product'],
  methods: {
    productPage (val) {
      this.$router.push({ name: 'productDetail', params: { productId: val } })
    }
  }
}
</script>

<style>

</style>
