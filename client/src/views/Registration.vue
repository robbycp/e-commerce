<template>
  <v-layout row>
    <v-flex xs12 sm8 offset-sm2>
      <v-card xs6 offset-xs3>
        <v-tabs v-model="activeTab" color="cyan" dark slider-color="yellow">
          <v-tab key="login" ripple>Login</v-tab>
          <v-tab key="registration" ripple>Registration</v-tab>
          <v-tab-item key="login">
            <v-container>
              <v-card flat>
                <form>
                  <v-text-field v-model="loginUser.username" label="Username" required></v-text-field>
                  <v-text-field v-model="loginUser.password" :type="'password'" label="Password" required></v-text-field>
                  <v-btn @click="defaultLogin()" class="success">Submit</v-btn>
                  <p>Or sign in using Google</p>
                  <g-signin-button
                    :params="googleSignInParams"
                    @success="onSignInSuccess"
                    @error="onSignInError">
                    Sign in with Google
                  </g-signin-button>
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
export default {
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

    },
    onSignInSuccess () {

    },
    onSignInError () {

    },
    sendRegisterUser () {

    }
  }
}
</script>

<style>

</style>
