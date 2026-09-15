#include <algorithm>
#include <vector>

class Solution {
  public:
    std::vector<int> luckyNumbers(std::vector<std::vector<int>> &matrix) {
        int m = static_cast<int>(matrix.size()), n = static_cast<int>(matrix[0].size());
        std::vector<int> rowMin(m), colMax(n);
        for (int r = 0; r < m; r++) {
            rowMin[r] = *std::min_element(matrix[r].begin(), matrix[r].end());
        }
        for (int c = 0; c < n; c++) {
            int best = matrix[0][c];
            for (int r = 0; r < m; r++)
                best = std::max(best, matrix[r][c]);
            colMax[c] = best;
        }
        std::vector<int> lucky;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (matrix[r][c] == rowMin[r] && matrix[r][c] == colMax[c]) {
                    lucky.push_back(matrix[r][c]);
                }
            }
        }
        std::sort(lucky.begin(), lucky.end());
        return lucky;
    }
};
