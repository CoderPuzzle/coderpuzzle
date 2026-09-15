#include <string>
#include <unordered_map>

class Solution {
  public:
    int maxSameLengthRuns(string s) {
        // One scan cuts s into maximal equal-letter runs; the answer is the
        // largest number of runs that share a single length.
        unordered_map<int, int> counts;
        int n = (int)s.size();
        int i = 0;
        while (i < n) {
            int j = i;
            while (j < n && s[j] == s[i]) {
                j++;
            }
            counts[j - i]++;
            i = j;
        }
        int best = 0;
        for (const auto &entry : counts) {
            best = max(best, entry.second);
        }
        return best;
    }
};
