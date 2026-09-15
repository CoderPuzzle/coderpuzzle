class Solution {
  public:
    int uniquePaths(int m, int n) {
        // One rolling row, seeded with the all-ones counts of the first row.
        vector<int> row(n, 1);
        for (int i = 1; i < m; i++) {
            // row[j] still holds the count from the cell above while row[j-1]
            // was already rewritten this pass, so += applies paths = up + left.
            for (int j = 1; j < n; j++) {
                row[j] += row[j - 1];
            }
        }
        return row[n - 1];
    }
};
