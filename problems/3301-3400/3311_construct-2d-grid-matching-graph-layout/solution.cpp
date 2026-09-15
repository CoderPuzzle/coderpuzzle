class Solution {
  public:
    vector<vector<int>> constructGridLayout(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adj(n);
        for (const vector<int> &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        // 1 x C (or R x 1) input: the graph is a path with two degree-1 ends.
        int endpoint = -1;
        for (int v = 0; v < n && endpoint < 0; v++) {
            if (adj[v].size() == 1) {
                endpoint = v;
            }
        }
        if (endpoint >= 0) {
            vector<bool> placed(n, false);
            vector<int> row;
            row.push_back(endpoint);
            placed[endpoint] = true;
            while (true) {
                int next = -1;
                for (int u : adj[row.back()]) {
                    if (!placed[u]) {
                        next = u;
                    }
                }
                if (next < 0) {
                    break;
                }
                row.push_back(next);
                placed[next] = true;
            }
            return vector<vector<int>>(1, row);
        }

        // Both dimensions >= 2: corners are exactly the degree-2 nodes, and
        // edges = 2n - (rows + cols), so rows + cols is known from n and E.
        int corner = -1;
        for (int v = 0; v < n && corner < 0; v++) {
            if (adj[v].size() == 2) {
                corner = v;
            }
        }
        int dimsSum = 2 * n - (int)edges.size();
        int rows = 0, cols = 0;
        for (int t = 1; t < dimsSum; t++) {
            if ((long long)t * (dimsSum - t) == n) {
                rows = t;
                cols = dimsSum - t;
                break;
            }
        }
        for (int first : adj[corner]) {
            vector<vector<int>> grid = build(adj, corner, first, rows, cols);
            if (!grid.empty()) {
                return grid;
            }
        }
        return {};
    }

  private:
    static vector<vector<int>> build(vector<vector<int>> &adj, int corner, int first, int rows, int cols) {
        int n = (int)adj.size();
        vector<bool> placed(n, false);
        vector<int> row0;
        row0.push_back(corner);
        row0.push_back(first);
        placed[corner] = placed[first] = true;
        while ((int)row0.size() < cols) {
            int w = row0[row0.size() - 1];
            int p = row0[row0.size() - 2];
            int next = -1;
            for (int u : adj[w]) {
                if (placed[u] || u == p) {
                    continue;
                }
                if (sharesNeighbor(adj, u, p, w)) {
                    continue;
                }
                if (next >= 0) {
                    return {};
                }
                next = u;
            }
            if (next < 0) {
                return {};
            }
            row0.push_back(next);
            placed[next] = true;
        }

        vector<vector<int>> grid;
        grid.push_back(row0);
        while ((int)grid.size() < rows) {
            const vector<int> &prev = grid.back();
            vector<int> row;
            int start = -1;
            for (int u : adj[prev[0]]) {
                if (!placed[u]) {
                    if (start >= 0) {
                        return {};
                    }
                    start = u;
                }
            }
            if (start < 0) {
                return {};
            }
            row.push_back(start);
            placed[start] = true;
            for (int j = 1; j < cols; j++) {
                int hit = -1;
                for (int u : adj[row[j - 1]]) {
                    if (placed[u] || !contains(adj[prev[j]], u)) {
                        continue;
                    }
                    if (hit >= 0) {
                        return {};
                    }
                    hit = u;
                }
                if (hit < 0) {
                    return {};
                }
                row.push_back(hit);
                placed[hit] = true;
            }
            grid.push_back(row);
        }
        for (int v = 0; v < n; v++) {
            if (!placed[v]) {
                return {};
            }
        }
        return grid;
    }

    static bool sharesNeighbor(vector<vector<int>> &adj, int u, int p, int w) {
        for (int z : adj[u]) {
            if (z == w) {
                continue;
            }
            for (int x : adj[p]) {
                if (z == x) {
                    return true;
                }
            }
        }
        return false;
    }

    static bool contains(vector<int> &list, int value) {
        for (int item : list) {
            if (item == value) {
                return true;
            }
        }
        return false;
    }
};
