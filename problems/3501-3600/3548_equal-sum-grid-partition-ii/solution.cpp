class Solution {
  public:
    bool canPartitionGrid(std::vector<std::vector<int>> &grid) {
        // A straight cut yields two rectangular slabs. Removing any single
        // cell from a slab spanning at least two rows and two columns keeps
        // it connected, so only slabs that are a single row or column
        // restrict the discount to their two end cells (a 1x1 slab would
        // empty out and can never match the other side's positive sum).
        // Sweep each axis twice with rolling prefix sums and a value set:
        // the forward pass tries discounting the leading slab, the backward
        // pass the trailing one. Sums reach 10^5 * 10^5 = 10^10, so they
        // are carried in long long.
        int m = grid.size();
        int n = grid[0].size();
        long long total = 0;
        for (const auto &row : grid) {
            for (int v : row) {
                total += v;
            }
        }
        std::unordered_set<long long> seen;
        long long top = 0;
        for (int i = 0; i < m - 1; i++) {
            for (int v : grid[i]) {
                seen.insert(v);
                top += v;
            }
            long long bottom = total - top;
            if (top == bottom || (top > bottom && canDiscount(grid, top - bottom, 0, i, false, m, n, seen))) {
                return true;
            }
        }
        seen.clear();
        long long bottom = 0;
        for (int i = m - 1; i > 0; i--) {
            for (int v : grid[i]) {
                seen.insert(v);
                bottom += v;
            }
            top = total - bottom;
            if (top == bottom || (bottom > top && canDiscount(grid, bottom - top, i, m - 1, false, m, n, seen))) {
                return true;
            }
        }
        seen.clear();
        long long left = 0;
        for (int j = 0; j < n - 1; j++) {
            for (int r = 0; r < m; r++) {
                seen.insert(grid[r][j]);
                left += grid[r][j];
            }
            long long right = total - left;
            if (left == right || (left > right && canDiscount(grid, left - right, 0, j, true, m, n, seen))) {
                return true;
            }
        }
        seen.clear();
        long long right = 0;
        for (int j = n - 1; j > 0; j--) {
            for (int r = 0; r < m; r++) {
                seen.insert(grid[r][j]);
                right += grid[r][j];
            }
            left = total - right;
            if (left == right || (right > left && canDiscount(grid, right - left, j, n - 1, true, m, n, seen))) {
                return true;
            }
        }
        return false;
    }

  private:
    bool canDiscount(std::vector<std::vector<int>> &grid, long long d, int a, int b, bool vertical, int m, int n,
                     std::unordered_set<long long> &seen) {
        // Can discounting one cell of value d from the slab rows/cols
        // a..b equalize the two sides while keeping the slab connected?
        if (vertical) {
            if (a == b) {
                return m > 1 && (grid[0][a] == d || grid[m - 1][a] == d);
            }
            if (m == 1) {
                return grid[0][a] == d || grid[0][b] == d;
            }
            return seen.count(d) > 0;
        }
        if (a == b) {
            return n > 1 && (grid[a][0] == d || grid[a][n - 1] == d);
        }
        if (n == 1) {
            return grid[a][0] == d || grid[b][0] == d;
        }
        return seen.count(d) > 0;
    }
};
