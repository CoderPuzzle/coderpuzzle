class Solution {
  public:
    int kthLargestValue(vector<vector<int>> &matrix, int k) {
        // A coordinate value is the XOR of the upper-left submatrix ending
        // there, and XOR cancels itself: prefix[a][b] = matrix[a][b]
        // ^ prefix[a-1][b] ^ prefix[a][b-1] ^ prefix[a-1][b-1]. Sweeping row
        // by row, the running XOR of the current row folded with the
        // previous prefix row yields the new row in O(n) space; collect all
        // m * n values, sort, and the kth largest sits k from the end.
        int n = matrix[0].size();
        vector<int> above(n, 0);
        vector<int> values;
        values.reserve(matrix.size() * n);
        for (const vector<int> &row : matrix) {
            int left = 0;
            vector<int> current(n);
            for (int j = 0; j < n; ++j) {
                left ^= row[j];
                current[j] = left ^ above[j];
                values.push_back(current[j]);
            }
            above = move(current);
        }

        sort(values.begin(), values.end());
        return values[values.size() - k];
    }
};
