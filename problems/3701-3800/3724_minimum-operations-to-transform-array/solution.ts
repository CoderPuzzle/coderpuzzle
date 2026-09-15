function minOperations(nums1: number[], nums2: number[]): number {
    // Every slot i != j pays |nums1[i] - nums2[i]|, and the chosen source j
    // pays that same per-slot cost plus one append plus the distance from
    // the tail value to the span between nums1[j] and nums2[j]. The base sum
    // is common to every choice, so only the tail-to-span distance varies;
    // take its minimum. Sums reach 1e10, exact in JS Number (< 2^53).
    const n = nums1.length;
    let base = 0;
    for (let i = 0; i < n; i++) {
        base += Math.abs(nums1[i] - nums2[i]);
    }
    const tail = nums2[n];
    let bestGap = Infinity;
    for (let i = 0; i < n; i++) {
        const a = nums1[i];
        const b = nums2[i];
        const lo = Math.min(a, b);
        const hi = Math.max(a, b);
        let gap = 0;
        if (tail < lo) {
            gap = lo - tail;
        } else if (tail > hi) {
            gap = tail - hi;
        }
        if (gap < bestGap) {
            bestGap = gap;
        }
    }
    return base + 1 + bestGap;
}
