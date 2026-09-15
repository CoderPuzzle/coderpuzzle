#include <cstdlib>
#include <string>

class Solution {
  public:
    // Only the two canonical alternating patterns are targets. Each swap
    // fixes exactly two mismatched positions, so a pattern costs mismatches
    // divided by two; take the cheaper count-feasible pattern.
    int minSwaps(std::string s) {
        int ones = 0;
        int n = s.size();
        for (char c : s) {
            ones += c - '0';
        }
        if (std::abs(2 * ones - n) > 1) {
            return -1;
        }
        int best = -1;
        for (int start = 0; start <= 1; start++) {
            int pattern_ones = start == 0 ? (n + 1) / 2 : n / 2;
            if (pattern_ones != ones) {
                continue;
            }
            int mism = 0;
            for (int i = 0; i < n; i++) {
                if (s[i] != (char)('0' + ((i & 1) ^ start ^ 1))) {
                    mism++;
                }
            }
            if (best < 0 || mism / 2 < best) {
                best = mism / 2;
            }
        }
        return best;
    }
};
