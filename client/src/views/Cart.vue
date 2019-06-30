<template>
  <div>
    <v-container>
      <v-toolbar flat color="white">
        <v-toolbar-title>Your Shoping Basket</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="headers"
        :items="productCart.itemBought"
        class="elevation-1">
        <template v-slot:items="props">
          <td>
            <v-layout row>
              <v-flex xs4>
                <v-img :src="props.item.item.image"></v-img>
              </v-flex>
              <v-flex xs8>
                <v-layout align-center justify-center
                row fill-height>
                  {{ props.item.item.name }}
                </v-layout>
              </v-flex>
            </v-layout>
          </td>
          <td class="text-xs-right">
            {{ props.item.item.price }}
          </td>
          <td class="text-xs-right">
            <v-layout align-center justify-center row fill-height>
              <v-btn fab dark small color="green"
                :disabled="quantityLayout.minButton"
                @click="minQuantity(props.item.item._id)"
                >-</v-btn>
              <v-text-field v-model="props.item.quantity"></v-text-field>
              <v-btn fab dark small color="green"
                :disabled="quantityLayout.addButton"
                @click="addQuantity(props.item.item._id)"
                >+</v-btn>
            </v-layout>
          </td>
          <td class="text-xs-right">{{ props.item.total }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="deleteItem(props.item.item)">
              delete
            </v-icon>
          </td>
        </template>
      </v-data-table>
    </v-container>
    <v-layout>
      <v-flex xs 12 offset-md6 md6>
        <v-container>
          <v-layout row>
            <v-flex xs6>
              <h3>Bag Overview</h3>
            </v-flex>
            <v-flex xs6>
              <p>Your Total is Rp {{ totalCart }}</p>
            </v-flex>
          </v-layout>
          <v-btn @click="updateTrx()">Update Your Bag</v-btn>
        </v-container>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex xs12>
          <v-card>
            <v-card-title>
              <h2>Shipping Information</h2>
            </v-card-title>
            <v-card-text>
              <form>
                <v-text-field v-model="address" label="Addresss" required></v-text-field>
                <v-select v-model="sendMethod" :items="listSendMethod" label="Send Method"
                  required></v-select>
                <v-btn @click="sendCheckout()" class="success">Checkout Rp {{ totalCart }}</v-btn>
              </form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  name: 'cart',
  data: () => ({
    dialog: false,
    quantityLayout: {
      minButton: false,
      addButton: false
    },
    headers: [
      {
        text: 'Product',
        align: 'left',
        value: 'name'
      },
      { text: 'Price', value: 'price' },
      { text: 'Quantity', value: 'quantity' },
      { text: 'Total', value: 'total' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    productCart: {},
    address: '',
    sendMethod: '',
    listSendMethod: [
      'JNE YES',
      'JNE REGULAR',
      'TIKI EXPRESS',
      'TIKI REGULAR'
    ],
    totalCart: 0
  }),

  created () {
    this.initialize()
  },

  watch: {
    '$store.state.cart' () {
      this.productCart = this.$store.state.cart
    },
    productCart () {
      this.addTotalPerProduct()
      this.getTotalCart()
    },
    'productCart.quantity' (val) {
      console.log('masuk sini ga sih')
      if (val < 0) {
        this.quantityLayout.minButton = true
      } else if (val > 0) {
        this.quantityLayout.addButton = true
      }
    }
  },

  methods: {
    getTotalCart () {
      this.totalCart = this.productCart.itemBought.reduce((acc, el) => acc + el.total, 0)
    },
    addTotalPerProduct () {
      this.productCart.itemBought = this.productCart.itemBought.map((product) => {
        return Object.assign(product, {
          total: product.item.price * product.quantity
        })
      })
    },
    initialize () {
      this.$store.dispatch('getCart')
    },

    deleteItem (item) {
      let val
      Swal.fire({
        title: 'Are you sure you want to delete this product?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      })
        .then((result) => {
          val = result.value
          let deletedProduct = { _id: item._id }
          console.log('ini deleted', deletedProduct)
          if (result.value) {
            return axios({
              method: 'DELETE',
              headers: { token: JSON.parse(localStorage.token).token },
              data: deletedProduct,
              url: `${this.$store.state.url_server}/transactions/${this.productCart._id}`
            })
          }
        })
        .then((result) => {
          if (val) {
            Swal.fire(
              'Success!',
              'You are successfully delete one product',
              'success'
            )
            this.$store.dispatch('getCart')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    sendCheckout () {
      let sendData = {
        address: this.address,
        sendMethod: this.sendMethod
      }
      let url = `${this.$store.state.url_server}/transactions/${this.productCart._id}/checkout`
      axios({
        method: 'POST',
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: sendData,
        url: url
      })
        .then(() => {
          this.$router.push(`/thanks/${this.productCart._id}`)
        })
        .catch((err) => {
          console.log(err.response)
        })
    },

    addQuantity (id) {
      this.productCart.itemBought.forEach((product) => {
        if (product.item._id === id) {
          product.quantity++
        }
      })
    },

    minQuantity (id) {
      this.productCart.itemBought.forEach((product) => {
        if (product.item._id === id) {
          product.quantity--
        }
      })
    },

    updateTrx () {
      let sendData = {
        updatedTrx: this.productCart
      }
      axios({
        method: 'PUT',
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: sendData,
        url: `${this.$store.state.url_server}/transactions/${this.productCart._id}`
      })
        .then((result) => {
          Swal.fire(
            'Success Update',
            'Successfully update your cart',
            'success'
          )
          this.$store.dispatch('getCart')
        })
        .catch((err) => {
          Swal.fire(
            'Error!',
            err.response.data.message,
            'error'
          )
          console.log(err.response)
        })
    }
  }
}
</script>

<style>

</style>
