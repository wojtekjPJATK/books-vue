import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);
axios.defaults.baseURL = "https://2-dot-solwit-pjatk-arc-2018-gr4.appspot.com";

export default new Vuex.Store({
  state: {
    id: localStorage.getItem("id") || null,
    books: [],
    authors: []
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
    getBookByID(state, id) {}
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
          // books.forEach(book => {
          //   if (book.id in favorites) book.favorited = true;
          //   else book.favorited = false;
          // });
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
    }
  }
});
