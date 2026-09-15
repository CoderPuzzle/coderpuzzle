class Solution {

    public int mincostTickets(int[] days, int[] costs) {
        int[] durations = { 1, 7, 30 };
        int last = days[days.length - 1];
        boolean[] travel = new boolean[last + 1];
        for (int d : days) {
            travel[d] = true;
        }
        // dp[d]: cheapest coverage of every travel day up to d.
        int[] dp = new int[last + 31];
        for (int day = 1; day <= last; day++) {
            if (!travel[day]) {
                // No decision on non-travel days; the cost carries forward.
                dp[day] = dp[day - 1];
            } else {
                // A pass of duration u ending today covers (day - u, day];
                // max(0, ...) treats dp[0] = 0 as "nothing before day 1".
                int best = Integer.MAX_VALUE;
                for (int i = 0; i < 3; i++) {
                    int prev = Math.max(0, day - durations[i]);
                    best = Math.min(best, dp[prev] + costs[i]);
                }
                dp[day] = best;
            }
        }
        return dp[last];
    }
}
