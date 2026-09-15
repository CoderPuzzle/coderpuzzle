class Solution {
  public:
    vector<string> createGrid(int m, int n) {
        vector<string> grid(m, string(n, '#'));
        grid[0] = string(n, '.');
        for (int i = 1; i < m; i++) {
            grid[i][n - 1] = '.';
        }
        return grid;
    }
};
