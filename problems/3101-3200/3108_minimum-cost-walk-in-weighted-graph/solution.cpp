class Solution {
  public:
    vector<int> minimumCost(int n, vector<vector<int>> &edges, vector<vector<int>> &query) {
        // Walks may repeat edges, so the optimum ANDs in every edge of the component.
        vector<int> parent(n), sz(n, 1);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        for (auto &e : edges) {
            unite(parent, sz, e[0], e[1]);
        }

        // AND every edge weight into its component, keyed by root.
        unordered_map<int, int> compAnd;
        for (auto &e : edges) {
            int r = find(parent, e[0]);
            auto it = compAnd.find(r);
            if (it == compAnd.end()) {
                compAnd[r] = e[2];
            } else {
                it->second &= e[2];
            }
        }

        // Different roots mean no walk exists; same root answers with the AND.
        vector<int> ans;
        ans.reserve(query.size());
        for (auto &q : query) {
            int rs = find(parent, q[0]);
            int rt = find(parent, q[1]);
            if (rs != rt) {
                ans.push_back(-1);
            } else {
                ans.push_back(compAnd[rs]);
            }
        }
        return ans;
    }

  private:
    // Union-find: path halving in find, union by size in unite.
    int find(vector<int> &parent, int x) {
        while (parent[x] != x) {
            parent[x] = parent[parent[x]];
            x = parent[x];
        }
        return x;
    }

    void unite(vector<int> &parent, vector<int> &sz, int a, int b) {
        int ra = find(parent, a);
        int rb = find(parent, b);
        if (ra == rb)
            return;
        if (sz[ra] < sz[rb])
            swap(ra, rb);
        parent[rb] = ra;
        sz[ra] += sz[rb];
    }
};
