<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap align-content-center>
        <v-flex offset-sm4 sm4>
          <v-text-field v-model="username" :rules="usernameRules" label="Username" required></v-text-field>
        </v-flex>
        <v-flex offset-sm4 sm4>
          <v-text-field
            v-model="password"
            :rules="passwordRules"
            :counter="6"
            :append-icon="show ? 'visibility_off' : 'visibility'"
            :type="show ? 'text' : 'password'"
            hint="At least 6 characters"
            label="Password"
            @click:append="show = !show"
            required
          ></v-text-field>
        </v-flex>
        <v-flex offset-sm4 sm4>
          <v-btn :disabled="!valid" @click="submit">join</v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-flex>
        <v-flex offset-sm4 sm4>
          <p class="error--text">{{ error }}</p>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    show: false,
    error: "",
    username: "",
    password: "",
    usernameRules: [
      v => !!v || "Username is required",
      v => v.length >= 3 || "Minimum 3 characters",
      v => /^\S+$/.test(v) || "Whitespaces not allowed"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Minimum 6 characters",
      v => /^\S+$/.test(v) || "Whitespaces not allowed"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        this.$store
          .dispatch("join", {
            username: this.username,
            password: this.password
          })
          .then(response => {
            this.$router.push({ name: "home" });
          })
          .catch(err => {
            this.error = err.data.msg;
          });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>