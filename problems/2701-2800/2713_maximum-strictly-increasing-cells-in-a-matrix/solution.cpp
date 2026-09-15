#include <algorithm>
#include <vector>

class Solution {
  public:
    int maxIncreasingCells(vector<vector<int>> &mat) {
        // Chains only ever move to strictly greater values, so sweeping the
        // distinct values in ascending order lets every cell inherit the
        // best chain that already ends in its row or column among smaller
        // values. Cells sharing one value form a read-then-write batch:
        // their answers come from the row/column state before the batch,
        // and the maxima absorb the whole batch afterwards, since an
        // equal-value cell can never continue a chain.
        vector<array<int, 3>> cells;
        cells.reserve(mat.size() * mat[0].size());
        for (int r = 0; r < static_cast<int>(mat.size()); ++r) {
            for (int c = 0; c < static_cast<int>(mat[r].size()); ++c) {
                cells.push_back({mat[r][c], r, c});
            }
        }
        std::sort(cells.begin(), cells.end());
        vector<int> rowMax(mat.size(), 0), colMax(mat[0].size(), 0);
        int best = 0;
        int i = 0;
        const int total = static_cast<int>(cells.size());
        while (i < total) {
            int j = i; // run-length batch equal values: equal cells never chain
            while (j < total && cells[j][0] == cells[i][0]) {
                ++j;
            }
            vector<array<int, 3>> batch;
            for (int k = i; k < j; ++k) {
                const int r = cells[k][1], c = cells[k][2];
                // one more than the best chain ending at a smaller value
                const int length = std::max(rowMax[r], colMax[c]) + 1;
                batch.push_back({length, r, c});
                best = std::max(best, length);
            }
            for (const array<int, 3> &entry : batch) {
                if (rowMax[entry[1]] < entry[0]) {
                    rowMax[entry[1]] = entry[0];
                }
                if (colMax[entry[2]] < entry[0]) {
                    colMax[entry[2]] = entry[0];
                }
            }
            i = j;
        }
        return best;
    }
};
