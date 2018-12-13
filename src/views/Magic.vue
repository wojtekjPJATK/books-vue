<template>
  <v-layout align-center column class="mx-4">
    <h1>Various features</h1>
    <v-btn large @click="sendEmail()">Send email
      <v-icon right>fas fa-envelope</v-icon>
    </v-btn>
    {{ weather }}
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    weather: false
  }),
  created() {
    this.getWeather();
  },
  methods: {
    sendEmail() {
      axios
        .get("https://solwit-pjatk-arc-2018-gr4.appspot.com/mail")
        .then(response => {
          console.log(response);
        })
        .catch(e => {
          console.log(e);
        });
    },
    getWeather() {
      axios
        .get(
          "https://api.openweathermap.org/data/2.5/weather?id=7531002&APPID=366108217f1e830d2aa0c8a98c0ef25a&fbclid=IwAR122sOL5uHZ9p4dh025x_fKE9OF0t9IBZLCHpfZvsSLcVR-KMUr2QEAhW0"
        )
        .then(response => {
          this.weather = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }
};
</script>

