import React, { useCallback } from "react"
import useIsTouchDesign from "../../hooks/useIsTouchDesign"
import { linkEnter, linkLeave } from "../../animations/cursor"

const VisitLink = ({ projectLink, title }) => {
  const isTouchDevice = useIsTouchDesign()

  const mouseEnter = useCallback(() => {
    projectLink && linkEnter(isTouchDevice)
  }, [isTouchDevice, projectLink])

  const mouseLeave = useCallback(() => {
    projectLink && linkLeave(isTouchDevice)
  }, [isTouchDevice, projectLink])

  return (
    <div
      className="project-header__visit-link"
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      role="button"
    >
      {projectLink && (
        <a href={projectLink} target="_blank" rel="noreferrer">
          <span>{title}</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12.6667 12.6667H3.33333V3.33333H8V2H3.33333C2.59667 2 2 2.59667 2 3.33333V12.6667C2 13.4033 2.59667 14 3.33333 14H12.6667C13.4033 14 14 13.4033 14 12.6667V8H12.6667V12.6667ZM9.33333 2V3.33333H11.7233L5.17 9.88667L6.11333 10.83L12.6667 4.27667V6.66667H14V2H9.33333Z"
              fill="#5E5E67"
            />
          </svg>
        </a>
      )}
    </div>
  )
}

export default VisitLink
