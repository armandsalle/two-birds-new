import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import Button from "../button"
import titleReveal from "../../animations/titleReveal"
import Title from "../title"

const Content = ({ sectionRef, title, cta }) => {
  const contentRef = useRef()

  useEffect(() => {
    const title = contentRef.current.querySelector(".h2")
    const btn = contentRef.current.querySelector(".btn")

    const p = titleReveal(title, sectionRef.current, false, "70%", 1)

    const tl = gsap.timeline({
      ease: "Quad.easeOut",
      scrollTrigger: {
        trigger: sectionRef.current,
        once: true,
        start: () => `top 70%`,
      },
    })
    tl.fromTo(
      sectionRef.current,
      {
        opacity: 0,
        y: 80,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
      }
    )
    tl.fromTo(
      btn,
      { opacity: 0, y: 80 },
      {
        opacity: 1,
        y: 0,
        delay: 0.5,
        duration: 1,
      },
      1
    )

    return () => {
      tl.kill()
      p.kill()
    }
  }, [sectionRef])

  return (
    <div className="contact__content" ref={contentRef}>
      <Title className="h2 text-center" as="h2">
        {title}
      </Title>
      <Button
        to="mailto:bonjour@twobirds.design?subject=On%20vole%20ensemble%20?"
        as="a"
        className="mt-40 btn"
      >
        {cta}
      </Button>
    </div>
  )
}

export default Content
