// dp0: best subarray sum ending here with no square; dp1: best with
// exactly one square. The answer is the largest dp1 over all ending
// positions. Sums stay below 2^53, so plain JS numbers are exact.
function maxSumAfterOperation(nums: number[]): number {
    let dp0 = nums[0];
    let dp1 = nums[0] * nums[0];
    let answer = dp1;
    for (let i = 1; i < nums.length; ++i) {
        const v = nums[i];
        const nxt0 = Math.max(v, dp0 + v);
        const nxt1 = Math.max(v * v, dp0 + v * v, dp1 + v);
        dp0 = nxt0;
        dp1 = nxt1;
        answer = Math.max(answer, dp1);
    }
    return answer;
}
