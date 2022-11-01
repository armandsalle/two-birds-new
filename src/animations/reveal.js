import { gsap } from "gsap"

const reveal = (
  target,
  trigger,
  hasOffset = false,
  offsetTrigger = "center"
) => {
  return gsap.fromTo(
    target,
    {
      opacity: 0,
      y: 80,
    },
    {
      scrollTrigger: {
        trigger: trigger,
        once: true,
        start: () => `${hasOffset ? "-=80" : "top"} ${offsetTrigger}`,
      },
      opacity: 1,
      y: 0,
      ease: "Quad.easeOut",
      duration: 1,
    }
  )
}

export default reveal
