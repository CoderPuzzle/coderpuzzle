class Solution {
  public:
    int minimumOperations(vector<vector<int>> &grid) {
        // Vertical equality makes each column one constant value;
        // horizontal inequality only links adjacent columns. dp[v] =
        // cheapest total for processed columns ending with value v,
        // extended over the ten digits that grid cells may hold.
        int rows = static_cast<int>(grid.size());
        vector<int> previous(10, 0);
        for (int j = 0; j < static_cast<int>(grid[0].size()); j++) {
            vector<int> counts(10, 0);
            for (const vector<int> &row : grid) {
                counts[row[j]]++;
            }
            vector<int> current(10, 0);
            for (int value = 0; value < 10; value++) {
                int bestPrev = INT_MAX;
                for (int k = 0; k < 10; k++) {
                    if (k != value && previous[k] < bestPrev) {
                        bestPrev = previous[k];
                    }
                }
                current[value] = rows - counts[value] + bestPrev;
            }
            previous = current;
        }
        return *min_element(previous.begin(), previous.end());
    }
};
