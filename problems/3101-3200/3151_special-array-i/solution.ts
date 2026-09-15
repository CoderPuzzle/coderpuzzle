function isArraySpecial(nums: number[]): boolean {
    for (let i = 1; i < nums.length; i++) {
        if (nums[i - 1] % 2 === nums[i] % 2) {
            return false;
        }
    }
    return true;
}
