import React, { useEffect, useRef } from "react"
import { gsap } from "gsap"
import NumberItem from "./numberItem"

const Numbers = ({ items }) => {
  const numbersRef = useRef()

  useEffect(() => {
    const target = numbersRef.current.querySelectorAll(
      ".slice-numbers__number__title, .slice-numbers__number__text"
    )

    const isLanscape = window.matchMedia(
      "screen and (max-width: 767px)"
    ).matches

    if (!isLanscape) {
      gsap.fromTo(
        target,
        {
          opacity: 0,
          y: 80,
        },
        {
          scrollTrigger: {
            trigger: numbersRef.current,
            start: () => `top 70%`,
          },
          opacity: 1,
          y: 0,
          ease: "Quad.easeOut",
          duration: 1,
          stagger: { amount: 1 },
        }
      )
    }
  }, [])

  return (
    <section className="slice-numbers container mt-240" ref={numbersRef}>
      {items.map(({ number_title, number_text }, i) => (
        <NumberItem
          key={i}
          numberTitle={number_title}
          numberText={number_text}
        />
      ))}
    </section>
  )
}

export default Numbers
