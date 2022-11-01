import React, { useEffect, useContext, useState, useCallback } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { AnimationContext } from "../../contexts/animationContext"
import FontFaceObserver from "fontfaceobserver"
import imagesLoaded from "imagesloaded"
import axios from "axios"
import { gsap } from "gsap"
import Background from "./Background"
import Logo from "./Logo"
import Foreground from "./Foreground"

const Loaded = ({ children }) => {
  const { HeroURLs, ProcessURLs, TrustURLs, ContactURLs } =
    useStaticQuery(graphql`
      query LottiesURLs {
        HeroURLs: prismicHome(lang: { eq: "fr-fr" }, uid: { eq: "home" }) {
          data {
            hero_lottie_plants {
              url
            }
            hero_lottie_macaw {
              url
            }
            hero_lottie_cockatoo {
              url
            }
          }
        }
        ProcessURLs: prismicHome(lang: { eq: "fr-fr" }, uid: { eq: "home" }) {
          data {
            process_lottie_hummingbird {
              url
            }
            process_lottie_toucan {
              url
            }
            process_lottie_owl {
              url
            }
          }
        }
        TrustURLs: prismicHome(lang: { eq: "fr-fr" }, uid: { eq: "home" }) {
          data {
            trust_lottie_vincent {
              url
            }
            trust_lottie_clement {
              url
            }
          }
        }
        ContactURLs: prismicHome(lang: { eq: "fr-fr" }, uid: { eq: "home" }) {
          data {
            contact_lottie_cloud {
              url
            }
            contact_lottie_bird_1 {
              url
            }
            contact_lottie_bird_2 {
              url
            }
            contact_lottie_bird_3 {
              url
            }
            contact_lottie_bird_4 {
              url
            }
            contact_lottie_bird_5 {
              url
            }
            contact_lottie_bird_6 {
              url
            }
          }
        }
      }
    `)

  const [loadedCanGo, setLoadedCanGo] = useState(false)

  const {
    setAnimationsCanRuns,
    setHeroLotties,
    setProcessLotties,
    setTrustLotties,
    setContactLotties,
  } = useContext(AnimationContext)

  const loadJSON = useCallback(async urls => {
    let lotties = await Promise.all(
      Object.entries(urls).map(async el => {
        let lottie

        try {
          const res = await axios.get(el[1].url, {
            headers: {
              "Content-Encoding": "gzip",
            },
          })
          lottie = await res.data
        } catch (error) {
          console.error(error)
        }

        return { [el[0]]: lottie }
      })
    )

    return lotties
  }, [])

  useEffect(() => {
    const startTime = performance.now()

    const font = new FontFaceObserver("Poppins")
    const imgLoaded = imagesLoaded(
      document.querySelector("body"),
      { background: true },
      null
    )

    Promise.all([
      window.loadPromise,
      font.load(null, 100000),
      imgLoaded.on("done"),
      loadJSON(HeroURLs.data),
      loadJSON(ProcessURLs.data),
      loadJSON(TrustURLs.data),
      loadJSON(ContactURLs.data),
    ]).then(d => {
      setHeroLotties(d[3])
      setProcessLotties(d[4])
      setTrustLotties(d[5])
      setContactLotties(d[6])

      const endTime = performance.now()
      let t = 0

      if (endTime - startTime <= 3000) {
        t = endTime - startTime
      }

      setTimeout(() => {
        setLoadedCanGo(true)
      }, 3000 - t)

      // 300ms is the time to anim and remove the loading screen
      setTimeout(() => {
        setAnimationsCanRuns(true)
      }, 3000 - t + 300)
    })
  }, [])

  useEffect(() => {
    if (loadedCanGo) {
      gsap.to(".loading", {
        opacity: 0,
        display: "none",
        // delay: 0.1,
        duration: 0.2,
        onStart: () => {
          gsap.killTweensOf(".loading__background")
          gsap.killTweensOf(".loading__foreground")
        },
        onComplete: () => {
          document.querySelector("body").classList.remove("hide")
          document.querySelector("body").style.overflowY = "auto"
        },
      })
    }
  }, [loadedCanGo])

  useEffect(() => {
    document.querySelector("body").classList.add("hide")
    const isMobile = window.matchMedia("screen and (max-width: 478px)").matches
    gsap.to(".loading__background", {
      duration: isMobile ? 75 / 2 : 75,
      xPercent: 20,
      ease: "none",
    })
    gsap.to(".loading__foreground", {
      duration: isMobile ? 30 / 2 : 30,
      xPercent: 20,
      ease: "none",
    })
  }, [])

  return (
    <>
      <div className="loading">
        <div className="loading__background">
          <Foreground />
        </div>
        <div className="loading__logo">
          <Logo />
        </div>
        <div className="loading__foreground">
          <Background />
        </div>
      </div>
      {children}
    </>
  )
}

export default Loaded
