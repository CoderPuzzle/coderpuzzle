class Solution {
  public:
    vector<vector<int>> construct2DArray(vector<int> &original, int m, int n) {
        if (1LL * m * n != (long long)original.size())
            return {};

        vector<vector<int>> result(m, vector<int>(n));
        for (int row = 0; row < m; ++row) {
            for (int column = 0; column < n; ++column)
                result[row][column] = original[row * n + column];
        }
        return result;
    }
};
