import React, { useEffect, useRef, useContext, useCallback } from "react"
import ReactDOMServer from "react-dom/server"
import { navigate } from "gatsby"
import { mouseEnter, mouseLeave, mouseClick } from "../../animations/cursor"
import { setAnimation } from "../../contexts/animationState"
import Button from "../button"
import { AnimationContext } from "../../contexts/animationContext"
import useCreateLink from "../../hooks/useCreateLink"
import projectLeave from "../../animations/projectLeave"

const ProjectTransition = ({ nextProject }) => {
  const { contactLottiesRef, setExitAnimation } = useContext(AnimationContext)
  const { project_logo_svg, project_title_rich } = nextProject.document.data

  const headerRect = useRef()

  const createLink = useCreateLink(
    nextProject.document.lang,
    nextProject.document.uid
  )

  const setPatch = useCallback(() => {
    const projectPatch = document.querySelector(".project-patch")
    const projectPatchImg = projectPatch.querySelector(".project-patch__logo")
    const projectPatchTitle = projectPatch.querySelector("h1")

    projectPatchImg.innerHTML = project_logo_svg
    projectPatchTitle.innerHTML = ReactDOMServer.renderToStaticMarkup(
      project_title_rich.text
        .split(" ")
        .map((t, i) => <span key={i}>{t.text}</span>)
    )
  }, [nextProject])

  const stopContactLotties = useCallback(() => {
    contactLottiesRef.forEach(e => {
      if (e) {
        e.pause()
      }
    })
  }, [contactLottiesRef])

  const navigateToNextProject = useCallback(() => {
    document.querySelector("body").style.overflow = "hidden"

    stopContactLotties()
    setAnimation("TRANSITION")

    const transitionContainerRect = document
      .querySelector(".project-transition .container")
      .getBoundingClientRect()

    const nextTextRect = document
      .querySelector(".project-transition__next")
      .getBoundingClientRect()

    const tl = projectLeave({
      onStart: () => {
        setPatch()
      },
      onComplete: () => {
        setExitAnimation("project")

        setTimeout(() => {
          navigate(createLink)
        }, 100)
      },
      headerRect,
      nextTextRect,
      transitionContainerRect,
    })

    tl.play()
  }, [stopContactLotties, setExitAnimation, createLink, setPatch])

  useEffect(() => {
    headerRect.current = document
      .querySelector(".project-header")
      .getBoundingClientRect()
  }, [])

  useEffect(() => {
    const pageTransitionTag = document.querySelector(".project-transition")
    pageTransitionTag.addEventListener("click", navigateToNextProject)

    return () => {
      pageTransitionTag.removeEventListener("click", navigateToNextProject)
    }
  }, [navigateToNextProject])

  const img = () => ({ __html: project_logo_svg })

  return (
    <section
      className="project-transition"
      role="button"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={mouseClick}
    >
      <div className="project-transition__bg"></div>
      <div className="container" style={{ zIndex: 8, position: "relative" }}>
        <div className="project-transition__next">Next project</div>
        <div className="toMove">
          <div className="project-transition__img-wrapper">
            <div
              className="project-transition__logo"
              dangerouslySetInnerHTML={img()}
            />
          </div>
          <h1 className="h2 mt-16">
            <span>{nextProject.document.data.project_title_rich.text}</span>
          </h1>
        </div>
        <Button
          to="#"
          className="project-transition__button"
          onClick={e => e.preventDefault()}
        >
          View case
        </Button>
      </div>
    </section>
  )
}

export default ProjectTransition
