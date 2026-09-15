import java.util.ArrayList;
import java.util.List;

class Solution {

    public long maxTaxiEarnings(int n, int[][] rides) {
        List<List<int[]>> ending = new ArrayList<>(n + 1);
        for (int point = 0; point <= n; ++point) {
            ending.add(new ArrayList<>());
        }
        for (int[] ride : rides) {
            ending.get(ride[1]).add(ride);
        }

        long[] dp = new long[n + 1];
        for (int point = 1; point <= n; ++point) {
            dp[point] = dp[point - 1];
            for (int[] ride : ending.get(point)) {
                long profit = (long) ride[1] - ride[0] + ride[2];
                dp[point] = Math.max(dp[point], dp[ride[0]] + profit);
            }
        }
        return dp[n];
    }
}
