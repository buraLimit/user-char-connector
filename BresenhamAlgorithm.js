const connectDots = (x1, x2, y1, y2) => {
  let line = []

  // calculate delta
  let dx = Math.abs(x2 - x1)
  let dy = Math.abs(y2 - y1)

  // find direction
  let Sx = x1 < x2 ? 1 : -1
  let Sy = y1 < y2 ? 1 : -1

  // determine decision variable
  let err = (dx > dy ? dx : -dy) / 2

  while (true) {
    // add first dot
    line.push([x1, y1])

    // end loop when reach second dot
    if (x1 === x2 && y1 === y2) break

    var e2 = err

    // increment x and reduce decision variable
    if (e2 > -dx) {
      err -= dy
      x1 += Sx
    }

    // increment y and reduce decision variable
    if (e2 < dy) {
      err += dx
      y1 += Sy
    }
  }
  return line
}

module.exports = {
  connectDots,
}
