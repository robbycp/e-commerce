<template>
  <v-card flat>
    <form>
      <v-text-field v-model="loginUser.username" label="Username" required></v-text-field>
      <v-text-field v-model="loginUser.password" :type="'password'" label="Password" required></v-text-field>
      <v-btn @click="defaultLogin()" class="success">Submit</v-btn>
    </form>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      loginUser: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    defaultLogin () {
      //
    }
  }
}
</script>

<style>

</style>
