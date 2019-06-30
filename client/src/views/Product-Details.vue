<template>
  <div>
    <v-layout row>
      <v-flex xs12 md6>
        <v-img :src="detailProduct.image" max-height="450px"></v-img>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <v-layout row>
              <v-flex lg12>
                <h3>{{ detailProduct.name }}</h3>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-flex lg12>
              <small>{{ detailProduct.currency }} {{ detailProduct.price }}</small>
            </v-flex>
            <p>Total Stock: {{ detailProduct.stock }}</p>
            <p>{{ detailProduct.description }}</p>
          </v-card-text>
          <v-layout align-center row>
            <v-btn fab dark small color="green" @click="minQuantity()"
              >-</v-btn>
            <v-text-field v-model="quantity"></v-text-field>
            <v-btn fab dark small color="green" @click="addQuantity()"
              >+</v-btn>
          </v-layout>
          <v-btn @click="addToCart()"
            :disabled="disabledCart">
            {{ addCartText }}
            </v-btn>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  name: 'product-details',
  data () {
    return {
      detailProduct: {},
      quantity: 0,
      disabledCart: false,
      addCartText: ''
    }
  },
  methods: {
    addQuantity () {
      this.quantity++
    },
    minQuantity () {
      this.quantity--
    },
    addToCart () {
      let addCartSend = {
        productId: this.$route.params.productId,
        quantity: this.quantity
      }
      this.$store.dispatch('addCartToDatabase', addCartSend)
    }
  },
  watch: {
    '$store.state.oneProduct' () {
      this.detailProduct = this.$store.state.oneProduct
      if (this.detailProduct.stock <= 0) {
        this.addCartText = 'Out of Stock'
        this.disabledCart = true
      } else {
        this.addCartText = 'Add To Cart'
        this.disabledCart = false
      }
    }
  },
  created () {
    this.$store.dispatch('getOneProduct', this.$route.params.productId)
  }
}
</script>

<style>

</style>
