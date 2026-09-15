#include <unordered_map>
#include <vector>

class Solution {
  public:
    long long minCost(std::vector<int> &nums, int k) {
        // dp[r] = min cost to split the first r elements. For each r,
        // sweep l downward from r-1 while extending one frequency
        // table: a value seen for the first time adds nothing, its
        // second occurrence adds 2 to the trimmed length (the missed
        // first occurrence plus this one), later ones add 1 each.
        // Costs reach n*(k+n) ~ 10^12, past int range — long longs.
        int n = (int)nums.size();
        std::vector<long long> dp(n + 1, LLONG_MAX);
        dp[0] = 0;
        for (int r = 1; r <= n; ++r) {
            std::unordered_map<int, int> freq;
            long long trimmed = 0;
            long long best = LLONG_MAX;
            for (int l = r - 1; l >= 0; --l) {
                int count = ++freq[nums[l]];
                if (count == 2)
                    trimmed += 2;
                else if (count > 2)
                    ++trimmed;
                best = std::min(best, dp[l] + k + trimmed);
            }
            dp[r] = best;
        }
        return dp[n];
    }
};
