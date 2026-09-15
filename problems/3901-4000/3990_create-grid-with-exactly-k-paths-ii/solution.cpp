class Solution {
  public:
    vector<string> createGrid(int k) {
        int e = 32 - __builtin_clz(k) - 1;
        if (e == 0) {
            return {"."};
        }

        int width = 2 * e + 4; // collector column 2e+3 at the right edge
        vector<string> grid(2 * e + 1, string(width, '#'));
        grid[0][0] = grid[0][1] = '.'; // start feeds doubler 1's entry (0, 2)
        for (int d = 1; d <= e; d++) {
            for (int i = 2 * d - 2; i <= 2 * d - 1; i++) { // open 2x2 doubler
                for (int j = 2 * d; j <= 2 * d + 1; j++) {
                    grid[i][j] = '.';
                }
            }
            if (d < e) {
                // forced down-then-right connector; the alternative cell
                // (2d-1, 2d+2) stays an obstacle
                grid[2 * d][2 * d + 1] = '.';
            }
        }

        int top = 2 * e;
        for (int b = 0; b < e; b++) { // bit b shunts from doubler (b+1)'s top-right
            if ((k >> b) & 1) {
                for (int j = 2 * b + 4; j < width; j++) {
                    grid[2 * b][j] = '.';
                }
                top = min(top, 2 * b);
            }
        }
        // leading bit e: the chain exit drops one row, below every other
        // shunt, then runs right to the collector column
        grid[2 * e][2 * e + 1] = '.';
        for (int j = 2 * e + 2; j < width; j++) {
            grid[2 * e][j] = '.';
        }
        for (int i = top; i <= 2 * e; i++) { // collector descends to (2e, 2e+3)
            grid[i][2 * e + 3] = '.';
        }
        return grid;
    }
};
