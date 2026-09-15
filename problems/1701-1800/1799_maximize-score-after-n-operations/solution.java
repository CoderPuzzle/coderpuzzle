class Solution {

    public int maxScore(int[] nums) {
        // dp[mask] is the best score once exactly the elements of mask have
        // been removed; the next operation is popcount(mask) / 2 + 1 and
        // pairs any two still-present elements. Ascending mask order works
        // because transitions only set bits, and the growing multiplier is
        // why the richest pair often belongs to the last operation, not the
        // first. Totals stay below 28 * 10^6, inside 32-bit range.
        int m = nums.length;
        int[][] g = new int[m][m];
        for (int i = 0; i < m; ++i) {
            for (int j = i + 1; j < m; ++j) {
                int x = nums[i],
                    y = nums[j];
                while (y != 0) {
                    int t = x % y;
                    x = y;
                    y = t;
                }
                g[i][j] = g[j][i] = x;
            }
        }
        int size = 1 << m;
        int[] dp = new int[size];
        for (int mask = 0; mask < size; ++mask) {
            int k = Integer.bitCount(mask) / 2 + 1;
            int base = dp[mask];
            for (int i = 0; i < m; ++i) {
                if (((mask >> i) & 1) != 0) continue;
                for (int j = i + 1; j < m; ++j) {
                    if (((mask >> j) & 1) != 0) continue;
                    int cand = base + k * g[i][j];
                    int next = mask | (1 << i) | (1 << j);
                    if (cand > dp[next]) dp[next] = cand;
                }
            }
        }
        return dp[size - 1];
    }
}
