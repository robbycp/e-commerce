<template>
  <div>
    <v-toolbar app dark fixed>
      <v-toolbar-side-icon
        @click.stop="navdrawer.drawer = !navdrawer.drawer"
        ></v-toolbar-side-icon>
      <v-toolbar-title>Brimlezz</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn v-if="$store.state.isLogin"
        @click="setLogout()"
        flat>Logout</v-btn>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn to="/" flat>Home</v-btn>
        <v-btn to="/products" flat>Products</v-btn>
        <v-btn v-if="!$store.state.isLogin" to="/registration" flat>Login / Register</v-btn>
        <v-btn v-if="$store.state.isLogin" to="/cart" flat>Cart</v-btn>
        <v-btn v-if="$store.state.isLogin && $store.state.loginUser.admin"
          to="/admin/dashboard" flat>Dashboard</v-btn>
        <v-btn v-if="$store.state.isLogin" disabled flat>
          {{ $store.state.loginUser.username }}
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
    <v-navigation-drawer
      v-model="navdrawer.drawer" absolute temporary>
      <v-list class="pa-1">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="https://randomuser.me/api/portraits/men/85.jpg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{ $store.state.loginUser.full_name }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in navdrawer.filteredMenus"
          :key="item.title"
          :to="'/' + item.routeLink"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  name: 'navbar',
  data () {
    return {
      navdrawer: {
        drawer: false,
        menus: [
          { title: 'Home', icon: 'home', routeLink: '' },
          { title: 'Products', icon: 'fab fa-pied-piper-hat', routeLink: 'products' },
          { title: 'Cart', icon: 'fas fa-cart-plus', routeLink: 'cart' },
          { title: 'Dashboard', icon: 'dashboard', routeLink: 'admin/dashboard' },
          { title: 'Register / Login', icon: 'fas fa-sign-in-alt', routeLink: 'registration' }
        ],
        filteredMenus: []
      }
    }
  },
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
            this.$store.commit('setCart', {})
            localStorage.removeItem('token')
            this.$router.push('/')
          }
        })
        .catch((err) => {
          console.log(err)
        })
    },
    filterMenus () {
      this.navdrawer.filteredMenus = this.navdrawer.menus.filter((menu) => {
        if (menu.title === 'Dashboard') {
          if (this.$store.state.loginUser.admin) {
            return true
          } else {
            return false
          }
        } else {
          return true
        }
      })
    }
  },
  watch: {
    '$store.state.isLogin' () {
      this.filterMenus()
    }
  },
  created () {
    this.filterMenus()
  }
}
</script>

<style>

</style>
