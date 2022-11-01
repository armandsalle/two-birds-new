import React, { useEffect, useRef } from "react"
import reveal from "../../../animations/reveal"
import CustomRichText from "../../richText"

const Description = ({ primary }) => {
  const descRef = useRef()
  const { description } = primary

  useEffect(() => {
    reveal(descRef.current, descRef.current, false, "70%")
  }, [])

  return (
    <section className="container slice-description" ref={descRef}>
      <CustomRichText data={description} isText />
    </section>
  )
}

export default Description
