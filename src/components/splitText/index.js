import React, { useEffect, useRef } from "react"
import Split from "../../animations/split"

export default function SplitText({
  children,
  splitBy = "words",
  wrap = false,
}) {
  const splittedText = useRef()

  useEffect(() => {
    const result = new Split({
      el: splittedText.current,
      type: splitBy,
      wrap: wrap,
    })

    splittedText.current = result.splitElement
  }, [splitBy, wrap])

  return (
    <div className="reval-title__inner" ref={splittedText}>
      {children}
    </div>
  )
}
