import React, { useEffect, useContext } from "react"
import { graphql } from "gatsby"
import { gsap } from "gsap"
import Seo from "../components/seo"
import ProjectSlices from "../components/projectSlices"
import ProjectHeader from "../components/projectHeader"
import ProjectTransition from "../components/projectTransition"
import { animationStatut, setAnimation } from "../contexts/animationState"
import { AnimationContext } from "../contexts/animationContext"
import Contact from "../components/contact"
import projectEnter from "../animations/projectEnter"

const Project = ({
  data: { currentProject, homeProjects },
  pageContext: { uid, lang },
}) => {
  const projectssList = homeProjects.data.projectss_list

  let isProjectOnTheHomePage = false
  const homeProjectsUids = projectssList.map(e => e.projects_item.document.uid)

  if (homeProjectsUids.includes(uid)) {
    isProjectOnTheHomePage = true
  }

  let currId = 0

  projectssList.forEach((pr, i) => {
    if (pr.projects_item.document.uid === uid) {
      currId = i
    }
  })

  const nextProjectId = currId + 1 > projectssList.length - 1 ? 0 : currId + 1
  const nextProject = projectssList[nextProjectId].projects_item

  const {
    project_name,
    project_title_rich,
    project_logo_svg,
    preoject_description,
    project_link,
    project_tags,
    project_date,
    title_link,
    contact_title,
    contact_cta,
    body,
    seo_desscription,
    seo_image,
  } = currentProject.data

  const { animationsCanRuns, setExitAnimation } = useContext(AnimationContext)

  useEffect(() => {
    const getBack = document.querySelector(".get-back")
    if (getBack) {
      getBack.style.display = "flex"
    }
  }, [])

  useEffect(() => {
    const tl = projectEnter(animationStatut)

    if (animationsCanRuns) {
      tl.play()
      setAnimation("ORIGINAL")
      setTimeout(() => {
        gsap.to(".project-patch", { opacity: 0, display: "none" })
      }, 200)
    }

    return () => {
      setExitAnimation("opacity")
    }
  }, [animationsCanRuns, setExitAnimation])

  return (
    <>
      <Seo
        title={project_name}
        description={seo_desscription}
        image={seo_image}
        noIndex={!isProjectOnTheHomePage}
        lang={lang}
      />
      <ProjectHeader
        infos={{
          project_title_rich,
          project_logo_svg,
          preoject_description,
          project_link,
          title_link,
          project_tags,
          project_date,
        }}
      />
      <div className="all-slices">
        <ProjectSlices slices={body} />
      </div>
      <Contact title={contact_title} cta={contact_cta} isProject={true} />
      {isProjectOnTheHomePage && (
        <>
          <div className="line"></div>
          <ProjectTransition nextProject={nextProject} />
        </>
      )}
      {!isProjectOnTheHomePage && <div style={{ height: "20vh" }}></div>}
    </>
  )
}

export const projectQuery = graphql`
  query projectPage($lang: String!, $uid: String!) {
    homeProjects: prismicHome(lang: { eq: $lang }, uid: { eq: "home" }) {
      data {
        projectss_list {
          projects_item {
            document {
              ... on PrismicProjects {
                lang
                uid
                data {
                  project_logo_svg
                  project_title_rich {
                    text
                  }
                }
              }
            }
          }
        }
      }
    }

    currentProject: prismicProjects(lang: { eq: $lang }, uid: { eq: $uid }) {
      uid
      lang
      data {
        project_logo_svg
        project_title_rich {
          text
        }
        project_name
        preoject_description {
          richText
        }
        project_link
        project_tags {
          project_tag
        }
        project_date
        title_link
        contact_title
        contact_cta
        seo_desscription
        seo_image {
          url
        }
        body {
          ... on PrismicProjectsDataBodyImageFull {
            slice_type
            primary {
              image_full {
                gatsbyImageData(imgixParams: { maxWidth: 1920, q: 70 })
              }
            }
          }
          ... on PrismicProjectsDataBodyImageDouble {
            slice_type
            primary {
              left_image {
                gatsbyImageData(imgixParams: { maxWidth: 944, q: 70 })
              }
              right_image {
                gatsbyImageData(imgixParams: { maxWidth: 944, q: 70 })
              }
            }
          }
          ... on PrismicProjectsDataBodyNumbers {
            slice_type
            items {
              number_text
              number_title
            }
          }
          ... on PrismicProjectsDataBodyDescription {
            slice_type
            primary {
              description {
                richText
              }
            }
          }
          ... on PrismicProjectsDataBodyVideoYoutube {
            slice_type
            primary {
              youtube_link {
                ... on PrismicLinkType {
                  url
                }
                url
                link_type
              }
            }
          }
        }
      }
    }
  }
`

export default Project
