<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 v-for="product in products" :key="product._id">
        <CardProduct :product="product"></CardProduct>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import CardProduct from '@/components/card-product.vue'

export default {
  components: {
    CardProduct
  },
  data () {
    return {
      products: [{
        _id: 1,
        name: 'Topi Hijrah',
        description: 'Topi bagus untuk hijrah',
        stock: [{
          typeStock: 'all-size',
          amount: 10
        }],
        image: '',
        price: 100000,
        currency: 'IDR',
        category: 'accessories'
      },
      {
        _id: 2,
        name: 'Sarung Hijrah',
        description: 'Topi bagus untuk hijrah',
        stock: [{
          typeStock: 'all-size',
          amount: 10
        }],
        image: '',
        price: 70000,
        currency: 'IDR',
        category: 'accessories'
      }, {
        _id: 3,
        name: 'Baju Hijrah',
        description: 'Topi bagus untuk hijrah',
        stock: [{
          typeStock: 's',
          amount: 10
        }, {
          typeStock: 'm',
          amount: 10
        }, {
          typeStock: 'l',
          amount: 10
        }],
        image: '',
        price: 125000,
        currency: 'IDR',
        category: 'accessories'
      }, {
        _id: 4,
        name: 'Kopiah Hijrah',
        description: 'Topi bagus untuk hijrah',
        stock: [{
          typeStock: 'all-size',
          amount: 10
        }],
        image: '',
        price: 80000,
        currency: 'IDR',
        category: 'accessories'
      }, {
        _id: 5,
        name: 'Celana Hijrah',
        description: 'Topi bagus untuk hijrah',
        stock: [{
          typeStock: 'all-size',
          amount: 10
        }],
        image: '',
        price: 200000,
        currency: 'IDR',
        category: 'accessories'
      }]
    }
  }
}
</script>

<style>

</style>
