<template>
  <div>
    <v-layout v-if="!isLoginAdmin">
      <v-flex xs4 offset-xs4>
        <v-card flat>
          <v-card-title>
            <h3>Login as Administrator</h3>
            <small>If you dont have one ask the owner of this website</small>
          </v-card-title>
          <form>
            <v-text-field v-model="loginUser.username" label="Username" required></v-text-field>
            <v-text-field v-model="loginUser.password" :type="'password'" label="Password" required></v-text-field>
            <v-btn @click="defaultLogin()" class="success">Submit</v-btn>
          </form>
        </v-card>
      </v-flex>
    </v-layout>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLoginAdmin: true,
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
