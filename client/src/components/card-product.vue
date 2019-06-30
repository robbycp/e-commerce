<template>
  <v-card hover>
    <v-img :src="product.image" height="200px"></v-img>

    <v-card-title primary-title>
      <div>
        <div class="headline">{{ product.name }}</div>
        <span class="grey--text">Rp {{ product.price }} </span>
      </div>
    </v-card-title>

    <v-card-actions>
      <v-btn @click="productPage(product._id)" flat>More Details</v-btn>
      <v-btn @click="addToCart(product._id)"
        flat
        color="orange"
        :disabled="disabledCart">
        {{ addCartText }}
        </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: 'card-product',
  props: ['product'],
  data () {
    return {
      addCartText: '',
      disabledCart: false
    }
  },
  methods: {
    productPage (val) {
      this.$router.push({ name: 'productDetail', params: { productId: val } })
    },
    addToCart (val) {
      let sendAddCart = {
        productId: val,
        quantity: 1
      }
      this.$store.dispatch('addCartToDatabase', sendAddCart)
    }
  },
  created () {
    if (this.product.stock <= 0) {
      this.addCartText = 'Out of Stock'
      this.disabledCart = true
    } else {
      this.addCartText = 'Add to Cart'
      this.disabledCart = false
    }
  }
}
</script>

<style>

</style>
