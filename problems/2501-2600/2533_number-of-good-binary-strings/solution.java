class Solution {

    public long goodBinaryStrings(int minLength, int maxLength, int oneGroup, int zeroGroup) {
        // dp[i] counts good strings of length i: peel off the final run of
        // equal characters — its size is a positive multiple of oneGroup or
        // zeroGroup, and what remains is any shorter good string (or nothing).
        final long MOD = 1_000_000_007L;
        long[] dp = new long[maxLength + 1];
        dp[0] = 1;
        for (int i = 1; i <= maxLength; i++) {
            long v = 0;
            if (i >= oneGroup) {
                v += dp[i - oneGroup];
            }
            if (i >= zeroGroup) {
                v += dp[i - zeroGroup];
            }
            dp[i] = v % MOD;
        }
        long total = 0;
        for (int i = minLength; i <= maxLength; i++) {
            total += dp[i];
        }
        return total % MOD;
    }
}
