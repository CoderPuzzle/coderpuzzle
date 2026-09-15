function minRemoval(nums: number[], k: number): number {
    // Sort numerically — the default sort compares strings — so the best
    // survivor set is a contiguous window: it is balanced exactly when
    // nums[j] <= nums[i] * k at its ends, and the longest such window keeps
    // the most elements.
    nums.sort((a, b) => a - b);
    let best = 0;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        // A one-element window is always balanced, so left never passes
        // right. Doubles stay exact through 2^53, and the product peaks
        // near 1e14.
        while (nums[right] > nums[left] * k) {
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    return nums.length - best;
}
