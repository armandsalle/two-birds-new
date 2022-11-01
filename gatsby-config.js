require("dotenv").config({
  path: `.env`,
})

const linkResolver = require("./src/utils/linkResolver.js")

module.exports = {
  siteMetadata: {
    title: `two-birds-new`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-sass",
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/components/layout/index.js`),
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/favicon.ico",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: `gatsby-plugin-webfonts`,
      options: {
        fonts: {
          google: [
            {
              family: "Poppins",
              variants: ["400", "500", "600", "700", "800", "900"],
            },
          ],
        },
        formats: ["woff2", "woff"],
        useMinify: true,
        usePreload: true,
        usePreconnect: true,
      },
    },
    {
      resolve: "gatsby-source-prismic",
      options: {
        repositoryName: process.env.PRISMIC_APP_NAME,
        accessToken: process.env.PRISMIC_ACCESS_TOKEN,
        customTypesApiToken: process.env.PRISMIC_CUSTOM_TYPES_API_TOKEN,
        linkResolver: doc => linkResolver(doc),
        preview: false,
        omitPrismicScript: true,
        shortenUrlLangs: true,
      },
    },
    {
      resolve: "gatsby-plugin-zopfli",
      options: {
        extensions: ["css", "html", "js", "svg"],
      },
    },
  ],
}
