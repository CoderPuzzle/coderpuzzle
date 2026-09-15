function maxSubArrayLen(nums: number[], k: number): number {
    // Longest qualifying subarray inside nums[lo..hi]: recurse on each
    // half, then stitch the halves together.
    const solve = (lo: number, hi: number): number => {
        if (lo > hi) {
            return 0;
        }
        if (lo === hi) {
            return nums[lo] === k ? 1 : 0;
        }
        const mid = lo + ((hi - lo) >> 1);
        let best = Math.max(solve(lo, mid), solve(mid + 1, hi));
        // A subarray crossing the midline is a suffix of the left half
        // plus a prefix of the right half. Record, per suffix sum, the
        // longest suffix that carries it — scanning away from the mid
        // and overwriting keeps the longest.
        const longest = new Map<number, number>();
        let total = 0;
        for (let i = mid; i >= lo; i--) {
            total += nums[i];
            longest.set(total, mid - i + 1);
        }
        total = 0;
        for (let j = mid + 1; j <= hi; j++) {
            total += nums[j];
            // The right prefix pins the sum the left suffix must supply.
            const length = longest.get(k - total);
            if (length !== undefined && length + (j - mid) > best) {
                best = length + (j - mid);
            }
        }
        return best;
    };
    return solve(0, nums.length - 1);
}
