<template>
  <div>
    <v-layout row>
      <v-flex xs12 md6>
        <v-img :src="image" max-height="450px"></v-img>
      </v-flex>
      <v-flex xs12 md6>
        <v-card>
          <v-card-title>
            <v-layout row>
              <v-flex lg12>
                <h3>{{ name }}</h3>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>
            <v-flex lg12>
              <small>{{ currency }} {{ price }}</small>
            </v-flex>
            <p>Total Stock: {{ stock }}</p>
            <p>{{ description }}</p>
          </v-card-text>
          <v-card-action>
            <v-layout align-center row>
              <v-btn fab dark small color="green" @click="minQuantity()"
                >-</v-btn>
              <v-text-field v-model="quantity"></v-text-field>
              <v-btn fab dark small color="green" @click="addQuantity()"
                >+</v-btn>
            </v-layout>
            <v-btn @click="addToCart()">Add to Cart</v-btn>
          </v-card-action>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: 'Topi Hijrah Blue Sky',
      description: 'Topi ini sangat nyaman untuk digunakan sehari hari dengan tampilan menawan',
      stock: 10,
      image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
      price: 100000,
      currency: 'IDR',
      category: 'accessories',
      quantity: 0
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
      //
    }
  }
}
</script>

<style>

</style>
