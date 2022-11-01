import React, { useEffect, useRef, useCallback } from "react"
import CustomRichText from "../richText"
import Lottie from "lottie-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { CustomEase } from "../../animations/CustomEase"
import reveal from "../../animations/reveal"
import useIsTouchDesign from "../../hooks/useIsTouchDesign"

const ProcessItem = ({ title, desc, items, anim }) => {
  const processRef = useRef()
  const lottieRef = useRef()

  const isTouchDevice = useIsTouchDesign()

  useEffect(() => {
    if (window.matchMedia("screen and (max-width: 992px)").matches) {
      ScrollTrigger.create({
        trigger: processRef.current,
        start: "top 80%",
        once: true,
        onEnter: () => {
          lottieRef.current.play()
        },
      })
      const content = processRef.current.querySelector(".process-item__content")
      reveal(content, content, false, "80%")
    }
  }, [])

  const hoverImg = useCallback(
    (elem, state) => {
      if (window.matchMedia("screen and (min-width: 992px)").matches) {
        if (state === "in") {
          lottieRef.current.play()

          const tl = gsap.timeline({
            ease: CustomEase.create(
              "custom",
              "M0,0 C0.068,0.544 0.734,0.672 1,1 "
            ),
          })
          tl.to(elem, {
            backgroundColor: "rgb(235, 235, 254)",
            duration: 0.2,
          })

          if (!isTouchDevice) {
            tl.to(
              elem.querySelector("ul"),
              {
                y: 0,
                color: "rgb(0, 0, 0)",
                duration: 0.2,
              },
              0
            )
          }
        }
        if (state === "out") {
          lottieRef.current.stop()

          if (!isTouchDevice) {
            gsap.killTweensOf(elem.querySelector("ul"))
            gsap.set(elem.querySelector("ul"), {
              y: 20,
              color: "rgb(255, 255,255)",
            })
          }
          gsap.killTweensOf(elem)
          gsap.set(elem, {
            backgroundColor: "rgb(255, 255,255)",
          })
        }
      }
    },
    [isTouchDevice]
  )

  return (
    <div
      role="button"
      className="process-item"
      onMouseEnter={() => hoverImg(processRef.current, "in")}
      onMouseLeave={() => hoverImg(processRef.current, "out")}
      // onClick={e => hoverImg(e, "in")}
      // onMouseDown={e => hoverImg(e, "in")}
      // onMouseUp={e => hoverImg(e, "out")}
      onTouchStart={() => hoverImg(processRef.current, "in")}
      onTouchEnd={() => hoverImg(processRef.current, "out")}
      ref={processRef}
    >
      <div className="fake-img">
        <Lottie
          animationData={anim}
          lottieRef={lottieRef}
          loop={false}
          autoplay={false}
        />
      </div>
      <div className="process-item__content">
        <h3 className="h3">{title}</h3>
        <p className="mt-16">{desc}</p>
        <CustomRichText data={items} isText className="mt-24" />
      </div>
    </div>
  )
}

export default ProcessItem
