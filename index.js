import jstat from "jstat";

let calculatorRawScoreForm = document.getElementById("calculator_raw_score");

calculatorRawScoreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let rawScore = document.getElementById("raw_score").value;
  let populationMean = document.getElementById("population_mean").value;
  let standardDeviation = document.getElementById("standard_deviation").value;

  const zScore = Math.round(calculateZScore(rawScore, populationMean, standardDeviation) * 100000) / 100000;
  let probability = jstat.normal.cdf(zScore, populationMean, standardDeviation);

  // Probability calculation
  let probabilityXGreaterThanRawScore = probability;
  let probabilityXLesserThanRawScore = 1 - probabilityXGreaterThanRawScore;
  let probabilityAtX = probabilityXLesserThanRawScore - 0.5;
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

  // Step
  let divWrapForZScoreFormula = document.createElement("div");
  divWrapForZScoreFormula.setAttribute("id", "z_score_formula");
  document.body.appendChild(divWrapForZScoreFormula);

  let spanForZScoreForumula = document.createElement("span");
  spanForZScoreForumula.innerHTML = `Z score = ${rawScore} - ${populationMean}`;

  divWrapForZScoreFormula.appendChild(spanForZScoreForumula);

  let standardDeviationSymbol = document.createElement("p");
  standardDeviationSymbol.setAttribute("id", "standard_deviation_symbol");
  standardDeviationSymbol.innerHTML = standardDeviation;

  let line = document.createElement("hr");

  divWrapForZScoreFormula.appendChild(line);
  divWrapForZScoreFormula.appendChild(standardDeviationSymbol);
});

function calculateZScore(rawScore, populationMean, standardDeviation) {
  return (rawScore - populationMean) / standardDeviation;
}
