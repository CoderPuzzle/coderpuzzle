#include <utility>
#include <vector>

class NumMatrix {
  public:
    // 2D Fenwick tree: cell (i, j) sums the rectangle i & -i rows tall and
    // j & -j columns wide ending at (i, j). 1-based in both dims, row/column
    // 0 unused so the low-bit arithmetic is valid.
    explicit NumMatrix(std::vector<std::vector<int>> matrix)
        : m((int)matrix.size()), n((int)matrix[0].size()), matrix(std::move(matrix)) {
        tree.assign(m + 1, std::vector<long long>(n + 1, 0));
        // O(m*n) build: each source row becomes a 1D Fenwick row in one
        // pass, every finished block pushed into its parent column.
        for (int i = 1; i <= m; i++) {
            std::vector<long long> row(n + 1, 0);
            const std::vector<int> &source = this->matrix[i - 1];
            for (int j = 1; j <= n; j++) {
                row[j] += source[j - 1];
                int parent = j + (j & -j);
                if (parent <= n) {
                    row[parent] += row[j];
                }
            }
            // The finished row is added into its own tree slot, then pushed
            // whole into the parent row's slot.
            std::vector<long long> &treeRow = tree[i];
            for (int j = 1; j <= n; j++) {
                treeRow[j] += row[j];
            }
            int parentRow = i + (i & -i);
            if (parentRow <= m) {
                std::vector<long long> &target = tree[parentRow];
                for (int j = 1; j <= n; j++) {
                    target[j] += treeRow[j];
                }
            }
        }
    }

    void update(int row, int col, int value) {
        // Only the delta is applied; the matrix copy keeps later deltas right.
        long long delta = (long long)value - matrix[row][col];
        matrix[row][col] = value;
        // Dual climb over rows and columns visits exactly the tree cells
        // whose stored rectangle contains the written cell.
        for (int i = row + 1; i <= m; i += i & -i) {
            for (int j = col + 1; j <= n; j += j & -j) {
                tree[i][j] += delta;
            }
        }
    }

    long long sumRegion(int top, int left, int bottom, int right) {
        // Inclusion-exclusion over four top-left-anchored prefix rectangles.
        return prefix(bottom + 1, right + 1) - prefix(top, right + 1) - prefix(bottom + 1, left) + prefix(top, left);
    }

  private:
    long long prefix(int rows, int cols) {
        long long total = 0;
        // Strip low bits from the row index, and within each row strip from
        // the column index; the disjoint rectangles exactly tile the region.
        for (int i = rows; i > 0; i -= i & -i) {
            for (int j = cols; j > 0; j -= j & -j) {
                total += tree[i][j];
            }
        }
        return total;
    }

    int m;
    int n;
    std::vector<std::vector<int>> matrix;
    std::vector<std::vector<long long>> tree;
};
