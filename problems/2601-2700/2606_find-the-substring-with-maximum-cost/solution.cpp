#include <string>
#include <vector>

class Solution {
  public:
    int maximumCostSubstring(string s, string chars, vector<int> &vals) {
        // Resolve each letter's value once (defaults from the alphabet,
        // overrides from chars), then Kadane's algorithm; snapping the
        // running sum back to 0 whenever it dips negative keeps the empty
        // substring's cost of 0 as the floor for the answer. Costs are
        // bounded by 1e5 * 1000 = 1e8, safely inside int range.
        int value[26];
        for (int i = 0; i < 26; ++i)
            value[i] = i + 1;
        for (int i = 0; i < (int)chars.size(); ++i)
            value[chars[i] - 'a'] = vals[i];
        int best = 0;
        int run = 0;
        for (char c : s) {
            run = max(run + value[c - 'a'], 0);
            best = max(best, run);
        }
        return best;
    }
};
