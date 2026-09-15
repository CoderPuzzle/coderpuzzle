function maximumDifference(nums: number[]): number {
    let minimum = nums[0];
    let answer = -1;
    for (let index = 1; index < nums.length; ++index) {
        if (nums[index] > minimum) {
            answer = Math.max(answer, nums[index] - minimum);
        }
        minimum = Math.min(minimum, nums[index]);
    }
    return answer;
}
