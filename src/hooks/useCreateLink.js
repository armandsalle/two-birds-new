const useCreateLink = (lang, uid) => {
  switch (lang) {
    case "fr-fr":
      if (uid) {
        return `/fr/${uid}`
      } else {
        return `/fr`
      }
    case "en-us":
      if (uid) {
        return `/${uid}`
      } else {
        return "/"
      }

    default:
      if (uid) {
        return `/${uid}`
      } else {
        return "/"
      }
  }
}

export default useCreateLink
