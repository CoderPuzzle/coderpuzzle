import java.util.Arrays;

class Solution {

    public int maxProfit(int n, int[][] edges, int[] score) {
        int[] pred = new int[n];
        for (int[] e : edges) {
            pred[e[1]] |= 1 << e[0];
        }

        int full = (1 << n) - 1;
        int[] dp = new int[1 << n];
        Arrays.fill(dp, -1);
        dp[0] = 0;

        for (int mask = 0; mask <= full; mask++) {
            int cur = dp[mask];
            if (cur < 0) {
                continue;
            }
            int pos = Integer.bitCount(mask) + 1;
            int remaining = full ^ mask;
            while (remaining != 0) {
                int bit = remaining & -remaining;
                int node = Integer.numberOfTrailingZeros(bit);
                if ((pred[node] & mask) == pred[node]) {
                    int nm = mask | bit;
                    int val = cur + score[node] * pos;
                    if (val > dp[nm]) {
                        dp[nm] = val;
                    }
                }
                remaining -= bit;
            }
        }
        return dp[full];
    }
}
