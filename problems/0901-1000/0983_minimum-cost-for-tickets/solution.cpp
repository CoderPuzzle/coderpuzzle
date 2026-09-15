class Solution {
  public:
    int mincostTickets(vector<int> &days, vector<int> &costs) {
        int durations[3] = {1, 7, 30};
        int last = days.back();
        vector<char> travel(last + 1, 0);
        for (int d : days) {
            travel[d] = 1;
        }
        // dp[d]: cheapest coverage of every travel day up to d.
        vector<int> dp(last + 31, 0);
        for (int day = 1; day <= last; day++) {
            if (!travel[day]) {
                // No decision on non-travel days; the cost carries forward.
                dp[day] = dp[day - 1];
            } else {
                // A pass of duration u ending today covers (day - u, day];
                // max(0, ...) treats dp[0] = 0 as "nothing before day 1".
                int best = INT_MAX;
                for (int i = 0; i < 3; i++) {
                    int prev = max(0, day - durations[i]);
                    best = min(best, dp[prev] + costs[i]);
                }
                dp[day] = best;
            }
        }
        return dp[last];
    }
};
