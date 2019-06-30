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
          <v-flex xs12 sm6 md4 v-for="product in top3product" :key="product._id">
            <CardProduct :product="product"></CardProduct>
          </v-flex>
        </v-layout>
      </v-container>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-parallax dark src="https://static1.squarespace.com/static/5624f8eee4b0d232542ead5b/t/5a86bd2171c10bc44daa642f/1518779704454/">
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
      //
    }
  },
  created () {
    this.$store.dispatch('getProducts')
    this.$store.dispatch('getProfile')
  }
}
</script>
