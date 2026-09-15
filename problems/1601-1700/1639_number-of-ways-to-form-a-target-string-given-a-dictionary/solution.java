class Solution {

    public int numWays(String[] words, String target) {
        final long MOD = 1000000007L;
        int width = words[0].length();
        int n = target.length();
        // Fewer columns than target characters: no strictly increasing
        // sequence of that length exists.
        if (n > width) return 0;

        // charCount[k][c]: how many rows have letter c at column k.
        int[][] charCount = new int[width][26];
        for (String word : words) {
            for (int k = 0; k < width; k++) {
                charCount[k][word.charAt(k) - 'a']++;
            }
        }

        // dp[i]: ways to have placed the first i target characters using the
        // columns considered so far. Rolled forward one column at a time.
        long[] dp = new long[n + 1];
        dp[0] = 1;
        for (int k = 0; k < width; k++) {
            // Walk i downward so dp[i - 1] still reflects the previous
            // column's value when it feeds dp[i] this round -- the usual
            // rolling-knapsack update order.
            for (int i = n; i >= 1; i--) {
                int need = target.charAt(i - 1) - 'a';
                dp[i] = (dp[i] + dp[i - 1] * charCount[k][need]) % MOD;
            }
        }
        return (int) dp[n];
    }
}
