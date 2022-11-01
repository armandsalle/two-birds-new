import React from "react"

const ProjectTransitionPatch = () => {
  return (
    <div
      className="project-patch"
      style={{ display: "none" }}
      aria-hidden="true"
    >
      <div className="project-patch__img-wrapper">
        <div className="project-patch__logo" />
      </div>
      <h1 className="h2 mt-16 project-patch__title" aria-hidden="true"></h1>
    </div>
  )
}

export default ProjectTransitionPatch
