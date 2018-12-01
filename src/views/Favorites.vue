<template>
    <v-layout align-center column class="my-4">
        <h1 class="mb-3">My Favorites</h1>
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
