function minOperations(nums: number[]): number {
    // Each removal takes out one strictly increasing subsequence, so a
    // non-increasing chain (x >= y in order) must span distinct removals;
    // by Dilworth's theorem the answer is the longest non-increasing
    // subsequence length.
    const tails: number[] = [];
    for (const x of nums) {
        // Negate and bisect_right: equal values extend the same pile,
        // turning patience sorting's "longest strictly increasing" into
        // "longest non-increasing" for the original values.
        const v = -x;
        // Manual bisect_right: first pile top greater than v.
        let lo = 0,
            hi = tails.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (tails[mid] <= v) lo = mid + 1;
            else hi = mid;
        }
        // The value opens a new pile (push) or replaces the leftmost pile
        // top it can sit on; piles stay sorted, and their count is the answer.
        if (lo === tails.length) tails.push(v);
        else tails[lo] = v;
    }
    return tails.length;
}
