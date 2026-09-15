#include <string>
#include <vector>

class Solution {
  public:
    int prefixCount(std::vector<std::string> &words, std::string pref) {
        // Straight scan: count the words whose leading characters match
        // pref exactly.
        int count = 0;
        for (const std::string &word : words) {
            if (word.compare(0, pref.size(), pref) == 0) {
                ++count;
            }
        }
        return count;
    }
};
