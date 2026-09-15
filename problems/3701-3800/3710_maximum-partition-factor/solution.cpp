class Solution {
  public:
    int maxPartitionFactor(vector<vector<int>> &points) {
        int n = points.size();
        // Both groups are singletons, so no intra-group pair exists and the
        // factor is 0 by definition.
        if (n == 2) {
            return 0;
        }
        vector<vector<int>> dist(n, vector<int>(n));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                dist[i][j] = abs(points[i][0] - points[j][0]) + abs(points[i][1] - points[j][1]);
            }
        }
        // The factor of any split is 0 or one of the inter-point distances,
        // so binary search probes those candidate thresholds only.
        vector<int> candidates;
        candidates.push_back(0);
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                candidates.push_back(dist[i][j]);
            }
        }
        sort(candidates.begin(), candidates.end());
        candidates.erase(unique(candidates.begin(), candidates.end()), candidates.end());

        // Raising the threshold only adds conflict edges, so feasibility is
        // monotone and the largest separable threshold is the answer.
        int lo = 0, hi = (int)candidates.size() - 1;
        while (lo < hi) {
            int mid = lo + (hi - lo + 1) / 2;
            if (separable(dist, n, candidates[mid])) {
                lo = mid;
            } else {
                hi = mid - 1;
            }
        }
        return candidates[lo];
    }

  private:
    // Every pair closer than limit must be split across the two groups --
    // exactly "the conflict graph is bipartite".
    static bool separable(const vector<vector<int>> &dist, int n, int limit) {
        vector<vector<int>> adj(n);
        for (int u = 0; u < n; ++u) {
            for (int v = 0; v < n; ++v) {
                if (v != u && dist[u][v] < limit) {
                    adj[u].push_back(v);
                }
            }
        }
        vector<int> color(n, -1), stack;
        for (int start = 0; start < n; ++start) {
            if (color[start] != -1) {
                continue;
            }
            color[start] = 0;
            stack.push_back(start);
            while (!stack.empty()) {
                int u = stack.back();
                stack.pop_back();
                for (int v : adj[u]) {
                    if (color[v] == -1) {
                        color[v] = color[u] ^ 1;
                        stack.push_back(v);
                    } else if (color[v] == color[u]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
