function isConsecutive(nums: number[]): boolean {
    nums.sort((a, b) => a - b);
    for (let i = 1; i < nums.length; i++) {
        if (nums[i] - nums[i - 1] !== 1) {
            return false;
        }
    }
    return true;
}
