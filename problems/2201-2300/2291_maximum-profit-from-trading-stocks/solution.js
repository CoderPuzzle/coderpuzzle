/**
 * @param {number[]} present
 * @param {number[]} future
 * @param {number} budget
 * @return {number}
 */
var maximumProfit = function (present, future, budget) {
    const dp = new Array(budget + 1).fill(0);
    for (let i = 0; i < present.length; i++) {
        const price = present[i];
        const gain = future[i] - price;
        if (gain <= 0) {
            continue;
        }
        for (let money = budget; money >= price; money--) {
            dp[money] = Math.max(dp[money], dp[money - price] + gain);
        }
    }
    return dp[budget];
};
