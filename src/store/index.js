import { createStore } from "vuex";

import Login from "./common/login";

import User from "./models/user"

export default createStore({
  modules: {
    Login,
    User
  }
});
