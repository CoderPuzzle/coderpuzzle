function searchInsert(nums: number[], target: number): number {
    // Lower bound over the half-open range [lo, hi): the first index whose
    // value is >= target. Present or absent, that index is the answer.
    let lo = 0;
    let hi = nums.length;
    while (lo < hi) {
        const mid = lo + ((hi - lo) >> 1);
        if (nums[mid] < target) {
            // Too small: the answer sits strictly right of mid.
            lo = mid + 1;
        } else {
            // nums[mid] >= target keeps mid a live candidate.
            hi = mid;
        }
    }
    return lo;
}
