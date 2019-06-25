<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-parallax src="http://www.neighbourlist.com/wp-content/uploads/2018/01/Neighbourlist_Pargata_1-1.jpg">
          <v-layout align-center column justify-center>
            <h1 class="display-2 font-weight-thin mb-3">Hijrah With Style</h1>
          </v-layout>
        </v-parallax>
      </v-flex>
    </v-layout>
    <v-layout>
      <v-container>
        <v-layout row>
          <h3>Top Product</h3>
        </v-layout>
        <v-layout row wrap overflow-y-hidden>
          <v-flex xs12 sm6 md4 v-for="product in products" :key="product._id">
            <CardProduct :product="product"></CardProduct>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-parallax dark src="https://static1.squarespace.com/static/5624f8eee4b0d232542ead5b/t/5a86bd2171c10bc44daa642f/1518779704454/">
          <v-layout align-center column justify-center>
            <h1 class="display-2 font-weight-thin mb-3">Hijrah</h1>
            <h4 class="subheading">Get your hat now!</h4>
          </v-layout>
        </v-parallax>
      </v-flex>
    </v-layout>
  </div>
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
