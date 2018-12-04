<template>
  <v-layout align-center column class="mx-4">
    <h1>Various features</h1>
    <v-btn large @click="sendEmail()">Send email
      <v-icon right>fas fa-envelope</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  methods: {
    sendEmail() {
        .get("https://solwit-pjatk-arc-2018-gr4.appspot.com/mail")
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.error(e);
        });
    }
  }
};
</script>

