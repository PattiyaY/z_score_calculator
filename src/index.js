import jstat from "jstat";

let calculatorRawScoreForm = document.getElementById("calculator_raw_score");

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
  probabilityXLesserThanRawScore,
  probabilityAtX,
) {
  document.getElementById("z_score").innerHTML = `Z Score: ${zScore}`;
  document.getElementById(
    "probability_x_lesser_than_raw_score",
  ).innerHTML = `Probability of x < ${rawScore}: ${probabilityXLesserThanRawScore}`;
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
  let probabilityXLesserThanRawScore = 1 - probabilityXGreaterThanRawScore;
  let probabilityAtX =
    Math.round((probabilityXLesserThanRawScore - 0.5) * 100000) / 100000;
  displayResult(
    zScore,
    populationMean,
    rawScore,
    probabilityXGreaterThanRawScore,
    probabilityXLesserThanRawScore,
    probabilityAtX,
  );

  // Step
  // container Z-score and formula
  let divContainer = document.createElement("div");
  divContainer.setAttribute("id", "formula_container");
  document.body.appendChild(divContainer);

  // Z-score
  let divWrapForZScore = document.createElement("div");
  divWrapForZScore.setAttribute("id", "z_score");
  divContainer.appendChild(divWrapForZScore);

  let spanForZScore = document.createElement("span");
  spanForZScore.innerHTML = "Z score = ";
  divWrapForZScore.appendChild(spanForZScore);

  // Formula
  let divWrapForZScoreFormula = document.createElement("div");
  divWrapForZScoreFormula.setAttribute("id", "z_score_formula");
  divContainer.appendChild(divWrapForZScoreFormula);

  let rawAndMean = document.createElement("p");
  rawAndMean.setAttribute("id", "raw_And_mean");
  rawAndMean.innerHTML = `${rawScore} - ${populationMean}`;
  divWrapForZScoreFormula.appendChild(rawAndMean);

  let standardDeviationSymbol = document.createElement("p");
  standardDeviationSymbol.setAttribute("id", "standard_deviation_symbol");
  standardDeviationSymbol.innerHTML = standardDeviation;
  divWrapForZScoreFormula.appendChild(standardDeviationSymbol);

  // divide line
  let line = document.createElement("hr");
  divWrapForZScoreFormula.appendChild(line);
  divWrapForZScoreFormula.appendChild(standardDeviationSymbol);
});
