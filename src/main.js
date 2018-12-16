import Vue from "vue";
import "./plugins/vuetify";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import GoogleAuth from "vue-google-oauth";

Vue.config.productionTip = false;
Vue.use(GoogleAuth, {
  client_id:
    "119036505724-l7aourh8dss0mvb0jp7bfr951l8sc8r4.apps.googleusercontent.com"
});
Vue.googleAuth().load();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
