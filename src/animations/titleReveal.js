import { gsap } from "gsap"

const titleReveal = (
  target,
  trigger,
  hasOffset = false,
  offsetTrigger = "center",
  delay = 0
) => {
  const el = target.querySelectorAll(".reveal-title .line__inner")
  return gsap.fromTo(
    [...el],
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
      ease: "Quad.easeOut",
      delay: delay,
      scrollTrigger: {
        trigger: trigger,
        once: true,
        start: () => `${hasOffset ? "-=80" : "top"} ${offsetTrigger}`,
        end: `top ${offsetTrigger}`,
      },
    }
  )
}

export default titleReveal
