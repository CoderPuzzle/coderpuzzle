#include <string>

class Solution {
  public:
    int maxPower(std::string s) {
        int best = 1;
        int current = 1;
        for (int i = 1; i < (int)s.size(); i++) {
            if (s[i] == s[i - 1]) {
                current++;
                best = std::max(best, current);
            } else {
                current = 1;
            }
        }
        return best;
    }
};
