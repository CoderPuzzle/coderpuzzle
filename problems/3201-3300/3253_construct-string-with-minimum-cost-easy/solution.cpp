#include <string>
#include <unordered_map>
#include <vector>

class Solution {
  public:
    int minimumCost(string target, vector<string> &words, vector<int> &costs) {
        // Forward DP over prefixes: dp[i] is the minimum cost to assemble
        // target[:i], dp[0] is 0, and every reachable position extends each
        // DISTINCT word matching its next characters. Duplicate words first
        // collapse to their cheapest occurrence. The Easy bounds are small —
        // at most 50 words against a target of at most 2000 characters — so
        // a direct scan of all words at all positions suffices; greedy
        // longest-match fails (a pricey long word can block cheaper short
        // ones), and an unreachable dp[n] is the -1 case. The j <= n bound
        // rejects words longer than the remaining suffix before any compare.
        // Costs accumulate in long long room even though any achievable cost
        // is at most len(target) * max(cost) = 2 * 10^8, which fits an int.
        unordered_map<string, long long> best;
        for (int k = 0; k < (int)words.size(); k++) {
            auto it = best.find(words[k]);
            if (it == best.end() || costs[k] < it->second) {
                best[words[k]] = costs[k];
            }
        }
        int n = (int)target.size();
        const long long big = 1LL << 62;
        vector<long long> dp(n + 1, big);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            if (dp[i] == big) {
                continue;
            }
            for (const auto &entry : best) {
                const string &word = entry.first;
                int j = i + (int)word.size();
                if (j > n || dp[i] + entry.second >= dp[j]) {
                    continue;
                }
                if (target.compare(i, word.size(), word) == 0) {
                    dp[j] = dp[i] + entry.second;
                }
            }
        }
        return dp[n] >= big ? -1 : (int)dp[n];
    }
};
