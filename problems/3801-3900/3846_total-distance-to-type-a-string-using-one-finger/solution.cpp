class Solution {
  public:
    int totalDistance(string s) {
        // The keyboard is three ragged rows — qwertyuiop, asdfghjkl,
        // zxcvbnm — so recording each letter's (row, col) cell once turns
        // the answer into a running Manhattan sum: the finger starts on
        // 'a', and each typed letter adds |r1 - r2| + |c1 - c2| for the
        // move from the previous key.
        int row[26] = {0};
        int col[26] = {0};
        const string rows[3] = {"qwertyuiop", "asdfghjkl", "zxcvbnm"};
        for (int r = 0; r < 3; r++) {
            for (int c = 0; c < (int)rows[r].size(); c++) {
                row[rows[r][c] - 'a'] = r;
                col[rows[r][c] - 'a'] = c;
            }
        }
        int total = 0;
        int pr = row[0];
        int pc = col[0];
        for (char ch : s) {
            int idx = ch - 'a';
            total += abs(pr - row[idx]) + abs(pc - col[idx]);
            pr = row[idx];
            pc = col[idx];
        }
        return total;
    }
};
