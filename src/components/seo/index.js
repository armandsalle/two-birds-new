import React from "react"
import PropTypes from "prop-types"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

function SEO({ meta, title, noIndex, image, description, lang }) {
  const { enPrismic, frPrismic } = useStaticQuery(
    graphql`
      query {
        enPrismic: allPrismicLayout(filter: { lang: { eq: "en-us" } }) {
          nodes {
            data {
              site_twitter
              site_title
              site_description
              site_authors
              site_image {
                url
              }
              twitter_card {
                url
              }
            }
          }
        }
        frPrismic: allPrismicLayout(filter: { lang: { eq: "fr-fr" } }) {
          nodes {
            data {
              site_twitter
              site_title
              site_description
              site_authors
              site_image {
                url
              }
              twitter_card {
                url
              }
            }
          }
        }
      }
    `
  )

  const {
    site_title,
    site_description,
    site_twitter,
    site_image,
    twitter_card,
  } = lang === "en-us" ? enPrismic.nodes[0].data : frPrismic.nodes[0].data

  return (
    <Helmet
      htmlAttributes={{
        lang: "en",
      }}
      title={site_title}
      titleTemplate={title ? `${title} - ${site_title}` : `${site_title}`}
      meta={[
        {
          name: `description`,
          content: description || site_description,
        },
        {
          property: `og:title`,
          content: title ? `${title} - ${site_title}` : `${site_title}`,
        },
        {
          property: `og:description`,
          content: description || site_description,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          property: `og:image`,
          content: image ? image.url : site_image.url,
        },
        {
          name: `twitter:card`,
          content: `summary_large_image`,
        },
        {
          name: `twitter:image`,
          content: twitter_card.url,
        },
        {
          name: `twitter:site`,
          content: site_twitter,
        },
        {
          name: `twitter:creator`,
          content: site_twitter,
        },
        {
          name: `twitter:title`,
          content: site_title,
        },
        {
          name: `twitter:description`,
          content: description || site_description,
        },
      ].concat(meta)}
    >
      <link rel="preconnect" href="https://prismic-io.s3.amazonaws.com" />
      <link rel="preconnect" href="https://images.prismic.io" />
      <link rel="preconnect" href="https://twobirds.prismic.io" />
      {noIndex && <meta name="robots" content="noindex" />}
    </Helmet>
  )
}

SEO.defaultProps = {
  lang: `en`,
  meta: [],
  description: ``,
}

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  meta: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string.isRequired,
}

export default SEO
