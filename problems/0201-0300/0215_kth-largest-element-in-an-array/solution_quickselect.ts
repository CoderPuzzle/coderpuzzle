function findKthLargest(nums: number[], k: number): number {
    // The kth largest sits at index n - k of the ascending-sorted
    // array; quickselect homes in on that target index.
    const target: number = nums.length - k;
    let lo = 0,
        hi = nums.length - 1;
    while (lo < hi) {
        // A uniformly random pivot defeats adversarial inputs: every
        // partition is expected to shrink the range by a constant
        // factor, so the total work stays linear instead of degrading
        // to quadratic on sorted or all-equal arrays.
        const r = lo + Math.floor(Math.random() * (hi - lo + 1));
        [nums[r], nums[hi]] = [nums[hi], nums[r]];
        const pivot = nums[hi];
        let store = lo;
        // Lomuto sweep: values strictly below the pivot land left of
        // `store`; duplicates ride the right side.
        for (let j = lo; j < hi; j++) {
            if (nums[j] < pivot) {
                [nums[j], nums[store]] = [nums[store], nums[j]];
                store++;
            }
        }
        [nums[store], nums[hi]] = [nums[hi], nums[store]];
        // nums[store] is now in its final sorted position; keep only
        // the side that still contains the target index.
        if (store === target) return nums[store];
        if (store < target) lo = store + 1;
        else hi = store - 1;
    }
    return nums[target];
}
