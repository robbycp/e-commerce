<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>All Products</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.name" label="Product Name"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.description" label="Description"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.stock" label="Stock"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.image" label="Image"></v-text-field>
                </v-flex>
                <v-flex>
                  <v-img :src="editedProduct.image"></v-img>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.price" label="Price"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.currency" label="Currency"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.category" label="Category"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeProductDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="saveProductDialog">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headersProduct" :items="listProducts" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-right">{{ props.item.description }}</td>
        <td class="text-xs-right">{{ props.item.stock }}</td>
        <td class="text-xs-right"><v-img :src="props.item.image"></v-img></td>
        <td class="text-xs-right">{{ props.item.price }}</td>
        <td class="text-xs-right">{{ props.item.currency }}</td>
        <td class="text-xs-right">{{ props.item.category }}</td>
        <td class="justify-center layout px-0">
          <v-icon
            small
            class="mr-2"
            @click="editProduct(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteProduct(props.item)"
          >
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    headersProduct: [
      {
        text: 'Product',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Description', value: 'description' },
      { text: 'Stock', value: 'stock' },
      { text: 'Image', value: 'image' },
      { text: 'Price', value: 'price' },
      { text: 'Currency', value: 'currency' },
      { text: 'Category', value: 'category' },
      { text: 'Actions', value: 'name', sortable: false }
    ],
    listProducts: [],
    editedIndex: -1,
    editedProduct: {
      name: '',
      description: 0,
      stock: 0,
      image: '',
      price: 0,
      currency: '',
      category: ''
    },
    defaultProduct: {
      name: '',
      description: 0,
      stock: 0,
      image: '',
      price: 0,
      currency: '',
      category: ''
    }
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },

  watch: {
    dialog (val) {
      val || this.closeProductDialog()
    }
  },

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      this.listProducts = [
        {
          name: 'Baju Hijrah',
          description: 'ini makanan enak',
          stock: 10,
          image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
          price: 100000,
          currency: 'IDR',
          category: 'top'
        },
        {
          name: 'Celana Hijrah',
          description: 'ini barang bagus',
          stock: 11,
          image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
          price: 220000,
          currency: 'IDR',
          category: 'bottom'
        },
        {
          name: 'Topi Hijrah',
          description: 'topi hijrah bagus',
          stock: 20,
          image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
          price: 80000,
          currency: 'IDR',
          category: 'accesories'
        },
        {
          name: 'Sarung Hijrah',
          description: 'sarung motif bagus',
          stock: 15,
          image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
          price: 70000,
          currency: 'IDR',
          category: 'top'
        },
        {
          name: 'Jaket Hijrah',
          description: 'ini bagus',
          stock: 29,
          image: 'https://ecs7.tokopedia.net/img/cache/700/product-1/2019/1/8/357645562/357645562_36081d03-32fa-4bad-b828-ff8c674495d3_640_640.jpg',
          price: 100000,
          currency: 'IDR',
          category: 'top'
        }
      ]
    },

    editProduct (item) {
      this.editedIndex = this.listProducts.indexOf(item)
      this.editedProduct = Object.assign({}, item)
      this.dialog = true
    },

    deleteProduct (item) {
      const index = this.listProducts.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.listProducts.splice(index, 1)
    },

    closeProductDialog () {
      this.dialog = false
      setTimeout(() => {
        this.editedProduct = Object.assign({}, this.defaultProduct)
        this.editedIndex = -1
      }, 300)
    },

    saveProductDialog () {
      if (this.editedIndex > -1) {
        Object.assign(this.listProducts[this.editedIndex], this.editedProduct)
      } else {
        this.listProducts.push(this.editedProduct)
      }
      this.closeProductDialog()
    }
  }
}
</script>

<style>

</style>
