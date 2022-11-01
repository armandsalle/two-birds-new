import React, { useRef, useEffect, useContext } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"
import { AnimationContext } from "../../contexts/animationContext"
import reveal from "../../animations/reveal"

const Header = () => {
  const { allPrismicLayout } = useStaticQuery(
    graphql`
      query {
        allPrismicLayout {
          nodes {
            data {
              site_logo {
                url
              }
            }
          }
        }
      }
    `
  )
  const logoRef = useRef()
  const { animationsCanRuns } = useContext(AnimationContext)

  const { site_logo } = allPrismicLayout.nodes[0].data

  useEffect(() => {
    if (animationsCanRuns) {
      reveal(logoRef.current, logoRef.current, false, "70%")
    }
  }, [animationsCanRuns])

  return (
    <header className="mt-40 index-header" ref={logoRef} style={{ opacity: 0 }}>
      <div className="logo">
        <Link to="/">
          <img
            src={site_logo?.url}
            alt="two birds logo"
            width={141}
            height={24}
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
