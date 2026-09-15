class Solution {
  public:
    int minIncrease(int n, vector<vector<int>> &edges, vector<int> &cost) {
        // Scores can only be raised, so every root-to-leaf path must reach
        // M = largest raw path sum. Let f[v] be the largest raw path sum
        // through v; the total raise owed inside v's subtree is g[v] = M -
        // f[v]. g never decreases downward, so an increase is unavoidable
        // exactly when g[v] > g[parent]: that jump cannot be charged any
        // higher. Sums reach 1e5 * 1e9 = 1e14, so use long long throughout.
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }
        // Iterative rooted ordering (trees here can be a single long path).
        vector<int> parent(n, 0), order;
        order.reserve(n);
        vector<char> seen(n, 0);
        seen[0] = 1;
        order.push_back(0);
        for (int i = 0; i < (int)order.size(); ++i) {
            int v = order[i];
            for (int w : adj[v]) {
                if (!seen[w]) {
                    seen[w] = 1;
                    parent[w] = v;
                    order.push_back(w);
                }
            }
        }
        // Pass 1 (bottom-up): down[v] = largest raw suffix sum v..leaf.
        vector<long long> down(n, 0);
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            long long best = 0;
            for (int w : adj[v]) {
                if (parent[w] == v && down[w] > best)
                    best = down[w];
            }
            down[v] = (long long)cost[v] + best;
        }
        // Pass 2 (top-down): f[v] = raw prefix above v + down[v]; propagate
        // the running minimum of f, and count the strict drops of f, which
        // are exactly the jumps of g.
        vector<long long> prefix(n, 0), f(n, 0);
        prefix[0] = cost[0];
        f[0] = down[0];
        int ans = 0;
        for (int i = 1; i < n; ++i) {
            int v = order[i], p = parent[v];
            prefix[v] = prefix[p] + cost[v];
            long long fv = prefix[p] + down[v];
            if (fv < f[p]) {
                ans++;
                f[v] = fv;
            } else {
                f[v] = f[p];
            }
        }
        return ans;
    }
};
