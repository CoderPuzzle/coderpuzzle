class Solution {
  public:
    vector<int> pathsWithMaxScore(vector<string> &board) {
        const int MOD = 1000000007;
        int n = (int)board.size();
        // score[i][j] is the best sum reachable at (i, j) from 'S', and
        // ways[i][j] counts the paths achieving it; -1 marks unreachable.
        vector<vector<int>> score(n, vector<int>(n, -1));
        vector<vector<int>> ways(n, vector<int>(n, 0));
        score[n - 1][n - 1] = 0;
        ways[n - 1][n - 1] = 1;
        const int di[] = {1, 0, 1};
        const int dj[] = {0, 1, 1};
        // Sweep bottom-up so every incoming cell (below, right, below-right)
        // is already resolved when a cell is visited. The start square is
        // seeded above and skipped here.
        for (int i = n - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                if (board[i][j] == 'X' || (i == n - 1 && j == n - 1)) {
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
                    char cell = board[i][j];
                    int digit = (cell >= '1' && cell <= '9') ? cell - '0' : 0;
                    score[i][j] = best + digit;
                    ways[i][j] = total % MOD;
                }
            }
        }
        if (ways[0][0] == 0) {
            return {0, 0};
        }
        return {score[0][0], ways[0][0]};
    }
};
