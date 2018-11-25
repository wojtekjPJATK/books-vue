<template>
    <v-layout align-center column class="mx-4">
        <h1>My Favorites</h1>
        <FavoriteList />
    </v-layout>
</template>

<script>
import FavoriteList from "@/components/FavoriteList";

export default {
  name: "Favorites",
  components: {
    FavoriteList
  }
};
</script>
