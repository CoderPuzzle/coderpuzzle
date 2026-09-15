#include <algorithm>
#include <string>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    // A word qualifies iff every proper prefix chain is present. Sort once;
    // the first qualifying word of each new record length wins, and
    // lexicographic order breaks length ties for free.
    std::string longestWord(std::vector<std::string> &words) {
        std::unordered_set<std::string> set(words.begin(), words.end());
        std::vector<std::string> sorted(set.begin(), set.end());
        std::sort(sorted.begin(), sorted.end());
        std::string best;
        for (auto &w : sorted) {
            if (w.size() <= best.size()) {
                continue;
            }
            bool ok = true;
            for (size_t i = 1; i < w.size(); i++) {
                if (!set.count(w.substr(0, i))) {
                    ok = false;
                    break;
                }
            }
            if (ok) {
                best = w;
            }
        }
        return best;
    }
};
