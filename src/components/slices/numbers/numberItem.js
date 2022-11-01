import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"

const NumberItem = ({ numberTitle, numberText }) => {
  const numbersItemRef = useRef()

  useEffect(() => {
    const isLanscape = window.matchMedia("screen and (max-width: 767px)")
      .matches

    if (isLanscape) {
      gsap.fromTo(
        numbersItemRef.current,
        {
          opacity: 0,
          y: 80,
        },
        {
          scrollTrigger: {
            trigger: numbersItemRef.current,
            start: () => `top 70%`,
          },
          opacity: 1,
          y: 0,
          ease: "Quad.easeOut",
          duration: 1,
        }
      )
    }
  }, [])

  return (
    <div className="slice-numbers__number mb-32" ref={numbersItemRef}>
      <span className="slice-numbers__number__title h1">{numberTitle}</span>
      <span className="slice-numbers__number__text">{numberText}</span>
    </div>
  )
}

export default NumberItem
