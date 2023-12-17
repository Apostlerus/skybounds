// Предварительная оценка сложности: 1
// Предварительная оценка трудозатрат: 1 час
// Фактические трудозатраты: 10 минут
// Сложность О(N)
// Память О(N)

const getPercentagesFromShares = (shares) => {
    const sharesNums = shares.map(Number);

    const totalShares = sharesNums.reduce((acc, current) => acc + current, 0);

    return sharesNums.map(share => ((share / totalShares) * 100).toFixed(3))
}

// test
const inputShares = ['1.5', '3', '6', '1.5'];
const outputPercentages = getPercentagesFromShares(inputShares);

console.log(outputPercentages);