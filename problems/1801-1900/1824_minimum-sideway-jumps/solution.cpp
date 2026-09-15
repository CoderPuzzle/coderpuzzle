class Solution {
  public:
    // dp[lane] = fewest side jumps needed to stand on that lane at the
    // point being processed. Forward moves are free, a lane change is one
    // jump, so each new point relaxes every open lane against the previous
    // point's cheapest lane plus one.
    int minSideJumps(vector<int> &obstacles) {
        const int INF = 1000000000;
        int dp[4] = {INF, 1, 0, 1}; // lanes indexed 1..3; start on lane 2
        for (int point = 1; point < (int)obstacles.size(); ++point) {
            int blocked = obstacles[point];
            dp[blocked] = INF;
            int best = min(dp[1], min(dp[2], dp[3]));
            for (int lane = 1; lane <= 3; ++lane)
                if (lane != blocked)
                    dp[lane] = min(dp[lane], best + 1);
        }
        return min(dp[1], min(dp[2], dp[3]));
    }
};
