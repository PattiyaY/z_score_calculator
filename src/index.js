import jstat from "jstat";

let calculatorRawScoreForm = document.getElementById("calculator_raw_score");
let KeepFormulaAppearance = [];
let oldDictValue = {} ;

function countLeadingZeros(number) {
  return number.toExponential().split("-")[1];
}

function calculateZScore(rawScore, populationMean, standardDeviation) {
  return (
    Math.round(((rawScore - populationMean) / standardDeviation) * 100000) /
    100000
  );
}

function userInputForm() {
  let rawScore = document.getElementById("raw_score").value;
  let populationMean = document.getElementById("population_mean").value;
  let standardDeviation = document.getElementById("standard_deviation").value;
  return { rawScore, populationMean, standardDeviation };
}

function calculateProbabiltyOfZScore(
  zScore,
  populationMean,
  standardDeviation,
) {
  let probability = jstat.normal.cdf(zScore, populationMean, standardDeviation);
  let numberOfLeadingZeros = -(countLeadingZeros(probability) - 1);
  probability /= Math.pow(10, numberOfLeadingZeros);
  probability = Math.round(probability * 100000) / 100000;
  return probability;
}

function displayResult(
  zScore,
  populationMean,
  rawScore,
  probabilityXGreaterThanRawScore,
  probabilityXLessThanRawScore,
  probabilityAtX,
) {
  document.getElementById("z_score").innerHTML = `Z Score: ${zScore}`;
  document.getElementById(
    "probability_x_lesser_than_raw_score",
  ).innerHTML = `Probability of x < ${rawScore}: ${probabilityXLessThanRawScore}`;
  document.getElementById(
    "probability_x_greater_than_raw_score",
  ).innerHTML = `Probability of x > ${rawScore}: ${probabilityXGreaterThanRawScore}`;
  document.getElementById(
    "probability_at_x",
  ).innerHTML = `Probability of ${populationMean} < x < ${rawScore} : ${probabilityAtX}`;
}

calculatorRawScoreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const { rawScore, populationMean, standardDeviation } = userInputForm();
  const zScore = calculateZScore(rawScore, populationMean, standardDeviation);
  const probability = calculateProbabiltyOfZScore(
    zScore,
    populationMean,
    standardDeviation,
  );

  // Probability calculation
  let probabilityXGreaterThanRawScore = probability;
  let probabilityXLessThanRawScore = 1 - probabilityXGreaterThanRawScore;
  let probabilityAtX =
    Math.round((probabilityXLessThanRawScore - 0.5) * 100000) / 100000;
  displayResult(
    zScore,
    populationMean,
    rawScore,
    probabilityXGreaterThanRawScore,
    probabilityXLessThanRawScore,
    probabilityAtX,
  );
  
  let newDictValue = {
    "rawScore": rawScore,
    "populationMean": populationMean,
    "standardDeviation": standardDeviation
  };

  if(objectsAreEqual(oldDictValue, newDictValue)){
    return
  } else if (Object.keys(oldDictValue).length === 0) {
    displaySteps(rawScore, populationMean, standardDeviation, zScore);
    oldDictValue = newDictValue;
  } else if (oldDictValue != newDictValue) {
    deleteDivFormulaContainer();
    displaySteps(rawScore, populationMean, standardDeviation, zScore);
    oldDictValue = newDictValue;
  } 

});

function displaySteps(rawScore, populationMean, standardDeviation, zScore){
  // Step
  // container Z-score and formula 1
  let divFormulaContainer = document.createElement("div");
  divFormulaContainer.setAttribute("id", "formula_container");
  document.body.appendChild(divFormulaContainer);

  // Z-score 2
  let divWrapForZScore = document.createElement("div");
  divWrapForZScore.setAttribute("id", "Z_Score");
  divFormulaContainer.appendChild(divWrapForZScore);

  let spanForZScore = document.createElement("span");
  spanForZScore.innerHTML = " = ";
  divWrapForZScore.appendChild(spanForZScore);

  // Formula
  let divWrapForZScoreFormula = document.createElement("div");
  divWrapForZScoreFormula.setAttribute("id", "z_score_formula");
  divFormulaContainer.appendChild(divWrapForZScoreFormula);

  let rawMinusPopulationMean = document.createElement("p");
  rawMinusPopulationMean.setAttribute("id", "raw_and_population_mean");
  rawMinusPopulationMean.innerHTML = `${rawScore} - ${populationMean}`;
  divWrapForZScoreFormula.appendChild(rawMinusPopulationMean);

  let standardDeviationSymbol = document.createElement("p");
  standardDeviationSymbol.setAttribute("id", "standard_deviation_symbol");
  standardDeviationSymbol.innerHTML = standardDeviation;
  divWrapForZScoreFormula.appendChild(standardDeviationSymbol);

  // divide line
  let line = document.createElement("hr");
  divWrapForZScoreFormula.appendChild(line);
  divWrapForZScoreFormula.appendChild(standardDeviationSymbol);

  //Answer container 3
  let divWrapAnswerContainer = document.createElement("div");
  divWrapAnswerContainer.setAttribute("id", "AnswerContainer");
  document.body.appendChild(divWrapAnswerContainer);

  //Div Answer Z-score
  let divWrapForAnswerZscore = document.createElement("div");
  divWrapForAnswerZscore.setAttribute("id", "Z_score_Answer")
  divWrapAnswerContainer.appendChild(divWrapForAnswerZscore);

  // = Sign
  let equalSign = document.createElement("p");
  equalSign.setAttribute("id", "equalSign");
  equalSign.innerHTML = "=";
  divWrapAnswerContainer.appendChild(equalSign);

  //Z-score Answer
  let answerZscore = document.createElement("p");
  answerZscore.setAttribute("id", "Z_scoreAnswer");
  answerZscore.innerHTML = `${zScore}`;
  divWrapAnswerContainer.appendChild(answerZscore);

  KeepFormulaAppearance.push(divFormulaContainer);
  KeepFormulaAppearance.push(divWrapAnswerContainer);

}

//delete div formula_container
function deleteDivFormulaContainer(){
  document.body.removeChild(KeepFormulaAppearance[0]);
  document.body.removeChild(KeepFormulaAppearance[1]);
}

//Check dictionary
function objectsAreEqual(objA, objB) {
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  for (const key of keysA) {
    if (objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}

  
