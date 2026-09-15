class Solution {
  public:
    int countNegatives(vector<vector<int>> &grid) {
        // Negatives are a per-row suffix and the boundary only moves left
        // down the columns, so one monotonically sliding pointer counts all.
        int n = (int)grid[0].size();
        int count = 0;
        int col = n - 1;
        for (const auto &row : grid) {
            while (col >= 0 && row[col] < 0) {
                --col;
            }
            count += n - 1 - col;
        }
        return count;
    }
};
