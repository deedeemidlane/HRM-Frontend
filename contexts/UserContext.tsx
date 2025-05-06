"use client"

import { IUser } from "@/types/User"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"

const UserContext = createContext<{
  user?: IUser
  setUser: Dispatch<SetStateAction<IUser | undefined>>
}>({
  user: undefined,
  setUser: () => {},
})

export const UserContextProvider = ({ children }: { children: ReactNode }) => {
  const [savedUser, setSavedUser] = useState<string | null>(null)

  useEffect(() => {
    const storedValue = localStorage.getItem("ada_hrm_user")
    setSavedUser(storedValue)
  }, [])

  const [user, setUser] = useState<IUser>()

  useEffect(() => {
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
  }, [savedUser])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  return useContext(UserContext)
}
