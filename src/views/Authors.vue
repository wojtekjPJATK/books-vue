<template>
  <v-layout align-center column class="my-4">
    <h1 class="mb-3">Author List</h1>
    <AuthorList/>
  </v-layout>
</template>

<script>
import AuthorList from "@/components/AuthorList";

export default {
  name: "Authors",
  components: {
    AuthorList
  }
};
</script>
