<template>
  <v-layout align-center column class="mx-4">
    <h1>Various features</h1>
    <v-btn large @click="sendEmail()">Send email
      <v-icon right>fas fa-envelope</v-icon>
    </v-btn>
    <v-flex v-if="weather" xs12 sm6>
      <v-hover>
        <v-card
          color="gray lighten-1"
          width="300px"
          slot-scope="{ hover }"
          :class="`elevation-${hover ? 12 : 2}`"
        >
          <v-layout class="my-4">
            <v-flex xs3>
              <div class="mt-4">
                <v-img :src="weather.icon" height="50px"></v-img>
              </div>
            </v-flex>
            <v-flex xs7>
              <v-card-title primary-title>
                <div>
                  <div class="headline">{{ weather.city }}, {{ weather.temp}}°C</div>
                  <div>{{ weather.tempereture}}</div>
                  <div>{{ weather.description}}</div>
                  <div
                    class="caption text-no-wrap"
                  >humidity: {{ weather.humidity }}%, pressure: {{ weather.pressure }}hPa</div>
                </div>
              </v-card-title>
            </v-flex>
          </v-layout>
        </v-card>
      </v-hover>
    </v-flex>
    <span v-else>Something wrong with the weather API. Try to reload the page.</span>
    <p class="red--text">{{ task }}</p>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    weather: null,
    task: ""
  }),
  created() {
    this.getWeather();
  },
  methods: {
    sendEmail() {
      this.$store
        .dispatch("isAdmin")
        .then(response => {
          axios
            .get("https://solwit-pjatk-arc-2018-gr4.appspot.com/mail")
            .then(response => {
              this.task = response.data;
            })
            .catch(e => {
              console.log(e);
            });
        })
        .catch(err => {
          this.task =
            "Only admin can use this feature. Try to sign in as admin/admin1";
        });
    },
    getWeather() {
      axios
        .get("https://api.openweathermap.org/data/2.5/weather", {
          params: {
            id: "7531002",
            APPID: "366108217f1e830d2aa0c8a98c0ef25a",
            units: "metric",
            lang: "pl"
          }
        })
        .then(response => {
          this.weather = {
            temp: response.data.main.temp,
            city: response.data.name,
            pressure: response.data.main.pressure,
            icon:
              "https://openweathermap.org/img/w/" +
              response.data.weather[0].icon +
              ".png",
            description: response.data.weather[0].description,
            humidity: response.data.main.humidity
          };
        })
        .catch(e => {
          this.weather = null;
          console.log(e);
        });
    }
  }
};
</script>
