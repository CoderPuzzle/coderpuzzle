class Solution {
  public:
    vector<int> countSubTrees(int n, vector<vector<int>> &edges, string labels) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Breadth-first order from the root: parents are always recorded
        // before their children, so reading this vector backwards visits
        // every child before its parent -- an iterative post-order that
        // never touches the call stack.
        vector<int> order(n), parent(n, -1);
        vector<bool> visited(n, false);
        visited[0] = true;
        int head = 0, tail = 1;
        while (head < tail) {
            int u = order[head++];
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    order[tail++] = v;
                }
            }
        }

        // counts[i] tallies, per letter, how many nodes folded into i's
        // subtree so far carry that letter.
        vector<array<int, 26>> counts(n);
        for (auto &c : counts)
            c.fill(0);
        for (int i = 0; i < n; ++i)
            counts[i][labels[i] - 'a']++;

        // Reverse breadth-first order folds children into parents only
        // after every one of their own descendants has already folded in.
        for (int idx = n - 1; idx > 0; --idx) {
            int u = order[idx];
            int p = parent[u];
            for (int c = 0; c < 26; ++c)
                counts[p][c] += counts[u][c];
        }

        vector<int> ans(n);
        for (int i = 0; i < n; ++i)
            ans[i] = counts[i][labels[i] - 'a'];
        return ans;
    }
};
