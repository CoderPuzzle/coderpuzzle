#include <string>

class Solution {
  public:
    std::string largestGoodInteger(std::string num) {
        std::string best;
        int run = 1;
        for (size_t i = 1; i < num.size(); i++) {
            if (num[i] == num[i - 1]) {
                run++;
            } else {
                run = 1;
            }
            if (run == 3) {
                std::string candidate(3, num[i]);
                if (candidate > best) {
                    best = candidate;
                }
            }
        }
        return best;
    }
};
