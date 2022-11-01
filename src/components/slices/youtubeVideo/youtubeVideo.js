import React from "react"
import ReactPlayer from "react-player"

const YoutubeVideo = ({
  primary: {
    youtube_link: { url },
  },
}) => {
  return (
    <div className="slice-youtube-video mb-32">
      <ReactPlayer
        url={url}
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
        }}
        controls={true}
      />
    </div>
  )
}

export default YoutubeVideo
