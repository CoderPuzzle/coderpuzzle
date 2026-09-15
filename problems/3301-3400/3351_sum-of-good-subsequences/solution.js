/**
 * @param {number[]} nums
 * @return {number}
 */
var sumOfGoodSubsequences = function (nums) {
    const MOD = 1000000007;
    // offset by 1 so that value 0 can look up value -1 at index 0
    // cnt[i] / sm[i]: number of, and total element sum of, the good
    // subsequences seen so far that end in value i-1. The differ-by-one
    // constraint only involves the last value, so this is enough state.
    const cnt = new Array(100003).fill(0);
    const sm = new Array(100003).fill(0);
    let total = 0;
    for (const v of nums) {
        const idx = v + 1;
        // New subsequences ending at v: the singleton plus every recorded
        // subsequence ending in v-1 or v+1 extended by v.
        const cPrev = cnt[idx - 1];
        const cNext = cnt[idx + 1];
        const sPrev = sm[idx - 1];
        const sNext = sm[idx + 1];
        const newCnt = (1 + cPrev + cNext) % MOD;
        // Each of the newCnt subsequences gains one copy of v; the
        // elements already inside carry their sums forward.
        const newSum = (v * newCnt + sPrev + sNext) % MOD;
        cnt[idx] = (cnt[idx] + newCnt) % MOD;
        sm[idx] = (sm[idx] + newSum) % MOD;
        // A subsequence's sum is folded in when its last element is
        // appended, so every good subsequence is counted exactly once.
        total = (total + newSum) % MOD;
    }
    return total;
};
