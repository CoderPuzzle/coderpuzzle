function maxSubArray(nums: number[]): number {
    // Each range answers four questions at once: total sum, best prefix,
    // best suffix, and best interior subarray. Merging two halves glues
    // them together, so one recursion describes the whole array.
    const solve = (lo: number, hi: number): [number, number, number, number] => {
        // A single element is its own total, prefix, suffix, and best.
        if (hi - lo === 1) {
            const x = nums[lo];
            return [x, x, x, x];
        }
        const mid = (lo + hi) >> 1;
        const [lt, lp, ls, lb] = solve(lo, mid);
        const [rt, rp, rs, rb] = solve(mid, hi);
        // The best subarray either stays in one half or is the seam of the
        // left half's best suffix and the right half's best prefix.
        return [lt + rt, Math.max(lp, lt + rp), Math.max(rs, rt + ls), Math.max(lb, rb, ls + rp)];
    };
    return solve(0, nums.length)[3];
}
