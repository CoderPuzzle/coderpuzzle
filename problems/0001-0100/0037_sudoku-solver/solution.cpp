class Solution {
  public:
    vector<vector<string>> solveSudoku(vector<vector<string>> &board) {
        // One pass collects the empty cells and records the digits already
        // used in 27 bitmasks -- one per row, column, and 3x3 box -- with
        // digit d encoded as bit 1 << d.
        int rows[9] = {0}, cols[9] = {0}, boxes[9] = {0};
        vector<pair<int, int>> empties;
        for (int r = 0; r < 9; r++) {
            for (int c = 0; c < 9; c++) {
                char ch = board[r][c][0];
                if (ch == '.') {
                    empties.push_back({r, c});
                } else {
                    int bit = 1 << (ch - '0');
                    rows[r] |= bit;
                    cols[c] |= bit;
                    // Box index flattens the 3x3 block grid.
                    boxes[(r / 3) * 3 + c / 3] |= bit;
                }
            }
        }
        backtrack(board, rows, cols, boxes, empties, 0);
        // The board was solved in place and is the answer as-is.
        return board;
    }

  private:
    bool backtrack(vector<vector<string>> &board, int rows[9], int cols[9], int boxes[9],
                   vector<pair<int, int>> &empties, int k) {
        // Past the last empty cell: a complete consistent assignment. True
        // unwinds the whole stack immediately, so the solver stops at the
        // first solution (the puzzle is guaranteed unique).
        if (k == (int)empties.size()) {
            return true;
        }
        int r = empties[k].first, c = empties[k].second;
        int b = (r / 3) * 3 + c / 3;
        for (int d = 1; d <= 9; d++) {
            int bit = 1 << d;
            // Legality is three constant-time ANDs against the masks,
            // instead of re-scanning 27 cells.
            if ((rows[r] & bit) || (cols[c] & bit) || (boxes[b] & bit)) {
                continue;
            }
            // Place d: set its three bits, write the cell, attack k + 1.
            rows[r] |= bit;
            cols[c] |= bit;
            boxes[b] |= bit;
            board[r][c] = string(1, '0' + d);
            if (backtrack(board, rows, cols, boxes, empties, k + 1)) {
                return true;
            }
            // Every choice downstream failed: undo the placement -- XOR
            // clears each bit and the cell reverts to '.'.
            rows[r] ^= bit;
            cols[c] ^= bit;
            boxes[b] ^= bit;
            board[r][c] = ".";
        }
        return false;
    }
};
