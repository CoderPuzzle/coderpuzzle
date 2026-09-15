#include <algorithm>
#include <cstdlib>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    vector<vector<int>> differenceOfDistinctValues(vector<vector<int>> &grid) {
        // Each main diagonal is swept once downward and once upward. The
        // downward pass records, per cell, how many distinct values lie
        // strictly left-above (the running set size before inserting the
        // cell itself); the upward pass rebuilds the same count for
        // right-below and combines the two.
        int m = static_cast<int>(grid.size());
        int n = static_cast<int>(grid[0].size());
        vector<vector<int>> ans(m, vector<int>(n));
        vector<pair<int, int>> starts;
        for (int r = 0; r < m; ++r) {
            starts.emplace_back(r, 0);
        }
        for (int c = 1; c < n; ++c) {
            starts.emplace_back(0, c);
        }
        for (auto &[sr, sc] : starts) {
            unordered_set<int> left_above;
            int length = 0;
            int r = sr;
            int c = sc;
            while (r < m && c < n) {
                ans[r][c] = static_cast<int>(left_above.size());
                left_above.insert(grid[r][c]);
                ++length;
                ++r;
                ++c;
            }
            unordered_set<int> right_below;
            for (int k = length - 1; k >= 0; --k) {
                int x = sr + k;
                int y = sc + k;
                ans[x][y] = abs(ans[x][y] - static_cast<int>(right_below.size()));
                right_below.insert(grid[x][y]);
            }
        }
        return ans;
    }
};
