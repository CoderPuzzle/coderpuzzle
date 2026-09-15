class Solution {
  public:
    int maximumSubtreeSize(vector<vector<int>> &edges, vector<int> &colors) {
        int n = colors.size();
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

        // mono[v] says every node in v's subtree so far shares v's color;
        // size[v] is how many nodes that monochrome run holds. A mixed
        // subtree poisons the parent outright; a clean one poisons it on
        // a color mismatch, otherwise it joins the parent's count.
        vector<bool> mono(n, true);
        vector<int> size(n, 1);
        int best = 1;

        // Reverse breadth-first order folds children into parents only
        // after every one of their own descendants has already folded in.
        for (int idx = n - 1; idx >= 0; --idx) {
            int u = order[idx];
            if (mono[u])
                best = max(best, size[u]);
            int p = parent[u];
            if (p != -1) {
                if (!mono[u] || colors[u] != colors[p])
                    mono[p] = false;
                else
                    size[p] += size[u];
            }
        }
        return best;
    }
};
