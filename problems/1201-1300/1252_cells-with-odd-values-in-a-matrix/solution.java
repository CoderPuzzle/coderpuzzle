class Solution {

    public int oddCells(int m, int n, int[][] indices) {
        boolean[] rowOdd = new boolean[m];
        boolean[] colOdd = new boolean[n];
        for (int[] rc : indices) {
            // Only parity survives; the cell value is row count + column count.
            rowOdd[rc[0]] = !rowOdd[rc[0]];
            colOdd[rc[1]] = !colOdd[rc[1]];
        }
        int oddRows = 0;
        for (boolean b : rowOdd) if (b) ++oddRows;
        int oddCols = 0;
        for (boolean b : colOdd) if (b) ++oddCols;
        return oddRows * (n - oddCols) + (m - oddRows) * oddCols;
    }
}
