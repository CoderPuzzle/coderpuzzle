class Solution {
  public:
    int numberOfEdgesAdded(int n, vector<vector<int>> &edges) {
        vector<int> parent(n), size(n, 1), color(n, 0);
        vector<vector<int>> members(n); // per-root member lists, for the flip
        for (int i = 0; i < n; i++)
            parent[i] = i, members[i].push_back(i);

        // membership only: path halving, no parity bookkeeping
        auto find = [&](int x) {
            while (parent[x] != x) {
                parent[x] = parent[parent[x]];
                x = parent[x];
            }
            return x;
        };

        int added = 0;
        for (auto &e : edges) {
            int u = e[0], v = e[1], w = e[2];
            int ru = find(u);
            int rv = find(v);
            if (ru == rv) {
                // the standing path parity is color[u] ^ color[v]: an O(1) verdict
                if ((color[u] ^ color[v]) == w)
                    added++;
            } else {
                if (size[ru] < size[rv]) {
                    int tmp = ru;
                    ru = rv;
                    rv = tmp; // ru is now the larger root
                }
                if ((color[u] ^ color[v]) != w) {
                    // recolor the smaller component: every relation inside it
                    // survives a uniform flip, while the new edge's demand flips
                    for (int m : members[rv])
                        color[m] ^= 1;
                }
                parent[rv] = ru;
                size[ru] += size[rv];
                members[ru].insert(members[ru].end(), members[rv].begin(), members[rv].end());
                added++;
            }
        }
        return added;
    }
};
