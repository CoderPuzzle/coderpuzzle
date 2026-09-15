class Solution {

    public long minimumCost(int[] nums, int[] cost, int k) {
        int n = nums.length;
        long[] prefNums = new long[n + 1];
        long[] prefCost = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefNums[i + 1] = prefNums[i] + nums[i];
            prefCost[i + 1] = prefCost[i] + cost[i];
        }

        final long INF = Long.MAX_VALUE / 4;
        // dp[i] = min cost to partition the suffix nums[i:]; empty suffix is free.
        long[] dp = new long[n + 1];
        java.util.Arrays.fill(dp, INF);
        dp[n] = 0;
        long totalCost = prefCost[n];
        // Right-to-left so every suffix value dp[j+1] is ready when needed.
        for (int i = n - 1; i >= 0; i--) {
            long best = INF;
            // Take [i, j] as the first block. The k*index term telescopes: each
            // block is charged k * (cost mass from i to the array's end), a
            // self-contained penalty independent of later split choices.
            for (int j = i; j < n; j++) {
                // prefNums[j+1] is the whole-array prefix through j, matching the
                // nums[0..r] factor of the formula, not the block's own sum.
                long seg = prefNums[j + 1] * (prefCost[j + 1] - prefCost[i]);
                seg += (long) k * (totalCost - prefCost[i]);
                long cand = seg + dp[j + 1];
                if (cand < best) {
                    best = cand;
                }
            }
            dp[i] = best;
        }
        return dp[0];
    }
}
