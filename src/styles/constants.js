export const color = {
  plum: "#6342A5",
  plumBright: "#8A5AEB",
  batmanBlack: "#212121",
}

const GOLDEN_RATIO = 1.61803398875
const typeSizingRatio = Math.sqrt(GOLDEN_RATIO)
const baseTypeSize = 16
const multipliedTypeSize = increment => {
  const size = (baseTypeSize * typeSizingRatio) ^ increment
  return `${size}px`
}

export const typeSize = {
  s: multipliedTypeSize(-1),
  m: multipliedTypeSize(0),
  l: multipliedTypeSize(1),
  l2: multipliedTypeSize(2),
  l3: multipliedTypeSize(3),
  l4: multipliedTypeSize(4),
  l5: multipliedTypeSize(5),
}

// https://github.com/jonathantneal/css-font-weight-names
export const typeWeight = {
  thin: 100,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
}
