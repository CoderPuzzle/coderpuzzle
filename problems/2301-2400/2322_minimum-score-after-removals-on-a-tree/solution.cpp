class Solution {
  public:
    int minimumScore(vector<int> &nums, vector<vector<int>> &edges) {
        int n = nums.size();
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Iterative DFS from node 0 with an explicit stack: tin/tout record
        // each subtree as the half-open interval [tin[u], tout[u]) of entry
        // stamps, so the ancestor test is a plain range check. Popping the
        // ~u marker is the post-order moment -- fold sub[u] into its parent
        // there, after every descendant has already contributed.
        vector<int> tin(n), tout(n), parent(n, -1), sub(nums);
        int timer = 0;
        vector<int> stack{0};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            if (u >= 0) {
                tin[u] = timer++;
                stack.push_back(~u);
                for (int v : adj[u]) {
                    if (v != parent[u]) {
                        parent[v] = u;
                        stack.push_back(v);
                    }
                }
            } else {
                u = ~u;
                tout[u] = timer;
                int p = parent[u];
                if (p >= 0)
                    sub[p] ^= sub[u];
            }
        }

        int total = sub[0];

        // Every edge is its child endpoint, so the pairs below run over all
        // ways to remove two edges. The three cases are exhaustive and
        // mutually exclusive, and in each the third component's XOR is
        // recovered from the other two. Values are at most 10^8 (< 2^27),
        // so every XOR and every score difference fits an int.
        int best = 2147483647;
        for (int x = 1; x < n; x++) {
            int sx = sub[x], tx = tin[x], ex = tout[x], tpx = total ^ sx;
            for (int y = x + 1; y < n; y++) {
                int sy = sub[y], ty = tin[y];
                int a, b, c;
                if (tx <= ty && ty < ex) { // x is an ancestor of y
                    a = sy;
                    c = tpx;
                    b = sx ^ sy;
                } else if (ty <= tx && tx < tout[y]) { // y is an ancestor of x
                    a = sx;
                    c = total ^ sy;
                    b = sx ^ sy;
                } else { // disjoint subtrees
                    a = sx;
                    b = sy;
                    c = tpx ^ sy;
                }
                int lo = min(a, b), hi = max(a, b);
                if (c < lo)
                    lo = c;
                else if (c > hi)
                    hi = c;
                best = min(best, hi - lo);
            }
        }
        return best;
    }
};
