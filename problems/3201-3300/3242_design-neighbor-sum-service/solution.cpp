#include <vector>

// Construction indexes where every value lives; each query looks the value
// up once and adds its four in-bounds neighbors straight off the grid.
// Distinct values make the index exact, and edge cells simply find fewer
// in-bounds neighbors — no corner or border special cases.
class NeighborSum {
  public:
    NeighborSum(vector<vector<int>> grid) : grid(grid), n(grid.size()) {
        // One walk builds the whole index: values are distinct and run
        // 0..n*n-1, so each value's cell can be stored at its own slot.
        rowOf.assign(n * n, 0);
        colOf.assign(n * n, 0);
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                rowOf[grid[r][c]] = r;
                colOf[grid[r][c]] = c;
            }
        }
    }

    int adjacentSum(int value) { return sumAround(rowOf[value], colOf[value], {{-1, 0}, {1, 0}, {0, -1}, {0, 1}}); }

    int diagonalSum(int value) { return sumAround(rowOf[value], colOf[value], {{-1, -1}, {-1, 1}, {1, -1}, {1, 1}}); }

  private:
    int sumAround(int r, int c, vector<pair<int, int>> offsets) const {
        int total = 0;
        for (auto [dr, dc] : offsets) {
            int nr = r + dr;
            int nc = c + dc;
            if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                total += grid[nr][nc];
            }
        }
        return total;
    }

    vector<vector<int>> grid;
    int n;
    vector<int> rowOf;
    vector<int> colOf;
};
