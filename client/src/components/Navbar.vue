<template>
  <v-toolbar app dark fixed>
    <v-toolbar-side-icon></v-toolbar-side-icon>
    <v-toolbar-title>Brimlezz</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn to="/" flat>Home</v-btn>
      <v-btn to="/products" flat>Products</v-btn>
      <v-btn to="/registration" flat>Login / Register</v-btn>
      <v-btn to="/cart" flat>Cart</v-btn>
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
