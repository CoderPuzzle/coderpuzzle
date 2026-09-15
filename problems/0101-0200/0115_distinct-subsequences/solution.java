class Solution {

    public int numDistinct(String s, String t) {
        int m = t.length();
        // dp[j] = ways to form the first j chars of t using the prefix of s
        // processed so far. dp[0] = 1 encodes the empty string being formable
        // exactly once, by matching nothing. Counts are kept in longs for
        // headroom during the run.
        long[] dp = new long[m + 1];
        dp[0] = 1;
        for (int i = 0; i < s.length(); i++) {
            char ch = s.charAt(i);
            // Sweep j downward so dp[j-1] is still the previous row's value
            // when read; a left-to-right sweep would let one character of s
            // be matched against several characters of t.
            for (int j = m; j > 0; j--) {
                // Reading ch can only create new ways where it matches: every
                // earlier way of forming t[:j-1] extends by matching ch there.
                // Elsewhere ch is simply skipped and the count is unchanged.
                if (t.charAt(j - 1) == ch) {
                    dp[j] += dp[j - 1];
                }
            }
        }
        return (int) dp[m];
    }
}
