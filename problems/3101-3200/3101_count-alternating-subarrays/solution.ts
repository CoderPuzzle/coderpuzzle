function countAlternatingSubarrays(nums: number[]): number {
    let count = 0;
    let current = 0;
    for (let index = 0; index < nums.length; index++) {
        if (index > 0 && nums[index] === nums[index - 1]) {
            current = 1;
        } else {
            current++;
        }
        count += current;
    }
    return count;
}
