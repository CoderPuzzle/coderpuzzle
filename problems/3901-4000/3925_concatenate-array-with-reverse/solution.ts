function concatWithReverse(nums: number[]): number[] {
    const n = nums.length;
    const answer = new Array<number>(2 * n);
    for (let i = 0; i < n; i++) {
        answer[i] = nums[i];
        answer[n + i] = nums[n - i - 1];
    }
    return answer;
}
