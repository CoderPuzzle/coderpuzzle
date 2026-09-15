class Solution {

    public int stoneGameVII(int[] stones) {
        // Each move removes one of the two ends, so a position is fully the
        // run stones[l..r] still on the table. Both players optimize the same
        // number from their own side: dp[l][r] is the best margin, mover's
        // score minus opponent's, on that run — taking the left stone banks
        // sum(l+1..r) and hands the rest over, whose best margin there
        // becomes the taker's deficit; the right stone mirrors it. Fill l
        // descending / r ascending so both shorter runs are ready.
        int n = stones.length;
        long[] pre = new long[n + 1];
        for (int i = 0; i < n; i++) pre[i + 1] = pre[i] + stones[i];
        int[][] dp = new int[n][n];
        for (int l = n - 2; l >= 0; l--) {
            long pl = pre[l],
                pl1 = pre[l + 1];
            int[] row = dp[l],
                below = dp[l + 1];
            for (int r = l + 1; r < n; r++) {
                long a = pre[r + 1] - pl1 - below[r];
                long b = pre[r] - pl - row[r - 1];
                row[r] = (int) Math.max(a, b);
            }
        }
        return dp[0][n - 1];
    }
}
