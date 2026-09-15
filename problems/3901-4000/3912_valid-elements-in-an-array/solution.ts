function findValidElements(nums: number[]): number[] {
    const leftMax = nums.slice();
    for (let i = 1; i < nums.length; i++) leftMax[i] = Math.max(leftMax[i - 1], nums[i]);
    const rightMax = nums.slice();
    for (let i = nums.length - 2; i >= 0; i--) rightMax[i] = Math.max(rightMax[i + 1], nums[i]);

    return nums.filter(
        (value, i) => i === 0 || i === nums.length - 1 || value > leftMax[i - 1] || value > rightMax[i + 1],
    );
}
