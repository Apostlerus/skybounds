// Предварительная оценка сложности: 4.
// Предварительная оценка трудозатрат: 1 час.
// Фактические трудозатраты: 20 минут.
// Сложность О(N + M).
// Память О(N + M).

import http from './helpers/http.js';
import store from './store/store.js';

const getBondsData = async ({date, isins}) => {
    if (!store.cache) {
        store.cache = new Map();
    }

    const cachedResults = [];
    const missingIsins = [];

    for (const isin of isins) {
        const key = `${date}-${isin}`;
        if (!store.cache.get(key)) {
            missingIsins.push(isin);
            continue;
        }
        cachedResults.push({isin, data: store.cache.get(key)})
    }
    if (missingIsins.length) {
        const result = await http.post({
            url: `/bonds/${date}`,
            body: missingIsins
        });

        result.forEach(({ isin, data }) => {
            const cacheKey = `${date}-${isin}`;
            store.cache.set(cacheKey, data);
            cachedResults.push({ isin, data });
        });
    }

    return cachedResults;
};

//test

(async () => {
    let data = await getBondsData({
        date: '20180120',
        isins: ['RU000A0JU4L3']
    });

    console.log(data);
    data = await getBondsData({
        date: '20180120',
        isins: ['XS0971721963', 'RU000A0JU4L3']
    });

    console.log(data);

    data = await getBondsData({
        date: '20180120',
        isins: ['XS0971721963']
    });

    console.log(data);
})();
