function increasingTriplet(nums: number[]): boolean {
    const n = nums.length;
    if (n < 3) {
        return false;
    }
    // leftMin[j]: smallest value strictly before j; rightMax[j]:
    // largest value strictly after j. The sentinel ends can never
    // satisfy the check, so every position tests uniformly.
    const leftMin = new Array(n).fill(Infinity);
    const rightMax = new Array(n).fill(-Infinity);
    for (let j = 1; j < n; ++j) {
        leftMin[j] = Math.min(leftMin[j - 1], nums[j - 1]);
    }
    for (let j = n - 2; j >= 0; --j) {
        rightMax[j] = Math.max(rightMax[j + 1], nums[j + 1]);
    }
    for (let j = 0; j < n; ++j) {
        if (leftMin[j] < nums[j] && nums[j] < rightMax[j]) {
            return true;
        }
    }
    return false;
}
