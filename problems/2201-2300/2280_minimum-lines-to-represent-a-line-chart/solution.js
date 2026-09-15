/**
 * @param {number[][]} stockPrices
 * @return {number}
 */
var minimumLines = function (stockPrices) {
    stockPrices.sort((a, b) => a[0] - b[0]);
    const n = stockPrices.length;
    if (n <= 2) {
        return n - 1;
    }
    let lines = 1;
    for (let i = 2; i < n; i++) {
        const [x1, y1] = stockPrices[i - 2];
        const [x2, y2] = stockPrices[i - 1];
        const [x3, y3] = stockPrices[i];
        // Differences fit a Number exactly, but their products approach
        // 1e18 — far past the 2^53 safe range — so multiply in BigInt.
        const lhs = BigInt(x2 - x1) * BigInt(y3 - y2);
        const rhs = BigInt(x3 - x2) * BigInt(y2 - y1);
        if (lhs !== rhs) {
            lines++;
        }
    }
    return lines;
};
