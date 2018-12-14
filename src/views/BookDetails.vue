<template>
  <v-layout align-center column>
    <h1>{{ book.title }}</h1>
    <h2>{{ book.authors[0].name }}</h2>
    <img v-if="book.cover" :src="book.cover">
    <img v-else src="/avatar.png">
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
    this.$store.getters("getBookByID", id);
    this.book = {
      title: "First Snow",
      authors: [
        {
          name: "Jo Nesbo",
          id: 1
        }
      ],
      genre: "criminal",
      cover:
        "https://ecsmedia.pl/c/harry-hole-tom-7-pierwszy-snieg-w-iext43178539.jpg"
    };
  }
};
</script>
