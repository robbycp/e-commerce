<template>
  <v-toolbar app dark fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Brimlezz</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/" flat>Home</v-btn>
      <v-btn to="/products" flat>Products</v-btn>
      <v-btn v-if="!$store.state.isLogin" to="/registration" flat>Login / Register</v-btn>
      <v-btn v-if="$store.state.isLogin" to="/cart" flat>Cart</v-btn>
      <v-btn v-if="$store.state.isLogin"
        @click="setLogout()"
        flat>Logout</v-btn>
      <v-btn v-if="$store.state.isLogin" disabled flat>
        {{ $store.state.loginUser.username }}
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'navbar',
  methods: {
    setLogout () {
      Swal.fire({
        title: 'Logout',
        text: 'Do you want to logout?',
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, I want to logout!'
      })
        .then((result) => {
          if (result.value) {
            Swal.fire(
              'Success!',
              'You are successfully logout.',
              'success'
            )
            this.$store.commit('setIsLogin', false)
            localStorage.removeItem('token')
            this.$router.push('/')
          }
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
