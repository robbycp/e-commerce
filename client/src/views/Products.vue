<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="product in $store.state.allProducts" :key="product._id">
        <CardProduct :product="product"></CardProduct>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CardProduct from '@/components/card-product.vue'

export default {
  name: 'all-products',
  components: {
    CardProduct
  },
  data () {
    return {
      //
    }
  },
  created () {
    this.$store.dispatch('getProducts')
  }
}
</script>

<style>

</style>
