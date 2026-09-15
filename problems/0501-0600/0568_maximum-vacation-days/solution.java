import java.util.Arrays;

class Solution {

    public int maxVacationDays(int[][] flights, int[][] days) {
        int n = flights.length;
        int k = days[0].length;
        // dp[city] = best vacation total through the weeks handled so far;
        // -1 marks the cities no schedule has reached yet.
        int[] dp = new int[n];
        Arrays.fill(dp, -1);
        // Before week 0 the traveler sits in city 0 with nothing banked, so
        // week 0's own step encodes the first Monday's flight.
        dp[0] = 0;
        for (int w = 0; w < k; ++w) {
            int[] ndp = new int[n];
            Arrays.fill(ndp, -1);
            for (int j = 0; j < n; ++j) {
                for (int i = 0; i < n; ++i) {
                    if (dp[i] < 0) {
                        continue;
                    }
                    // One decision per week: a Monday flight i -> j, or
                    // staying put (i == j) at no flight cost.
                    if (i == j || flights[i][j] == 1) {
                        int total = dp[i] + days[j][w];
                        if (total > ndp[j]) {
                            ndp[j] = total;
                        }
                    }
                }
            }
            dp = ndp;
        }
        // Staying in a city is always allowed, so the start city keeps some
        // schedule alive every week.
        int best = dp[0];
        for (int city = 1; city < n; ++city) {
            best = Math.max(best, dp[city]);
        }
        return best;
    }
}
