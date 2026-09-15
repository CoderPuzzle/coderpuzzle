class Solution {
  public:
    int longestCommonPrefix(vector<int> &arr1, vector<int> &arr2) {
        // The deepest cross-array agreement is realized by two lexicographically
        // adjacent entries, so merge both arrays as source-tagged digit strings.
        char buf[16];
        vector<pair<string, int>> entries;
        for (int x : arr1) {
            snprintf(buf, sizeof(buf), "%d", x);
            entries.push_back({buf, 0});
        }
        for (int y : arr2) {
            snprintf(buf, sizeof(buf), "%d", y);
            entries.push_back({buf, 1});
        }
        // Sort as digit strings, never numerically: only lexicographic order
        // keeps a prefix family in one contiguous block.
        sort(entries.begin(), entries.end());
        int best = 0;
        for (size_t i = 1; i < entries.size(); i++) {
            // Same-source neighbors cannot witness a cross pair.
            if (entries[i - 1].second == entries[i].second)
                continue;
            const string &u = entries[i - 1].first;
            const string &v = entries[i].first;
            int shared = 0;
            for (size_t j = 0; j < u.size() && j < v.size(); j++) {
                if (u[j] != v[j])
                    // Digits diverge: the run cannot extend past here.
                    break;
                shared++;
            }
            if (shared > best)
                best = shared;
        }
        return best;
    }
};
