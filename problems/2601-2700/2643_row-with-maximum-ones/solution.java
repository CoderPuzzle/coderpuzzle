class Solution {

    public int[] rowAndMaximumOnes(int[][] mat) {
        // One scan carries the best (count, row) pair seen so far; only a
        // strictly greater count replaces the incumbent, so among tied rows
        // the smallest index automatically survives.
        int bestRow = 0;
        int bestCount = -1;
        for (int rowIndex = 0; rowIndex < mat.length; ++rowIndex) {
            int count = 0;
            for (int value : mat[rowIndex]) {
                if (value == 1) ++count;
            }
            if (count > bestCount) {
                bestCount = count;
                bestRow = rowIndex;
            }
        }
        return new int[] { bestRow, bestCount };
    }
}
