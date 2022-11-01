import React from "react"
// import { registerLinkResolver } from "gatsby-source-prismic"
import { AnimationProvider } from "./src/contexts/animationContext"
import "./src/styles/main.scss"

// registerLinkResolver(linkResolver)

export const wrapRootElement = ({ element }) => {
  return <AnimationProvider>{element}</AnimationProvider>
}

export const shouldUpdateScroll = () => {
  return false
}

export const onRouteUpdate = () => {
  setTimeout(() => {
    window.scrollTo(0, 0)
  }, 200)
}
