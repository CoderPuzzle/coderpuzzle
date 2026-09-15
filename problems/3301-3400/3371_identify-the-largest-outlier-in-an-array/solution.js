/**
 * @param {number[]} nums
 * @return {number}
 */
var getLargestOutlier = function (nums) {
    // With specials summing to S and outlier o, the array total is 2*S + o
    // (hint 1), so a candidate outlier c is potential exactly when
    // total - c is even and s = (total - c) / 2 occurs at another index —
    // two copies when s equals c (hint 2). |total| <= 10^8 and every
    // intermediate stays far inside Number's exact integer window.
    const total = nums.reduce((a, b) => a + b, 0);
    const count = new Map();
    for (const v of nums) {
        count.set(v, (count.get(v) || 0) + 1);
    }
    let best = -2000; // strictly below every legal value
    for (const c of nums) {
        const rest = total - c;
        if (rest % 2 !== 0) continue;
        const s = rest / 2;
        const need = s === c ? 2 : 1;
        if ((count.get(s) || 0) >= need && c > best) best = c;
    }
    return best;
};
