function minOperations(nums1: number[], nums2: number[]): number {
    // Two fates for the last column: untouched, or swapped once (which
    // exchanges the two targets). For fixed targets every earlier index
    // is independent: keep the pair if it already fits, else swap it if
    // it fits crossed, else the fate is dead.
    const cost = (keepLast: boolean): number => {
        const n = nums1.length;
        const [top1, top2] = keepLast ? [nums1[n - 1], nums2[n - 1]] : [nums2[n - 1], nums1[n - 1]];
        let ops = keepLast ? 0 : 1;
        for (let i = 0; i < n - 1; ++i) {
            const a = nums1[i];
            const b = nums2[i];
            if (a <= top1 && b <= top2) continue;
            if (b <= top1 && a <= top2) {
                ++ops;
            } else {
                return -1;
            }
        }
        return ops;
    };
    const keep = cost(true);
    const swap = cost(false);
    if (keep === -1 && swap === -1) return -1;
    if (keep === -1) return swap;
    if (swap === -1) return keep;
    return Math.min(keep, swap);
}
