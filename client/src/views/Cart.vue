<template>
  <div>
    <v-container>
      <v-toolbar flat color="white">
        <v-toolbar-title>Your Shoping Basket</v-toolbar-title>
        <v-divider class="mx-2" inset vertical></v-divider>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table :headers="headers" :items="productCart" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.price }}</td>
          <td class="text-xs-right">
            <v-layout v-layout align-center justify-center row fill-height>
              <v-btn fab dark small color="green" @click="minQuantity(props.item._id)"
                >-</v-btn>
              <v-text-field v-model="props.item.quantity"></v-text-field>
              <v-btn fab dark small color="green" @click="addQuantity(props.item._id)"
                >+</v-btn>
            </v-layout>
          </td>
          <td class="text-xs-right">{{ props.item.total }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="deleteItem(props.item)">
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
          <v-btn @click="updateTrx()">Update</v-btn>
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
export default {
  data: () => ({
    dialog: false,
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
    productCart: [],
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
    this.addTotalPerProduct()
    this.getTotalCart()
  },

  methods: {
    getTotalCart () {
      this.totalCart = this.productCart.reduce((acc, el) => acc + el.total, 0)
    },
    addTotalPerProduct () {
      this.productCart = this.productCart.map((product) => {
        return Object.assign(product, {
          total: product.price * product.quantity
        })
      })
    },
    initialize () {
      this.productCart = [
        {
          _id: '4io41jsfase9wnvaifjaoweifjiwef9',
          name: 'Frozen Yogurt',
          price: 10000,
          quantity: 2
        },
        {
          _id: '4io41jsfase9wnvaifjaoweifjiw323',
          name: 'Ice cream sandwich',
          price: 20000,
          quantity: 5
        },
        {
          _id: '4io41jsfase9wnvaifjaoweifjiw21312',
          name: 'Eclair',
          price: 25000,
          quantity: 2
        },
        {
          _id: '4io41jsfase9wnvaifjaoweifjiw2389',
          name: 'Cupcake',
          price: 80000,
          quantity: 2
        },
        {
          _id: '4io41jsfase9wnvaifjaoweifjiwef12',
          name: 'Gingerbread',
          price: 100000,
          quantity: 2
        },
        {
          _id: '4io41jsfase9wnvaifjaoweifjiwe213',
          name: 'Jelly bean',
          price: 95000,
          quantity: 2
        }
      ]
    },

    deleteItem (item) {
      const index = this.productCart.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.productCart.splice(index, 1)
    },

    sendCheckout () {

    },

    addQuantity (id) {
      this.productCart.forEach((product) => {
        if (product._id === id) {
          product.quantity++
        }
      })
    },

    minQuantity (id) {
      this.productCart.forEach((product) => {
        if (product._id === id) {
          product.quantity--
        }
      })
    },

    updateTrx () {

    }
  }
}
</script>

<style>

</style>
