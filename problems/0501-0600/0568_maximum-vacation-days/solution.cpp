#include <algorithm>
#include <utility>
#include <vector>

class Solution {
  public:
    int maxVacationDays(vector<vector<int>> &flights, vector<vector<int>> &days) {
        int n = (int)flights.size();
        int k = (int)days[0].size();
        // dp[city] = best vacation total through the weeks handled so far;
        // -1 marks the cities no schedule has reached yet.
        vector<int> dp(n, -1);
        // Before week 0 the traveler sits in city 0 with nothing banked, so
        // week 0's own step encodes the first Monday's flight.
        dp[0] = 0;
        for (int w = 0; w < k; ++w) {
            vector<int> ndp(n, -1);
            for (int j = 0; j < n; ++j) {
                for (int i = 0; i < n; ++i) {
                    if (dp[i] < 0)
                        continue;
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
            dp = std::move(ndp);
        }
        // Staying in a city is always allowed, so the start city keeps some
        // schedule alive every week.
        return *std::max_element(dp.begin(), dp.end());
    }
};
