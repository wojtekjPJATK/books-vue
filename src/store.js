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
    }
  },
  mutations: {
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
    }
  },
  actions: {
    join(context, data) {
      axios
        .post("/join", {
          login: data.username,
          password: data.password
        })
        .then(result => {
          console.log(result);
        });
    },
    signin(context, data) {
      axios
        .post("/signin", {
          login: data.username,
          password: data.password
        })
        .then(result => {
          let session_id = result.data.id;
          localStorage.setItem("id", session_id);
          context.commit("setSessionID", session_id);
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
    }
  }
});
