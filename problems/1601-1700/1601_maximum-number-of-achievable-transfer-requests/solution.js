/**
 * @param {number} n
 * @param {number[][]} requests
 * @return {number}
 */
var maximumRequests = function (n, requests) {
    const m = requests.length;
    let best = 0;
    for (let mask = 0; mask < 1 << m; mask++) {
        let popcount = 0;
        for (let bit = mask; bit; bit &= bit - 1) {
            popcount++;
        }
        if (popcount <= best) {
            continue;
        }
        const degree = new Array(n).fill(0);
        for (let i = 0; i < m; i++) {
            if (mask & (1 << i)) {
                degree[requests[i][0]]--;
                degree[requests[i][1]]++;
            }
        }
        if (degree.every((d) => d === 0)) {
            best = popcount;
        }
    }
    return best;
};
