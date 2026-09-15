class Solution {

    public int numberOfArrays(String s, int k) {
        final int MOD = 1_000_000_007;
        int n = s.length();
        int maxLen = Integer.toString(k).length();
        int[] dp = new int[n + 1];
        dp[n] = 1;
        for (int i = n - 1; i >= 0; i--) {
            if (s.charAt(i) == '0') {
                continue;
            }
            long total = 0;
            long value = 0;
            int limit = Math.min(maxLen, n - i);
            for (int len = 1; len <= limit; len++) {
                value = value * 10 + (s.charAt(i + len - 1) - '0');
                if (value > k) {
                    break;
                }
                total += dp[i + len];
            }
            dp[i] = (int) (total % MOD);
        }
        return dp[0];
    }
}
