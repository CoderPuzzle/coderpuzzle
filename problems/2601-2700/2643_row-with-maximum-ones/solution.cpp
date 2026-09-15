#include <vector>

class Solution {
  public:
    vector<int> rowAndMaximumOnes(vector<vector<int>> &mat) {
        // One scan carries the best (count, row) pair seen so far; only a
        // strictly greater count replaces the incumbent, so among tied rows
        // the smallest index automatically survives.
        int best_row = 0;
        int best_count = -1;
        for (size_t row_index = 0; row_index < mat.size(); ++row_index) {
            int count = 0;
            for (int value : mat[row_index]) {
                if (value == 1)
                    ++count;
            }
            if (count > best_count) {
                best_count = count;
                best_row = (int)row_index;
            }
        }
        return {best_row, best_count};
    }
};
