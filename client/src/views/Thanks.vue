<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div>Thank you. Your order has been received</div>
      </v-flex>
      <v-flex xs12>
        <v-text-field v-model="orderNumber" label="Order Number" disabled></v-text-field>
        <v-text-field v-model="date" label="Date" disabled></v-text-field>
        <v-text-field v-model="total" label="Total" disabled></v-text-field>
        <v-text-field v-model="shipmentMethod" label="Shipment Method" disabled></v-text-field>
      </v-flex>
      <v-flex xs12>
        <p>Lakukan pembayaran langsung ke rekening bank bca kami. Silahkan gunakan ID Pesanan Anda sebagai referensi pembayaran. Pesanan Anda tidak akan dikirim sampai dana telah Kami terima. Cek email anda untuk informasi lebih lengkap.</p>
      </v-flex>
      <v-flex xs12>
        <h2>Detail Pembayaran</h2>
        <v-text-field v-model="bank" label="Bank Name" disabled></v-text-field>
        <v-text-field v-model="ownerRekening" label="Owner Name" disabled></v-text-field>
        <v-text-field v-model="nomorRekening" label="Number" disabled></v-text-field>
      </v-flex>
      <v-flex xs12>
        <h2>Order Details</h2>
        <v-data-table
          :headers="orderHeaders"
          :items="orderSummary" class="elevation-1"
          hide-actions
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.quantity }}</td>
            <td class="text-xs-right">{{ props.item.total }}</td>
          </template>
          <template v-slot:footer>
            <td :colspan="orderHeaders.length">
              <strong offset-xs9 xs3>Total {{ totalTransaction }}</strong>
            </td>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
      orderNumber: 1238,
      date: 'Jun 23 2019',
      total: 1230000,
      shipmentMethod: 'JNE Express',
      bank: 'Bank Mandiri',
      ownerRekening: 'PT Hijrah Bersama',
      nomorRekening: '125-20312931-2319-231',
      orderHeaders: [
        { text: 'Product', value: 'name', sortable: false },
        { text: 'Quantity', value: 'quantity', sortable: false },
        { text: 'Total', value: 'total', sortable: false }
      ],
      orderSummary: [
        { name: 'Topi Hijrah', quantity: 2, total: 200000 },
        { name: 'Celana Hijrah', quantity: 1, total: 100000 },
        { name: 'Sarung Hijrah', quantity: 1, total: 70000 }
      ]
    }
  },
  computed: {
    totalTransaction () {
      return this.orderSummary.reduce((acc, el) => acc + el.total, 0)
    }
  }
}
</script>

<style>

</style>
