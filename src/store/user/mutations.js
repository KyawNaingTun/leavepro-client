export function login (state, payload) {
  state.auth_error = null
  state.isLoggedin = true
  state.loading = false
  state.currentUser = Object.assign({}, payload.user)
  localStorage.setItem('authToken', payload.token)
  localStorage.setItem('user', JSON.stringify(state.currentUser))
}
export function setUser (state, data) {
  state.authUser = data.user
}
export function logout (state) {
  localStorage.removeItem('user')
  localStorage.removeItem('authToken')
  state.isLoggedin = false
  state.currentUser = null
}
