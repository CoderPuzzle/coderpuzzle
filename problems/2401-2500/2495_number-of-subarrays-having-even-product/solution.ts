function evenProduct(nums: number[]): number {
    // A subarray has an even product iff it contains at least one even
    // element. Sweep the right endpoint left to right, remembering the most
    // recent even element's index: every left endpoint up to and including it
    // contributes to the count. The answer is bounded by n * (n + 1) / 2 =
    // 5000050000 at n = 10^5, which is below 2^53, so plain numbers stay exact.
    let answer = 0;
    let lastEven = -1;
    for (let i = 0; i < nums.length; ++i) {
        if (nums[i] % 2 === 0) lastEven = i;
        answer += lastEven + 1;
    }
    return answer;
}
