<template>
  <div>
    <v-toolbar raised>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="600px">
        <v-btn slot="activator" color="grey" class="mb-2">New Author</v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.lastName" label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.firstName" label="First Name"></v-text-field>
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
    <v-data-table :headers="headers" :items="authors" class="elevation-1">
      <template slot="items" slot-scope="props">
        <tr>
          <td class="text-xs-left">{{ props.item.lastName }}</td>
          <td class="text-xs-left">{{ props.item.firstName }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="editItem(props.item)">fas fa-edit</v-icon>
            <v-icon small @click="deleteItem(props.item)">fas fa-trash</v-icon>
          </td>
        </tr>
      </template>
      <template slot="no-data">
        <v-btn color="dark" @click="initialize">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    loading: true,
    image: null,
    headers: [
      {
        text: "Last Name",
        align: "left",
        value: "lastName"
      },
      {
        text: "First Name",
        align: "left",
        value: "firstName"
      },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false
      }
    ],
    //authors: [],
    editedIndex: -1,
    editedItem: {
      lastName: "",
      firstName: ""
    },
    defaultItem: {
      lastName: "",
      firstName: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Author" : "Edit Author";
    },
    authors() {
      return this.$store.getters.getAuthors;
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
      this.$store.dispatch("getAuthors");
    },
    editItem(item) {
      this.editedIndex = this.authors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.authors.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.$store.dispatch("deleteAuthor", this.editedItem);
    },
    close() {
      this.dialog = false;
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      }, 300);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.authors[this.editedIndex], this.editedItem);
        this.$store.dispatch("editAuthor", this.editedItem);
      } else {
        this.$store.dispatch("addAuthor", this.editedItem);

        this.authors.push(this.editedItem);
      }
      this.close();
    }
  }
};
</script>
