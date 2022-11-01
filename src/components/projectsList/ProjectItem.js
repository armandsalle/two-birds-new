import React, { useEffect, useRef } from "react"
import { Link } from "gatsby"
import reveal from "../../animations/reveal"
import { mouseEnter, mouseLeave, mouseClick } from "../../animations/cursor"
import useCreateLink from "../../hooks/useCreateLink"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const ProjectItem = ({ title, thumbnail, tags, uid, lang }) => {
  const linkRef = useRef(null)

  useEffect(() => {
    reveal(linkRef.current, linkRef.current, true, "70%")
  }, [])

  const createLink = useCreateLink(lang, uid)

  return (
    <Link
      to={createLink}
      className="project-item-link "
      ref={linkRef}
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={mouseClick}
      name={title}
      aria-label={title}
    >
      <div className="project-item-link__wrapper__image">
        {thumbnail.gatsbyImageData ? (
          <GatsbyImage
            image={getImage(thumbnail.gatsbyImageData)}
            alt={thumbnail?.alt}
            className="project-item-link__image"
          />
        ) : (
          <img
            src={thumbnail.url}
            alt={thumbnail?.alt}
            className="project-item-link__image"
          />
        )}
      </div>
      <h3 className="h3 mt-40">{title}</h3>
      <p className="color-grey mt-16">
        {tags.map(({ projectTag }, i) =>
          i === tags.length - 1 ? projectTag : projectTag + ", "
        )}
      </p>
    </Link>
  )
}

export default ProjectItem
