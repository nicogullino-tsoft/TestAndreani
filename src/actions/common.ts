// export function setToken(token) {
//   window.localStorage.setItem("access-token", JSON.stringify(token))
// }

// export function getToken() {
//   let storedToken = window.localStorage.getItem("access-token");
//   if (storedToken !== null) {
//     storedToken = JSON.parse(storedToken)
//     return storedToken.token
//   }
//   else
//     return null
// }

// export function getDateFromToken() {
//   let storedToken = window.localStorage.getItem("access-token");
//   if (storedToken !== null) {
//     storedToken = JSON.parse(storedToken)
//     return storedToken.expiration
//   }
//   else
//     return null
// }

// export function isLogged() {
//   // moment('2010-10-20').isBefore('2010-10-21');
//   let token = this.getToken()
//   let date = this.getDateFromToken()
//   if (token !== null && date !== null && moment().isBefore(moment(date, moment.ISO_8601)))
//     return true
//   else
//     return false
// }

export function clearToken() {
  window.localStorage.removeItem('access-token');
}

// export function getHeaders() {
//   let storedToken = this.getToken()
//   if (storedToken !== null)
//     return {
//       'Content-Type': 'application/json',
//       'access-token': storedToken
//     }
//   else
//     return {
//       'Content-Type': 'application/json'
//     }
// }

// export function getRequestConfig(url = '/', method = 'GET', data = null) {
//   // let config = {
//   //   // timeout: 30000,
//   //   // // headers: this.getHeaders(),
//   //   // method: method,
//   // };
  
// }

// export function setUserRoles(userRoles) {
//   window.localStorage.setItem("user-roles", JSON.stringify(userRoles))
// }

// export function getUserRoles() {
//   let userRoles = window.localStorage.getItem('user-roles');
//   if (userRoles !== null) {
//     return JSON.parse(userRoles);
//   } 
//   // else
//   //   return null;
// }

export function clearUserRoles() {
  window.localStorage.removeItem('user-roles');
}