#include <vector>

class Solution {
  public:
    long long minimumFinishTime(std::vector<std::vector<int>> &tires, int changeTime, int numLaps) {
        // Precompute best[x]: the cheapest time for x consecutive laps on
        // a single tire. A run never helps once its next lap costs more
        // than resetting to the fastest first lap; ratios are >= 2 so the
        // useful run length is tiny.
        static const long long INF = 1LL << 62;
        int fastestFirst = tires[0][0];
        for (const auto &tire : tires) {
            fastestFirst = std::min(fastestFirst, tire[0]);
        }
        std::vector<long long> best(numLaps + 1, INF);
        for (const auto &tire : tires) {
            long long fi = tire[0];
            long long ri = tire[1];
            long long total = 0;
            long long lap = fi;
            for (int x = 1; x <= numLaps; ++x) {
                total += lap;
                best[x] = std::min(best[x], total);
                if (lap >= changeTime + fastestFirst || total > INF / ri) {
                    break;
                }
                lap *= ri;
            }
        }
        std::vector<long long> dp(numLaps + 1, INF);
        dp[0] = 0;
        for (int i = 1; i <= numLaps; ++i) {
            for (int x = 1; x <= i; ++x) {
                if (best[x] == INF) {
                    continue;
                }
                long long candidate = dp[i - x] + best[x];
                if (i != x) {
                    candidate += changeTime;
                }
                dp[i] = std::min(dp[i], candidate);
            }
        }
        return dp[numLaps];
    }
};
