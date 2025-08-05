"use client"

/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_TOKEN } from "@/constant/auth"
import { usePathname, useRouter } from "next/navigation"
import React, { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<IAuthContext>({
  userInfo: null,
  isLogIn: false,
  setLoggedIn: () => {},
  setUser: () => {},
  logOut: () => {},
})

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [userInfo, setUserInfo] = useState<IUser>()
  const [isLogIn, setIsLogIn] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()
  const pathname = usePathname()

  const setLoggedIn = (value: boolean) => setIsLogIn(value)
  const setUser = (value: IUser) => setUserInfo(value)

  const logOut = () => {
    sessionStorage.removeItem(USER_TOKEN)
    setUserInfo(undefined)
    setIsLogIn(false)
    router.push("/")
  }

  useEffect(() => {
    const token = sessionStorage.getItem(USER_TOKEN) as string

    if (!token || !isValidToken()) {
      setIsLogIn(false)
      setUserInfo(undefined)
      router.replace("/")
      setLoading(false)
      return
    }

    const user: IUser = getPayload(token)

    if (user) {
      setUserInfo({
        Permission: user.Permission,
        UserId: user.UserId,
        Username: user.Username,
      })
      setIsLogIn(true)
    } else {
      setIsLogIn(false)
      router.replace("/")
    }

    setLoading(false)
  }, [router, pathname])

  return (
    <AuthContext.Provider
      value={{ userInfo, isLogIn, setLoggedIn, setUser, logOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

const decode = (payload: any) =>
  JSON.parse(Buffer.from(payload, "base64").toString())

const getPayload = (token: string) => {
  if (token) {
    const payload = token.split(".")[1]
    return decode(payload)
  } else return false
}

const isTokenExpirationDate = (payload: any) => {
  if ("exp" in payload) {
    const date = new Date(0)
    date.setUTCSeconds(payload["exp"])
    return new Date().valueOf() < date.valueOf()
  } else {
    return false
  }
}

export const isValidToken = () => {
  const token = sessionStorage.getItem(USER_TOKEN) as string
  if (!token) return false

  const payload = getPayload(token)
  return payload ? isTokenExpirationDate(payload) : false
}
