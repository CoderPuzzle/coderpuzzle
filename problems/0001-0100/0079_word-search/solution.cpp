class Solution {
  public:
    bool exist(vector<vector<string>> &board, string word) {
        for (int row = 0; row < (int)board.size(); ++row) {
            for (int col = 0; col < (int)board[0].size(); ++col) {
                if (walk(board, word, row, col, 0))
                    return true;
            }
        }
        return false;
    }

  private:
    // Depth-first walk from one starting cell: every level must supply the
    // next letter and marks its cell so deeper levels cannot step on it twice.
    bool walk(vector<vector<string>> &board, const string &word, int row, int col, int index) {
        if (board[row][col][0] != word[index])
            return false;
        if (index == (int)word.size() - 1)
            return true;
        // The board doubles as the visited set: '#' is never a letter.
        string letter = board[row][col];
        board[row][col] = "#";
        int rows = board.size(), cols = board[0].size();
        bool found = (row > 0 && walk(board, word, row - 1, col, index + 1)) ||
                     (row + 1 < rows && walk(board, word, row + 1, col, index + 1)) ||
                     (col > 0 && walk(board, word, row, col - 1, index + 1)) ||
                     (col + 1 < cols && walk(board, word, row, col + 1, index + 1));
        // Restore on the way out: sibling starts and later cases see the board intact.
        board[row][col] = letter;
        return found;
    }
};
