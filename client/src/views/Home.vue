<template>
  <div>
    <v-layout row>
      <v-flex xs12>
        <v-parallax src="https://cdn.vuetifyjs.com/images/parallax/material.jpg">
          <v-layout align-center column justify-center>
            <h1 class="display-2 font-weight-thin mb-3">Hijrah With Style</h1>
          </v-layout>
        </v-parallax>
      </v-flex>
    </v-layout>
    <v-layout row wrap class="scroll-y">
      <v-flex xs4>
        <CardProduct></CardProduct>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs12>
        <v-parallax dark src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg">
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
  }
}
</script>
