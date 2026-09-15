class Solution {
  public:
    int minDeletionSize(vector<string> &strs) {
        int deletions = 0;
        const size_t rows = strs.size(), cols = strs[0].size();
        for (size_t j = 0; j < cols; ++j) {
            for (size_t i = 1; i < rows; ++i) {
                // A column is condemned the moment a character drops below
                // the one above it; equal characters never condemn.
                if (strs[i][j] < strs[i - 1][j]) {
                    ++deletions;
                    break;
                }
            }
        }
        return deletions;
    }
};
