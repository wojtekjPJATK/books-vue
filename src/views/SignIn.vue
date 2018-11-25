<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-container grid-list-md text-xs-center>
      <v-layout row wrap align-content-center>
        <v-flex offset-sm4 sm4>
          <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-Mail"
          required
          ></v-text-field>
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
          <v-btn
          :disabled="!valid"
          @click="submit"
          >
          signin
          </v-btn>
          <v-btn @click="clear">clear</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
// import axios from "axios";

export default {
  data: () => ({
    valid: true,
    show: false,
    email: "",
    password: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+/.test(v) || "E-mail must be valid"
    ],
    passwordRules: [
      v => !!v || "Password is required",
      v => v.length >= 6 || "Minimum 6 characters"
    ]
  }),

  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        alert("valid");
        // axios.post("/signin", {
        //   email: this.email,
        //   password: this.password
        // });
      }
    },
    clear() {
      this.$refs.form.reset();
    }
  }
};
</script>