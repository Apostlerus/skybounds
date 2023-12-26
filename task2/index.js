// Предварительная оценка сложности: 4.
// Предварительная оценка трудозатрат: 1 час.
// Фактические трудозатраты: 20 минут.
// Сложность О(N + M).
// Память О(N + M).



const getBondsData = async ({date, isins}) => {
    if (!getBondsData.cache) {
        getBondsData.cache = new Map();
    }

    const cachedResults = [];
    const missingIsins = [];

    for (const isin of isins) {
        const key = `${date}-${isin}`;
        if (!getBondsData.cache.get(key)) {
            missingIsins.push(isin);
            continue;
        }
        cachedResults.push({isin, data: getBondsData.cache.get(key)})
    }
    if (missingIsins.length) {
        const result = await http.post({
            url: `/bonds/${date}`,
            body: missingIsins
        });

        result.forEach(({ isin, data }) => {
            const cacheKey = `${isin}-${date}`;
            getBondsData.cache.set(cacheKey, data);
            cachedResults.push({ isin, data });
        });
    }

    return cachedResults;
};