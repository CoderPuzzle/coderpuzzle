/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var minRemovals = function (nums, target) {
    // dp[xor] = maximum number of elements we can KEEP with XOR == xor
    const dp = new Map([[0, 0]]);
    for (const x of nums) {
        const entries = Array.from(dp.entries());
        for (const [xorVal, count] of entries) {
            const nx = xorVal ^ x;
            const cur = dp.get(nx);
            if (cur === undefined || count + 1 > cur) {
                dp.set(nx, count + 1);
            }
        }
    }
    if (dp.has(target)) {
        return nums.length - dp.get(target);
    }
    return -1;
};
