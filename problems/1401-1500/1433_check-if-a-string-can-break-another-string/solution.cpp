#include <algorithm>
#include <string>
#include <vector>

class Solution {
  public:
    bool checkIfCanBreak(std::string s1, std::string s2) {
        std::sort(s1.begin(), s1.end());
        std::sort(s2.begin(), s2.end());
        return dominates(s1, s2) || dominates(s2, s1);
    }

  private:
    bool dominates(const std::string &x, const std::string &y) {
        for (int i = 0; i < (int)x.size(); i++) {
            if (x[i] < y[i]) {
                return false;
            }
        }
        return true;
    }
};
