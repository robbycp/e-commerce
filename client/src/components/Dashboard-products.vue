<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>All Products</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="orange" class="mb-2" v-on="on">New Item</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.name"
                    label="Product Name"
                    required
                    ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea v-model="editedProduct.description"
                    label="Description"
                    required
                    ></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.stock"
                  type="number" label="Stock" min="0"
                  :rules="[rules.minimumZero]"
                  required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <input color="success" type="file"
                  @change="onFileSelected"
                  required >
                </v-flex>
                <v-flex>
                  <v-img v-if="editedProduct.image"
                    :src="editedProduct.image"
                    ></v-img>
                </v-flex>
                <v-flex xs12>
                  <v-text-field v-model="editedProduct.price"
                  type="number" label="Price" min="0"
                  :rules="[rules.minimumZero]"
                  required></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="editedProduct.currency"
                    :items="form.currencies"
                    :rules="[v => !!v || 'Currency is required']"
                    label="Currency"
                    required
                  ></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-select
                    v-model="editedProduct.category"
                    :items="form.categories"
                    :rules="[v => !!v || 'Category is required']"
                    label="Category"
                    required
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="closeProductDialog">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="saveProductDialog(editedProduct._id)">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headersProduct" :items="$store.state.allProducts" class="elevation-1">
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
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'dashboard-products',
  data: () => ({
    dialog: false,
    form: {
      currencies: ['IDR'],
      categories: ['accessories']
    },
    rules: {
      minimumZero: val => val >= 0 || 'Minimum Zero'
    },
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
    editedIndex: -1,
    editedProduct: {
      _id: '',
      name: '',
      description: '',
      stock: 0,
      image: '',
      price: 0,
      currency: '',
      category: ''
    },
    defaultProduct: {
      name: '',
      description: '',
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
    onFileSelected: function (event) {
      this.editedProduct.image = event.target.files[0]
    },
    initialize () {
      this.$store.dispatch('getProducts')
    },

    editProduct (item) {
      this.dialog = true
      this.editedProduct = item
    },

    deleteProduct (item) {
      let val
      Swal.fire({
        title: 'Delete Product',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete'
      })
        .then((result) => {
          val = result.value
          if (result.value) {
            return axios({
              method: 'DELETE',
              headers: { token: JSON.parse(localStorage.token).token },
              url: `${this.$store.state.url_server}/products/${item._id}`
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
            this.$store.dispatch('getProducts')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },

    closeProductDialog () {
      this.dialog = false
      setTimeout(() => {
        this.editedProduct = Object.assign({}, this.defaultProduct)
        this.editedIndex = -1
      }, 300)
    },

    saveProductDialog (val) {
      let method = (val) ? 'PUT' : 'POST'
      let itemId = (val) ? `/${val}` : ''
      let fd = new FormData()
      Object.keys(this.defaultProduct).forEach((key) => {
        fd.append(key, this.editedProduct[key])
      })
      axios({
        method: method,
        url: `${this.$store.state.url_server}/products${itemId}`,
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        data: fd
      })
        .then(({ data }) => {
          console.log('ini data received', data)
          if (data.message) {
            let showMessage = {
              title: 'Error',
              message: data.message,
              type: 'error'
            }
            return this.$store.commit('showNotification', showMessage)
          }
          this.$store.dispatch('getProducts')
          this.closeProductDialog()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>

</style>
