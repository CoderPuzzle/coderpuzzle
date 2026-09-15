function subArrayRanges(nums: number[]): number {
    const n = nums.length;
    let total = 0;
    for (let i = 0; i < n; i++) {
        // Extending nums[i..j-1] by nums[j] updates the range in O(1):
        // only the new element can tighten mn or raise mx.
        let mn = nums[i],
            mx = nums[i];
        // j starts at i+1, skipping length-1 subarrays (range 0).
        for (let j = i + 1; j < n; j++) {
            // else-if is safe: one element can't be both a strict new
            // minimum and a strict new maximum.
            if (nums[j] < mn) mn = nums[j];
            else if (nums[j] > mx) mx = nums[j];
            total += mx - mn;
        }
    }
    return total;
}
