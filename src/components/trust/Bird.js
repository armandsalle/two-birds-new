import React, {
  useEffect,
  useRef,
  useCallback,
  useState,
  forwardRef,
  useImperativeHandle,
} from "react"
import cn from "classnames"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { gsap } from "gsap"
import Lottie from "lottie-react"
import SocialLink from "../scocialLink"
import CustomRichText from "../richText"
import reveal from "../../animations/reveal"

const Bird = forwardRef(
  ({ align, bird, anim, id, setCurrentBird, currentBird }, ref) => {
    const imgRef = useRef()
    const titleRef = useRef()
    const descRef = useRef()
    const socialRef = useRef()
    const lottieRef = useRef()
    const birdRef = useRef()

    const [animLoop, setAnimLoop] = useState(true)

    useImperativeHandle(ref, () => ({
      reset() {
        lottieRef.current.stop()
        const imgNormal = birdRef.current.querySelector(".normal")
        const imgShow = birdRef.current.querySelector(".hover")
        const imgLookingAt = birdRef.current.querySelector(".looking-at")

        gsap.set(imgNormal, { display: "block", opacity: 1 })
        gsap.set(imgLookingAt, { opacity: 0 })
        gsap.set(imgShow, { opacity: 0 })
      },
    }))

    useEffect(() => {
      // Reveal
      if (window.matchMedia("screen and (min-width: 992px)").matches) {
        gsap.to(imgRef.current, {
          scrollTrigger: {
            trigger: imgRef.current,
            start: () => `top 80%`,
          },
          opacity: 1,
          x: 0,
          ease: "Quad.easeOut",
          duration: 2,
        })
      } else {
        gsap.set(imgRef.current, { x: 0 })
      }
    }, [])

    useEffect(() => {
      // Reveal and lotties
      if (window.matchMedia("screen and (max-width: 992px)").matches) {
        setAnimLoop(false)
        gsap.fromTo(
          imgRef.current,
          {
            opacity: 0,
            y: 80,
          },
          {
            scrollTrigger: {
              trigger: imgRef.current,
              start: () => `top 80%`,
            },
            opacity: 1,
            y: 0,
            ease: "Quad.easeOut",
            duration: 1,
            onStart: () => {
              lottieRef.current.stop()
              lottieRef.current.play()
            },
          }
        )
        const contentWrapper = birdRef.current.querySelector(
          ".trust__birds__half__content--mobile"
        )
        reveal(contentWrapper, contentWrapper, false, "80%")
      }
    }, [setAnimLoop, lottieRef])

    const hoverImg = useCallback(() => {
      setCurrentBird(align)
      if (window.matchMedia("screen and (min-width: 992px)").matches) {
        if (align !== currentBird) {
          lottieRef.current.stop()
          lottieRef.current.play()
        }

        const birds = [...document.querySelectorAll(".trust__birds__half")]
        const content = [
          ...document.querySelectorAll(".trust__birds__half__content"),
        ]
        const otherBird = id === 0 ? birds[1] : id === 1 ? birds[0] : birds[0]

        const imgNormal = birdRef.current.querySelector(".normal")
        const imgShow = birdRef.current.querySelector(".hover")
        const imgLookingAt = birdRef.current.querySelector(".looking-at")

        const otherImgNormal = otherBird.querySelector(".normal")
        const otherImgShow = otherBird.querySelector(".hover")
        const otherImgLooinkgAt = otherBird.querySelector(".looking-at")

        //iamge show
        gsap.set([imgNormal, otherImgNormal], { display: "none" })
        gsap.set([otherImgShow, imgLookingAt], { opacity: 0 })
        gsap.set([imgShow, otherImgLooinkgAt], { opacity: 1 })
        //content show
        gsap.set(content[id === 0 ? 1 : 0], { display: "none", opacity: 0 })
        gsap.set(content[id], { display: "block", opacity: 1 })
      }
    }, [id, lottieRef, currentBird, align, setCurrentBird])

    return (
      <div
        className="trust__birds__half"
        onMouseEnter={hoverImg}
        onClick={hoverImg}
        role="button"
        ref={birdRef}
      >
        <div className={cn("trust__birds__half__header", align)} ref={imgRef}>
          <div className="img looking-at">
            <GatsbyImage
              image={getImage(bird.birds_image_looking_at.gatsbyImageData)}
              alt={bird.birds_image_looking_at?.alt}
            />
          </div>
          <div className="img hover">
            <div className="lottie">
              <Lottie
                animationData={anim}
                loop={animLoop}
                lottieRef={lottieRef}
              />
            </div>
            <GatsbyImage
              image={getImage(bird.birds_image_hover.gatsbyImageData)}
              alt={bird.birds_image_hover?.alt}
            />
          </div>
          <div className="img normal">
            <GatsbyImage
              image={getImage(bird.birds_image.gatsbyImageData)}
              alt={bird.birds_image?.alt}
            />
          </div>
        </div>
        <div className="trust__birds__half__content--mobile">
          <h3 className="h3" ref={titleRef}>
            {bird.birds_name}
          </h3>
          <CustomRichText
            data={bird.birds_text}
            className="p"
            isText
            ref={descRef}
          />
          <div className="trust__birds__social mt-16" ref={socialRef}>
            {bird.birds_twitter && (
              <SocialLink to={bird.birds_twitter} is="twitter" />
            )}
            {bird.birds_linkedin && (
              <SocialLink to={bird.birds_linkedin} is="linkedin" />
            )}
            {bird.birds_instagram && (
              <SocialLink to={bird.birds_instagram} is="instagram" />
            )}
          </div>
        </div>
      </div>
    )
  }
)

export default Bird
