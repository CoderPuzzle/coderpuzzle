class Solution {
  public:
    vector<string> createGrid(int m, int n, int k) {
        if (m == 1 || n == 1) {
            if (k != 1) {
                return {};
            }
            return vector<string>(m, string(n, '.'));
        }

        // (height, width, is the 3x3 k=4 pattern) per k, tried in order.
        const int blocks[4][3][3] = {
            {{1, 1, 0}},
            {{2, 2, 0}},
            {{2, 3, 0}, {3, 2, 0}},
            {{2, 4, 0}, {4, 2, 0}, {3, 3, 1}},
        };
        for (int b = 0; b < 3; b++) {
            int height = blocks[k - 1][b][0];
            int width = blocks[k - 1][b][1];
            if (height == 0 || height > m || width > n) {
                continue;
            }
            vector<string> grid(m, string(n, '#'));
            for (int i = 0; i < height; i++) {
                for (int j = 0; j < width; j++) {
                    grid[i][j] = '.';
                }
            }
            if (blocks[k - 1][b][2]) {
                grid[0][width - 1] = '#';
                grid[height - 1][0] = '#';
            }
            for (int j = width - 1; j < n; j++) {
                grid[height - 1][j] = '.';
            }
            for (int i = height - 1; i < m; i++) {
                grid[i][n - 1] = '.';
            }
            return grid;
        }
        return {};
    }
};
