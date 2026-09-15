#include <algorithm>
#include <string>
#include <vector>

class Solution {
  public:
    // Augment with '1' at both ends, then run-length encode the result. A
    // trade turns an internal '1'-run (one '0'-run on each side) plus both
    // flanking '0'-runs into '1's, gaining their combined length.
    int maxActiveSectionsAfterTrade(std::string s) {
        std::string t = "1" + s + "1";
        int total = 0;
        for (char c : s) {
            total += c - '0';
        }
        std::vector<int> runs;
        int i = 0;
        while (i < (int)t.size()) {
            int j = i;
            while (j < (int)t.size() && t[j] == t[i]) {
                j++;
            }
            runs.push_back(j - i);
            i = j;
        }
        // Runs alternate starting with '1', so the internal '1'-runs sit at
        // even indices 2, 4, ..., size - 3 with a '0'-run on each side.
        int best = 0;
        for (int k = 2; k < (int)runs.size() - 2; k += 2) {
            best = std::max(best, runs[k - 1] + runs[k + 1]);
        }
        return total + best;
    }
};
