<template>
  <v-toolbar app fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>White Collar</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <router-link to="/"><v-btn flat>Home</v-btn></router-link>
      <router-link to="/products"><v-btn flat>Products</v-btn></router-link>
      <router-link to="/registration"><v-btn flat>Login / Register</v-btn></router-link>
      <router-link to="/cart"><v-btn flat>Cart</v-btn></router-link>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  name: 'navbar'
}
</script>

<style>

</style>
