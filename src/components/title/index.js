import React from "react"
import cn from "classnames"
import SplitText from "../splitText"

export default function Title({ children, className, as }) {
  let result

  switch (as) {
    case "h1":
      result = (
        <h1 className={cn("reveal-title", className)}>
          <SplitText splitBy="lines">{children}</SplitText>
        </h1>
      )
      break
    case "h2":
      result = (
        <h2 className={cn("reveal-title", className)}>
          <SplitText splitBy="lines">{children}</SplitText>
        </h2>
      )
      break
    case "h3":
      result = (
        <h3 className={cn("reveal-title", className)}>
          <SplitText splitBy="lines">{children}</SplitText>
        </h3>
      )
      break
    case "span":
      result = (
        <span className={cn("reveal-title", className)}>
          <SplitText splitBy="lines">{children}</SplitText>
        </span>
      )
      break

    default:
      result = (
        <h1 className={cn("reveal-title", className)}>
          <SplitText splitBy="lines">{children}</SplitText>
        </h1>
      )
      break
  }

  return result
}
