const generateRandomISIN = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let isin = 'XS';

    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        isin += characters[randomIndex];
    }

    return isin;
};

const generateRandomData = () => {
    return {
        price: (Math.random() * 1000).toFixed(2),
        spread: (Math.random() * 1).toFixed(1),
        yield: (Math.random() * 10).toFixed(1)
    };
};

const generateRandomISINs = (count) => {
    const isins = [];

    for (let i = 0; i < count; i++) {
        const isin = generateRandomISIN();
        const data = generateRandomData();

        isins.push({ isin, data });
    }

    return isins;
};

const additionalISINs = generateRandomISINs(100);

console.log(additionalISINs);