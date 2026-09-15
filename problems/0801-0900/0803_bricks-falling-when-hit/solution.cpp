class Solution {
  public:
    vector<int> parent;
    vector<int> sz;

    int find(int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(int a, int b) {
        int ra = find(a), rb = find(b);
        if (ra == rb)
            return;
        if (sz[ra] < sz[rb])
            swap(ra, rb);
        parent[rb] = ra;
        sz[ra] += sz[rb];
    }

    vector<int> hitBricks(vector<vector<int>> &grid, vector<vector<int>> &hits) {
        int m = grid.size(), n = grid[0].size();
        int top = m * n;
        parent.resize(top + 1);
        for (int i = 0; i <= top; i++)
            parent[i] = i;
        sz.assign(top + 1, 1);
        sz[top] = 0;

        // Final grid after all hits are applied.
        vector<vector<int>> g(m, vector<int>(n));
        for (int r = 0; r < m; r++)
            for (int c = 0; c < n; c++)
                g[r][c] = grid[r][c];
        for (auto &hit : hits)
            g[hit[0]][hit[1]] = 0;

        int dr[] = {-1, 1, 0, 0};
        int dc[] = {0, 0, -1, 1};

        // Union all remaining bricks with each other and with the virtual top.
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (g[r][c] == 1) {
                    if (r == 0)
                        unite(r * n + c, top);
                    if (r + 1 < m && g[r + 1][c] == 1)
                        unite(r * n + c, (r + 1) * n + c);
                    if (c + 1 < n && g[r][c + 1] == 1)
                        unite(r * n + c, r * n + c + 1);
                }
            }
        }

        vector<int> res(hits.size(), 0);
        for (int k = (int)hits.size() - 1; k >= 0; k--) {
            int r = hits[k][0], c = hits[k][1];
            if (grid[r][c] != 1)
                continue;
            int before = sz[find(top)];
            g[r][c] = 1;
            if (r == 0)
                unite(r * n + c, top);
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (0 <= nr && nr < m && 0 <= nc && nc < n && g[nr][nc] == 1) {
                    unite(r * n + c, nr * n + nc);
                }
            }
            int after = sz[find(top)];
            res[k] = max(0, after - before - 1);
        }
        return res;
    }
};
