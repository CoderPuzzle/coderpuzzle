class Solution {

    public long matrixSumQueries(int n, int[][] queries) {
        // Sum reaches n*n*val = 1e13, past INT32_MAX; accumulate in 64-bit.
        boolean[] seenRows = new boolean[n];
        boolean[] seenCols = new boolean[n];
        int remainingRows = n;
        int remainingCols = n;
        long total = 0;
        for (int i = queries.length - 1; i >= 0; i--) {
            int kind = queries[i][0];
            int index = queries[i][1];
            int value = queries[i][2];
            if (kind == 0) {
                if (seenRows[index]) continue;
                seenRows[index] = true;
                remainingRows--;
                total += (long) value * remainingCols;
            } else {
                if (seenCols[index]) continue;
                seenCols[index] = true;
                remainingCols--;
                total += (long) value * remainingRows;
            }
        }
        return total;
    }
}
