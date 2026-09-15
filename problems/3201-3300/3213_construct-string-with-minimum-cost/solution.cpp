#include <algorithm>
#include <string>
#include <unordered_map>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int minimumCost(string target, vector<string> &words, vector<int> &costs) {
        // Reverse DP over suffixes: dp[i] is the minimum cost to assemble
        // target[i:], dp[n] is 0, and each position extends every word that
        // matches its next characters. Duplicate words collapse to their
        // cheapest cost first; per position only DISTINCT word lengths matter,
        // and their count never exceeds sqrt(2 * total word characters).
        // Walking candidate lengths ascending lets one wrapping u64
        // polynomial hash of target[i:i+length) extend in O(1) per step; a
        // hash hit only triggers an exact map probe, so correctness never
        // rests on the hash — a collision merely wastes one probe. Costs
        // accumulate in long long room (the answer itself fits an int).
        unordered_map<string, long long> best;
        for (int k = 0; k < (int)words.size(); k++) {
            auto it = best.find(words[k]);
            if (it == best.end() || costs[k] < it->second) {
                best[words[k]] = costs[k];
            }
        }
        int n = (int)target.size();
        unordered_map<int, unordered_set<unsigned long long>> buckets;
        int maxLen = 0;
        for (const auto &entry : best) {
            const string &word = entry.first;
            unsigned long long h = 0;
            for (char ch : word) {
                h = h * 131ULL + (unsigned char)ch;
            }
            buckets[(int)word.size()].insert(h);
            maxLen = max(maxLen, (int)word.size());
        }
        const long long big = 1LL << 62;
        vector<long long> dp(n + 1, big);
        dp[n] = 0;
        for (int i = n - 1; i >= 0; i--) {
            long long cur = big;
            unsigned long long h = 0;
            int limit = min(maxLen, n - i);
            for (int length = 1; length <= limit; length++) {
                h = h * 131ULL + (unsigned char)target[i + length - 1];
                auto bit = buckets.find(length);
                if (bit != buckets.end() && bit->second.count(h)) {
                    auto cit = best.find(target.substr(i, length));
                    if (cit != best.end()) {
                        long long nxt = dp[i + length];
                        if (nxt != big && nxt + cit->second < cur) {
                            cur = nxt + cit->second;
                        }
                    }
                }
            }
            dp[i] = cur;
        }
        return dp[0] >= big ? -1 : (int)dp[0];
    }
};
