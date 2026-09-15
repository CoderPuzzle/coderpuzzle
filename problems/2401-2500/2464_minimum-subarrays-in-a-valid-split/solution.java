class Solution {

    public int validSubarraySplit(int[] nums) {
        // dp[i] = fewest subarrays to validly split nums[:i]; dp[0] = 0.
        // The last subarray ends at i - 1, so its start j must satisfy
        // gcd(nums[j], nums[i - 1]) > 1, giving the transition dp[j] + 1.
        int n = nums.length;
        int inf = n + 1;
        int[] dp = new int[n + 1];
        java.util.Arrays.fill(dp, inf);
        dp[0] = 0;
        for (int i = 1; i <= n; ++i) {
            for (int j = 0; j < i; ++j) {
                if (gcd(nums[j], nums[i - 1]) > 1 && dp[j] + 1 < dp[i]) {
                    dp[i] = dp[j] + 1;
                }
            }
        }
        return dp[n] < inf ? dp[n] : -1;
    }

    private static int gcd(int a, int b) {
        while (b != 0) {
            int next = a % b;
            a = b;
            b = next;
        }
        return a;
    }
}
