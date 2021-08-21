import http from './httpClient'
export default {
  login (credentials) {
    return new Promise((resolve, reject) => {
      http().post('/login', credentials)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  register (formData) {
    return new Promise((resolve, reject) => {
      http().post('/register', formData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  getLeaveReport () {
    return new Promise((resolve, reject) => {
      http().get('/leaves')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  createLeave (formData) {
    return new Promise((resolve, reject) => {
      http().post('/leaves', formData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  getLeaveTypes () {
    return new Promise((resolve, reject) => {
      http().get('/leave-types')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  createLeaveType (formData) {
    return new Promise((resolve, reject) => {
      http().post('/leave-types', formData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  deleteLeaveType (id) {
    return new Promise((resolve, reject) => {
      http().delete('/leave-types/'+id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  getHolidays () {
    return new Promise((resolve, reject) => {
      http().get('/holidays')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  createHoliday (formData) {
    return new Promise((resolve, reject) => {
      http().post('/holidays', formData)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  deleteHoliday (id) {
    return new Promise((resolve, reject) => {
      http().delete('/holidays/'+id)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  getCalendarData () {
    return new Promise((resolve, reject) => {
      http().get('/calendar-data')
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          console.log(error)
          reject(error)
        })
    })
  },
  getAuthUser () {
    return http().get('/user')
  },
}
