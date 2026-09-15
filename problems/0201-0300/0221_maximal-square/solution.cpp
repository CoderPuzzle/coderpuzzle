class Solution {
  public:
    int maximalSquare(vector<vector<string>> &matrix) {
        int m = matrix.size();
        int n = matrix[0].size();
        int best = 0;
        // Two rolling rows of length n + 1: dp[i][j] is the side of the
        // largest all-ones square ending at (i, j); the leading zero column
        // stands in for the out-of-bounds left border.
        vector<int> prev(n + 1, 0);
        for (int i = 0; i < m; i++) {
            vector<int> curr(n + 1, 0);
            for (int j = 0; j < n; j++) {
                if (matrix[i][j] == "1") {
                    // A square growing out of this corner must fit inside all
                    // three predecessors: up, left, and diagonal — so the
                    // minimum is the binding constraint.
                    curr[j + 1] = min(prev[j], min(prev[j + 1], curr[j])) + 1;
                    best = max(best, curr[j + 1]);
                }
            }
            prev = curr;
        }
        return best * best;
    }
};
