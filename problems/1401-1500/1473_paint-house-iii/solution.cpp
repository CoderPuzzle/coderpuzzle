#include <algorithm>
#include <vector>

class Solution {
  public:
    int minCost(std::vector<int> &houses, std::vector<std::vector<int>> &cost, int m, int n, int target) {
        const long long INF = 1e18;
        std::vector<std::vector<long long>> dp(n + 1, std::vector<long long>(target + 1, INF));
        if (houses[0] != 0) {
            dp[houses[0]][1] = 0;
        } else {
            for (int j = 1; j <= n; j++) {
                dp[j][1] = cost[0][j - 1];
            }
        }
        for (int i = 1; i < m; i++) {
            std::vector<std::vector<long long>> ndp(n + 1, std::vector<long long>(target + 1, INF));
            for (int j = 1; j <= n; j++) {
                if (houses[i] != 0 && houses[i] != j) {
                    continue;
                }
                long long cj = houses[i] != 0 ? 0 : cost[i][j - 1];
                for (int pj = 1; pj <= n; pj++) {
                    for (int k = 1; k <= target; k++) {
                        if (dp[pj][k] >= INF) {
                            continue;
                        }
                        int nk = pj == j ? k : k + 1;
                        if (nk <= target && dp[pj][k] + cj < ndp[j][nk]) {
                            ndp[j][nk] = dp[pj][k] + cj;
                        }
                    }
                }
            }
            dp = std::move(ndp);
        }
        long long best = INF;
        for (int j = 1; j <= n; j++) {
            best = std::min(best, dp[j][target]);
        }
        return best >= INF ? -1 : (int)best;
    }
};
