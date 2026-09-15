class Solution {
  public:
    int numberOfPatterns(int m, int n) {
        // skip[a][b]: the dot whose center the segment a-b passes straight
        // through (0 when it passes through none) — the eight pairs whose
        // endpoints lie on one row, column, or diagonal with a dot between.
        vector<vector<int>> skip(10, vector<int>(10, 0));
        skip[1][3] = skip[3][1] = 2;
        skip[1][7] = skip[7][1] = 4;
        skip[3][9] = skip[9][3] = 6;
        skip[7][9] = skip[9][7] = 8;
        skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = 5;
        skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5;
        // Rotations and reflections of the grid preserve every blocking
        // relation while permuting corners among themselves and edge
        // midpoints among themselves, so three searches (corner 1, edge 2,
        // center 5) cover all nine starting dots.
        return 4 * walk(1 | 1 << 1, 1, 1, m, n, skip) + 4 * walk(1 | 1 << 2, 2, 1, m, n, skip) +
               walk(1 | 1 << 5, 5, 1, m, n, skip);
    }

  private:
    // The prefix built so far already counts as one pattern once it holds m
    // dots; it can keep growing only while under n.
    int walk(int used, int last, int length, int m, int n, vector<vector<int>> &skip) {
        int total = length >= m ? 1 : 0;
        if (length == n)
            return total;
        for (int next = 1; next <= 9; ++next) {
            // `used` always has bit 0 set: a phantom dot standing for "no
            // dot in between", so skip 0 passes the same already-visited
            // check as every real blocking dot.
            if ((used >> next & 1) == 0 && (used >> skip[last][next] & 1) == 1) {
                total += walk(used | 1 << next, next, length + 1, m, n, skip);
            }
        }
        return total;
    }
};
