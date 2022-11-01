import { atom } from "recoil"

const cursorScaleState = atom({
  key: "cursorScaleState",
  default: 0.2,
})

export default cursorScaleState
