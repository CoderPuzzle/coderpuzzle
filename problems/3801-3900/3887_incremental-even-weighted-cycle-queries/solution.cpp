class Solution {
  public:
    int numberOfEdgesAdded(int n, vector<vector<int>> &edges) {
        vector<int> parent(n), rank(n, 0), par(n, 0);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        // iterative find: compresses path and returns {root, xor from x to root}
        auto find = [&](int x) -> pair<int, int> {
            vector<int> path;
            int cur = x;
            while (parent[cur] != cur) {
                path.push_back(cur);
                cur = parent[cur];
            }
            int root = cur;
            int xr = 0;
            for (int i = (int)path.size() - 1; i >= 0; i--) {
                int node = path[i];
                xr ^= par[node];
                parent[node] = root;
                par[node] = xr;
            }
            return {root, xr};
        };

        int added = 0;
        for (auto &e : edges) {
            int u = e[0], v = e[1], w = e[2];
            auto [ru, xu] = find(u);
            auto [rv, xv] = find(v);
            if (ru == rv) {
                if ((xu ^ xv) == w)
                    added++;
            } else {
                int rel = xu ^ xv ^ w;
                if (rank[ru] < rank[rv]) {
                    parent[ru] = rv;
                    par[ru] = rel;
                } else if (rank[ru] > rank[rv]) {
                    parent[rv] = ru;
                    par[rv] = rel;
                } else {
                    parent[ru] = rv;
                    par[ru] = rel;
                    rank[rv]++;
                }
                added++;
            }
        }
        return added;
    }
};
