class Solution {
  public:
    int maximumLength(string s) {
        // The size bound invites brute force: tally every special
        // substring in a hash map, then keep the longest that reached
        // three occurrences.
        unordered_map<string, int> counts;
        int n = s.size();
        for (int i = 0; i < n; i++) {
            for (int j = i; j < n; j++) {
                if (s[j] != s[i])
                    break;
                counts[s.substr(i, j - i + 1)]++;
            }
        }
        int best = -1;
        for (const auto &e : counts) {
            if (e.second >= 3 && (int)e.first.size() > best) {
                best = e.first.size();
            }
        }
        return best;
    }
};
