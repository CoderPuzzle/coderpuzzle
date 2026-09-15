function minimumSwaps(nums: number[]): number {
    const zeros = nums.filter((value) => value === 0).length;
    const prefixLength = nums.length - zeros;
    let answer = 0;
    for (let i = 0; i < prefixLength; i++) {
        if (nums[i] === 0) answer++;
    }
    return answer;
}
