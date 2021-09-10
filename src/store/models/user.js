const state = () => ({
  cid: undefined,
  name: undefined,
  nick: undefined,
  cash: undefined
})

const getters = {
  userInfo (state) {
    return {
      cid : state.cid,
      name: state.name,
      nick: state.nick,
      cash: state.cash
    }
  }
}

const mutations = {
  SET_USER_INFO(state, data) {
    state.cid = Number(data.cid);
    state.name = data.name;
    state.nick = data.nick;
    state.cash = data.cash;
  },
  UPDATE_USER_CASH (state, cash) {
    state.cash = cash;
  }
}

const actions = {
  setUserInfo({commit}, payload) {
    commit("SET_USER_INFO", payload)
  },
  updateUserCash({commit}, payload) {
    commit("UPDATE_USER_CASH", payload)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}