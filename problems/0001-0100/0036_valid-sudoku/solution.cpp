class Solution {
  public:
    bool isValidSudoku(vector<vector<string>> &board) {
        // One seen-set per row, column, and 3x3 box: insert each filled
        // cell's digit into the three units it belongs to, and the first
        // repeat anywhere is the answer.
        vector<unordered_set<char>> rows(9), columns(9), boxes(9);
        for (int r = 0; r < 9; ++r) {
            for (int c = 0; c < 9; ++c) {
                char digit = board[r][c][0];
                if (digit == '.')
                    continue;
                // Rows and columns are chunked in threes, so this numbers
                // the 3x3 boxes 0 through 8.
                int b = (r / 3) * 3 + c / 3;
                if (rows[r].count(digit) || columns[c].count(digit) || boxes[b].count(digit))
                    return false;
                rows[r].insert(digit);
                columns[c].insert(digit);
                boxes[b].insert(digit);
            }
        }
        return true;
    }
};
