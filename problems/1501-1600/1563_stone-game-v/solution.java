class Solution {

    public long stoneGameV(int[] stoneValue) {
        int n = stoneValue.length;
        // Prefix sums turn any slice's weight into an O(1) subtraction.
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + stoneValue[i];
        }

        // dp[i][j] is the best score obtainable starting from the slice
        // [i, j]; a single stone (i == j) ends the game with no more score,
        // so the table is left at its zero-initialized default there.
        long[][] dp = new long[n][n];
        for (int length = 2; length <= n; ++length) {
            for (int i = 0; i + length - 1 < n; ++i) {
                int j = i + length - 1;
                long best = 0;
                for (int k = i; k < j; ++k) {
                    long leftSum = prefix[k + 1] - prefix[i];
                    long rightSum = prefix[j + 1] - prefix[k + 1];
                    long candidate;
                    if (leftSum < rightSum) {
                        candidate = leftSum + dp[i][k];
                    } else if (leftSum > rightSum) {
                        candidate = rightSum + dp[k + 1][j];
                    } else {
                        // A tie lets Alice keep whichever half scores more later.
                        candidate = leftSum + Math.max(dp[i][k], dp[k + 1][j]);
                    }
                    if (candidate > best) {
                        best = candidate;
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
}
