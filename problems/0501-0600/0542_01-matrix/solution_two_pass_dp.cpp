class Solution {
  public:
    vector<vector<int>> updateMatrix(vector<vector<int>> &mat) {
        int m = mat.size(), n = mat[0].size();
        // No cell sits farther than m*n steps from a zero, so that value
        // stands in for "not yet settled" without colliding with a real
        // distance; zero cells start settled at 0.
        int far = m * n + 1;
        vector<vector<int>> dist(m, vector<int>(n, far));
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    dist[i][j] = 0;
                }
            }
        }
        // Forward sweep: each cell learns from the top and left neighbours,
        // so every zero up and to the left has already done its work here.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i > 0)
                    dist[i][j] = min(dist[i][j], dist[i - 1][j] + 1);
                if (j > 0)
                    dist[i][j] = min(dist[i][j], dist[i][j - 1] + 1);
            }
        }
        // Backward sweep: the same argument with the bottom and right
        // neighbours, so a nearest zero in any direction has now been
        // heard from — whichever sweep met the closer zero wins.
        for (int i = m - 1; i >= 0; i--) {
            for (int j = n - 1; j >= 0; j--) {
                if (i < m - 1)
                    dist[i][j] = min(dist[i][j], dist[i + 1][j] + 1);
                if (j < n - 1)
                    dist[i][j] = min(dist[i][j], dist[i][j + 1] + 1);
            }
        }
        return dist;
    }
};
