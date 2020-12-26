import firebase from 'firebase'
import { createContext, useState } from 'react'

type FormattedUser = Pick<firebase.User, 'uid' | 'email'>

const authContext = createContext(null)

export function AuthProvider({ children }) {
  const auth = userProvideAuth()
  return <authContext.Provider value={auth}>{children}</authContext.Provider>
}

function userProvideAuth() {
  const [user, setUser] = useState<FormattedUser>(null)

  const handleUser = (rawUser: firebase.User) => {
    if (rawUser) {
      const user = formatUser(rawUser)
      setUser(user)
      return user
    } else {
      setUser(null)
      return null
    }
  }
}

export function formatUser({ uid, email, displayName }: firebase.User) {
  return { uid, email }
}
