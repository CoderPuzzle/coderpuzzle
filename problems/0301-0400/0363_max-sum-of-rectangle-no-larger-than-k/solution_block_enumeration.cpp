class Solution {
  public:
    int maxSumSubmatrix(vector<vector<int>> &matrix, int k) {
        int m = (int)matrix.size();
        int n = (int)matrix[0].size();
        // prefix[r][c] = sum of the r x c rectangle in the top-left corner;
        // any block is four lookups against this table.
        vector<vector<int>> prefix(m + 1, vector<int>(n + 1, 0));
        for (int r = 1; r <= m; r++) {
            for (int c = 1; c <= n; c++) {
                prefix[r][c] = prefix[r - 1][c] + prefix[r][c - 1] - prefix[r - 1][c - 1] + matrix[r - 1][c - 1];
            }
        }
        // Walk every block by its four corner coordinates and keep the
        // largest total that respects the cap.
        int best = INT_MIN;
        for (int top = 0; top < m; top++) {
            for (int bottom = top; bottom < m; bottom++) {
                for (int left = 0; left < n; left++) {
                    const auto &pt = prefix[top];
                    const auto &pb = prefix[bottom + 1];
                    for (int right = left; right < n; right++) {
                        int total = pb[right + 1] - pt[right + 1] - pb[left] + pt[left];
                        if (total <= k) {
                            best = max(best, total);
                        }
                    }
                }
            }
        }
        return best;
    }
};
