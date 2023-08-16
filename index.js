let calculatorRawScoreForm = document.getElementById("calculator_raw_score");

calculatorRawScoreForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let rawScore = document.getElementById("raw_score").value;
  let populationMean = document.getElementById("population_mean").value;
  let standardDeviation = document.getElementById("standard_deviation").value;
  let zScore = calculateZScore(rawScore, populationMean, standardDeviation);
  const probability = jStat.normal.cdf(
    zScore,
    populationMean,
    standardDeviation,
  );
  console.log(zScore);
  console.log(probability);
});

function calculateZScore(rawScore, populationMean, standardDeviation) {
  return (rawScore - populationMean) / standardDeviation;
}
