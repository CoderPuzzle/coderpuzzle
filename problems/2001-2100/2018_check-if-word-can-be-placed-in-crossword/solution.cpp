class Solution {
  private:
    vector<vector<string>> *board;
    string word;

    bool matches(int row, int column, int rowStep, int columnStep, int length) {
        if (length != (int)word.size())
            return false;
        bool forward = true;
        bool backward = true;
        for (int offset = 0; offset < length; ++offset) {
            char cell = (*board)[row + rowStep * offset][column + columnStep * offset][0];
            if (cell != ' ') {
                forward &= cell == word[offset];
                backward &= cell == word[length - 1 - offset];
            }
        }
        return forward || backward;
    }

  public:
    bool placeWordInCrossword(vector<vector<string>> &cells, string target) {
        board = &cells;
        word = target;
        int rows = cells.size();
        int columns = cells[0].size();

        for (int row = 0; row < rows; ++row) {
            int start = 0;
            for (int end = 0; end <= columns; ++end) {
                if (end == columns || cells[row][end] == "#") {
                    if (matches(row, start, 0, 1, end - start))
                        return true;
                    start = end + 1;
                }
            }
        }

        for (int column = 0; column < columns; ++column) {
            int start = 0;
            for (int end = 0; end <= rows; ++end) {
                if (end == rows || cells[end][column] == "#") {
                    if (matches(start, column, 1, 0, end - start))
                        return true;
                    start = end + 1;
                }
            }
        }

        return false;
    }
};
