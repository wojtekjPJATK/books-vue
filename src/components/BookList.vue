<template>
  <div>
    <v-toolbar raised>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="800px">
        <v-btn slot="activator" color="grey" class="mb-2">New Book</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-badge overlap right color="white">
                    <v-icon slot="badge" light @click="editCover()">fas fa-pen</v-icon>
                    <v-avatar size="70px" tile>
                      <img :src="editedItem.imageUrl">
                    </v-avatar>
                  </v-badge>
                  <input
                    type="file"
                    style="display:none"
                    ref="fileInput"
                    accept="image/*"
                    @change="onFilePicked"
                  >
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.title" label="Title"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-select
                    :items="authors"
                    v-model="selectedAuthors"
                    :menu-props="{ maxHeight: '400' }"
                    label="Select"
                    multiple
                    hint="Pick authors"
                    persistent-hint
                  ></v-select>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="grey lighten-1" flat @click.native="close">Cancel</v-btn>
            <v-btn color="grey" raised @click.native="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table :headers="headers" :items="books" class="elevation-1">
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{ props.item.title }}</td>
          <td class="text-xs-left">{{ props.item.author.toString() }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="bookDetails(props.item.id)">far fa-eye</v-icon>
            <v-icon
              v-if="props.item.favorited"
              small
              class="mr-2"
              @click="changeFavorite(props.item)"
            >fas fa-star</v-icon>
            <v-icon
              v-if="!props.item.favorited"
              small
              class="mr-2"
              @click="changeFavorite(props.item)"
            >far fa-star</v-icon>
            <v-icon small class="mr-2" @click="editItem(props.item)">fas fa-edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">fas fa-trash</v-icon>
          </td>
        </tr>
      </template>
      <template slot="no-data">
        <v-btn color="primary" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    image: null,
    loading: true,
    headers: [
      {
        text: "Title",
        align: "left",
        value: "title"
      },
      { text: "Author", value: "author" },
      { text: "Actions", value: "name", sortable: false }
    ],
    selectedAuthors: [],
    editedIndex: -1,
    editedItem: {
      title: "",
      author: ""
    },
    defaultItem: {
      title: "",
      author: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Book" : "Edit Book";
    },
    books() {
      return this.$store.getters.getBooks;
    },
    authors() {
      const authors = this.$store.getters.getAuthors;
      let authorNames = [];
      authors.forEach(author => {
        let name = author.firstName + " " + author.lastName;
        authorNames.push(name);
      });
      return authorNames;
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.$store.dispatch("getBooks");
      this.$store.dispatch("getAuthors");
    },
    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      if (this.editedIndex > -1) this.selectedAuthors = item.author;
      this.editedItem = Object.assign({}, item);
      if (!this.editedItem.imageUrl)
        this.editedItem.imageUrl =
          "https://storage.googleapis.com/solwit-pjatk-bookshelf/Cover-placeholder.gif";
      this.dialog = true;
    },
    deleteItem(item) {
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteBook", item);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
        this.selectedAuthors = [];
        this.image = null;
      }, 300);
    },
    save() {
      this.editedItem.author = this.selectedAuthors;
      this.editedItem.image = this.image;
      delete this.editedItem.imageUrl;
      if (this.editedIndex > -1) {
        this.$store.dispatch("editBook", this.editedItem);
      } else {
        this.$store.dispatch("addBook", this.editedItem);
      }
      this.close();
    },
    changeFavorite(item) {
      this.$store.dispatch("changeFavorite", item);
    },
    bookDetails(book) {
      this.$router.push({ path: "/book/" + book });
    },
    editCover() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.editedItem.imageUrl = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
