class Solution {
  public:
    int minDeletionSize(vector<string> &strs) {
        int deletions = 0;
        const size_t rows = strs.size(), cols = strs[0].size();
        // cut[i]: rows i and i + 1 are already strictly ordered on the kept
        // prefix, so later columns no longer constrain that pair.
        vector<bool> cut(rows - 1, false);
        for (size_t j = 0; j < cols; ++j) {
            bool bad = false;
            for (size_t i = 0; i + 1 < rows; ++i) {
                if (!cut[i] && strs[i][j] > strs[i + 1][j]) {
                    // A still-undecided pair drops here: the column must go.
                    bad = true;
                    break;
                }
            }
            if (bad) {
                ++deletions;
                continue;
            }
            for (size_t i = 0; i + 1 < rows; ++i) {
                if (!cut[i] && strs[i][j] < strs[i + 1][j]) {
                    // A strict rise settles the pair for every later column.
                    cut[i] = true;
                }
            }
        }
        return deletions;
    }
};
