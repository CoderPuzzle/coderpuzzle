#include <string>

class Solution {
  public:
    int partitionString(string s) {
        int count = 1;
        int seen = 0;
        for (char ch : s) {
            int bit = 1 << (ch - 'a');
            if (seen & bit) {
                ++count;
                seen = bit;
            } else {
                seen |= bit;
            }
        }
        return count;
    }
};
