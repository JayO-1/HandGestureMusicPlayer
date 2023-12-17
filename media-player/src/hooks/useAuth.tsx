import { useState, useEffect } from "react";
import axios from "axios";

import { ENDPOINTS } from "../common/constants";

export default function useAuth(code: string) {
  const [accessToken, setAccessToken] = useState<string>()
  const [refreshToken, setRefreshToken] = useState<string>()
  const [expiresIn, setExpiresIn] = useState<number>()

  useEffect(() => {
    axios
      .post(ENDPOINTS.LOGIN, {
        code,
      })
      .then(res => {
        setAccessToken(res.data.accessToken)
        setRefreshToken(res.data.refreshToken)
        setExpiresIn(res.data.expiresIn)

        // Ensuring the code doesn't show in the url
        // window.history.pushState({}, "", "/media-player")
      })
      .catch(err => {
          console.log(err)
        })
  }, [code])

  useEffect(() => {
      if  (!refreshToken || !expiresIn) return
      const interval = setInterval(() => {
        axios
        .post(ENDPOINTS.REFRESH, {
            refreshToken,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
        })
        .catch(err => {
            console.log(err)
        })
      }, (expiresIn - 60) * 1000)

      return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

  return accessToken
}