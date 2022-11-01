import { Link } from "gatsby"
import React, { useCallback } from "react"
import SocialLink from "../scocialLink"
import useCreateLink from "../../hooks/useCreateLink"
import useIsTouchDesign from "../../hooks/useIsTouchDesign"
import { linkEnter, linkLeave } from "../../animations/cursor"

const Footer = ({ lang, data }) => {
  const {
    footer_twitter,
    footer_linkedin,
    footer_instagram,
    footer_dribbble,
    site_logo,
    footer_change_lang,
    footer_legals,
  } = data

  const isTouchDevice = useIsTouchDesign()

  const createLink = useCreateLink(lang, "legals")

  const mouseEnterLink = useCallback(() => {
    linkEnter(isTouchDevice)
  }, [isTouchDevice])

  const mouseLeaveLink = useCallback(() => {
    linkLeave(isTouchDevice)
  }, [isTouchDevice])

  return (
    <footer className="footer container mt-80 mb-80">
      <div className="footer__left">
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
        <span className="copywrite">Copyright © 2021 - twobirds.</span>
      </div>
      <div className="footer__right">
        <div className="footer__social__links">
          {footer_dribbble && <SocialLink to={footer_dribbble} is="dribble" />}
          {footer_twitter && <SocialLink to={footer_twitter} is="twitter" />}
          {footer_instagram && (
            <SocialLink to={footer_instagram} is="instagram" />
          )}
          {footer_linkedin && <SocialLink to={footer_linkedin} is="linkedin" />}
        </div>
        <div className="footer__links mt-16">
          <Link
            to={lang === "en-us" ? "/fr" : "/"}
            onMouseEnter={mouseEnterLink}
            onMouseLeave={mouseLeaveLink}
          >
            {footer_change_lang}
          </Link>
          <Link
            to={createLink}
            onMouseEnter={mouseEnterLink}
            onMouseLeave={mouseLeaveLink}
          >
            {footer_legals}
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
