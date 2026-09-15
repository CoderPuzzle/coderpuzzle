class Solution {
  public:
    int minimumCost(int n, vector<vector<int>> &connections) {
        // Kruskal: scan edges cheapest-first; the greedy exchange argument
        // makes the accepted set a minimum spanning tree
        vector<vector<int>> conns(connections);
        sort(conns.begin(), conns.end(), [](const vector<int> &a, const vector<int> &b) { return a[2] < b[2]; });
        // union-find over n + 1 slots (index 0 unused; cities are 1-based)
        vector<int> parent(n + 1);
        iota(parent.begin(), parent.end(), 0);
        int total = 0;
        int components = n;
        for (const auto &c : conns) {
            int rx = find(parent, c[0]);
            int ry = find(parent, c[1]);
            // take the edge only when it joins two different components,
            // i.e. it closes no cycle
            if (rx != ry) {
                parent[rx] = ry;
                total += c[2];
                components--;
                // one component left: the tree is complete, later edges are
                // all more expensive
                if (components == 1) {
                    return total;
                }
            }
        }
        // edges ran out first: the graph is disconnected
        return -1;
    }

  private:
    int find(vector<int> &parent, int x) {
        // path halving keeps subsequent finds near-constant
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
