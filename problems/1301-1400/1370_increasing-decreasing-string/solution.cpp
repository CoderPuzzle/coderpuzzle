#include <string>
#include <vector>

class Solution {
  public:
    std::string sortString(std::string s) {
        std::vector<int> counts(26, 0);
        for (char ch : s)
            counts[ch - 'a'] += 1;
        int remaining = static_cast<int>(s.size());
        std::string out;
        out.reserve(s.size());
        bool forward = true;
        while (remaining > 0) {
            for (int k = 0; k < 26; k++) {
                int i = forward ? k : 25 - k;
                if (counts[i] > 0) {
                    counts[i] -= 1;
                    remaining -= 1;
                    out.push_back(static_cast<char>('a' + i));
                }
            }
            forward = !forward;
        }
        return out;
    }
};
