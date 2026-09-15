class Solution {
  public:
    int countComponents(int n, vector<vector<int>> &edges) {
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
        // Every node begins as its own component.
        int count = n;
        for (const auto &e : edges) {
            int ra = find(e[0]), rb = find(e[1]);
            // An edge joining two distinct roots merges two components;
            // one whose endpoints already share a root is redundant.
            if (ra != rb) {
                parent[ra] = rb;
                --count;
            }
        }
        return count;
    }
};
