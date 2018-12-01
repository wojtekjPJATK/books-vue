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
                  <v-badge overlap right color="white">
                    <v-icon slot="badge" light @click="editAvatar()">fas fa-pen</v-icon>
                    <v-avatar size="70px">
                      <img v-if="editedItem.avatar" :src="editedItem.avatar">
                      <img v-else src="/avatar.png">
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
                  <v-text-field v-model="editedItem.last" label="Last Name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.first" label="First Name"></v-text-field>
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
          <td class="text-xs-left">{{ props.item.last }}</td>
          <td class="text-xs-left">{{ props.item.first }}</td>
          <td class="justify-center layout px-0">
            <v-icon small class="mr-2" @click="authorDetails(props.item.id)">far fa-eye</v-icon>
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
        value: "last"
      },
      {
        text: "First Name",
        align: "left",
        value: "first"
      },
      {
        text: "Actions",
        value: "actions",
        align: "center",
        sortable: false
      }
    ],
    authors: [],
    editedIndex: -1,
    editedItem: {
      last: "",
      first: ""
    },
    defaultItem: {
      last: "",
      first: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Author" : "Edit Author";
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
      this.authors = [
        {
          id: 1,
          first: "Jo",
          last: "Nesbo",
          avatar: "https://cdn.vuetifyjs.com/images/john.jpg"
        },
        {
          id: 2,
          first: "Brandon",
          last: "Sanderson"
        }
      ];
      this.loading = false;
    },
    editItem(item) {
      this.editedIndex = this.authors.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },
    deleteItem(item) {
      const index = this.authors.indexOf(item);
      confirm("Are you sure you want to delete this item?") &&
        this.authors.splice(index, 1);
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
      } else {
        this.authors.push(this.editedItem);
      }
      this.close();
    },
    authorDetails(authorID) {
      this.$router.push({ path: "/author/" + authorID });
    },
    editAvatar() {
      this.$refs.fileInput.click();
    },
    onFilePicked(event) {
      const files = event.target.files;
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.editedItem.avatar = fileReader.result;
      });
      fileReader.readAsDataURL(files[0]);
      this.image = files[0];
    }
  }
};
</script>
