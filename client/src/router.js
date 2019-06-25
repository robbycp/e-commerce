import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import Product from './views/Products.vue'
import Registration from './views/Registration.vue'
import Cart from './views/Cart.vue'
import AdminLogin from './views/Admin-Login.vue'
import Dashboard from './views/Dashboard.vue'
import AddProduct from './views/AddProduct.vue'

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/products',
      name: 'product',
      component: Product
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
      children: [{
        path: 'dashboard',
        name: 'dashboard',
        component: Dashboard
      },
      {
        path: 'addProduct',
        name: 'addProduct',
        component: AddProduct
      }]
    }
  ]
})
