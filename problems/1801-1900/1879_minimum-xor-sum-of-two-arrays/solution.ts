function minimumXORSum(nums1: number[], nums2: number[]): number {
    const n = nums1.length;
    const size = 1 << n;
    const INF = Infinity;
    const dp: number[] = new Array(size).fill(INF);
    dp[0] = 0;
    for (let mask = 1; mask < size; mask++) {
        let i = popcount(mask) - 1; // index into nums1 for this subset
        let x = nums1[i];
        let best = INF;
        let m = mask;
        while (m !== 0) {
            const lowbit = m & -m;
            const j = bitLength(lowbit) - 1;
            const cand = dp[mask ^ lowbit] + (x ^ nums2[j]);
            if (cand < best) best = cand;
            m -= lowbit;
        }
        dp[mask] = best;
    }
    return dp[size - 1];
}

function popcount(v: number): number {
    let cnt = 0;
    while (v !== 0) {
        v &= v - 1;
        cnt++;
    }
    return cnt;
}

function bitLength(v: number): number {
    let len = 0;
    while (v !== 0) {
        v = Math.floor(v / 2);
        len++;
    }
    return len;
}
