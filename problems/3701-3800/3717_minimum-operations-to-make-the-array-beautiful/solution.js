/**
 * @param {number[]} nums
 * @return {number}
 */
var minOperations = function (nums) {
    // Only increments exist and index 0 never moves, so a finished array is
    // a nondecreasing divisibility chain anchored at nums[0]. No optimal
    // chain runs above 2600: past max(nums) the chain could be held flat for
    // free (equal still divides), so only the last element may sit higher,
    // and its cheapest fix stays under predecessor + 50.
    const limit = 2600;
    // Divisor lists of every final value, self inclusive -- holding the
    // previous height must remain a legal move.
    const divisors = Array.from({ length: limit + 1 }, () => []);
    for (let u = 1; u <= limit; u++) {
        for (let m = u; m <= limit; m += u) {
            divisors[m].push(u);
        }
    }
    const inf = Infinity;
    // dp[v]: cheapest way to make the processed prefix beautiful with the
    // last position holding exactly v.
    let dp = new Array(limit + 1).fill(inf);
    dp[nums[0]] = 0;
    for (let i = 1; i < nums.length; i++) {
        const need = nums[i];
        const ndp = new Array(limit + 1).fill(inf);
        for (let v = need; v <= limit; v++) {
            let best = inf;
            for (const u of divisors[v]) {
                if (dp[u] < best) {
                    best = dp[u];
                }
            }
            if (best !== inf) {
                ndp[v] = best + v - need;
            }
        }
        dp = ndp;
    }
    return Math.min(...dp);
};
