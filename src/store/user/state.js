import AuthService from '../../services/AuthService'
var user = AuthService.getLoggedinUser()

export default {
  authUser: null,
  currentUser: user,
  isLoggedIn: !!user,
  loading: false,
  auth_error: null,
  reg_error: null,
  registeredUser: null
}
