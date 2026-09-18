#include <vector>

class NumMatrix {
  public:
    NumMatrix(std::vector<std::vector<int>> matrix) {
        int rows = (int)matrix.size();
        int cols = (int)matrix[0].size();
        // Integral image: prefix[r][c] sums rows 0..r-1 and columns
        // 0..c-1. The guard row and column of zeros remove every
        // boundary special case from the index arithmetic. Held in
        // long long: the worst-case total is 4*10^8.
        prefix.assign(rows + 1, std::vector<long long>(cols + 1, 0));
        for (int row = 0; row < rows; row++) {
            for (int col = 0; col < cols; col++) {
                // Inclusion-exclusion over three already-computed
                // neighbors; the top-left term is subtracted because
                // both the row strip and column strip contain it.
                prefix[row + 1][col + 1] =
                    matrix[row][col] + prefix[row][col + 1] + prefix[row + 1][col] - prefix[row][col];
            }
        }
    }

    long long sumRegion(int top, int left, int bottom, int right) {
        // The same inclusion-exclusion in reverse: the strips above and
        // left of the query cancel, leaving the rectangle in O(1).
        return prefix[bottom + 1][right + 1] - prefix[top][right + 1] - prefix[bottom + 1][left] + prefix[top][left];
    }

  private:
    std::vector<std::vector<long long>> prefix;
};
