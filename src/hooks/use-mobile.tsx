import * as React from "react"
import { useBrowserAPI } from "./use-client"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  const getIsMobile = React.useCallback(() => {
    return window.innerWidth < MOBILE_BREAKPOINT
  }, [])

  const initialIsMobile = useBrowserAPI(getIsMobile, false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(initialIsMobile)
    return () => mql.removeEventListener("change", onChange)
  }, [initialIsMobile])

  return isMobile
}
