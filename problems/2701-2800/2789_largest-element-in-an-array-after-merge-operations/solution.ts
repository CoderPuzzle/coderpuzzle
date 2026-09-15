function maxArrayValue(nums: number[]): number {
    let pile = nums[nums.length - 1];
    let best = pile;
    for (let i = nums.length - 2; i >= 0; --i) {
        if (pile >= nums[i]) {
            pile += nums[i];
        } else {
            pile = nums[i];
        }
        best = Math.max(best, pile);
    }
    return best;
}
