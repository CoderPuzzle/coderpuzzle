class Solution {

    // dp[lane] = fewest side jumps needed to stand on that lane at the
    // point being processed. Forward moves are free, a lane change is one
    // jump, so each new point relaxes every open lane against the previous
    // point's cheapest lane plus one.
    public int minSideJumps(int[] obstacles) {
        final int INF = 1_000_000_000;
        int[] dp = { INF, 1, 0, 1 }; // lanes indexed 1..3; start on lane 2
        for (int point = 1; point < obstacles.length; ++point) {
            int blocked = obstacles[point];
            dp[blocked] = INF;
            int best = Math.min(dp[1], Math.min(dp[2], dp[3]));
            for (int lane = 1; lane <= 3; ++lane) {
                if (lane != blocked) dp[lane] = Math.min(dp[lane], best + 1);
            }
        }
        return Math.min(dp[1], Math.min(dp[2], dp[3]));
    }
}
