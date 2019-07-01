import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import Swal from 'sweetalert2'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    url_server: 'http://35.185.180.89', // http://localhost;3000 https:35.185.180.89:80
    isLogin: false,
    loginUser: {},
    allProducts: [],
    oneProduct: {},
    cart: {}
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
    },
    setLoginUser (state, payload) {
      state.loginUser = payload
    },
    setCart (state, payload) {
      state.cart = payload
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
          context.commit('setCart', data)
        })
        .catch(err => {
          console.log(err)
        })
    },
    getProfile (context) {
      if (localStorage.token) {
        axios({
          method: 'GET',
          url: `${context.state.url_server}/users/myprofile`,
          headers: {
            token: JSON.parse(localStorage.token).token
          }
        })
          .then(({ data }) => {
            context.commit('setLoginUser', data)
          })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    getProducts (context) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/products`
      })
        .then(({ data }) => {
          context.state.allProducts = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getOneProduct (context, payload) {
      axios({
        method: 'GET',
        url: `${context.state.url_server}/products/${payload}`
      })
        .then(({ data }) => {
          context.state.oneProduct = data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    addCartToDatabase (context, payload) {
      let showErrorLoginFirst = false
      if (localStorage.token) {
        if (!context.state.loginUser) {
          showErrorLoginFirst = true
        }
      } else {
        showErrorLoginFirst = true
      }

      if (showErrorLoginFirst) {
        Swal.fire(
          'Login First!',
          'Please login to preceed add this item to cart',
          'error'
        )
      } else {
        let sendData = {
          _id: payload.productId,
          quantity: payload.quantity
        }
        axios({
          method: 'POST',
          data: sendData,
          headers: {
            token: JSON.parse(localStorage.token).token
          },
          url: `${context.state.url_server}/transactions`
        })
          .then(({ data }) => {
            Swal.fire(
              'Success!',
              'Successfully added this product to your cart',
              'success'
            )
          })
          .catch((err) => {
            if (err.response.message) {
              Swal.fire(
                'Error!',
                err.response.message,
                'error'
              )
            }
          })
      }
    }
  }
})
