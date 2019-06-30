<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card xs6 offset-xs3>
        <v-tabs v-model="activeTab" color="orange darken-3" dark slider-color="yellow">
          <v-tab key="login" ripple>Login</v-tab>
          <v-tab key="registration" ripple>Registration</v-tab>
          <v-tab-item key="login">
            <v-container>
              <v-card flat>
                <form>
                  <v-text-field v-model="loginUser.username" label="Username" required></v-text-field>
                  <v-text-field v-model="loginUser.password" :type="'password'" label="Password" required></v-text-field>
                  <v-btn @click="defaultLogin()" class="success">Submit</v-btn>
                </form>
              </v-card>
            </v-container>
          </v-tab-item>
          <v-tab-item key="registration">
            <v-container>
              <v-card flat>
                <form>
                  <v-text-field v-model="registerUser.full_name" label="Full Name" required></v-text-field>
                  <v-text-field v-model="registerUser.username" label="Username" required></v-text-field>
                  <v-text-field v-model="registerUser.password" label="Password" :type="'password'" required></v-text-field>
                  <v-text-field v-model="registerUser.email" label="Email" required></v-text-field>
                  <v-btn @click="sendRegisterUser()">Register</v-btn>
                </form>
              </v-card>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'registration',
  data () {
    return {
      activeTab: '',
      loginUser: {
        username: '',
        password: ''
      },
      registerUser: {
        full_name: '',
        username: '',
        password: '',
        email: ''
      },
      googleSignInParams: ''
    }
  },
  methods: {
    defaultLogin () {
      event.preventDefault()
      let sendLoginUser = {
        username: this.loginUser.username,
        password: this.loginUser.password,
        login_type: 'default'
      }
      axios.post(`${this.$store.state.url_server}/users/login`, sendLoginUser)
        .then(({ data }) => {
          if (data.token) {
            let token = {
              token: data.token,
              token_type: 'default'
            }
            localStorage.setItem('token', JSON.stringify(token))
            Swal.fire({
              title: `Welcome back ${sendLoginUser.username}!`,
              text: 'Success Login',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.$store.commit('setIsLogin', true)
            this.$router.push('/')
            this.$store.dispatch('getCart')
            this.$store.dispatch('getProfile')
          }
        })
        .catch((err) => {
          this.$store.commit('showError', err.response.data.message)
        })
    },
    sendRegisterUser () {
      let sendRegisterUser = {
        full_name: this.registerUser.full_name,
        username: this.registerUser.username,
        password: this.registerUser.password,
        email: this.registerUser.email
      }
      axios({
        method: 'POST',
        data: sendRegisterUser,
        url: `${this.$store.state.url_server}/users/register`
      })
        .then(({ data }) => {
          Swal.fire({
            title: 'Success!',
            text: 'Successfully register! Please login to continue using.',
            type: 'success',
            confirmButtonText: 'Okay'
          })
          this.registerUser = { full_name: '', username: '', password: '', email: '' }
        })
        .catch((err) => {
          this.$store.commit('showError', err.response.data.message)
        })
    },
    onSignInSuccess (googleUser) {
      const profile = googleUser.getBasicProfile() // etc etc
      let sendUser = {
        full_name: profile.ig,
        email: profile.U3,
        username: profile.U3.split('@')[0],
        login_type: 'google'
      }
      axios.post(`${this.$store.state.url_server}/users/login`, sendUser)
        .then(({ data }) => {
          if (data.token) {
            let token = {
              token: data.token,
              token_type: 'google'
            }
            localStorage.setItem('token', JSON.stringify(token))
            Swal.fire({
              title: `Welcome back ${sendUser.username}!`,
              text: 'Success Login',
              type: 'success',
              confirmButtonText: 'Ok'
            })
            this.$store.dispatch('getCart')
            this.$store.dispatch('getProfile')
          }
        })
        .catch((err) => {
          Swal.fire({
            title: 'Error!',
            text: err.response.data.message,
            type: 'error',
            confirmButtonText: 'Cancel'
          })
        })
    },
    onSignInError (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: error.response.data.message,
        type: 'error',
        confirmButtonText: 'Cancel'
      })
    }
  }
}
</script>

<style>

</style>
