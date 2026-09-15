function twoSumLessThanK(nums: number[], k: number): number {
    // Sort, then two pointers: advance lo on small sums, retreat hi on
    // large ones, tracking the largest sum below k.
    nums.sort((a, b) => a - b);
    let lo = 0,
        hi = nums.length - 1;
    let best = -1;
    while (lo < hi) {
        const s = nums[lo] + nums[hi];
        if (s < k) {
            if (s > best) best = s;
            ++lo;
        } else {
            --hi;
        }
    }
    return best;
}
