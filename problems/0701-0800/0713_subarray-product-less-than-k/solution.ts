function numSubarrayProductLessThanK(nums: number[], k: number): number {
    // Products are at least 1 (elements >= 1), so k <= 1 admits nothing.
    if (k <= 1) {
        return 0;
    }
    let count = 0;
    let product = 1;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        product *= nums[right];
        // Shrink from the left until [left, right] is the longest window
        // ending here with product strictly below k.
        while (product >= k) {
            product = Math.trunc(product / nums[left]);
            left += 1;
        }
        // Every subwindow also ends at right and has a smaller product:
        // right - left + 1 subarrays, each counted once by its right end.
        count += right - left + 1;
    }
    return count;
}
