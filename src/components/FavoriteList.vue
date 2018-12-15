<template>
  <div>
    <v-data-table :headers="headers" :items="favorites" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.author.toString() }}</td>
        <td class="justify-center layout px-0">
          <v-icon v-if="props.item.favorited" small @click="removeFavorite(props.item)">fas fa-star</v-icon>
        </td>
      </template>
      <template slot="no-data">
        <h3 class="font-weight-regular">Nothing here... Your favorite list is empty</h3>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    loading: true,
    headers: [
      {
        text: "Title",
        align: "left",
        value: "title"
      },
      { text: "Author", value: "author" },
      { text: "Actions", value: "name", sortable: false }
    ]
  }),
  computed: {
    favorites() {
      return this.$store.getters.getFavorites;
    }
  },
  methods: {
    removeFavorite(item) {
      console.log(item);
      this.$store.dispatch("changeFavorite", item);
    }
  }
};
</script>
