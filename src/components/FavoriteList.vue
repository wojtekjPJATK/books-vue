<template>
  <div>
    <v-data-table
      :headers="headers"
      :items="favorites"
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.title }}</td>
        <td class="text-xs-left">{{ props.item.author }}</td>
        <td class="text-xs-left">{{ props.item.genre }}</td>
        <td class="justify-center layout px-0">
            <v-icon v-if="props.item.favorited"
            small
            @click="removeFavorite(props.item)"
            >
            fas fa-star
            </v-icon>
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
      { text: "Genre", value: "genre" },
      { text: "Actions", value: "name", sortable: false }
    ],
    favorites: []
  }),
  computed: {},
  watch: {},
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.favorites = [
        {
          title: "First Snow",
          author: "Jo Nesbo",
          genre: "Criminal",
          favorited: true
        }
      ];
    },
    removeFavorite(item) {
      const index = this.favorites.indexOf(item);
      this.favorites.splice(index, 1);
    }
  }
};
</script>
