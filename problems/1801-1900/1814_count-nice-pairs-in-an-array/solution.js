/**
 * @param {number[]} nums
 * @return {number}
 */
var countNicePairs = function (nums) {
    // The condition rearranges to nums[i] - rev(nums[i]) being equal on
    // both sides, so each key pairs with every earlier equal key; the
    // running total stays under C(10^5, 2) ~ 5 * 10^9, far below 2^53,
    // so Number arithmetic is exact and reduced once at the end.
    const MOD = 1000000007;
    const count = new Map();
    let total = 0;
    for (const x of nums) {
        let y = x;
        let r = 0;
        while (y > 0) {
            r = r * 10 + (y % 10);
            y = Math.floor(y / 10);
        }
        const key = x - r;
        const seen = count.get(key) || 0;
        total += seen;
        count.set(key, seen + 1);
    }
    return total % MOD;
};
