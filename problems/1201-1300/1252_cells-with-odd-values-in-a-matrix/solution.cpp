class Solution {
  public:
    int oddCells(int m, int n, vector<vector<int>> &indices) {
        vector<char> rowOdd(m, 0), colOdd(n, 0);
        for (const auto &rc : indices) {
            // Only parity survives; the cell value is row count + column count.
            rowOdd[rc[0]] ^= 1;
            colOdd[rc[1]] ^= 1;
        }
        long long oddRows = count(rowOdd.begin(), rowOdd.end(), 1);
        long long oddCols = count(colOdd.begin(), colOdd.end(), 1);
        return static_cast<int>(oddRows * (n - oddCols) + (m - oddRows) * oddCols);
    }
};
