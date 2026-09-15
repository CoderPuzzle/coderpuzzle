function kthSmallestSubarraySum(nums: number[], k: number): number {
    // f(x) = number of subarrays with sum <= x. Sliding window: positivity
    // guarantees shrinking monotonically reduces the sum.
    const countAtMost = (limit: number): number => {
        let total = 0;
        let windowSum = 0;
        let left = 0;
        for (let right = 0; right < nums.length; right++) {
            windowSum += nums[right];
            while (windowSum > limit) {
                windowSum -= nums[left];
                left++;
            }
            // Subarrays ending at `right` that fit: exactly the window's length.
            total += right - left + 1;
        }
        return total;
    };

    let lo = Math.min(...nums);
    let hi = nums.reduce((a, b) => a + b, 0);
    // lo/hi now bracket the answer over [min element, total sum]: f is
    // non-decreasing and jumps only at real subarray sums, so the smallest x
    // with f(x) >= k IS the k-th smallest sum.
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (countAtMost(mid) >= k) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}
