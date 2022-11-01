import React from "react"
import Button from "../button"

const ProjectNav = ({ link }) => {
  return (
    <Button to={link} className="get-back">
      <svg
        width={14}
        height={14}
        fill="none"
        viewBox="0 0 14 14"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M14 1.41L12.59 0 7 5.59 1.41 0 0 1.41 5.59 7 0 12.59 1.41 14 7 8.41 12.59 14 14 12.59 8.41 7 14 1.41z"
          fill="#fff"
        />
      </svg>
    </Button>
  )
}

export default ProjectNav
