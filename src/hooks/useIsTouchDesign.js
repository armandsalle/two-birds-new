import { useEffect, useState } from "react"

export function isTouchDevice() {
  return (
    !!(
      typeof window !== "undefined" &&
      ("ontouchstart" in window ||
        (window.DocumentTouch &&
          typeof document !== "undefined" &&
          document instanceof window.DocumentTouch))
    ) ||
    !!(
      typeof navigator !== "undefined" &&
      (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
    )
  )
}

const useIsTouchDesign = () => {
  const [result, setResult] = useState(false)

  useEffect(() => {
    setResult(isTouchDevice())
  }, [])

  return result
}

export default useIsTouchDesign
