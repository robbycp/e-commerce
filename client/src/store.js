import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url_server: 'http://localhost:3000',
    isLogin: false,
    loginUser: {},
    allProducts: [],
    cart: []
  },
  mutations: {
    showNotification (state, payload) {
      Swal.fire({
        title: payload.title,
        text: payload.title,
        type: payload.type,
        confirmButtonText: 'Ok'
      })
    },
    showError (state, payload) {
      Swal.fire({
        title: 'Error!',
        text: payload,
        type: 'error',
        confirmButtonText: 'Ok'
      })
    },
    setIsLogin (state, payload) {
      state.isLogin = payload
      if (payload === false) {
        state.loginUser = {}
      }
    }
  },
  actions: {
    getCart (context) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/transactions/cart`,
        headers: {
          token: JSON.parse(localStorage.token).token
        }
      })
        .then(({ data }) => {
          context.state.cart = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProfile (context) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/users/myprofile`,
        headers: {
          token: JSON.parse(localStorage.token).token
        }
      })
        .then(({ data }) => {
          context.state.loginUser = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getProducts (context) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/products`,
        headers: {
          token: JSON.parse(localStorage.token).token
        }
      })
        .then(({ data }) => {
          context.state.allProducts = data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
