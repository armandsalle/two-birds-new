import { gsap } from "gsap"

const projectEnter = animationStatut => {
  const tl = gsap.timeline({
    ease: "Quad.easeOut",
    paused: true,
  })

  if (animationStatut === "TRANSITION") {
    tl.set(".get-back", {
      opacity: 1,
      y: 0,
    })
      .set(".project-header__logo", {
        opacity: 1,
        y: 0,
      })
      .set(".project-header__title .reveal-title .line__inner", {
        y: "0%",
        rotateX: 0,
        opacity: 1,
      })
  }

  if (animationStatut === "ORIGINAL") {
    tl.fromTo(
      ".project-header__logo",
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    ).fromTo(
      ".project-header__title .reveal-title .line__inner",
      {
        y: "100%",
        rotateX: "-40deg",
        opacity: 0,
      },
      {
        y: "0%",
        rotateX: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.13,
      },
      0.3
    )
  }

  tl.fromTo(
    ".project-header__description",
    {
      opacity: 0,
      y: 80,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
    },
    animationStatut === "ORIGINAL" ? 0.6 : 0
  ).fromTo(
    ".project-header__date, .project-header__tags, .project-header__visit-link",
    {
      opacity: 0,
      y: 80,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.3,
    },
    animationStatut === "ORIGINAL" ? 0.9 : 0.3
  )

  if (animationStatut === "ORIGINAL") {
    tl.fromTo(
      ".get-back",
      { opacity: 0, y: -80 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      },
      1.8
    )
  }

  return tl
}

export default projectEnter
