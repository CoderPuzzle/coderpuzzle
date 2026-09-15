function numSubseq(nums: number[], target: number): number {
    const MOD = 1000000007;
    // A subsequence is defined by membership, not order, so sorting loses
    // nothing; validity then depends only on smallest + largest <= target.
    const sorted = nums.slice().sort((a, b) => a - b);
    const n = sorted.length;
    // Powers of two: elements strictly between the two pointers may be
    // included or excluded freely.
    const powers = new Array<number>(n).fill(1);
    for (let i = 1; i < n; i++) {
        powers[i] = (powers[i - 1] * 2) % MOD;
    }
    let total = 0;
    let lo = 0,
        hi = n - 1;
    while (lo <= hi) {
        if (sorted[lo] + sorted[hi] <= target) {
            // hi is the farthest legal partner of lo (earlier decrements
            // rule out anything beyond), so 2^(hi-lo) subsequences have
            // their minimum exactly at lo.
            total = (total + powers[hi - lo]) % MOD;
            lo++;
        } else {
            // sorted[hi] is too large to pair with anything at or after lo.
            hi--;
        }
    }
    return total;
}
