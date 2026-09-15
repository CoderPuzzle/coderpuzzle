/**
 * @param {number[]} cost
 * @param {number} target
 * @return {string}
 */
var largestNumber = function (cost, target) {
    const dp = new Array(target + 1).fill(-1);
    dp[0] = 0;
    for (let t = 1; t <= target; t++) {
        for (const c of cost) {
            if (c <= t && dp[t - c] !== -1 && dp[t - c] + 1 > dp[t]) {
                dp[t] = dp[t - c] + 1;
            }
        }
    }
    if (dp[target] === -1) {
        return "0";
    }
    let result = "";
    let remaining = target;
    while (remaining > 0) {
        for (let digit = 9; digit >= 1; digit--) {
            const c = cost[digit - 1];
            if (c <= remaining && dp[remaining - c] === dp[remaining] - 1) {
                result += digit;
                remaining -= c;
                break;
            }
        }
    }
    return result;
};
