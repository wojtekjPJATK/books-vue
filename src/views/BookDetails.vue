<template>
  <v-layout>
    <h1>{{ book_id }}</h1>
    <img src="/avatar.png">
  </v-layout>
</template>

<script>
export default {
  props: {
    book_id: {
      type: String,
      default: null
    }
  },
  created() {
    //get Book details
  }
};
</script>
