// Предварительная оценка сложности: 1
// Предварительная оценка трудозатрат: 1 час
// Фактические трудозатраты: 40 минут
// Сложность О(N)
// Память О(N)

const VALIDATION_ERRORS = {
    NOT_ARRAY: 'Shares must be an array',
    NOT_EMPTY_ARRAY: 'Array cannot be empty.',
    FLOAT_STRING: 'Every share must be float in string',
    NOT_NEGATIVE: 'Every share must be greater or equal zero',
    NOT_ZERO_TOTAL_SHARES: 'Total shares cannot be zero.',
}


const getPercentagesFromShares = (shares) => {
    validateInput(shares);
    const sharesNums = shares.map(parseFloat);

    const totalShares = sharesNums.reduce((acc, current) => acc + current, 0);

    if (totalShares === 0) {
        throw new Error (VALIDATION_ERRORS.NOT_ZERO_TOTAL_SHARES);
    }

    return sharesNums.map(share => ((share / totalShares) * 100).toFixed(3))
}

function isNegative(value) {
    return parseFloat(value) < 0;
}

function isNumberString(value) {
    return !isNaN(parseFloat(value));
}

function validateInput(shares) {
    if (!Array.isArray(shares)) {
        throw new Error (VALIDATION_ERRORS.NOT_ARRAY);
    }
    if (shares.length === 0) {
        throw new Error (VALIDATION_ERRORS.NOT_EMPTY_ARRAY);
    }
    shares.forEach(share => {
        if (!isNumberString(share)) {
            throw new Error (VALIDATION_ERRORS.FLOAT_STRING);
        }
        if (isNegative(share)) {
            throw new Error (VALIDATION_ERRORS.NOT_NEGATIVE);
        }
    });
}

// test
try {
    // const inputShares = ['1.5', '3', '6', '1.5'];
    const inputShares = ['1', '1', '1'];
    const outputPercentages = getPercentagesFromShares(inputShares);
    console.log(outputPercentages);
} catch (e) {
    console.log(e.message);
}

