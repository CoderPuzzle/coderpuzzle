import java.util.Arrays;

class Solution {

    public int maxTastiness(int[] price, int[] tastiness, int maxAmount, int maxCoupons) {
        // dp[a][c] = best tastiness having spent `a` and used `c` coupons.
        // Descending both axes keeps each fruit usable at most once: every
        // update lands at a larger amount or a larger coupon count, which
        // the descending sweep has already passed.
        int[][] dp = new int[maxAmount + 1][maxCoupons + 1];
        for (int[] row : dp) {
            Arrays.fill(row, -1);
        }
        dp[0][0] = 0;
        for (int i = 0; i < price.length; ++i) {
            int p = price[i];
            int t = tastiness[i];
            int half = p / 2;
            for (int a = maxAmount; a >= 0; --a) {
                for (int c = maxCoupons; c >= 0; --c) {
                    int cur = dp[a][c];
                    if (cur < 0) {
                        continue;
                    }
                    if (a + p <= maxAmount) {
                        dp[a + p][c] = Math.max(dp[a + p][c], cur + t);
                    }
                    if (c + 1 <= maxCoupons && a + half <= maxAmount) {
                        dp[a + half][c + 1] = Math.max(dp[a + half][c + 1], cur + t);
                    }
                }
            }
        }
        int best = 0;
        for (int[] row : dp) {
            for (int v : row) {
                best = Math.max(best, v);
            }
        }
        return best;
    }
}
