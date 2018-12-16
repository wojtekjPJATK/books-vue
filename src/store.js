import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

axios.defaults.baseURL = "https://2-dot-solwit-pjatk-arc-2018-gr4.appspot.com";

export default new Vuex.Store({
  state: {
    id: localStorage.getItem("id") || null,
    books: [],
    authors: [],
    book: null
  },
  getters: {
    loggedIn(state) {
      return state.id;
    },
    getBooks(state) {
      return state.books;
    },
    getAuthors(state) {
      return state.authors;
    },
    getBook(state) {
      return state.book;
    },
    getFavorites(state) {
      return state.books.filter(book => {
        return book.favorited == true;
      });
    }
  },
  mutations: {
    deleteSession(state) {
      state.id = null;
    },
    getBooks(state, books) {
      state.books = books;
    },
    getAuthors(state, authors) {
      state.authors = authors;
    },
    setSessionID(state, id) {
      state.id = id;
    },
    changeFavorite(state, item) {
      const index = state.books.findIndex(book => book.id == item.id);
      item.favorited = !item.favorited;
      state.books.splice(index, 1, item);
    },
    getBook(state, book) {
      state.book = book;
    },
    deleteBook(state, id) {
      const index = state.books.findIndex(book => book.id == id);
      state.books.splice(index, 1);
    },
    addBook(state, book) {
      state.books.push(book);
    },
    editBook(state, item) {
      const index = state.books.findIndex(book => book.id == item.id);
      state.books.splice(index, 1, item);
    },
    addAuthor(state, item) {
      state.authors.push(item);
    },
    editAuthor(state, item) {
      const index = state.authors.findIndex(author => author.id == item.id);
      state.authors.splice(index, 1, item);
    },
    deleteAuthor(state, item) {
      const index = state.authors.findIndex(author => author.id == item.id);
      state.authors.splice(index, 1);
    }
  },
  actions: {
    logout(context) {
      console.log("logging out");
      axios.defaults.headers.common["Authorization"] = context.state.id;
      return new Promise((resolve, reject) => {
        axios
          .delete("/session/" + this.state.id)
          .then(response => {
            console.log(response);
            localStorage.removeItem("id");
            context.commit("deleteSession");
            resolve(response);
          })
          .catch(err => {
            console.log(err);
            reject(err);
          });
      });
    },
    join(context, data) {
      return new Promise((resolve, rejext) => {
        axios
          .post("/join", {
            login: data.username,
            password: data.password
          })
          .then(result => {
            let session_id = response.data.id;
            localStorage.setItem("id", session_id);
            context.commit("setSessionID", session_id);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    oAuth(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/oauth", {
            email: data
          })
          .then(response => {
            let session_id = response.data.id;
            localStorage.setItem("id", session_id);
            context.commit("setSessionID", session_id);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    signin(context, data) {
      return new Promise((resolve, reject) => {
        axios
          .post("/signin", {
            login: data.username,
            password: data.password
          })
          .then(response => {
            let session_id = response.data.id;
            localStorage.setItem("id", session_id);
            context.commit("setSessionID", session_id);
            resolve(response);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    getBooks(context) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios
        .get("/book")
        .then(response => {
          let books = response.data.books;
          let favorites = response.data.favBooks;
          if (!favorites) favorites = [];
          books.forEach(book => {
            if (favorites.indexOf(book.id.toString()) != -1)
              book.favorited = true;
            else book.favorited = false;
          });
          context.commit("getBooks", books);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAuthors(context) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios
        .get("/author")
        .then(response => {
          context.commit("getAuthors", response.data.authors);
        })
        .catch(err => {
          console.log(err);
        });
    },
    changeFavorite(context, item) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios.post("/favorites/" + item.id).then(response => {
        context.commit("changeFavorite", item);
      });
    },
    getBookByID(context, id) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios.get("/book/" + id).then(response => {
        context.commit("getBook", response.data.book);
      });
    },
    addBook(context, book) {
      axios.defaults.headers.common["Authorization"] = context.state.id;
      let image = book.image;
      delete book.image;
      delete book.cover;

      axios
        .post("book", book)
        .then(response => {
          let formData = new FormData();
          formData.append("image", image);
          return axios.post("/cover/" + response.data.book.id, formData, {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          });
        })
        .then(response => {
          context.commit("addBook", response.data.book);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editBook(context, book) {
      axios.defaults.headers.common["Authorization"] = context.state.id;
      let image = book.image;
      delete book.image;
      delete book.cover;

      axios
        .patch("/book/" + book.id, book)
        .then(response => {
          context.commit("editBook", response.data.book);
          if (image) {
            let formData = new FormData();
            formData.append("image", image);
            return axios.post("/cover/" + response.data.book.id, formData, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
          } else {
            context.commit("editBook", response.data.book);
            return false;
          }
        })
        .then(response => {
          if (!response) {
            return;
          }
          context.commit("editBook", response.data.book);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteBook(context, book) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios
        .delete("/book/" + book.id)
        .then(response => {
          context.commit("deleteBook", book.id);
        })
        .catch(err => {
          console.log(err);
        });
    },
    addAuthor(context, author) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios
        .post("/author", author)
        .then(response => {
          context.commit("addAuthor", response.data.author);
        })
        .catch(err => {
          console.log(err);
        });
    },
    editAuthor(context, author) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios
        .patch("/author/" + author.id, author)
        .then(response => {
          context.commit("editAuthor", response.data.author);
        })
        .catch(err => {
          console.log(err);
        });
    },
    deleteAuthor(context, author) {
      axios.defaults.headers.common["Authorization"] = context.state.id;

      axios
        .delete("/author/" + author.id, author)
        .then(response => {
          context.commit("deleteAuthor", author);
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
});
