#include <algorithm>
#include <cstdlib>
#include <vector>

class Solution {
  public:
    vector<int> findColumnWidth(vector<vector<int>> &grid) {
        // Width of a value = digits of its magnitude plus one sign character
        // when negative. Repeated division by 10 counts the digits without
        // materializing strings, and every column keeps a running maximum.
        vector<int> widths(grid[0].size(), 0);
        for (const vector<int> &row : grid) {
            for (size_t column = 0; column < row.size(); ++column) {
                int width = row[column] < 0 ? 1 : 0;
                int rest = abs(row[column]);
                do {
                    ++width;
                    rest /= 10;
                } while (rest > 0);
                widths[column] = max(widths[column], width);
            }
        }
        return widths;
    }
};
