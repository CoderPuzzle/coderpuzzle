function minimumAddedInteger(nums1: number[], nums2: number[]): number {
    // Sorted correspondence forces x = min(nums2) - keptMin, and two
    // removals leave the kept minimum at sorted index <= 2, so only the
    // three candidates nums2[0] - sortedNums1[r] for r in {0,1,2} can work.
    // Each candidate is validated by consuming a count of nums1 against
    // every nums2 element minus x; the smallest survivor wins.
    const sa = [...nums1].sort((a, b) => a - b);
    const loB = Math.min(...nums2);
    let best: number | null = null;
    for (let r = 0; r < 3; r++) {
        const x = loB - sa[r];
        const pool = new Map<number, number>();
        for (const v of nums1) {
            pool.set(v, (pool.get(v) || 0) + 1);
        }
        let ok = true;
        for (const v of nums2) {
            const need = v - x;
            if (!pool.get(need)) {
                ok = false;
                break;
            }
            pool.set(need, pool.get(need) - 1);
        }
        if (ok && (best === null || x < best)) {
            best = x;
        }
    }
    return best!;
}
