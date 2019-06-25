<template>
  <v-container>
    <v-layout row>
      <CardProduct></CardProduct>
      <CardProduct></CardProduct>
      <CardProduct></CardProduct>
      <CardProduct></CardProduct>
      <CardProduct></CardProduct>
      <CardProduct></CardProduct>
      <CardProduct></CardProduct>
    </v-layout>
  </v-container>
</template>

<script>
import CardProduct from '@/components/card-product.vue'

export default {
  components: {
    CardProduct
  }
}
</script>

<style>

</style>
