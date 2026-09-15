class Solution {
  public:
    int makeConnected(int n, vector<vector<int>> &connections) {
        // Connecting n computers needs at least n-1 cables; with fewer the
        // task is impossible no matter how cables are rearranged.
        if ((int)connections.size() < n - 1) {
            return -1;
        }
        vector<int> parent(n);
        iota(parent.begin(), parent.end(), 0);
        // Count components: every union between two different roots merges
        // two components; a cable whose endpoints already share a root is
        // redundant (the spare cable the counting argument relies on).
        // Each move links two components, so the answer is components - 1.
        int components = n;
        for (auto &c : connections) {
            int ra = find(parent, c[0]);
            int rb = find(parent, c[1]);
            if (ra != rb) {
                parent[ra] = rb;
                components--;
            }
        }
        return components - 1;
    }

  private:
    int find(vector<int> &parent, int x) {
        // Union-find with path halving: point each node at its
        // grandparent while climbing toward the root.
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
