const state = () => ({
  pass: false,
})

const getters = {
  loginPass(state) {
    return state.pass;
  } 
};

const mutations = {
  SET_PASS (state, payload) {
    if (payload) {
      state.pass = payload;
    }
  }
}

const actions = {
  setLoginPass({commit}) {
    commit("SET_PASS", true);
  }
}


export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};