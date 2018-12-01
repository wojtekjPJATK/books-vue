<template>
  <h1>{{ author_id }}</h1>
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
    //get Author profile
  }
};
</script>
