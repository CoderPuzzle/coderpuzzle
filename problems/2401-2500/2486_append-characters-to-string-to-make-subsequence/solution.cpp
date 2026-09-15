#include <string>

class Solution {
  public:
    int appendCharacters(string s, string t) {
        // Match t from its start, scanning s once. Each time the current
        // characters agree, t advances; s advances on every step. The prefix
        // of t consumed this way is the longest one that is a subsequence of
        // s, so the unmatched tail of t is exactly what must be appended.
        int i = 0;
        int j = 0;
        while (i < (int)s.size() && j < (int)t.size()) {
            if (s[i] == t[j]) {
                ++j;
            }
            ++i;
        }
        return (int)t.size() - j;
    }
};
