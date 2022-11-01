import React, {
  useRef,
  useEffect,
  useCallback,
  useContext,
  useState,
} from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Lottie from "lottie-react"
import Button from "../button"
import { AnimationContext } from "../../contexts/animationContext"
import Title from "../title"
import titleReveal from "../../animations/titleReveal"
import createLottiesObject from "../../utils/createLottiesObject"

const Hero = ({ title, text, cta }) => {
  const { animationsCanRuns, heroLotties } = useContext(AnimationContext)

  const [lotties, setLotties] = useState(null)

  const heroRef = useRef(null)
  const plantsRef = useRef()
  const cockatooRef = useRef()
  const macawRef = useRef()

  const loopFrom = useCallback((el, value) => {
    el.goToAndPlay(value, true)
  }, [])

  const playLotties = useCallback(() => {
    plantsRef.current.play()
    cockatooRef.current.play()
    macawRef.current.play()
  }, [])

  const pauseLotties = useCallback(() => {
    plantsRef.current.pause()
    cockatooRef.current.pause()
    macawRef.current.pause()
  }, [])

  useEffect(() => {
    if (animationsCanRuns) {
      const lotties = createLottiesObject(heroLotties)
      setLotties(lotties)
    }
  }, [animationsCanRuns, heroLotties, setLotties])

  useEffect(() => {
    const heroRight = heroRef.current.querySelector(".hero__right")

    const plantsCurrent = plantsRef.current
    const cockatooCurrent = cockatooRef.current
    const macawCurrent = macawRef.current

    let st

    if (lotties) {
      gsap.set(heroRight, { opacity: 1 })
      gsap.set(".hero", { opacity: 1 })
      gsap
        .timeline({
          ease: "Quad.easeOut",
        })
        .fromTo(
          ".cockatoo, .macaw",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.6,
          }
        )
        .fromTo(
          ".cockatoo, .macaw",
          {
            y: "-30%",
            x: "30%",
          },
          {
            y: "0",
            x: "0",
            duration: 2,
          },
          0
        )
        .fromTo(
          ".plants",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1,
          },
          0
        )

      plantsCurrent.play()
      cockatooCurrent.play()
      macawCurrent.play()

      st = ScrollTrigger.create({
        trigger: ".hero",
        start: "top-=80 top",
        end: "bottom",
        once: false,
        onEnter: () => {
          playLotties()
        },
        onEnterBack: () => {
          playLotties()
        },
        onLeave: () => {
          pauseLotties()
        },
        onLeaveBack: () => {
          pauseLotties()
        },
      })
    }

    return () => {
      if (lotties) {
        st.kill()
      }
    }
  }, [playLotties, pauseLotties, lotties])

  useEffect(() => {
    let p
    if (animationsCanRuns) {
      const title = heroRef.current.querySelector(".h1")
      const text = heroRef.current.querySelector(".hero__text")
      const button = heroRef.current.querySelector("a")

      p = titleReveal(title, title, false, "70%")

      gsap.fromTo(
        [text, button],
        {
          opacity: 0,
          y: 80,
        },
        {
          scrollTrigger: {
            trigger: heroRef.current,
            start: () => `top 70%`,
          },
          opacity: 1,
          y: 0,
          ease: "Quad.easeOut",
          duration: 1,
          stagger: {
            amount: 0.2,
          },
        }
      )
    }

    return () => {
      if (animationsCanRuns) {
        p.kill()
      }
    }
  }, [animationsCanRuns])

  return (
    <section className="hero d-center-center" ref={heroRef}>
      <div className="container d-between-center">
        <div className="hero__left">
          <Title className="h1" as="h1">
            {title}
          </Title>
          <p className="hero__text">{text}</p>
          <Button
            to="mailto:bonjour@twobirds.design?subject=On%20vole%20ensemble%20?"
            as="a"
            className="mt-48 d-center-center"
          >
            {cta}
          </Button>
        </div>
        {lotties && (
          <div className="hero__right" style={{ opacity: 0 }}>
            <div className="plants">
              <Lottie
                animationData={lotties.hero_lottie_plants}
                autoplay={false}
                loop={false}
                lottieRef={plantsRef}
                onComplete={() => {
                  loopFrom(plantsRef.current, 150)
                }}
                className="lottie-wrapper arrival"
              />
            </div>

            <div className="cockatoo">
              <Lottie
                animationData={lotties.hero_lottie_cockatoo}
                autoplay={false}
                loop={false}
                lottieRef={cockatooRef}
                onComplete={() => {
                  loopFrom(cockatooRef.current, 135)
                }}
                className="lottie-wrapper arrival"
              />
            </div>

            <div className="macaw">
              <Lottie
                animationData={lotties.hero_lottie_macaw}
                autoplay={false}
                loop={false}
                lottieRef={macawRef}
                onComplete={() => {
                  loopFrom(macawRef.current, 131)
                }}
                className="lottie-wrapper arrival"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default Hero
