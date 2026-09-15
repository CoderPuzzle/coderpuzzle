#include <string>
#include <unordered_map>

class Solution {
  public:
    bool isPossibleToRearrange(string s, string t, int k) {
        // The rearrangement exists exactly when the two chunk multisets
        // match: any order of t's chunks is reachable, and every piece of
        // s must be consumed whole. Hash-counting makes the comparison a
        // single O(n) pass over the two chunk sequences.
        int size = s.size() / k;
        unordered_map<string, int> counts;
        for (int i = 0; i < k; ++i) {
            counts[s.substr(i * size, size)] += 1;
        }
        for (int i = 0; i < k; ++i) {
            auto found = counts.find(t.substr(i * size, size));
            if (found == counts.end() || found->second == 0)
                return false;
            found->second -= 1;
        }
        return true;
    }
};
