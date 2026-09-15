class Solution {
  public:
    int minCostToSupplyWater(int n, vector<int> &wells, vector<vector<int>> &pipes) {
        // Kruskal over houses 1..n plus a virtual node 0 (well edges).
        vector<array<int, 3>> edges;
        edges.reserve(n + pipes.size());
        for (int i = 0; i < n; i++) {
            edges.push_back({wells[i], 0, i + 1});
        }
        for (auto &pipe : pipes) {
            edges.push_back({pipe[2], pipe[0], pipe[1]});
        }
        sort(edges.begin(), edges.end());

        vector<int> parent(n + 1);
        iota(parent.begin(), parent.end(), 0);

        int total = 0;
        int used = 0;
        for (auto &[cost, a, b] : edges) {
            int ra = find(parent, a);
            int rb = find(parent, b);
            if (ra != rb) {
                parent[ra] = rb;
                total += cost;
                used += 1;
                if (used == n) {
                    break;
                }
            }
        }
        return total;
    }

  private:
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }
};
