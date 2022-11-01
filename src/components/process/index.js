import React, { useEffect, useRef, useContext, useState } from "react"
import ProcessItem from "./ProcessItem"
import { gsap } from "gsap"
import { AnimationContext } from "../../contexts/animationContext"
import Title from "../title"
import titleReveal from "../../animations/titleReveal"
import createLottiesObject from "../../utils/createLottiesObject"

const Process = ({ title, processList }) => {
  const { processLotties, animationsCanRuns } = useContext(AnimationContext)

  const processSectionRef = useRef(null)

  const [lotties, setLotties] = useState(null)

  useEffect(() => {
    let p
    if (lotties) {
      const processItems = gsap.utils.toArray(".process-item")

      p = titleReveal(
        processSectionRef.current.querySelector(".h2"),
        processSectionRef.current,
        false,
        "70%"
      )

      if (window.matchMedia("screen and (min-width: 992px)").matches) {
        gsap.fromTo(
          processItems,
          { opacity: 0, y: 80 },
          {
            scrollTrigger: {
              trigger: processItems[0],
              start: () => `-=80 70%`,
            },
            opacity: 1,
            y: 0,
            stagger: {
              amount: 0.2,
            },
            ease: "Quad.easeOut",
          }
        )
      }
    }

    return () => {
      if (lotties) {
        p.kill()
      }
    }
  }, [lotties])

  useEffect(() => {
    if (animationsCanRuns) {
      const lotties = createLottiesObject(processLotties)
      setLotties(lotties)
    }
  }, [animationsCanRuns, processLotties, setLotties])

  return (
    <section className="process container mt-240" ref={processSectionRef}>
      <Title className="h2" as="h2">
        {title}
      </Title>
      <div className="process-list mt-80">
        {lotties &&
          processList.map(
            ({ process_name, process_text, process_items }, i) => (
              <ProcessItem
                key={i}
                title={process_name}
                desc={process_text}
                items={process_items}
                anim={
                  i === 0
                    ? lotties.process_lottie_owl
                    : i === 1
                    ? lotties.process_lottie_toucan
                    : lotties.process_lottie_hummingbird
                }
              />
            )
          )}
      </div>
    </section>
  )
}

export default Process
