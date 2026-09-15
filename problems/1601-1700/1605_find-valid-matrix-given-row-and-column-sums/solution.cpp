class Solution {
  public:
    vector<vector<int>> restoreMatrix(vector<int> &rowSum, vector<int> &colSum) {
        int rows = rowSum.size();
        int cols = colSum.size();
        vector<int> remainingRow = rowSum;
        vector<int> remainingCol = colSum;
        vector<vector<int>> matrix(rows, vector<int>(cols, 0));
        for (int i = 0; i < rows; i++) {
            for (int j = 0; j < cols; j++) {
                int value = min(remainingRow[i], remainingCol[j]);
                matrix[i][j] = value;
                remainingRow[i] -= value;
                remainingCol[j] -= value;
            }
        }
        return matrix;
    }
};
