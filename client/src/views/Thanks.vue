<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div>Thank you. Your order has been received</div>
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="transactionData._id" label="Order Number" disabled></v-text-field>
        <v-text-field v-model="transactionData.updatedAt" label="Date" disabled></v-text-field>
        <v-text-field v-model="transactionData.total" label="Total" disabled></v-text-field>
        <v-text-field v-model="transactionData.sendMethod" label="Shipment Method" disabled></v-text-field>
      </v-flex>
      <v-flex xs12>
        <p>Lakukan pembayaran langsung ke rekening bank bca kami.
          Silahkan gunakan ID Pesanan Anda sebagai referensi pembayaran.
          Pesanan Anda tidak akan dikirim sampai dana telah Kami terima.
          Mohon untuk konfirmasi pembayaran melalui Whatsapp 082123456789.</p>
      </v-flex>
      <v-flex xs12>
        <h2>Detail Pembayaran</h2>
        <v-text-field v-model="paymentData.bank" label="Bank Name" disabled></v-text-field>
        <v-text-field v-model="paymentData.ownerRekening" label="Owner Name" disabled></v-text-field>
        <v-text-field v-model="paymentData.nomorRekening" label="Number" disabled></v-text-field>
      </v-flex>
      <v-flex xs12>
        <h2>Order Details</h2>
        <v-data-table
          :headers="orderHeaders"
          :items="transactionData.itemBought" class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <td>{{ props.item.item.name }}</td>
            <td class="text-xs-right">{{ props.item.quantity }}</td>
            <td class="text-xs-right">{{ props.item.item.price }}</td>
            <td class="text-xs-right">{{ props.item.item.price * props.item.quantity }}</td>
          </template>
          <template v-slot:footer>
            <td :colspan="orderHeaders.length">
              <strong offset-xs9 xs3>Total {{ transactionData.total }}</strong>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  name: 'thanks',
  data () {
    return {
      transactionData: {},
      paymentData: {
        bank: 'Bank Mandiri',
        ownerRekening: 'PT Hijrah Bersama',
        nomorRekening: '125-20312931-2319-231'
      },
      orderHeaders: [
        { text: 'Product', value: 'name', sortable: false },
        { text: 'Quantity', value: 'quantity', sortable: false },
        { text: 'Price', value: 'price', sortable: false },
        { text: 'Total', value: 'total', sortable: false }
      ]
    }
  },
  computed: {
    totalTransaction () {
      return this.orderSummary.reduce((acc, el) => acc + el.total, 0)
    }
  },
  created () {
    axios({
      method: 'GET',
      headers: {
        token: JSON.parse(localStorage.token).token
      },
      url: `${this.$store.state.url_server}/transactions/${this.$route.params.trxId}`
    })
      .then(({ data }) => {
        this.transactionData = data
      })
      .catch((err) => console.log(err))
  }
}
</script>

<style>

</style>
