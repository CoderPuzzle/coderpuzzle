class Solution {
  public:
    bool validPath(int n, vector<vector<int>> &edges, int source, int destination) {
        // No graph is built and nothing is traversed: every edge simply
        // merges the components of its two endpoints, and afterwards a
        // route exists exactly when source and destination were pulled
        // into the same component -- that is, when they share a root.
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        // Path-halving: splice every other node directly under its
        // grandparent, flattening the tree while walking to the root.
        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };
        for (const auto &edge : edges) {
            int ru = find(edge[0]), rv = find(edge[1]);
            if (ru != rv) {
                parent[ru] = rv;
            }
        }
        return find(source) == find(destination);
    }
};
