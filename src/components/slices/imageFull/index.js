import React, { useRef, useEffect } from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import reveal from "../../../animations/reveal"

const ImageFull = ({ primary }) => {
  const { image_full } = primary
  const imageFullRef = useRef()

  useEffect(() => {
    reveal(imageFullRef.current, imageFullRef.current, false, "70%")
  }, [])

  return (
    <section className="slice-image-full mb-32" ref={imageFullRef}>
      {
        <GatsbyImage
          image={getImage(image_full.gatsbyImageData)}
          alt={image_full?.alt}
          className="slice-image-full__image"
        />
      }
    </section>
  )
}

export default ImageFull
