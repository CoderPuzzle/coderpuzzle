function minOperations(nums: number[], x: number): number {
    let total = 0;
    for (const v of nums) total += v;
    const target = total - x; // longest middle subarray summing to target
    if (target < 0) return -1;
    if (target === 0) return nums.length;
    let best = -1;
    let window = 0;
    let left = 0;
    for (let right = 0; right < nums.length; right++) {
        window += nums[right];
        while (window > target) {
            window -= nums[left];
            left++;
        }
        if (window === target) {
            best = Math.max(best, right - left + 1);
        }
    }
    return best === -1 ? -1 : nums.length - best;
}
