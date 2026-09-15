class Solution {
  public:
    vector<int> maxSubgraphScore(int n, vector<vector<int>> &edges, vector<int> &good) {
        const long long NEG = (long long)-1e18;
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Iterative DFS (explicit stack): safe on deep trees; records parent,
        // children, and an order where every parent precedes its children.
        vector<int> parent(n, -1);
        vector<vector<int>> children(n);
        vector<int> order;
        vector<int> stack;
        parent[0] = -2;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                parent[v] = u;
                children[u].push_back(v);
                stack.push_back(v);
            }
        }

        // +1 for good, -1 for bad: a connected subgraph's score is its weight
        // sum, so the task is the max-weight connected subgraph through u.
        vector<int> weight(n);
        for (int i = 0; i < n; i++)
            weight[i] = good[i] ? 1 : -1;

        // down[u]: best score of a connected subgraph confined to u's subtree:
        // weight[u] plus each child's down only when positive, pruning harmful
        // branches. Reverse order computes children before parents.
        vector<long long> down(n, 0);
        for (int i = (int)order.size() - 1; i >= 0; i--) {
            int u = order[i];
            long long s = weight[u];
            for (int c : children[u]) {
                if (down[c] > 0)
                    s += down[c];
            }
            down[u] = s;
        }

        // up[u]: best connected piece reaching u only through its parent side
        // (u's own subtree excluded); the NEG sentinel gives the root none.
        vector<long long> up(n, 0);
        up[0] = NEG;
        vector<int> result(n, 0);
        // Reroot in one preorder pass: each child inherits the parent plus
        // u's other worthwhile branches plus what the rest of the tree gave
        // u; dropping the child's own positive part keeps sides disjoint.
        for (int u : order) {
            long long total_pos = 0;
            for (int c : children[u])
                total_pos += max(0LL, down[c]);
            for (int c : children[u]) {
                up[c] = weight[u] + (total_pos - max(0LL, down[c])) + max(0LL, up[u]);
            }
            // Answer for u: its weight, its positive child branches, and the
            // optional parent-side piece.
            result[u] = (int)(weight[u] + total_pos + max(0LL, up[u]));
        }
        return result;
    }
};
