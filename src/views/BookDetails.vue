<template>
  <h1>{{ book_id }}</h1>
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
