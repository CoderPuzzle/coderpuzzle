function minimumCost(nums: number[]): number {
    let smallest = Math.min(nums[1], nums[2]);
    let second = Math.max(nums[1], nums[2]);
    for (let index = 3; index < nums.length; index++) {
        const value = nums[index];
        if (value < smallest) {
            second = smallest;
            smallest = value;
        } else if (value < second) {
            second = value;
        }
    }
    return nums[0] + smallest + second;
}
