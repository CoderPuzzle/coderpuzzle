function countElements(nums: number[], k: number): number {
    // The full sorted order is more than the answer needs: the count is
    // decided entirely by which values sit strictly below
    // sorted[n - k - 1]. Quickselect learns that one threshold value
    // without paying to order everything else.
    const target = nums.length - k - 1;
    let lo = 0,
        hi = nums.length - 1;
    while (lo < hi) {
        // A uniformly random pivot defeats adversarial inputs: every
        // partition is expected to shrink the window by a constant
        // factor, so the total work stays linear instead of degrading
        // to quadratic on sorted arrays.
        const r = lo + Math.floor(Math.random() * (hi - lo + 1));
        [nums[r], nums[hi]] = [nums[hi], nums[r]];
        const pivot = nums[hi];
        // Three-way (Dutch flag) split: values strictly below the pivot
        // move to the front block, values strictly above to the back
        // block, and the pivot's own run sits between them. A run of
        // equals leaves the window together, which is what keeps heavily
        // duplicated inputs fast.
        let lt = lo,
            i = lo,
            gt = hi;
        while (i <= gt) {
            if (nums[i] < pivot) {
                [nums[lt], nums[i]] = [nums[i], nums[lt]];
                lt++;
                i++;
            } else if (nums[i] > pivot) {
                [nums[i], nums[gt]] = [nums[gt], nums[i]];
                gt--;
            } else {
                i++;
            }
        }
        // [lo, lt-1] < pivot, [lt, gt] == pivot, [gt+1, hi] > pivot;
        // keep only the block still covering the target index.
        if (target < lt) hi = lt - 1;
        else if (target > gt) lo = gt + 1;
        else break;
    }
    const threshold = nums[target];
    // Elements strictly below the threshold qualify wholesale; the run AT
    // it qualifies only when its strictly-greater count reaches k.
    let less = 0,
        equal = 0;
    for (const value of nums) {
        if (value < threshold) less++;
        else if (value === threshold) equal++;
    }
    return nums.length - less - equal >= k ? less + equal : less;
}
