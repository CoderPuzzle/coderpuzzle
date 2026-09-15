class Solution {
  public:
    int firstCompleteIndex(vector<int> &arr, vector<vector<int>> &mat) {
        // Precompute where every value lives, then replay arr bumping each
        // cell's row and column counter; a counter reaching its width or
        // height means that line just finished painting.
        int rows = static_cast<int>(mat.size());
        int columns = static_cast<int>(mat[0].size());
        vector<int> row_of(rows * columns + 1);
        vector<int> column_of(rows * columns + 1);
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < columns; ++c) {
                row_of[mat[r][c]] = r;
                column_of[mat[r][c]] = c;
            }
        }
        vector<int> row_fill(rows, 0);
        vector<int> column_fill(columns, 0);
        for (int index = 0; index < static_cast<int>(arr.size()); ++index) {
            int value = arr[index];
            if (++row_fill[row_of[value]] == columns) {
                return index;
            }
            if (++column_fill[column_of[value]] == rows) {
                return index;
            }
        }
        return -1;
    }
};
