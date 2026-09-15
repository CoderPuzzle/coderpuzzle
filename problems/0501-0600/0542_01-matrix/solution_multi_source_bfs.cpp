class Solution {
  public:
    vector<vector<int>> updateMatrix(vector<vector<int>> &mat) {
        int m = mat.size(), n = mat[0].size();
        vector<vector<int>> dist(m, vector<int>(n, -1));
        deque<int> queue;
        // Reverse the question: every zero broadcasts at distance 0 and the
        // first wavefront to reach a cell arrives on a shortest path.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (mat[i][j] == 0) {
                    dist[i][j] = 0;
                    queue.push_back(i * n + j);
                }
            }
        }
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        while (!queue.empty()) {
            int cell = queue.front();
            queue.pop_front();
            int i = cell / n, j = cell % n;
            for (int dir = 0; dir < 4; dir++) {
                int ni = i + dr[dir], nj = j + dc[dir];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && dist[ni][nj] == -1) {
                    // An unset distance doubles as the visited check, and
                    // assigning before enqueueing keeps each cell queued
                    // exactly once; non-decreasing dequeue order makes the
                    // first assignment final.
                    dist[ni][nj] = dist[i][j] + 1;
                    queue.push_back(ni * n + nj);
                }
            }
        }
        return dist;
    }
};
