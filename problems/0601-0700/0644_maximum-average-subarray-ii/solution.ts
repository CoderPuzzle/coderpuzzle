function findMaxAverage(nums: number[], k: number): number {
    const n = nums.length;
    // prefix[i] = sum of nums[:i]
    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    // Exact comparison of averages via cross-multiplication:
    // s1/l1 > s2/l2  <=>  s1*l2 > s2*l1  (positive lengths).
    let bestSum = 0;
    let bestLen = 0;
    for (let length = k; length <= n; length++) {
        let s = -Infinity;
        for (let t = 0; t + length <= n; t++) {
            const v = prefix[t + length] - prefix[t];
            if (v > s) s = v;
        }
        if (bestLen === 0 || s * bestLen > bestSum * length) {
            bestSum = s;
            bestLen = length;
        }
    }
    return bestSum / bestLen;
}
