const state = () => ({
  cid: undefined,
  name: undefined,
  nick: undefined
})

const getters = {
  userInfo (state) {
    return {
      cid : state.cid,
      name: state.name,
      nick: state.nick
    }
  }
}

const mutations = {
  SET_USER_INFO(state, data) {
    state.cid = Number(data.cid);
    state.name = data.name;
    state.nick = data.nick;
  }
}

const actions = {
  setUserInfo({commit}, payload) {
    commit("SET_USER_INFO", payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}