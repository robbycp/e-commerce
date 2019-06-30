import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Product from './views/Products.vue'
import Registration from './views/Registration.vue'
import Cart from './views/Cart.vue'
import AdminLogin from './views/Admin-Login.vue'
import Dashboard from './views/Dashboard.vue'
import ProductDetail from './views/Product-Details.vue'
import Thanks from './views/Thanks.vue'
import axios from 'axios'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/products',
      name: 'products',
      component: Product
    },
    {
      path: '/products/:productId',
      name: 'productDetail',
      component: ProductDetail
    },
    {
      path: '/registration',
      name: 'registration',
      component: Registration
    },
    {
      path: '/cart',
      name: 'cart',
      component: Cart
    },
    {
      path: '/admin',
      name: 'admin',
      component: AdminLogin,
      beforeEnter: (to, from, next) => {
        if (localStorage.token) {
          axios({
            method: 'GET',
            headers: {
              token: JSON.parse(localStorage.token).token
            },
            url: 'http://localhost:3000/users/myprofile'
          })
            .then(({ data }) => {
              if (data.admin) {
                next()
              } else {
                next('/')
              }
            })
        } else {
          next('/')
        }
      },
      children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      }]
    },
    {
      path: '/thanks/:trxId',
      name: 'thanks',
      component: Thanks
    }
  ]
})
