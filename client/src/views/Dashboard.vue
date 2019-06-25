<template>
  <div>
    <!-- List Products -->
    <v-layout row id="list-product">
      <v-flex xs12 lg10 offset-lg1>
        <DashboardProducts></DashboardProducts>
      </v-flex>
    </v-layout>
    <!-- List Transactions -->
    <v-layout row id="list-transaction">
      <v-flex>
        <DashboardTransactions></DashboardTransactions>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import DashboardProducts from '@/components/Dashboard-products.vue'
import DashboardTransactions from '@/components/Dashboard-transactions.vue'

export default {
  components: {
    DashboardProducts,
    DashboardTransactions
  }
}
</script>

<style>

</style>
