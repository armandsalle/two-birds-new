import React from "react"
import CustomRichText from "../richText"
import Title from "../title"
import VisitLink from "./VisitLink"

const ProjectHeader = ({
  infos: {
    project_title_rich,
    project_logo_svg,
    preoject_description,
    project_link,
    title_link,
    project_tags,
    project_date,
  },
}) => {
  const img = () => ({ __html: project_logo_svg })

  return (
    <header className="container mt-240 project-header">
      <div className="project-header__img-wrapper">
        <div className="project-header__logo" dangerouslySetInnerHTML={img()} />
      </div>
      <h1 className="h2 mt-16 project-header__title">
        <Title as="span">{project_title_rich.text}</Title>
      </h1>
      <CustomRichText
        data={preoject_description}
        isText
        className="project-header__description"
      />
      <div className="project-header__infos mt-80">
        <VisitLink projectLink={project_link} title={title_link} />
        <div className="project-header__tags">
          {project_tags &&
            project_tags.map(({ project_tag }, i) => (
              <div key={i} className="project-header__tag">
                {project_tag}
              </div>
            ))}
        </div>
        <div className="project-header__date">{project_date}</div>
      </div>
    </header>
  )
}

export default ProjectHeader
