<template>
    <v-layout align-center column class="my-4">
        <h1 class="mb-3">Book List</h1>
        <BookList />
    </v-layout>
</template>

<script>
import BookList from "@/components/BookList";

export default {
  name: "Books",
  components: {
    BookList
  }
};
</script>
