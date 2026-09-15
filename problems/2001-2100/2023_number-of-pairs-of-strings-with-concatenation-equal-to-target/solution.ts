function numOfPairs(nums: string[], target: string): number {
    let pairs = 0;
    for (let first = 0; first < nums.length; ++first) {
        for (let second = 0; second < nums.length; ++second) {
            if (first !== second && nums[first] + nums[second] === target) {
                ++pairs;
            }
        }
    }
    return pairs;
}
