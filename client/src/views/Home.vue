<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-parallax :src="image1">
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
          <v-flex xs12 sm6 md4 v-for="product in top3product" :key="product._id">
            <CardProduct :product="product"></CardProduct>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-parallax dark :src="image2">
          <v-layout align-center column justify-center>
            <h1 class="display-2 font-weight-thin mb-3">The most stylist hijrah hat you'll ever found</h1>
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
  name: 'home',
  components: {
    CardProduct
  },
  computed: {
    top3product () {
      return this.$store.state.allProducts.slice(0, 3)
    }
  },
  data () {
    return {
      image1: require('../static/homepage.jpg'),
      image2: require('../static/homepage1.jpeg')
    }
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getProfile')
  }
}
</script>
