import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from "react"
import gsap from "gsap/gsap-core"
import CustomRichText from "../richText"
import reveal from "../../animations/reveal"
import Bird from "./Bird"
import SocialLink from "../scocialLink"
import useIsTouchDesign from "../../hooks/useIsTouchDesign"
import { AnimationContext } from "../../contexts/animationContext"
import Title from "../title"
import titleReveal from "../../animations/titleReveal"
import createLottiesObject from "../../utils/createLottiesObject"

const Trust = ({ title, text, birds }) => {
  const { trustLotties, animationsCanRuns } = useContext(AnimationContext)

  const [currentBird, setCurrentBird] = useState(null)
  const [lotties, setLotties] = useState(null)

  const trustRef = useRef()
  const textRef = useRef()
  const bird1Ref = useRef()
  const bird2Ref = useRef()

  const firstBird = birds[0]
  const secondBird = birds[1]
  const isTouchDesign = useIsTouchDesign()

  const setHeight = useCallback(
    (contents, contentWrapper) => {
      // Filter the heightest height
      const heights = contents.map(e => e.getBoundingClientRect().height)
      const highestHeight = Math.max.apply(null, heights)

      contentWrapper.style.height = `${
        isTouchDesign ? highestHeight : highestHeight + 44
      }px`
    },
    [isTouchDesign]
  )

  const showContent = useCallback(
    (e, contents, halfs) => {
      // Check which side of the content is first enter to diplay the content
      // and start animation of the hover birds
      const mouseX = e.clientX

      if (mouseX > window.innerWidth / 2) {
        // right
        gsap.set(contents[1], { display: "block", opacity: 1 })
        gsap.set(contents[0], { display: "none", opacity: 0 })
        if (currentBird !== "right") {
          halfs[1].click()
        }
        setCurrentBird("right")
      } else if (mouseX < window.innerWidth / 2) {
        // left
        gsap.set(contents[0], { display: "block", opacity: 1 })
        gsap.set(contents[1], { display: "none", opacity: 0 })
        if (currentBird !== "left") {
          halfs[0].click()
        }
        setCurrentBird("left")
      }
    },
    [setCurrentBird, currentBird]
  )

  const reset = useCallback(
    contents => {
      contents.forEach(content => (content.style.opacity = 0))
      bird1Ref.current.reset()
      bird2Ref.current.reset()
      setCurrentBird(null)
    },
    [setCurrentBird]
  )

  useEffect(() => {
    const isAllGood =
      window.matchMedia("screen and (min-width: 992px)").matches && lotties

    const contentWrapper = document.querySelector(
      ".trust__birds__content__wrapper"
    )
    const trustWrapper = document.querySelector(".trust__wrapper")
    const contents = [
      ...document.querySelectorAll(".trust__birds__half__content"),
    ]
    const halfs = [...document.querySelectorAll(".trust__birds__half")]

    if (isAllGood) {
      setHeight(contents, contentWrapper)

      contentWrapper.addEventListener("mouseenter", e =>
        showContent(e, contents, halfs)
      )
      trustWrapper.addEventListener("mouseleave", () => reset(contents))
    }

    return () => {
      if (isAllGood) {
        contentWrapper.removeEventListener("mouseenter", e =>
          showContent(e, contents, halfs)
        )
        trustWrapper.removeEventListener("mouseleave", () => reset(contents))
      }
    }
  }, [lotties, setHeight, reset, showContent])

  useEffect(() => {
    if (animationsCanRuns) {
      const lotties = createLottiesObject(trustLotties)
      setLotties(lotties)
    }
  }, [animationsCanRuns, trustLotties, setLotties])

  useEffect(() => {
    let p
    if (lotties) {
      titleReveal(
        trustRef.current.querySelector(".h2"),
        trustRef.current,
        false,
        "70%"
      )
      p = reveal(textRef.current, textRef.current, false, "70%")
    }

    return () => {
      if (lotties) {
        p.kill()
      }
    }
  }, [lotties])

  return (
    <section className="trust container mt-120" ref={trustRef}>
      <div className="trust__top">
        <Title className="h2 text-center" as="h2">
          {title}
        </Title>
        <CustomRichText
          data={text}
          className="text-center mt-24"
          isText
          ref={textRef}
        />
      </div>
      <div className="trust__wrapper">
        <div className="trust__birds mt-80">
          {lotties && (
            <>
              <Bird
                align="left"
                bird={firstBird}
                anim={lotties.trust_lottie_vincent}
                id={0}
                ref={bird1Ref}
                currentBird={currentBird}
                setCurrentBird={setCurrentBird}
              />
              <Bird
                align="right"
                bird={secondBird}
                anim={lotties.trust_lottie_clement}
                id={1}
                ref={bird2Ref}
                currentBird={currentBird}
                setCurrentBird={setCurrentBird}
              />
            </>
          )}
        </div>
        <div className="trust__birds__content__wrapper">
          <div className="trust__birds__half__content">
            <h3 className="h3 mt-40">{firstBird.birds_name}</h3>
            <CustomRichText
              data={firstBird.birds_text}
              className="p mt-16"
              isText
            />
            <div className="trust__birds__social mt-16">
              {firstBird.birds_twitter && (
                <SocialLink to={firstBird.birds_twitter} is="twitter" />
              )}
              {firstBird.birds_linkedin && (
                <SocialLink to={firstBird.birds_linkedin} is="linkedin" />
              )}
              {firstBird.birds_instagram && (
                <SocialLink to={firstBird.birds_instagram} is="instagram" />
              )}
            </div>
          </div>
          <div className="trust__birds__half__content">
            <h3 className="h3 mt-40">{secondBird.birds_name}</h3>
            <CustomRichText
              data={secondBird.birds_text}
              className="p mt-16"
              isText
            />
            <div className="trust__birds__social mt-16">
              {secondBird.birds_twitter && (
                <SocialLink to={secondBird.birds_twitter} is="twitter" />
              )}
              {secondBird.birds_linkedin && (
                <SocialLink to={secondBird.birds_linkedin} is="linkedin" />
              )}
              {secondBird.birds_instagram && (
                <SocialLink to={secondBird.birds_instagram} is="instagram" />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Trust
