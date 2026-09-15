class Solution {
  public:
    int numSubmat(vector<vector<int>> &mat) {
        int m = (int)mat.size();
        int n = m > 0 ? (int)mat[0].size() : 0;
        int total = 0;
        // height[c]: run of consecutive ones ending at the current row in
        // column c — extended by a one, reset to zero by a zero.
        vector<int> height(n, 0);
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (mat[r][c] == 1) {
                    height[c] += 1;
                } else {
                    height[c] = 0;
                }
            }
            // Anchor submatrices at their bottom row: a span [left, right]
            // admits exactly min(height) of them (every height up to the
            // minimum works), and each submatrix has a unique bottom row and
            // span, so nothing is double-counted.
            for (int left = 0; left < n; left++) {
                int minH = height[left];
                // Widening the span can only lower the minimum, so one
                // running variable tracks it.
                for (int right = left; right < n; right++) {
                    if (height[right] < minH) {
                        minH = height[right];
                    }
                    total += minH;
                }
            }
        }
        return total;
    }
};
