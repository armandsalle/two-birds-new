import { gsap } from "gsap"

const projectLeave = ({
  transitionContainerRect,
  nextTextRect,
  headerRect,
  onStart,
  onComplete,
}) => {
  const ydDiff =
    transitionContainerRect.y +
    (nextTextRect ? nextTextRect.height : 0) -
    headerRect.current.y

  const tl = gsap
    .timeline({
      paused: true,
      ease: "power3.out",
      onStart,
      onComplete,
    })
    .to(".project-header, .all-slices, footer", {
      opacity: 0,
      duration: 0.5,
    })
    .to(".line", { opacity: 0, duration: 0.1 }, 0)
    .to(
      ".project-transition__next, .project-transition__button",
      {
        duration: 0.35,
        opacity: 0,
      },
      0
    )
    .to(
      ".project-transition__bg",
      {
        scale: 4,
        duration: 0.5,
      },
      0
    )
    .to(
      ".project-transition .container",
      {
        duration: 0.5,
        y: -ydDiff,
      },
      0
    )
    .set(".project-patch", {
      display: "block",
      opacity: 1,
      top: headerRect.current.top,
      left: headerRect.current.left,
      width: headerRect.current.width,
    })

  return tl
}

export default projectLeave
