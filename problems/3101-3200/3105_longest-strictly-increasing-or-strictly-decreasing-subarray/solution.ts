function longestMonotonicSubarray(nums: number[]): number {
    let best = 1;
    let inc = 1;
    let dec = 1;
    for (let index = 1; index < nums.length; index++) {
        if (nums[index] > nums[index - 1]) {
            inc++;
            dec = 1;
        } else if (nums[index] < nums[index - 1]) {
            dec++;
            inc = 1;
        } else {
            inc = 1;
            dec = 1;
        }
        best = Math.max(best, inc, dec);
    }
    return best;
}
