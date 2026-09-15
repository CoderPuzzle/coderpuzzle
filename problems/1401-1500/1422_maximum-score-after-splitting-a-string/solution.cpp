#include <string>

class Solution {
  public:
    int maxScore(std::string s) {
        int zerosLeft = 0;
        int onesRight = 0;
        for (char c : s) {
            if (c == '1') {
                onesRight++;
            }
        }
        int best = -1;
        for (int i = 0; i < (int)s.size() - 1; i++) {
            if (s[i] == '0') {
                zerosLeft++;
            } else {
                onesRight--;
            }
            int score = zerosLeft + onesRight;
            if (score > best) {
                best = score;
            }
        }
        return best;
    }
};
