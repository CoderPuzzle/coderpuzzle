/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var sumOfPower = function (nums, k) {
    // A subsequence T with sum k and length j is contained in exactly
    // 2^(n-j) subsequences, so the answer is sum_j count[j][k] * 2^(n-j),
    // where count[j][s] counts length-j subsequences of sum s — a 0/1
    // knapsack filled with j and s both descending. Elements above k can
    // never join a sum-k subsequence, so they are skipped outright. The
    // table entries stay below the modulus (~2^30), so adding two is exact
    // in Number; the final weight products can reach ~2^60, so that
    // reduction runs in BigInt.
    const MOD = 1_000_000_007;
    const BIG_MOD = 1_000_000_007n;
    const n = nums.length;
    const counts = Array.from({ length: n + 1 }, () => new Array(k + 1).fill(0));
    counts[0][0] = 1;
    let used = 0;
    for (const num of nums) {
        if (num > k) {
            continue;
        }
        used++;
        for (let j = used; j > 0; j--) {
            const row = counts[j];
            const prior = counts[j - 1];
            for (let s = k; s >= num; s--) {
                row[s] = (row[s] + prior[s - num]) % MOD;
            }
        }
    }
    let total = 0n;
    let power = 1n;
    for (let j = n; j > 0; j--) {
        total = (total + BigInt(counts[j][k]) * power) % BIG_MOD;
        power = (power * 2n) % BIG_MOD;
    }
    return Number(total);
};
