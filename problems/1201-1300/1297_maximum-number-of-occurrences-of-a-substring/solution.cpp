#include <string>
#include <unordered_map>
#include <unordered_set>

class Solution {
  public:
    int maxFreq(std::string s, int maxLetters, int minSize, int maxSize) {
        // A length-L qualifying substring (L > minSize) has a minSize prefix
        // occurring at least as often, so only exact-minSize windows count.
        std::unordered_map<std::string, int> counts;
        int best = 0;
        for (int start = 0; start + minSize <= (int)s.size(); ++start) {
            std::string window = s.substr(start, minSize);
            if ((int)std::unordered_set<char>(window.begin(), window.end()).size() <= maxLetters) {
                best = std::max(best, ++counts[window]);
            }
        }
        return best;
    }
};
