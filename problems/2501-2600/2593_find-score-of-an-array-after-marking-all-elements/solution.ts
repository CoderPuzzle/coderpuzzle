function findScore(nums: number[]): number {
    // Visit candidates in (value, index) order once; the first
    // not-yet-marked visit of each position is exactly the statement's
    // "smallest unmarked, smallest index" pick, and its neighborhood is
    // marked on the spot, so later sorted candidates skip it naturally.
    // Chosen indices are pairwise non-adjacent, so at most ceil(n / 2)
    // values of up to 10^6 are summed — under 5 * 10^10, far below the
    // exact-Number bound 2^53, so the total stays exact.
    const n = nums.length;
    const marked = new Array<boolean>(n).fill(false);
    const order = nums.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    let score = 0;
    for (const [, i] of order) {
        if (marked[i]) {
            continue;
        }
        score += nums[i];
        marked[i] = true;
        if (i > 0) {
            marked[i - 1] = true;
        }
        if (i + 1 < n) {
            marked[i + 1] = true;
        }
    }
    return score;
}
