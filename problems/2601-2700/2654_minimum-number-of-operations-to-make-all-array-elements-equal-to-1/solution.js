/**
 * Ones shortcut: an existing 1 absorbs every other element with exactly
 * one operation each. Otherwise locate the shortest window whose overall
 * gcd is 1: L - 1 operations fold its L elements into a single 1 (each op
 * merges the window's span by at most one element), then the remaining
 * n - 1 elements cost one operation apiece.
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    const gcd = (a, b) => {
        while (b !== 0) {
            const t = a % b;
            a = b;
            b = t;
        }
        return a;
    };
    const n = nums.length;
    let ones = 0;
    for (const v of nums) if (v === 1) ++ones;
    if (ones > 0) return n - ones;
    let best = n + 1;
    for (let i = 0; i < n; ++i) {
        let g = 0;
        for (let j = i; j < n; ++j) {
            g = gcd(g, nums[j]);
            if (g === 1) {
                // The first j making this window's gcd reach 1 is also
                // its shortest completion for this start index.
                best = Math.min(best, j - i + 1);
                break;
            }
        }
    }
    return best > n ? -1 : best - 1 + (n - 1);
};
