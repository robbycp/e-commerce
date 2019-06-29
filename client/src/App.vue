<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import axios from 'axios'

export default {
  name: 'App',
  components: {
    Navbar,
    Footer
  },
  data () {
    return {
      url_server: 'http://localhost:3000'
    }
  },
  methods: {
    getListProducts () {
      axios({
        method: 'GET',
        url: `${this.url_server}/products`
      })
    }
  },
  created () {
    if (localStorage.token) {
      this.$store.isLogin = true
      this.$store.dispatch('getCart')
      this.$store.dispatch('getProfile')
    }
  }
}
</script>
