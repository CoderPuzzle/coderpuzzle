class Solution {

    public long maxScore(int[][] grid) {
        // Scores telescope: however many intermediate hops a journey
        // takes, its total is simply end - start. So only the endpoint
        // pair matters, and the end must sit strictly below or to the
        // right of the start (componentwise). A row-major sweep carries
        // prefixMin[r][c], the smallest value in the rectangle on or
        // above-left of (r, c); strip the cell itself from that
        // rectangle and what remains is exactly its legal start set,
        // split as "row above" plus "running minimum to the left".
        // Answers stay within ±(10⁵ − 1); the long accumulator simply
        // matches the declared return.
        int m = grid.length,
            n = grid[0].length;
        final long BIG = 1_000_000_000_000_000_000L;
        long[][] prefixMin = new long[m][n];
        long best = -BIG;
        for (int r = 0; r < m; ++r) {
            long rowRunning = BIG;
            for (int c = 0; c < n; ++c) {
                long above = r > 0 ? prefixMin[r - 1][c] : BIG;
                long startVal = Math.min(above, rowRunning);
                best = Math.max(best, grid[r][c] - startVal);
                rowRunning = Math.min(rowRunning, grid[r][c]);
                prefixMin[r][c] = Math.min(startVal, grid[r][c]);
            }
        }
        return best;
    }
}
