/**
 * @param {number[]} prices
 * @param {number[][]} queries
 * @return {number[]}
 */
var minimumRelativeLosses = function (prices, queries) {
    // Prefix sums reach 10^5 * 10^9 = 10^14 and 2*k*m reaches 2*10^14,
    // both far below Number.MAX_SAFE_INTEGER, so every step is exact.
    prices.sort((a, b) => a - b);
    const n = prices.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + prices[i];
    const answer = [];
    for (const [k, m] of queries) {
        let lo = 0;
        let hi = n;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (prices[mid] <= k) lo = mid + 1;
            else hi = mid;
        }
        const split = lo;
        lo = Math.max(0, m - (n - split));
        hi = Math.min(m, split);
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (prices[mid] + prices[n - m + mid] >= 2 * k) hi = mid;
            else lo = mid + 1;
        }
        const rest = m - lo;
        answer.push(prefix[lo] + 2 * k * rest - (prefix[n] - prefix[n - rest]));
    }
    return answer;
};
