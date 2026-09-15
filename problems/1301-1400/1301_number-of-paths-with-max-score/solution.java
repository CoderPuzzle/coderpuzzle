class Solution {

    public int[] pathsWithMaxScore(String[] board) {
        final int MOD = 1000000007;
        int n = board.length;
        // score[i][j] is the best sum reachable at (i, j) from 'S', and
        // ways[i][j] counts the paths achieving it; -1 marks unreachable.
        int[][] score = new int[n][n];
        int[][] ways = new int[n][n];
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                score[i][j] = -1;
            }
        }
        score[n - 1][n - 1] = 0;
        ways[n - 1][n - 1] = 1;
        int[] di = { 1, 0, 1 };
        int[] dj = { 0, 1, 1 };
        // Sweep bottom-up so every incoming cell (below, right, below-right)
        // is already resolved when a cell is visited. The start square is
        // seeded above and skipped here.
        for (int i = n - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                if (board[i].charAt(j) == 'X' || (i == n - 1 && j == n - 1)) {
                    continue;
                }
                int best = -1;
                int total = 0;
                for (int step = 0; step < 3; ++step) {
                    int ni = i + di[step];
                    int nj = j + dj[step];
                    if (ni >= n || nj >= n || score[ni][nj] < 0) {
                        continue;
                    }
                    if (score[ni][nj] > best) {
                        best = score[ni][nj];
                        total = ways[ni][nj];
                    } else if (score[ni][nj] == best) {
                        total = (total + ways[ni][nj]) % MOD;
                    }
                }
                if (best >= 0) {
                    char cell = board[i].charAt(j);
                    int digit = cell >= '1' && cell <= '9' ? cell - '0' : 0;
                    score[i][j] = best + digit;
                    ways[i][j] = total % MOD;
                }
            }
        }
        if (ways[0][0] == 0) {
            return new int[] { 0, 0 };
        }
        return new int[] { score[0][0], ways[0][0] };
    }
}
