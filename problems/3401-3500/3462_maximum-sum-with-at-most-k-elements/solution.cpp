class Solution {
  public:
    // Every value is non-negative, so an optimal selection can be found
    // among each row's top limits[i] values: pool those candidates, sort
    // descending, and sum the first k. The sum may reach
    // 250000 * 10^5 = 2.5e10, so accumulate in a long long.
    long long maxSum(vector<vector<int>> &grid, vector<int> &limits, int k) {
        vector<int> pool;
        for (int i = 0; i < (int)grid.size(); i++) {
            vector<int> row = grid[i];
            sort(row.begin(), row.end());
            for (int j = (int)row.size() - 1; j >= (int)row.size() - limits[i] && j >= 0; j--) {
                pool.push_back(row[j]);
            }
        }
        sort(pool.begin(), pool.end(), [](int a, int b) { return a > b; });
        long long total = 0;
        for (int j = 0; j < k && j < (int)pool.size(); j++) {
            total += pool[j];
        }
        return total;
    }
};
