import Api from '../../network/Api'

export function login ({ commit }, response) {
  commit('login', response)
}
export function getAuthUser ({ commit }) {
  Api.getAuthUser()
    .then(response => {
      commit('setUser', response)
    })
    .catch(error => {
      console.log(error)
    })
}
export function logout ({ commit }) {
  commit('logout')
}
