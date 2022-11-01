export default class Split {
  constructor({
    el,
    type,
    charsClass,
    wordsClass,
    linesClass,
    wrap,
    wrapperClass,
  }) {
    this.el = el
    this.type = type
    this.wrap = wrap
    this.wrapperClass = wrapperClass ? wrapperClass : `${this.type}-wrap`

    this.charsClass = charsClass ? charsClass : "char"
    this.wordsClass = wordsClass ? wordsClass : "word"
    this.linesClass = linesClass ? linesClass : "line"

    this.splittedElement = null

    this.split(this.el)
  }

  split() {
    if (this.type === "chars") this.splitChars(this.el, this.charsClass)
    else if (this.type === "words") this.splitWords(this.el, this.wordsClass)
    else if (this.type === "lines") this.splitLines(this.el, this.linesClass)
  }

  get splitElement() {
    return this.splittedElement
  }

  splitLines(el, linesClass) {
    if (!el) return

    const splittedWords = this.splitWords(el, this.wordsClass)

    let offsetTop
    let allLines = []
    let lines = []
    let line = []

    for (let w = 0; w < splittedWords.words.length; w++) {
      const word = splittedWords.words[w]

      if (word.offsetTop !== offsetTop) {
        offsetTop = word.offsetTop
        line = []
        lines.push(line)
      }
      line.push(word)
    }

    this.removeWhitespace(el)

    for (let i = 0; i < lines.length; i++) {
      const lineEl = document.createElement("div")
      const lineElInner = document.createElement("div")

      lineEl.classList.add("title__lines")
      lineElInner.classList.add("line__inner")

      for (let j = 0; j < lines[i].length; j++) {
        lineElInner.appendChild(lines[i][j])
        this.addWhitespace(lineElInner)
      }

      lineEl.appendChild(lineElInner)
      el.appendChild(lineEl)
      allLines.push(lineEl)
    }

    this.splittedElement = {
      el,
      lines: allLines,
      words: splittedWords.words,
    }

    return this.splittedElement
  }

  splitWords(el, wordsClass) {
    if (!el) return

    let allWords = []
    let text = el.innerHTML
    let index = 0

    el.innerHTML = ""

    if (!text) return

    const words = text.split(" ")

    for (let i = 0; i < words.length; i++) {
      const word = words[i]
      const wordEl = document.createElement("span")

      wordEl.innerHTML = word
      wordEl.classList.add(wordsClass)

      if (this.wrap) {
        const wrapper = document.createElement("div")

        wrapper.style.position = "relative"
        wrapper.style.display = "inline-block"
        wrapper.classList.add(this.wrapperClass)
        wrapper.appendChild(wordEl)
        el.appendChild(wrapper)
      } else el.appendChild(wordEl)

      if (index !== words.length - 1) this.addWhitespace(el)
      index++

      allWords.push(wordEl)
    }

    this.splittedElement = {
      el,
      words: allWords,
    }

    return this.splittedElement
  }

  splitChars(el, letterClass) {
    if (!el) return

    let allChars = []
    const splittedWords = this.splitWords(el, this.wordsClass)

    el.innerHTML = ""

    for (let i = 0; i < splittedWords.words.length; i++) {
      const word = splittedWords.words[i]
      const chars = word.innerHTML.split("")

      word.innerHTML = ""

      for (let c = 0; c < chars.length; c++) {
        const charEl = document.createElement("span")

        charEl.innerHTML = chars[c]
        charEl.classList.add(letterClass)
        allChars.push(charEl)

        if (this.wrap) {
          const wrapper = document.createElement("div")

          wrapper.style.position = "relative"
          wrapper.style.display = "inline-block"
          wrapper.classList.add(this.wrapperClass)
          wrapper.appendChild(charEl)
          el.appendChild(wrapper)
        } else word.appendChild(charEl)
      }
      el.appendChild(word)
      if (i !== splittedWords.words.length - 1) this.addWhitespace(el)
    }

    this.splittedElement = {
      el,
      words: splittedWords.words,
      chars: allChars,
    }

    return this.splittedElement
  }

  removeWhitespace(el) {
    const whitespaces = el.querySelectorAll(".whitespace")

    for (let i = 0; i < whitespaces.length; i++) el.removeChild(whitespaces[i])
  }

  addWhitespace(el) {
    const whitespace = document.createElement("span")
    whitespace.innerHTML = " "
    whitespace.classList.add("whitespace")

    el.appendChild(whitespace)
  }
}
