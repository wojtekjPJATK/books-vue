<template>
  <v-layout align-center column>
    <h1>{{ book.title }}</h1>
    <h3>
      <div v-for="author in book.author" :key="author">{{ author }}</div>
    </h3>
    <img v-if="book.imageUrl" :src="book.imageUrl">
    <img v-else src="/avatar.png">
    <p>{{ book.description }}</p>
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
    this.$store.dispatch("getBookByID", this.book_id);
  },
  computed: {
    book() {
      return this.$store.getters.getBook;
    }
  }
};
</script>

<style scoped>
img {
  max-height: 400px;
}
</style>

