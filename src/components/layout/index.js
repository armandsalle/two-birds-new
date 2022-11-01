import React, { useContext, useEffect, useState } from "react"
import { Transition, SwitchTransition } from "react-transition-group"
import { navigate } from "gatsby"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CustomEase } from "../../animations/CustomEase"
import "../../styles/main.scss"
import { AnimationContext } from "../../contexts/animationContext"
import { animationStatut } from "../../contexts/animationState"
import Cursor from "../cursor"
import Loaded from "../loaded"
import ProjectNav from "../projectNav"
import useCreateLink from "../../hooks/useCreateLink"
import ProjectTransitionPatch from "../projectTransitionPatch"
import getRedirectLanguage from "../../utils/getRedirectLanguage"

gsap.registerPlugin(ScrollTrigger, CustomEase)

const Layout = ({ children, location, pageContext }) => {
  const [appHasRun, setAppRun] = useState(false)
  const { animationsCanRuns, exitAnimation, enterAnimation } =
    useContext(AnimationContext)

  const createLink = useCreateLink(pageContext.lang)

  useEffect(() => {
    if (!appHasRun) {
      if (pageContext.uid === "home") {
        const urlLang = getRedirectLanguage()

        if (!urlLang) return

        navigate(`/fr`, {
          replace: true,
        })
      }

      setAppRun(true)
    }
  }, [pageContext.uid, appHasRun, setAppRun])

  const playExit = (node, path) => {
    if (animationsCanRuns && exitAnimation === "opacity") {
      if (animationStatut === "ORIGINAL") {
        gsap.to(".get-back", { opacity: 0 })
      }

      gsap.to(node, {
        opacity: 0,
        duration: 0.25,
        onStart: () => {
          document.querySelector("body").style.pointerEvents = "none"
        },
      })
    } else {
      document.querySelector("body").style.pointerEvents = "none"
    }
  }

  const playEnter = (node, path) => {
    if (animationsCanRuns && enterAnimation === "opacity") {
      gsap.fromTo(
        "main",
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 0.25,
          onStart: () => {
            document.querySelector("body").style.overflowY = "unset"
            document.querySelector("body").style.pointerEvents = "all"
          },
        }
      )
    } else {
      document.querySelector("body").style.pointerEvents = "all"
      document.querySelector("body").style.overflowY = "unset"
    }
  }

  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [location.pathname])

  return (
    <Loaded>
      <Cursor />
      <SwitchTransition mode="out-in">
        <Transition
          key={location.pathname}
          timeout={{ exit: 500, enter: 0 }}
          onExit={node => playExit(node, location.pathname)}
          onEnter={node => playEnter(node, location.pathname)}
        >
          <main>{children}</main>
        </Transition>
      </SwitchTransition>
      <ProjectNav link={createLink} />
      <ProjectTransitionPatch />
    </Loaded>
  )
}

export default Layout
