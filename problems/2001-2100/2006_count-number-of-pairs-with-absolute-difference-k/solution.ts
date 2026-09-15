function countKDifference(nums: number[], k: number): number {
    let pairs = 0;
    for (let first = 0; first < nums.length; ++first) {
        for (let second = first + 1; second < nums.length; ++second) {
            if (Math.abs(nums[first] - nums[second]) === k) {
                ++pairs;
            }
        }
    }
    return pairs;
}
