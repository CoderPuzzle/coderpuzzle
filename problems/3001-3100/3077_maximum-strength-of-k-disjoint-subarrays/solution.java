class Solution {

    public long maximumStrength(int[] nums, int k) {
        final long NEG = Long.MIN_VALUE / 4;
        int n = nums.length;
        // nxt[j][x] = dp[i+1][j][x]
        long[][] nxt = new long[k + 1][2];
        for (int j = 0; j <= k; j++) {
            nxt[j][0] = NEG;
            nxt[j][1] = NEG;
        }
        nxt[0][0] = 0;
        for (int i = n - 1; i >= 0; i--) {
            long[][] cur = new long[k + 1][2];
            for (int j = 0; j <= k; j++) {
                cur[j][0] = NEG;
                cur[j][1] = NEG;
            }
            for (int j = 0; j <= k; j++) {
                if (j >= 1) {
                    long coeff = (j & 1) != 0 ? j : -j;
                    long best = nxt[j - 1][0];
                    if (nxt[j][1] > best) {
                        best = nxt[j][1];
                    }
                    cur[j][1] = nums[i] * coeff + best;
                }
                cur[j][0] = nxt[j][0];
                if (cur[j][1] > cur[j][0]) {
                    cur[j][0] = cur[j][1];
                }
            }
            nxt = cur;
        }
        return nxt[k][0];
    }
}
