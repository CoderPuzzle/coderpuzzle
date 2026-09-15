function smallestDistancePair(nums: number[], k: number): number {
    nums = nums.slice().sort((a, b) => a - b);
    const n = nums.length;

    // Pairs within dist, counted on the sorted array with two pointers:
    // j only moves forward across the whole scan (never restarts per i).
    const countLe = (dist: number): number => {
        let cnt = 0;
        let j = 0;
        for (let i = 0; i < n; i++) {
            while (j < n && nums[j] - nums[i] <= dist) {
                j++;
            }
            // Later elements within dist of nums[i]; j - i - 1 of them.
            cnt += j - i - 1;
        }
        return cnt;
    };

    // The count is monotone in dist, so binary search the distance itself
    // over [0, max - min]; the converged value is a real pair distance.
    let lo = 0;
    let hi = nums[n - 1] - nums[0];
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        // At least k pairs qualify: the kth smallest is mid or smaller.
        if (countLe(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
