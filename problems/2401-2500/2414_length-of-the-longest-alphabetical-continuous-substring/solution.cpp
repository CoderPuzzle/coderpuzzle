#include <string>

class Solution {
  public:
    int longestContinuousSubstring(string s) {
        int best = 1;
        int run = 1;
        for (size_t i = 1; i < s.size(); i++) {
            run = s[i] == s[i - 1] + 1 ? run + 1 : 1;
            best = max(best, run);
        }
        return best;
    }
};
