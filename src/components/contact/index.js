import React, {
  useRef,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import Content from "./Content"
import Lottie from "lottie-react"
import { AnimationContext } from "../../contexts/animationContext"
import gsap from "gsap/gsap-core"
import { useStaticQuery, graphql } from "gatsby"
import createLottiesObject from "../../utils/createLottiesObject"
import cn from "classnames"

const Contact = ({ title, cta, isProject }) => {
  const {
    prismicHome: {
      data: {
        contact_lottie_hill: { url: hillUrl },
      },
    },
  } = useStaticQuery(
    graphql`
      query {
        prismicHome(lang: { eq: "fr-fr" }, uid: { eq: "home" }) {
          data {
            contact_lottie_hill {
              url
            }
          }
        }
      }
    `
  )

  const { animationsCanRuns, contactLotties, setContactLottiesRef } =
    useContext(AnimationContext)

  const [lotties, setLotties] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

  const sectionRef = useRef()

  const cloudRef = useRef()
  const bird1Ref = useRef()
  const bird2Ref = useRef()
  const bird3Ref = useRef()
  const bird4Ref = useRef()
  const bird5Ref = useRef()
  const bird6Ref = useRef()

  const loopFrom = useCallback((el, value) => {
    el.goToAndPlay(value, true)
  }, [])

  const playLotties = useCallback(() => {
    cloudRef.current.play()
    bird3Ref.current.play()
    bird5Ref.current.play()
    if (!isMobile) {
      bird1Ref.current.play()
      bird2Ref.current.play()
      bird4Ref.current.play()
      bird6Ref.current.play()
    }
  }, [isMobile])

  const pauseLotties = useCallback(() => {
    cloudRef.current.pause()
    bird3Ref.current.pause()
    bird5Ref.current.pause()
    if (!isMobile) {
      bird1Ref.current.pause()
      bird2Ref.current.pause()
      bird4Ref.current.pause()
      bird6Ref.current.pause()
    }
  }, [isMobile])

  useEffect(() => {
    if (window.matchMedia("screen and (max-width: 478px)").matches) {
      setIsMobile(true)
    }
  }, [setIsMobile])

  useEffect(() => {
    if (animationsCanRuns) {
      const lotties = createLottiesObject(contactLotties)
      setLotties(lotties)
    }
  }, [animationsCanRuns, contactLotties, setLotties])

  useEffect(() => {
    let hasPlayed = false
    let st

    if (lotties) {
      st = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "-80px bottom",
        end: "bottom-=80 top",
        once: false,
        onEnter: () => {
          playLotties()

          // enter animation for the hills
          if (!hasPlayed) {
            gsap.fromTo(
              ".contact__loties .hill img",
              { scale: isMobile ? 2 : 1.2, y: 200, x: isMobile ? "-50%" : 0 },
              {
                scale: isMobile ? 1.5 : 1,
                y: 0,
                x: isMobile ? "-50%" : 0,
                duration: 2,
              }
            )
            hasPlayed = true
          }
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

      const l = [
        cloudRef.current,
        bird3Ref.current,
        bird5Ref.current,
        !isMobile && bird1Ref.current,
        !isMobile && bird2Ref.current,
        !isMobile && bird4Ref.current,
        !isMobile && bird6Ref.current,
      ]
      setContactLottiesRef(l)
    }

    return () => {
      if (lotties) {
        st.kill()
      }
    }
  }, [lotties, playLotties, pauseLotties, isMobile, setContactLottiesRef])

  return (
    <section
      className={cn("contact container mt-240", isProject ? "project" : "")}
      ref={sectionRef}
    >
      {lotties && (
        <>
          <div className="contact__loties">
            <div className="cloud">
              <Lottie
                animationData={lotties.contact_lottie_cloud}
                autoplay={false}
                loop={true}
                lottieRef={cloudRef}
                className="lottie-wrapper arrival"
              />
            </div>

            <div className="hill">
              <img src={hillUrl} alt="" role="presentation" />
            </div>

            {!isMobile && (
              <div className="bird1">
                <Lottie
                  animationData={lotties.contact_lottie_bird_1}
                  autoplay={false}
                  loop={false}
                  lottieRef={bird1Ref}
                  onComplete={() => {
                    loopFrom(bird1Ref.current, 76)
                  }}
                  className="lottie-wrapper arrival"
                />
              </div>
            )}

            {!isMobile && (
              <div className="bird2">
                <Lottie
                  animationData={lotties.contact_lottie_bird_2}
                  autoplay={false}
                  loop={false}
                  lottieRef={bird2Ref}
                  onComplete={() => {
                    loopFrom(bird2Ref.current, 90)
                  }}
                  className="lottie-wrapper arrival"
                />
              </div>
            )}

            <div className="bird3">
              <Lottie
                animationData={lotties.contact_lottie_bird_3}
                autoplay={false}
                loop={false}
                lottieRef={bird3Ref}
                onComplete={() => {
                  loopFrom(bird3Ref.current, 76)
                }}
                className="lottie-wrapper arrival"
              />
            </div>

            {!isMobile && (
              <div className="bird4">
                <Lottie
                  animationData={lotties.contact_lottie_bird_4}
                  autoplay={false}
                  loop={false}
                  lottieRef={bird4Ref}
                  onComplete={() => {
                    loopFrom(bird4Ref.current, 83)
                  }}
                  className="lottie-wrapper arrival"
                />
              </div>
            )}

            <div className="bird5">
              <Lottie
                animationData={lotties.contact_lottie_bird_5}
                autoplay={false}
                loop={false}
                lottieRef={bird5Ref}
                onComplete={() => {
                  loopFrom(bird5Ref.current, 73)
                }}
                className="lottie-wrapper arrival"
              />
            </div>

            {!isMobile && (
              <div className="bird6">
                <Lottie
                  animationData={lotties.contact_lottie_bird_6}
                  autoplay={false}
                  loop={false}
                  lottieRef={bird6Ref}
                  onComplete={() => {
                    loopFrom(bird6Ref.current, 92)
                  }}
                  className="lottie-wrapper arrival"
                />
              </div>
            )}
          </div>

          <Content sectionRef={sectionRef} title={title} cta={cta} />
        </>
      )}
    </section>
  )
}

export default Contact
