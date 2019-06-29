<template>
  <v-app>
    <Navbar></Navbar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Footbar></Footbar>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import Footbar from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Footbar
  },
  data () {
    return {
      url_server: 'http://localhost:3000'
    }
  },
  methods: {
    //
  },
  created () {
    if (localStorage.token) {
      this.$store.commit('setIsLogin', true)
      this.$store.dispatch('getCart')
      this.$store.dispatch('getProfile')
    }
  }
}
</script>
