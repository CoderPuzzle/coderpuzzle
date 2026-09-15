function minSwap(nums1: number[], nums2: number[]): number {
    const INF = Infinity;
    const n = nums1.length;
    // Only two configurations matter per index — pair kept or
    // swapped — and swap starts at 1: swapping index 0 costs one op.
    let keep = 0;
    let swap = 1;
    for (let i = 1; i < n; i++) {
        let nkeep = INF;
        let nswap = INF;
        const a1 = nums1[i - 1],
            b1 = nums2[i - 1];
        const a2 = nums1[i],
            b2 = nums2[i];
        // Natural ordering licenses consistent choices: keep
        // follows keep, swap follows swap (paying one more op).
        if (a1 < a2 && b1 < b2) {
            nkeep = Math.min(nkeep, keep);
            nswap = Math.min(nswap, swap + 1);
        }
        // Crossed ordering licenses flipping the choice at i
        // relative to i-1.
        if (a1 < b2 && b1 < a2) {
            nkeep = Math.min(nkeep, swap);
            nswap = Math.min(nswap, keep + 1);
        }
        // Both conditions may hold; solvability guarantees one does.
        keep = nkeep;
        swap = nswap;
    }
    return Math.min(keep, swap);
}
