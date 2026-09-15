class Solution {
  public:
    long long maxScore(vector<vector<int>> &grid) {
        // Scores telescope: however many intermediate hops a journey
        // takes, its total is simply end - start. So only the endpoint
        // pair matters, and the end must sit strictly below or to the
        // right of the start (componentwise). A row-major sweep carries
        // prefixMin[r][c], the smallest value in the rectangle on or
        // above-left of (r, c); strip the cell itself from that
        // rectangle and what remains is exactly its legal start set,
        // split as "row above" plus "running minimum to the left".
        // Answers stay within ±(10⁵ − 1); the long long accumulator
        // simply matches the declared return.
        int m = grid.size(), n = grid[0].size();
        const long long BIG = 1e18;
        vector<vector<long long>> prefixMin(m, vector<long long>(n));
        long long best = -BIG;
        for (int r = 0; r < m; ++r) {
            long long rowRunning = BIG;
            for (int c = 0; c < n; ++c) {
                long long above = r > 0 ? prefixMin[r - 1][c] : BIG;
                long long startVal = min(above, rowRunning);
                best = max(best, (long long)grid[r][c] - startVal);
                rowRunning = min(rowRunning, (long long)grid[r][c]);
                prefixMin[r][c] = min(startVal, (long long)grid[r][c]);
            }
        }
        return best;
    }
};
