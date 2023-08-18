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
  //container ZScore and formula
  let divContainer = document.createElement("div");
  divContainer.setAttribute("id", "container");
  document.body.appendChild(divContainer);
  
  //Zscore
  let divWrapForZScore = document.createElement("div");
  divWrapForZScore.setAttribute("id", "z_score");

  let spanForZScore = document.createElement("span");
  spanForZScore.innerHTML = 'Z score = ';

  divWrapForZScore.appendChild(spanForZScore);
  divContainer.appendChild(divWrapForZScore);

  //Formula
  let divWrapForZScoreFormula = document.createElement("div");
  divWrapForZScoreFormula.setAttribute("id", "z_score_formula");
  
  let rawAndMean = document.createElement("p");
  rawAndMean.setAttribute("id", "raw_And_mean");
  rawAndMean.innerHTML = `${rawScore} - ${populationMean}`;
  divWrapForZScoreFormula.appendChild(rawAndMean);

  let standardDeviationSymbol = document.createElement("p");
  standardDeviationSymbol.setAttribute("id", "standard_deviation_symbol");
  standardDeviationSymbol.innerHTML = standardDeviation;
  divWrapForZScoreFormula.appendChild(standardDeviation)
  
  divContainer.appendChild(divWrapForZScoreFormula);
  //divide line
  let line = document.createElement("hr");
  divWrapForZScoreFormula.appendChild(line);
  divWrapForZScoreFormula.appendChild(standardDeviationSymbol);
});

function calculateZScore(rawScore, populationMean, standardDeviation) {
  return (rawScore - populationMean) / standardDeviation;
}
