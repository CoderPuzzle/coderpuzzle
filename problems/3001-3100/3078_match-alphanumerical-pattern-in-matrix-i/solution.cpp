class Solution {
  public:
    vector<int> findPattern(vector<vector<int>> &board, vector<string> &pattern) {
        // Corners are scanned row-major, so the first hit already
        // carries the lowest row and then the lowest column. Each
        // candidate is validated by one pass that grows a
        // letter->digit bijection: a letter must repeat its own
        // digit, and a digit already claimed by one letter is
        // refused for every other letter.
        int rows = (int)board.size();
        int cols = (int)board[0].size();
        int pRows = (int)pattern.size();
        int pCols = (int)pattern[0].size();
        for (int r = 0; r + pRows <= rows; ++r) {
            for (int c = 0; c + pCols <= cols; ++c) {
                if (matches(board, pattern, r, c)) {
                    return {r, c};
                }
            }
        }
        return {-1, -1};
    }

  private:
    bool matches(const vector<vector<int>> &board, const vector<string> &pattern, int r, int c) {
        unordered_map<char, int> toDigit;
        unordered_map<int, char> toLetter;
        for (int i = 0; i < (int)pattern.size(); ++i) {
            for (int j = 0; j < (int)pattern[i].size(); ++j) {
                int value = board[r + i][c + j];
                char ch = pattern[i][j];
                if (isdigit((unsigned char)ch)) {
                    if (value != ch - '0') {
                        return false;
                    }
                } else if (toDigit.count(ch)) {
                    if (toDigit[ch] != value) {
                        return false;
                    }
                } else if (toLetter.count(value)) {
                    return false;
                } else {
                    toDigit[ch] = value;
                    toLetter[value] = ch;
                }
            }
        }
        return true;
    }
};
