import React, { useEffect } from "react"
import { graphql } from "gatsby"
import Hero from "../components/hero"
import Seo from "../components/seo"
import Header from "../components/header"
import ProjectsList from "../components/projectsList"
import Process from "../components/process"
import Trust from "../components/trust"
import Footer from "../components/footer"
import Contact from "../components/contact"

export default function Home({ data, pageContext }) {
  useEffect(() => {
    const getBack = document.querySelector(".get-back")
    if (getBack) {
      getBack.style.display = "none"
    }
  }, [])

  const prismicHome = data.prismicHome.data

  const hero = {
    heroTitle: prismicHome.hero_title,
    heroText: prismicHome.hero_text,
    heroCtaText: prismicHome.hero_cta_text,
  }

  return (
    <>
      <Seo title="" lang={pageContext.lang} />
      <Header />
      <Hero
        title={hero.heroTitle}
        text={hero.heroText}
        cta={hero.heroCtaText}
      />
      <ProjectsList
        title={prismicHome.projects_title}
        projects={prismicHome.projectss_list}
      />
      <Process
        title={prismicHome.process_title}
        processList={prismicHome.process_list}
      />
      <Trust
        title={prismicHome.trust_title}
        text={prismicHome.trust_rext}
        birds={prismicHome.birds}
      />
      <Contact
        title={prismicHome.contact_title}
        cta={prismicHome.contact_cta_text}
      />
      <Footer lang={pageContext.lang} data={data.prismicLayout.data} />
    </>
  )
}

export const indexQuery = graphql`
  query indexPage($lang: String!) {
    prismicHome(lang: { eq: $lang }, uid: { eq: "home" }) {
      data {
        hero_title
        hero_text
        hero_cta_text
        process_title
        process_list {
          process_items {
            richText
          }
          process_text
          process_name
        }
        projects_title
        projectss_list {
          projects_item {
            uid
            lang
            document {
              ... on PrismicProjects {
                id
                data {
                  project_name
                  project_tags {
                    project_tag
                  }
                  project_thumbnail {
                    url
                    alt
                    gatsbyImageData(
                      imgixParams: { maxWidth: 488 }
                      srcSetMaxWidth: 488
                    )
                  }
                }
              }
            }
          }
        }
        trust_title
        trust_text {
          richText
        }
        birds {
          birds_twitter
          birds_text {
            richText
          }
          birds_name
          birds_linkedin
          birds_instagram
          birds_image_hover {
            alt
            gatsbyImageData(
              imgixParams: { maxWidth: 512 }
              srcSetMaxWidth: 512
              layout: FULL_WIDTH
            )
          }
          birds_image_looking_at {
            alt
            gatsbyImageData(
              imgixParams: { maxWidth: 512 }
              srcSetMaxWidth: 512
              layout: FULL_WIDTH
            )
          }
          birds_image {
            alt
            gatsbyImageData(
              imgixParams: { maxWidth: 512 }
              srcSetMaxWidth: 512
              layout: FULL_WIDTH
            )
          }
        }
        contact_title
        contact_cta_text
      }
    }
    prismicLayout(lang: { eq: $lang }) {
      data {
        footer_twitter
        footer_linkedin
        footer_instagram
        footer_dribbble
        site_logo {
          alt
          url
        }
        footer_change_lang
        footer_legals
      }
    }
  }
`
