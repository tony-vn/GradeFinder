export function getGradesHistLength(gradesHist) {
  for (let i = 0; i < gradesHist.length; i++) {
    if (isNaN(gradesHist[i]) && i !== 0) {
      // hit NaN, thus at i is the end of list
      return i;
    }
  }
  return gradesHist.length;
}

export function calculateGrade(grades, weights) {
  let temp = 0;
  for (let n = 0; n < getGradesHistLength(grades); n++) {
    if (!isNaN(grades[n]) && !isNaN(weights[n])) {
      // don't add NaN values
      temp += (grades[n] * weights[n]) / 100;
    }
  }
  return temp;
}
