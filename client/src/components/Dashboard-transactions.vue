<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>All Transactions</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headersTransaction" :items="listTransactions" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item._id }}</td>
        <td class="text-xs-right">{{ props.item.itemBought }}</td>
        <td class="text-xs-right">{{ props.item.paymentStatus }}</td>
        <td class="text-xs-right">{{ props.item.transactionStatus }}</td>
        <td class="text-xs-right">{{ props.item.buyerId }}</td>
        <td class="text-xs-right">{{ props.item.address }}</td>
        <td class="text-xs-right">{{ props.item.sendMethod }}</td>
        <td class="justify-center layout px-0">
          <v-icon small @click="deleteProduct(props.item)">
            delete
          </v-icon>
          <v-btn small color="warning" v-if="props.item.paymentStatus == 'unpaid'"
            @click="changeToPaid()">paid</v-btn>
          <v-btn small color="warning" v-if="props.item.paymentStatus == 'paid'"
            @click="changeToSend()">send</v-btn>
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

export default {
  data: () => ({
    headersTransaction: [
      {
        text: 'Id transaction',
        align: 'left',
        sortable: false,
        value: '_id'
      },
      { text: 'Item Bought', value: 'itemBought' },
      { text: 'Payment Status', value: 'paymentStatus' },
      { text: 'Transaction Status', value: 'transactionStatus' },
      { text: 'Buyer Id', value: 'buyerId' },
      { text: 'Address', value: 'address' },
      { text: 'Send Method', value: 'sendMethod' },
      { text: 'Actions', value: '_id', sortable: false }
    ],
    listTransactions: []
  }),

  created () {
    this.initialize()
  },

  methods: {
    initialize () {
      axios({
        method: 'GET',
        headers: {
          token: JSON.parse(localStorage.token).token
        },
        url: `${this.$store.state.url_server}/transactions/alltrx`
      })
        .then(({ data }) => {
          this.listTransactions = data
        })
        .catch((err) => {
          console.log(err)
        })
    },

    deleteProduct (item) {
      const index = this.listTransactions.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.listTransactions.splice(index, 1)
    },

    changeToSend () {
      //
    },

    changeToPaid () {
      //
    }
  }
}
</script>

<style>

</style>
