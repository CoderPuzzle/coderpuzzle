function minimizeMax(nums: number[], p: number): number {
    nums = nums.slice().sort((a, b) => a - b);
    const n = nums.length;
    const can = (diff: number): boolean => {
        // Greedy scan: take every adjacent pair within diff and skip one
        // element otherwise. Taking each cheap pair is safe (exchange
        // argument), so this counts the maximum pairs under the cap.
        let count = 0;
        let i = 1;
        while (i < n) {
            if (nums[i] - nums[i - 1] <= diff) {
                count++;
                i += 2;
            } else {
                i += 1;
            }
        }
        return count >= p;
    };
    // The predicate is monotone in diff — a larger cap only admits more
    // pairs — so binary search the minimum feasible cap over the value span.
    // p = 0 succeeds at 0 since the empty set's max is 0.
    let lo = 0,
        hi = nums[n - 1] - nums[0];
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (can(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
