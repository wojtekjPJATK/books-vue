<template>
  <span>
    <v-toolbar app class="px-4">
      <router-link to="/">
        <v-toolbar-title to="/">
          <span>Books</span>
        </v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <div v-if="!isAuthenticated">
        <v-btn flat to="/signin">Sign in</v-btn>
        <v-btn raised to="/join" color="grey">Join</v-btn>
      </div>
      <div v-else>
        <v-btn flat to="/authors">Authors</v-btn>
        <v-btn flat to="/books">Books</v-btn>
        <v-btn flat to="/favorites">Favorites</v-btn>
        <v-btn flat to="/magic">Magic</v-btn>
        <v-btn round outline @click="logout">
          <span>Logout</span>
          <v-icon right>exit_to_app</v-icon>
        </v-btn>
      </div>
    </v-toolbar>
  </span>
</template>

<script>
export default {
  name: "Navbar",
  data() {
    return {
      auth: true
    };
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.loggedIn;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(response => {
        this.$router.push({ name: "signin" });
      });
    }
  }
};
</script>

<style scoped>
a {
  color: white;
  text-decoration: none;
}
</style>