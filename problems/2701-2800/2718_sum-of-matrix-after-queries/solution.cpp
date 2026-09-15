class Solution {
  public:
    long long matrixSumQueries(int n, vector<vector<int>> &queries) {
        // Sum reaches n*n*val = 1e13, past INT32_MAX; accumulate in 64-bit.
        vector<bool> seenRows(n, false), seenCols(n, false);
        int remainingRows = n;
        int remainingCols = n;
        long long total = 0;
        for (int i = (int)queries.size() - 1; i >= 0; i--) {
            int kind = queries[i][0], index = queries[i][1], value = queries[i][2];
            if (kind == 0) {
                if (seenRows[index])
                    continue;
                seenRows[index] = true;
                remainingRows--;
                total += (long long)value * remainingCols;
            } else {
                if (seenCols[index])
                    continue;
                seenCols[index] = true;
                remainingCols--;
                total += (long long)value * remainingRows;
            }
        }
        return total;
    }
};
