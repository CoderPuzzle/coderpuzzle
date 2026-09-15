class Solution {

    public long countTexts(String pressedKeys) {
        final long MOD = 1_000_000_007L;
        int n = pressedKeys.length();
        long[] dp = new long[n + 1];
        dp[0] = 1;
        int i = 0;
        while (i < n) {
            char ch = pressedKeys.charAt(i);
            int maxPress = ch == '7' || ch == '9' ? 4 : 3;
            int j = i;
            while (j < n && pressedKeys.charAt(j) == ch) {
                j++;
            }
            for (int p = i; p < j; p++) {
                long total = 0;
                for (int q = p; q >= i && p - q < maxPress; q--) {
                    total = (total + dp[q]) % MOD;
                }
                dp[p + 1] = total;
            }
            i = j;
        }
        return dp[n];
    }
}
