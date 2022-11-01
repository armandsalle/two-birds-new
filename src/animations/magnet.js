import { gsap } from "gsap"

export default class CoolButton {
  constructor(el) {
    this.el = el
    this.w = this.el.offsetWidth
    this.h = this.el.offsetHeight
    this.x = 0
    this.y = 0
    this.dX = 0
    this.dY = 0
    this.mX = 0
    this.mY = 0
    this.type = ""
  }

  update(e) {
    this.type = e.type
    this.x = e.offsetX
    this.y = e.offsetY

    if (this.type === "mouseleave") {
      this.x = this.w / 2
      this.y = this.h / 2
    }

    this.mX = (this.x - this.w / 2) * 0.3
    this.mY = (this.y - this.h / 2) * 0.3
  }

  draw() {
    this.dX += (this.mX - this.dX) * 0.2
    this.dY += (this.mY - this.dY) * 0.2

    gsap.set(this.el, {
      x: this.dX,
      y: this.dY,
    })

    this.raf = requestAnimationFrame(this.draw.bind(this))
  }

  init() {
    this.el.addEventListener("mousemove", this.update.bind(this))
    this.el.addEventListener("mouseleave", this.update.bind(this))

    this.raf = requestAnimationFrame(this.draw.bind(this))
  }

  destroy() {
    this.el.removeEventListener("mousemove", this.update.bind(this))
    this.el.removeEventListener("mouseleave", this.update.bind(this))

    cancelAnimationFrame(this.raf)
  }
}
