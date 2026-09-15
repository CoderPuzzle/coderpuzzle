#include <vector>

class Solution {
  public:
    int waysToReachTarget(int target, std::vector<std::vector<int>> &types) {
        // Bounded knapsack over score: dp[p] counts ways to hit exactly
        // p points with the types processed so far; each type opens a
        // fresh row so indistinguishable questions only contribute
        // take-counts q <= min(count, points / marks).
        const long long MOD = 1'000'000'007;
        std::vector<long long> dp(target + 1, 0);
        dp[0] = 1;
        for (const std::vector<int> &type : types) {
            int count = type[0], marks = type[1];
            std::vector<long long> nxt(target + 1, 0);
            for (int points = 0; points <= target; ++points) {
                int max_take = std::min(count, points / marks);
                // <= 51 residues below 10^9+7 sum under
                // 5.5 * 10^10 — safely inside long long before the
                // single reduction.
                long long total = 0;
                for (int taken = 0; taken <= max_take; ++taken) {
                    total += dp[points - taken * marks];
                }
                nxt[points] = total % MOD;
            }
            dp = std::move(nxt);
        }
        return (int)dp[target];
    }
};
