const linkResolver = doc => {
  // URL for home
  if (doc.type === "home") {
    return `/`
  }

  // URL for a project
  if (doc.type === "projects") {
    return `/${doc.uid}`
  }

  // Backup for all other types
  return "/"
}

module.exports = linkResolver
