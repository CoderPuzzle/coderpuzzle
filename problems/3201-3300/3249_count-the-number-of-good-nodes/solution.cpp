class Solution {
  public:
    int countGoodNodes(vector<vector<int>> &edges) {
        int n = edges.size() + 1;
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Breadth-first order from the root: parents are always recorded
        // before their children, so reading this vector backwards visits
        // every child before its parent -- an iterative post-order that
        // never touches the call stack.
        vector<int> order(n), parent(n, -1), size(n, 1);
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

        // Reverse breadth-first order folds subtree sizes bottom-up: once
        // the fold reaches a node, every one of its descendants has
        // already been folded in, so size[i] ends as the number of nodes
        // in i's subtree.
        for (int idx = n - 1; idx > 0; --idx)
            size[parent[order[idx]]] += size[order[idx]];

        // A node is good when its children's subtree sizes all agree.
        vector<bool> good(n, true), seenChild(n, false);
        vector<int> firstSize(n, 0);
        for (int idx = 1; idx < n; ++idx) {
            int v = order[idx];
            int p = parent[v];
            if (!seenChild[p]) {
                seenChild[p] = true;
                firstSize[p] = size[v];
            } else if (size[v] != firstSize[p]) {
                good[p] = false;
            }
        }

        int ans = 0;
        for (bool g : good)
            if (g)
                ++ans;
        return ans;
    }
};
