const getRedirectLanguage = () => {
  if (typeof navigator === `undefined`) {
    return ""
  }

  const lang =
    navigator && navigator.language && navigator.language.split("-")[0]
  if (!lang) return ""

  switch (lang) {
    case "fr":
      return "fr"
    default:
      return ""
  }
}

export default getRedirectLanguage
