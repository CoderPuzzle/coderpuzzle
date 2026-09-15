#include <string>

class Solution {
  public:
    int minSteps(std::string s, std::string t) {
        // Order is irrelevant; only letter counts matter. The answer is
        // the total absolute per-letter frequency difference.
        long long counts[26] = {};
        for (char ch : s) {
            ++counts[ch - 'a'];
        }
        for (char ch : t) {
            --counts[ch - 'a'];
        }
        int total = 0;
        for (long long diff : counts) {
            total += static_cast<int>(diff < 0 ? -diff : diff);
        }
        return total;
    }
};
