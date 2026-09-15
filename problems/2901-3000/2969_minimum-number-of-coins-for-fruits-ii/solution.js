/**
 * @param {number[]} prices
 * @return {number}
 */
var minimumCoins = function (prices) {
    const n = prices.length;
    const dp = new Array(n + 1).fill(0);
    const value = (l) => dp[l - 1] + prices[l - 1];
    const dq = [];
    let head = 0;

    for (let i = 1; i <= n; i++) {
        while (dq.length > head && value(dq[dq.length - 1]) >= value(i)) {
            dq.pop();
        }
        dq.push(i);
        const lo = Math.floor((i + 1) / 2); // ceil(i / 2)
        while (dq.length > head && dq[head] < lo) {
            head++;
        }
        dp[i] = value(dq[head]);
    }
    return dp[n];
};
