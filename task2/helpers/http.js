import db from '../db/index.js';

const http = {
    requestCount: 0,
    post: async ({url, body}) => {
        console.log('request', http.requestCount);
        const date = url.replace('/bonds/', '');
        console.log(date);
        console.log(body);
        const bonds = db[date] || [];
        http.requestCount++;
        return bonds.filter(bond => body.includes(bond.isin));
    }
}

export default http;