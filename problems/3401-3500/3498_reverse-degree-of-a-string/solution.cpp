#include <string>

class Solution {
  public:
    // Each character contributes its reversed-alphabet value (26 - letter
    // rank) times its 1-indexed string position; sum over the whole string.
    int reverseDegree(std::string s) {
        int total = 0;
        for (int i = 0; i < (int)s.size(); i++) {
            total += (26 - (s[i] - 'a')) * (i + 1);
        }
        return total;
    }
};
