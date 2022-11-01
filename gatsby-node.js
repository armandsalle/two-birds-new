const path = require("path")

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const queryData = await graphql(`
    {
      allPrismicHome {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicLegals {
        nodes {
          id
          lang
          url
        }
      }
      allPrismicProjects {
        nodes {
          id
          lang
          url
          uid
        }
      }
    }
  `)

  queryData.data.allPrismicHome.nodes.forEach(page => {
    const lang = page.lang === "fr-fr" ? "fr" : ""
    createPage({
      path: "/" + lang,
      component: path.resolve(__dirname, "src/templates/home.js"),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allPrismicLegals.nodes.forEach(page => {
    const lang = page.lang === "fr-fr" ? "/fr" : ""
    createPage({
      path: lang + "/legals",
      component: path.resolve(__dirname, "src/templates/legals.js"),
      context: {
        id: page.id,
        lang: page.lang,
      },
    })
  })
  queryData.data.allPrismicProjects.nodes.forEach(page => {
    const lang = page.lang === "fr-fr" ? "/fr" : ""
    createPage({
      path: lang + page.url,
      component: path.resolve(__dirname, "src/templates/project.js"),
      context: {
        uid: page.uid,
        lang: page.lang,
      },
    })
  })
}
