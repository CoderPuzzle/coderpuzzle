class Solution {
  public:
    int equalPairs(vector<vector<int>> &grid) {
        // A pair (row, col) counts when both read as the identical sequence,
        // so hash each row once and look every column up in that multiset:
        // the count for a column is how many rows carry its exact sequence.
        int n = grid.size();
        map<vector<int>, int> row_counts;
        for (const auto &row : grid) {
            row_counts[row]++;
        }
        int pairs = 0;
        for (int c = 0; c < n; c++) {
            vector<int> column(n);
            for (int r = 0; r < n; r++) {
                column[r] = grid[r][c];
            }
            auto it = row_counts.find(column);
            if (it != row_counts.end()) {
                pairs += it->second;
            }
        }
        return pairs;
    }
};
