class Solution {
  public:
    vector<int> findDiagonalOrder(vector<vector<int>> &mat) {
        // Every anti-diagonal is the set of cells with i + j == d; walk the
        // diagonals in increasing d and let d's parity pick the direction.
        int m = mat.size(), n = mat[0].size();
        vector<int> order;
        order.reserve(m * n);
        for (int d = 0; d < m + n - 1; ++d) {
            // Rows on diagonal d: the column d - i stays in range exactly for
            // i between max(0, d - n + 1) and min(d, m - 1).
            int low = max(0, d - n + 1);
            int high = min(d, m - 1);
            if (d % 2 == 0) {
                // Even diagonal: read it upward, bottom row first.
                for (int i = high; i >= low; --i) {
                    order.push_back(mat[i][d - i]);
                }
            } else {
                // Odd diagonal: read it downward, top row first.
                for (int i = low; i <= high; ++i) {
                    order.push_back(mat[i][d - i]);
                }
            }
        }
        return order;
    }
};
