#include <algorithm>
#include <vector>

class Solution {
  public:
    vector<vector<int>> largestLocal(vector<vector<int>> &grid) {
        // Two passes shrink the window work from 9 comparisons per output
        // cell to 6: first collapse every row of 3 horizontally, then take
        // the vertical max of those results.
        int n = static_cast<int>(grid.size());
        vector<vector<int>> row_max(n, vector<int>(n - 2));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j + 2 < n; ++j) {
                row_max[i][j] = std::max({grid[i][j], grid[i][j + 1], grid[i][j + 2]});
            }
        }
        vector<vector<int>> max_local(n - 2, vector<int>(n - 2));
        for (int i = 0; i + 2 < n; ++i) {
            for (int j = 0; j + 2 < n; ++j) {
                max_local[i][j] = std::max({row_max[i][j], row_max[i + 1][j], row_max[i + 2][j]});
            }
        }
        return max_local;
    }
};
