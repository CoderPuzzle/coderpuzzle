/**
 * @param {number[]} count
 * @param {number[]} upgrade
 * @param {number[]} sell
 * @param {number[]} money
 * @return {number[]}
 */
var maxUpgrades = function (count, upgrade, sell, money) {
    // For one data center, upgrading u servers is feasible exactly when
    // selling some of the remaining servers can bridge the shortfall:
    // u * upgrade may exceed money only if ceil(shortfall / sell) extra
    // servers sold still leave u un-upgraded hosts. Feasibility never
    // flips back as u grows, so a binary search on u finds the maximum.
    // Every intermediate stays exact in a Number: products are at most
    // 10^5 * 10^5 = 10^10 and the rest smaller, far below 2^53.
    const answer = [];
    for (let i = 0; i < count.length; ++i) {
        let lo = 0;
        let hi = count[i];
        while (lo < hi) {
            const mid = lo + ((hi - lo + 1) >> 1);
            const spent = mid * upgrade[i];
            if (spent <= money[i]) {
                lo = mid;
            } else {
                const quotient = Math.floor((spent - money[i]) / sell[i]);
                // Correct the divided estimate with an exact remainder so
                // no double-rounding drift creeps into the ceiling.
                const remainder = spent - money[i] - quotient * sell[i];
                const toSell = quotient + (remainder > 0 ? 1 : 0);
                if (toSell + mid <= count[i]) {
                    lo = mid;
                } else {
                    hi = mid - 1;
                }
            }
        }
        answer.push(lo);
    }
    return answer;
};
