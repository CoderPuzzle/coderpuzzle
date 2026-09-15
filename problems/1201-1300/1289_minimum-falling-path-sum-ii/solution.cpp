class Solution {
  public:
    int minFallingPathSum(vector<vector<int>> &grid) {
        int n = grid.size();
        vector<int> prev(grid[0].begin(), grid[0].end()), cur(n);
        for (int i = 1; i < n; i++) {
            int min1 = INT_MAX, min2 = INT_MAX, idx1 = -1;
            for (int j = 0; j < n; j++) {
                int v = prev[j];
                if (v < min1) {
                    min2 = min1;
                    min1 = v;
                    idx1 = j;
                } else if (v < min2) {
                    min2 = v;
                }
            }
            for (int j = 0; j < n; j++) {
                cur[j] = grid[i][j] + (j == idx1 ? min2 : min1);
            }
            swap(prev, cur);
        }
        return *min_element(prev.begin(), prev.end());
    }
};
