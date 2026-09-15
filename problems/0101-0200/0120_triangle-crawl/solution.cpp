class Solution {
  public:
    int minimumTotal(vector<vector<int>> &triangle) {
        // Work upward from the bottom: row[j] is the cheapest path sum from
        // column j of the row being folded down to the bottom, so a single
        // array of n entries is all the state the scan ever needs.
        vector<int> row(triangle.back());
        for (int i = (int)triangle.size() - 2; i >= 0; --i) {
            for (int j = 0; j <= i; ++j) {
                // From (i, j) the two allowed steps land on (i + 1, j) and
                // (i + 1, j + 1); both sums are final before the overwrite
                // retires row[j].
                row[j] = triangle[i][j] + min(row[j], row[j + 1]);
            }
        }
        return row[0];
    }
};
