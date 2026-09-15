#include <string>

using namespace std;

class Solution {
  public:
    bool isAdjacentDiffAtMostTwo(string s) {
        for (int i = 1; i < (int)s.size(); ++i)
            if (abs(s[i] - s[i - 1]) > 2)
                return false;
        return true;
    }
};
