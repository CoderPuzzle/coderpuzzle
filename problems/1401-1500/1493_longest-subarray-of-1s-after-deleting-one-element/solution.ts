function longestSubarray(nums: number[]): number {
    let best = 0;
    let left = 0;
    let zeros = 0;
    for (let right = 0; right < nums.length; right++) {
        if (nums[right] === 0) zeros++;
        while (zeros > 1) {
            if (nums[left] === 0) zeros--;
            left++;
        }
        best = Math.max(best, right - left + 1);
    }
    // window includes the zero; deleting it costs one slot, but we must
    // delete exactly one element either way
    if (zeros === 0) return nums.length - 1; // all ones, must still delete one
    return best - 1;
}
