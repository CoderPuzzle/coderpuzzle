function orArray(nums: number[]): number[] {
    const answer: number[] = [];
    for (let i = 0; i < nums.length - 1; ++i) {
        answer.push(nums[i] | nums[i + 1]);
    }
    return answer;
}
