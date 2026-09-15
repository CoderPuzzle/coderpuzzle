function minimumTime(hens: number[], grains: number[]): number {
    // Binary search the answer T, checked by a greedy sweep. With both
    // arrays sorted, hens in ascending order eating contiguous grain
    // prefixes is optimal by an exchange argument. A hen at h covering
    // grains up to g needs L + R + min(L, R) seconds, where L = max(0,
    // h - leftmost) and R = max(0, rightmost - h): whichever extreme the
    // hen reaches second becomes the double-walked detour.
    hens.sort((a, b) => a - b);
    grains.sort((a, b) => a - b);
    const feasible = (t: number): boolean => {
        let j = 0;
        for (const h of hens) {
            if (j === grains.length) break;
            const left = Math.max(0, h - grains[j]);
            let k = j;
            while (k < grains.length) {
                const right = Math.max(0, grains[k] - h);
                if (Math.min(2 * left + right, left + 2 * right) > t) break;
                ++k;
            }
            j = k;
        }
        return j === grains.length;
    };
    // Positions lie in [0, 1e9], so every segment cost is at most 1.5e9 and
    // all intermediates stay far below Number.MAX_SAFE_INTEGER (2^53).
    let lo = 0;
    let hi = 2000000000;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (feasible(mid)) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
