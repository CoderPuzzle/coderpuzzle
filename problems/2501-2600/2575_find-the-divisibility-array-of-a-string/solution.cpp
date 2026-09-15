#include <string>
#include <vector>

class Solution {
  public:
    std::vector<int> divisibilityArray(std::string word, int m) {
        // Rolling remainder over digit prefixes: if r was word[0..i-1]
        // mod m, then appending digit d gives (10*r + d) mod m, so each
        // flag costs one multiply-add-mod instead of re-parsing the
        // prefix; long longs absorb the ~10^10 intermediate (r < m <=
        // 10^9, so 10*r + d just exceeds the 32-bit range).
        std::vector<int> div;
        div.reserve(word.size());
        long long rem = 0;
        for (char ch : word) {
            rem = (rem * 10 + (ch - '0')) % m;
            div.push_back(rem == 0 ? 1 : 0);
        }
        return div;
    }
};
