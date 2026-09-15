class Solution {

    public int maxSumAfterOperation(int[] nums) {
        // dp0: best subarray sum ending here with no square; dp1: best
        // with exactly one square. The answer is the largest dp1 over all
        // ending positions. Sums stay below 2^31 - 1 (a subarray of at
        // most 1e5 elements with one square tops out near 1.1e9).
        int dp0 = nums[0];
        int dp1 = nums[0] * nums[0];
        int answer = dp1;
        for (int i = 1; i < nums.length; ++i) {
            int v = nums[i];
            int nxt0 = Math.max(v, dp0 + v);
            int nxt1 = Math.max(v * v, Math.max(dp0 + v * v, dp1 + v));
            dp0 = nxt0;
            dp1 = nxt1;
            answer = Math.max(answer, dp1);
        }
        return answer;
    }
}
