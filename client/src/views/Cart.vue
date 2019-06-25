<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Your Shoping Basket Anjing</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2">Checkout</v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="productCart" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.quantity }}</td>
        <td class="text-xs-right">{{ props.item.total }}</td>
        <td class="text-xs-right">{{ props.item.protein }}</td>
        <td class="justify-center layout px-0">
          <v-icon small @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
    </v-data-table>
    <div>
      <p>Bag Overview</p>
      <p>
        Your Total is Rp {{ totalCart }}
      </p>
    </div>
    <v-container>
      <v-btn>Update</v-btn>
      <v-btn>Checkout ({{ totalCart }} )</v-btn>
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
    editedIndex: -1,
    editedItem: {
      name: '',
      price: 0,
      quantity: 0,
      total: 0
    },
    defaultItem: {
      name: '',
      price: 0,
      quantity: 0,
      total: 0
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
    totalCart () {
      return this.productCart.reduce((acc, el) => acc + el.total)
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.productCart = [
        {
          name: 'Frozen Yogurt',
          price: 159,
          quantity: 6.0,
          total: 24
        },
        {
          name: 'Ice cream sandwich',
          price: 237,
          quantity: 9.0,
          total: 37
        },
        {
          name: 'Eclair',
          price: 262,
          quantity: 16.0,
          total: 23
        },
        {
          name: 'Cupcake',
          price: 305,
          quantity: 3.7,
          total: 67
        },
        {
          name: 'Gingerbread',
          price: 356,
          quantity: 16.0,
          total: 49
        },
        {
          name: 'Jelly bean',
          price: 375,
          quantity: 0.0,
          total: 94
        }
      ]
    },

    deleteItem (item) {
      const index = this.productCart.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.productCart.splice(index, 1)
    }
  }
}
</script>

<style>

</style>
