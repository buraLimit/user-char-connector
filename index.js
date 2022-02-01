const { connectDots } = require("./BresenhamAlgorithm")
const prompt = require("prompt-sync")()

const printMatrix = (matrix) => {
  for(i=0;i<matrix.length;i++){
    let strLine=""
    for(j=0;j<matrix[i].length;j++){
      strLine+=matrix[i][j]
    }
    console.log(strLine)
  }
}

// get user inputs
const getInput = () => {
  let dots = []
  let input = prompt("")
  while (input.length > 0) {
    dots.push(input.slice(0, 10).split(""))
    input = prompt("")
  }
  return dots
}

// make string of small alphabets
let alphabetsString = () => {
  let alphabet = ""
  for (i = 97; i <= 122; i++) {
    alphabet += String.fromCharCode(i)
  }

  return alphabet
}

// initialize 10x10 matrix
const emptyMatrix = () => {
  let matrix = []
  for (i=0;i<10;i++){
    matrix.push([])
    for (j=0;j<10;j++){
      matrix[i].push(" ")
    }
  }
  return matrix
}

const alphabets = alphabetsString().split("")
const endMatrix = emptyMatrix()
let finalShow = []
const dotsInMap = []
const dotsToConnect = []
const dots = getInput()

// dots [[a,"","",b],[e,"","",""],[d,"","",c]] = 1st use case

// [a,b,c,d,e......]
// b=>
// line [a,"","",b]
// j=0

// ------
// [a,0,0]
// [b,0,3]
// [c,2,3]
// [d,2,0]
// [e,1,0]

// extract dots and sort them alphabeticaly
alphabets.forEach((char) => {
  dots.forEach((line, index) => {
    j = line.indexOf(char)
    if (j >= 0) dotsInMap.push([char, index, j])
  })
})


// dots to connect [[[a,0,0],[b,0,3]],[[b,0,3],[c,2,3]],[[c,2,3],[d,2,0]],...]
if (dotsInMap.length >= 2) {
  const lastIndex = dotsInMap.length - 1

  dotsInMap.forEach((point, index) => {
    if (index == lastIndex) return
    dotsToConnect.push([point, dotsInMap[index + 1]])
  })
  dotsToConnect.push([dotsInMap[lastIndex], dotsInMap[0]])
}
else {
  console.log('Invalid input')
}

// connect passed dots
dotsToConnect.forEach((dots) => {
  const x1 = dots[0][1]
  const y1 = dots[0][2]

  const x2 = dots[1][1]
  const y2 = dots[1][2]

  finalShow.push(connectDots(x1, x2, y1, y2))
})

// insert drawed lines into matrix
finalShow.forEach((line) => {
  line.forEach((point) => {
    let x = point[0]
    let y = point[1]

    endMatrix[x][y] = "*"
  })
})

printMatrix(endMatrix)
