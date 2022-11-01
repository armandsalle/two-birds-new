import { gsap } from "gsap"
import { isTouchDevice } from "../hooks/useIsTouchDesign"

const colors = {
  pink: "rgb(255, 90, 120)",
  green: "rgb(0, 165, 135)",
  black: "rgb(0, 0, 0)",
  white: "rgb(255, 255, 255)",
}

const mouseEnter = () => {
  gsap.to(".cursor", {
    scale: 1,
    backgroundColor: colors.pink,
    duration: 0.2,
  })
  gsap.to(".cursor__span", {
    opacity: 1,
    duration: 0.2,
  })
}

const mouseLeave = () => {
  gsap.to(".cursor", {
    scale: 0.2,
    backgroundColor: colors.black,
    duration: 0.2,
  })
  gsap.to(".cursor__span", {
    opacity: 0,
    duration: 0.2,
  })
}

const mouseClick = () => {
  gsap.to(".cursor", {
    keyframes: [
      { scale: 0.95, duration: 0.08 },
      { scale: 1, duration: 0.08 },
    ],
    onComplete: () => {
      setTimeout(() => {
        mouseLeave()
      }, 500)
    },
  })
}

const socialEnter = () => {
  if (isTouchDevice()) {
    return
  }
  gsap.set(".cursor-wrapper", { mixBlendMode: "difference" })
  gsap.set(".cursor", {
    backgroundColor: colors.white,
  })
  gsap.to(".cursor", {
    scale: 1,
    duration: 0.2,
  })
}

const socialLeave = () => {
  if (isTouchDevice()) {
    return
  }
  gsap.set(".cursor-wrapper", { mixBlendMode: "normal" })
  gsap.set(".cursor", {
    backgroundColor: colors.black,
  })
  gsap.to(".cursor", {
    scale: 0.2,
    duration: 0.2,
  })
}

const linkEnter = isTouchDevice => {
  if (!isTouchDevice) {
    gsap.to(".cursor", {
      scale: 0,
      duration: 0.2,
    })
  }
}
const linkLeave = isTouchDevice => {
  if (!isTouchDevice) {
    gsap.to(".cursor", {
      scale: 0.2,
      duration: 0.2,
    })
  }
}

export {
  mouseEnter,
  mouseLeave,
  mouseClick,
  socialEnter,
  socialLeave,
  linkEnter,
  linkLeave,
}
