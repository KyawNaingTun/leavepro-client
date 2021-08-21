import axios from 'axios'
export default () => {
  const token = localStorage.getItem('authToken')
  const apiUrl = process.env.API_URL??'https://leavepro.matkhayar.com/api'
  return axios.create({
    baseURL: apiUrl,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: token
    }
  })
}
