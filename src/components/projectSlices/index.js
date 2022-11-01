import React from "react"
import PropTypes from "prop-types"
import ImageFull from "../slices/imageFull"
import ImageDouble from "../slices/imageDouble"
import Numbers from "../slices/numbers"
import Description from "../slices/description"
import YoutubeVideo from "../slices/youtubeVideo/youtubeVideo"

const ProjectSlices = ({ slices }) => {
  return (
    slices &&
    slices.map((slice, index) => {
      const res = (() => {
        switch (slice.slice_type) {
          case "image_full":
            return <ImageFull key={index} {...slice} />
          case "image_double":
            return <ImageDouble key={index} {...slice} />
          case "numbers":
            return <Numbers key={index} {...slice} />
          case "description":
            return <Description key={index} {...slice} />
          case "video_youtube":
            return <YoutubeVideo key={index} {...slice} />
          default:
            return
        }
      })()
      return res
    })
  )
}

ProjectSlices.propTypes = {
  slices: PropTypes.array,
}

export default ProjectSlices
