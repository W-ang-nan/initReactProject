import Cookies from 'js-cookie'

const TokenKey = 'Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token: string) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const Authority = 'cev-Authority'

export function getAuthority() {
  return Cookies.get(Authority) || "0"
}

export function setAuthority(key: string) {
  return Cookies.set(Authority, key)
}

export function removeAuthority() {
  return Cookies.remove(Authority)
}

const AuthRouter = 'cev-AuthRouter'

export function getAuthRouter() {
  return Cookies.get(AuthRouter) || '[]'
}

export function setAuthRouter(router: string) {
  return Cookies.set(AuthRouter, router)
}

export function removeAuthRouter() {
  return Cookies.remove(AuthRouter)
}

const userData = 'cev-userData'

export function getuserData() {
  return Cookies.get(userData) || '{}'
}

export function setuserData(data: string) {
  return Cookies.set(userData, data)
}

export function removeuserData() {
  return Cookies.remove(userData)
}