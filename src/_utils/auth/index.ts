const USER_KEY = 'user_key'

export const saveUser = (user: any) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user))
}

export const getUser = () => {
  const userStr = localStorage.getItem(USER_KEY)
  return userStr ? JSON.parse(userStr) : {}
}

export const getAccessTokenFromStorage = () => {
  const user = getUser()
  return user.access_token
}
