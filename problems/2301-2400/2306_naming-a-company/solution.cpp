class Solution {
  public:
    long long distinctNames(vector<string> &ideas) {
        // Suffixes (name minus first letter) grouped by first letter; within
        // a group every suffix is unique because all names are unique.
        vector<unordered_set<string>> suffixes(26);
        for (const auto &idea : ideas) {
            suffixes[idea[0] - 'a'].insert(idea.substr(1));
        }
        // A swap between letters a and b survives exactly when neither
        // suffix already exists in the other letter's group; inclusion -
        // exclusion turns that count into sizes minus the shared overlap.
        // The answer can reach ~n^2 ≈ 2.5 * 10^9, past int range, so every
        // accumulator stays long long.
        long long total = 0;
        for (int a = 0; a < 26; ++a) {
            for (int b = a + 1; b < 26; ++b) {
                long long shared = 0;
                for (const auto &suffix : suffixes[a]) {
                    if (suffixes[b].count(suffix) > 0) {
                        ++shared;
                    }
                }
                long long size_a = suffixes[a].size();
                long long size_b = suffixes[b].size();
                total += 2 * (size_a - shared) * (size_b - shared);
            }
        }
        return total;
    }
};
