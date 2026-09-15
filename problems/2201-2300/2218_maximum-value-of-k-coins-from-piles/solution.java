class Solution {

    public int maxValueOfCoins(int[][] piles, int k) {
        // dp[j]: best value using exactly j coins from the piles seen so far
        int[] dp = new int[k + 1];
        for (int[] pile : piles) {
            // taking t coins from a pile means its top t: prefix[t]
            int[] prefix = new int[pile.length + 1];
            for (int i = 0; i < pile.length; i++) {
                prefix[i + 1] = prefix[i] + pile[i];
            }
            // t stays within both the pile's size and the budget
            int takeMax = Math.min(pile.length, k);
            // fresh row so transitions only read the previous pile's dp
            int[] ndp = new int[k + 1];
            for (int j = 0; j <= k; j++) {
                // t = 0 case: skip this pile entirely
                int value = dp[j];
                int lim = Math.min(takeMax, j);
                for (int t = 1; t <= lim; t++) {
                    int cand = dp[j - t] + prefix[t];
                    if (cand > value) value = cand;
                }
                ndp[j] = value;
            }
            dp = ndp;
        }
        // coin values are positive, so using all k coins is never worse
        return dp[k];
    }
}
