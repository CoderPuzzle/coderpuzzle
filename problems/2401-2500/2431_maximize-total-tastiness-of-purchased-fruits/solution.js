/**
 * @param {number[]} price
 * @param {number[]} tastiness
 * @param {number} maxAmount
 * @param {number} maxCoupons
 * @return {number}
 */
var maxTastiness = function (price, tastiness, maxAmount, maxCoupons) {
    // dp[a][c] = best tastiness having spent `a` and used `c` coupons.
    // Descending both axes keeps each fruit usable at most once: every
    // update lands at a larger amount or a larger coupon count, which
    // the descending sweep has already passed.
    const dp = Array.from({ length: maxAmount + 1 }, () => new Array(maxCoupons + 1).fill(-1));
    dp[0][0] = 0;
    for (let i = 0; i < price.length; ++i) {
        const p = price[i];
        const t = tastiness[i];
        const half = Math.floor(p / 2);
        for (let a = maxAmount; a >= 0; --a) {
            for (let c = maxCoupons; c >= 0; --c) {
                const cur = dp[a][c];
                if (cur < 0) continue;
                if (a + p <= maxAmount) {
                    dp[a + p][c] = Math.max(dp[a + p][c], cur + t);
                }
                if (c + 1 <= maxCoupons && a + half <= maxAmount) {
                    dp[a + half][c + 1] = Math.max(dp[a + half][c + 1], cur + t);
                }
            }
        }
    }
    let best = 0;
    for (const row of dp) {
        for (const v of row) best = Math.max(best, v);
    }
    return best;
};
