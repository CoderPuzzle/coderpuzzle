class Solution {
  public:
    int maximumSafenessFactor(vector<vector<int>> &grid) {
        int n = grid.size();
        // Multi-source BFS from every hazard at once: wavefront exploration
        // makes dist[r][c] the minimum grid steps to the nearest hazard —
        // exactly the cell's clearance value.
        vector<vector<int>> dist(n, vector<int>(n, -1));
        vector<pair<int, int>> q;
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                if (grid[r][c] == 1) {
                    dist[r][c] = 0;
                    q.push_back({r, c});
                }
            }
        }
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        for (size_t head = 0; head < q.size(); head++) {
            int r = q[head].first, c = q[head].second;
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && dist[nr][nc] == -1) {
                    dist[nr][nc] = dist[r][c] + 1;
                    q.push_back({nr, nc});
                }
            }
        }

        // Kruskal-style flood: admit cells in descending clearance, uniting
        // each with its already-admitted 4-neighbors, and watch the corners.
        // Their union traces a real all-admitted path, so it can only happen
        // at a clearance the answer reaches — and the best route's bottleneck
        // cell closes it exactly, making the value being admitted the answer.
        vector<array<int, 3>> cells;
        cells.reserve(n * n);
        for (int r = 0; r < n; r++) {
            for (int c = 0; c < n; c++) {
                cells.push_back({dist[r][c], r, c});
            }
        }
        sort(cells.begin(), cells.end(), [](const array<int, 3> &a, const array<int, 3> &b) { return a[0] > b[0]; });
        vector<int> parent(n * n), size(n * n, 1);
        iota(parent.begin(), parent.end(), 0);
        vector<vector<bool>> admitted(n, vector<bool>(n, false));
        for (const array<int, 3> &cell : cells) {
            int v = cell[0], r = cell[1], c = cell[2];
            admitted[r][c] = true;
            for (int k = 0; k < 4; k++) {
                int nr = r + dr[k], nc = c + dc[k];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n && admitted[nr][nc]) {
                    int a = find(parent, r * n + c), b = find(parent, nr * n + nc);
                    if (a != b) {
                        if (size[a] < size[b]) {
                            swap(a, b);
                        }
                        parent[b] = a;
                        size[a] += size[b];
                    }
                }
            }
            if (find(parent, 0) == find(parent, n * n - 1)) {
                return v;
            }
        }
        // The whole grid admits in the end, so the corners always unite; 0
        // is just the fallback.
        return 0;
    }

  private:
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
