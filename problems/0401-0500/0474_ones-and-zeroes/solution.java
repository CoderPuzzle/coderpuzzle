class Solution {

    public int findMaxForm(String[] strs, int m, int n) {
        // dp[i][j] = most strings pickable with at most i zeros and j ones:
        // a 0/1 knapsack with two resource axes; the all-zero table already
        // encodes "pick nothing".
        int[][] dp = new int[m + 1][n + 1];
        for (String s : strs) {
            // Only the string's shape matters: its 0-count and 1-count.
            int zeros = 0;
            for (int i = 0; i < s.length(); i++) {
                if (s.charAt(i) == '0') zeros++;
            }
            int ones = s.length() - zeros;
            // Budgets iterate downward so every read sees values from
            // before this string's pass — enforcing 0/1 (once-per-string)
            // use. Take-or-skip: taking is optional when it doesn't pay.
            for (int i = m; i >= zeros; i--) {
                for (int j = n; j >= ones; j--) {
                    int cand = dp[i - zeros][j - ones] + 1;
                    if (cand > dp[i][j]) dp[i][j] = cand;
                }
            }
        }
        return dp[m][n];
    }
}
