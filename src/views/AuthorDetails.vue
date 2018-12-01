<template>
  <v-layout align-center column class="my-4">
    <v-avatar size="100px">
      <img v-if="this.author.avatar" :scr="this.author.avatar">
      <v-icon large v-else>fas fa-user</v-icon>
    </v-avatar>
    <h1>{{ this.author.first }} {{ this.author.last }}</h1>
    <v-subheader>Books written:</v-subheader>
    <v-list-tile
      v-for="book in this.author.books"
      :key="book.id"
      avatar
      @click="bookDetails(book.id)"
    >
      <v-list-tile-avatar>
        <img v-if="book.cover_thumb" :src="book.cover_thumb">
        <v-icon v-else>fas fa-book</v-icon>
      </v-list-tile-avatar>

      <v-list-tile-content>{{book.title}}</v-list-tile-content>
    </v-list-tile>
  </v-layout>
</template>

<script>
export default {
  props: {
    author_id: {
      type: String,
      default: null
    }
  },
  created() {
    this.author = {
      first: "Jo",
      last: "Nesbo",
      avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
      books: [
        {
          title: "First Snow",
          id: 1,
          cover_thumb: "https://cdn.vuetifyjs.com/images/lists/3.jpg"
        },
        {
          title: "Last Snow",
          id: 2,
          cover_thumb: "https://cdn.vuetifyjs.com/images/john.jpg"
        }
      ]
    };
  },
  methods: {
    bookDetails(bookID) {
      this.$router.push({ path: "/book/" + bookID });
    }
  }
};
</script>
