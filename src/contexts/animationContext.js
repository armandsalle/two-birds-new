import React, { useState, createContext } from "react"

const defaultState = {
  exitAnimation: "opacity",
  enterAnimation: "opacity",
  setExitAnimation: () => {},
  setEnterAnimation: () => {},
  animationsCanRuns: false,
  setAnimationsCanRuns: () => {},
  heroLotties: null,
  setHeroLotties: () => {},
  processLotties: null,
  setProcessLotties: () => {},
  trustLotties: null,
  setTrustLotties: () => {},
  contactLotties: null,
  setContactLotties: () => {},
  contactLottiesRef: null,
  setContactLottiesRef: () => {},
}
export const AnimationContext = createContext(defaultState)

export const AnimationProvider = ({ children }) => {
  const [exitAnimation, setExitAnimation] = useState("opacity")
  const [enterAnimation, setEnterAnimation] = useState("opacity")
  const [animationsCanRuns, setAnimationsCanRuns] = useState(false)
  const [heroLotties, setHeroLotties] = useState(null)
  const [processLotties, setProcessLotties] = useState(null)
  const [trustLotties, setTrustLotties] = useState(null)
  const [contactLotties, setContactLotties] = useState(null)
  const [contactLottiesRef, setContactLottiesRef] = useState(null)

  return (
    <AnimationContext.Provider
      value={{
        exitAnimation,
        setExitAnimation,
        enterAnimation,
        setEnterAnimation,
        animationsCanRuns,
        setAnimationsCanRuns,
        heroLotties,
        setHeroLotties,
        processLotties,
        setProcessLotties,
        trustLotties,
        setTrustLotties,
        contactLotties,
        setContactLotties,
        contactLottiesRef,
        setContactLottiesRef,
      }}
    >
      {children}
    </AnimationContext.Provider>
  )
}
