class Solution {

    public int numberOfSubmatrices(String[][] grid) {
        // Every counted submatrix contains grid[0][0], so each candidate is
        // exactly the top-left rectangle ending at some cell. A running sum
        // over the current row plus the previous row's prefix sums gives each
        // rectangle's signed balance (X = +1, Y = -1); a parallel array gives
        // its X-count. Count cells whose balance is zero but which hold at
        // least one X.
        int cols = grid[0].length;
        int[] prevSum = new int[cols];
        int[] prevX = new int[cols];
        int total = 0;
        for (int r = 0; r < grid.length; ++r) {
            int[] curSum = new int[cols];
            int[] curX = new int[cols];
            int runSum = 0;
            int runX = 0;
            boolean above = r > 0;
            for (int c = 0; c < cols; ++c) {
                char cell = grid[r][c].charAt(0);
                if (cell == 'X') {
                    ++runSum;
                    ++runX;
                } else if (cell == 'Y') {
                    --runSum;
                }
                int s = runSum;
                int x = runX;
                if (above) {
                    // rect(r, c) = row-run + rect(r - 1, c).
                    s += prevSum[c];
                    x += prevX[c];
                }
                curSum[c] = s;
                curX[c] = x;
                if (s == 0 && x > 0) ++total;
            }
            prevSum = curSum;
            prevX = curX;
        }
        return total;
    }
}
