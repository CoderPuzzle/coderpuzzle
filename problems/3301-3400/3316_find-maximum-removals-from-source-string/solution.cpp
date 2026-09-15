#include <string>
#include <vector>

class Solution {
  public:
    int maxRemovals(string source, string pattern, vector<int> &targetIndices) {
        // Walk source once keeping, for every prefix length k of pattern,
        // the most removals achievable with k characters already matched.
        // Every position carries each state over unchanged (the character
        // can always be kept unused), adds one when the position is a
        // removable target that gets deleted, and moves state k to k + 1
        // when the character equals pattern[k]. Unreachable states sit at
        // NEG, whose drift stays far below zero across the whole scan.
        const int NEG = -(1 << 30);
        int n = source.size();
        int m = pattern.size();
        vector<bool> removable(n, false);
        for (int idx : targetIndices)
            removable[idx] = true;
        vector<int> prev(m + 1, NEG);
        vector<int> cur(m + 1);
        prev[0] = 0;
        for (int i = 0; i < n; ++i) {
            for (int k = 0; k <= m; ++k) {
                int best = prev[k];
                if (removable[i]) {
                    best = prev[k] + 1;
                }
                if (k > 0 && source[i] == pattern[k - 1] && prev[k - 1] > best) {
                    best = prev[k - 1];
                }
                cur[k] = best;
            }
            swap(prev, cur);
        }
        return prev[m];
    }
};
