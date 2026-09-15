class Solution {
  public:
    int shortestPathAllKeys(vector<string> &grid) {
        int m = grid.size();
        int n = grid[0].size();
        int sr = -1, sc = -1;
        int target = 0;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                char ch = grid[i][j];
                if (ch == '@') {
                    sr = i;
                    sc = j;
                } else if (ch >= 'a' && ch <= 'f') {
                    target |= 1 << (ch - 'a');
                }
            }
        }
        int size = 1 << 6;
        vector<int> dist(m * n * size, -1);
        queue<array<int, 3>> q;
        dist[(sr * n + sc) * size] = 0;
        q.push({sr, sc, 0});
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        while (!q.empty()) {
            auto [r, c, mask] = q.front();
            q.pop();
            if (mask == target) {
                return dist[(r * n + c) * size + mask];
            }
            int d = dist[(r * n + c) * size + mask];
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                char ch = grid[nr][nc];
                if (ch == '#') {
                    continue;
                }
                if (ch >= 'A' && ch <= 'F' && !(mask & (1 << (ch - 'A')))) {
                    continue;
                }
                int nmask = mask;
                if (ch >= 'a' && ch <= 'f') {
                    nmask |= 1 << (ch - 'a');
                }
                int idx = (nr * n + nc) * size + nmask;
                if (dist[idx] == -1) {
                    dist[idx] = d + 1;
                    q.push({nr, nc, nmask});
                }
            }
        }
        return -1;
    }
};
