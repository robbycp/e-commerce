import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

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

  },
  actions: {
    getCart (state) {
      axios({
        method: 'GET',
        url: `${state.url_server}/transactions/cart`,
        headers: {
          token: JSON.parse(localStorage.token).token
        }
      })
        .then(({ data }) => {
          state.cart = data
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProfile (state) {
      axios({
        method: 'GET',
        url: `${state.url_server}/myprofile`,
        headers: {
          token: JSON.parse(localStorage.token).token
        }
      })
        .then(({ data }) => {
          state.loginUser = data
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
})
