class Solution {
  public:
    bool validTree(int n, vector<vector<int>> &edges) {
        // A tree needs exactly n - 1 edges: fewer cannot connect n nodes,
        // more cannot stay acyclic — any other count fails immediately.
        if ((int)edges.size() != n - 1) {
            return false;
        }
        // Union-Find over the nodes, each starting as its own component.
        vector<int> parent(n);
        for (int i = 0; i < n; i++) {
            parent[i] = i;
        }
        for (auto &e : edges) {
            int ra = find(parent, e[0]);
            int rb = find(parent, e[1]);
            // Same root: the edge joins two nodes already in one
            // component — it closes a cycle.
            if (ra == rb) {
                return false;
            }
            // Distinct roots: merge the two components.
            parent[ra] = rb;
        }
        // All n - 1 edges merged distinct components: connected and
        // acyclic, hence a valid tree.
        return true;
    }

  private:
    // Path halving: point each visited node at its grandparent on the way
    // up, short-circuiting future traversals.
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
