#include <string>
#include <vector>

class Solution {
  public:
    string findReplaceString(string s, vector<int> &indices, vector<string> &sources, vector<string> &targets) {
        // Replacements are simultaneous: each match is judged against the
        // original string, so first record every operation that succeeds —
        // sources[i] read from indices[i] — as a map from start position to
        // operation, then walk s once. A position holding a winner emits its
        // target and skips the consumed source; every other character copies
        // through unchanged. The non-overlap guarantee means a skip never
        // lands inside another winner's span.
        int n = s.size();
        vector<int> match(n, -1);
        for (int op = 0; op < static_cast<int>(indices.size()); op++) {
            int start = indices[op];
            const string &source = sources[op];
            if (static_cast<int>(source.size()) <= n - start && s.compare(start, source.size(), source) == 0) {
                match[start] = op;
            }
        }
        string result;
        int i = 0;
        while (i < n) {
            int op = match[i];
            if (op >= 0) {
                result += targets[op];
                i += static_cast<int>(sources[op].size());
            } else {
                result += s[i];
                i++;
            }
        }
        return result;
    }
};
