import React, { useEffect, useRef } from "react"
import ProjectItem from "./ProjectItem"
import Title from "../title"
import titleReveal from "../../animations/titleReveal"

const ProjectsList = ({ title, projects }) => {
  const projectSectionRef = useRef(null)

  useEffect(() => {
    const p = titleReveal(
      projectSectionRef.current.querySelector(".reveal-title"),
      projectSectionRef.current,
      false,
      "70%"
    )

    return () => {
      p.kill()
    }
  }, [])

  return (
    <section
      className="project-container container mt-160"
      ref={projectSectionRef}
    >
      <div className="projects-list">
        <Title className="h2" as="h2">
          {title}
        </Title>
        {projects.map(({ projects_item }, i) => {
          return (
            <ProjectItem
              key={i}
              title={projects_item.document.data.project_name}
              tags={projects_item.document.data.project_tags}
              thumbnail={projects_item.document.data.project_thumbnail}
              uid={projects_item.uid}
              lang={projects_item.lang}
            />
          )
        })}
      </div>
    </section>
  )
}

export default ProjectsList
