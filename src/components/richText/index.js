import React, { forwardRef, useCallback, useEffect } from "react"
import { PrismicRichText } from "@prismicio/react"
import cn from "classnames"
import useIsTouchDesign from "../../hooks/useIsTouchDesign"
import { linkEnter, linkLeave } from "../../animations/cursor"

const CustomRichText = forwardRef(({ data, className, isText, as }, ref) => {
  const isTouchDevice = useIsTouchDesign()

  const mouseEnterLink = useCallback(() => {
    linkEnter(isTouchDevice)
  }, [isTouchDevice])

  const mouseLeaveLink = useCallback(() => {
    linkLeave(isTouchDevice)
  }, [isTouchDevice])

  useEffect(() => {
    const links = [...document.querySelectorAll(`.richtext a`)]

    links.forEach(link => {
      link.addEventListener("mouseenter", mouseEnterLink)
      link.addEventListener("mouseleave", mouseLeaveLink)
    })

    return () => {
      links.forEach(link => {
        link.removeEventListener("mouseenter", mouseEnterLink)
        link.removeEventListener("mouseleave", mouseLeaveLink)
      })
    }
  }, [mouseEnterLink, mouseLeaveLink])

  let result

  if (!data) return null

  switch (as) {
    case "h1":
      result = (
        <h1 className={className} ref={ref}>
          <PrismicRichText field={data.richText} />
        </h1>
      )
      break

    default:
      result = (
        <div className={cn(isText && "richtext", className)} ref={ref}>
          <PrismicRichText field={data.richText} />
        </div>
      )
      break
  }

  return result
})

export default CustomRichText
