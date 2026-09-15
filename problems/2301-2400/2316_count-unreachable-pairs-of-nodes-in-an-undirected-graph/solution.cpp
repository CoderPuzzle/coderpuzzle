class Solution {
  public:
    long long countPairs(int n, vector<vector<int>> &edges) {
        // reachability in an undirected graph is an equivalence, so the answer
        // is all pairs minus the pairs inside one connected component
        vector<int> parent(n), sz(n, 1);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        for (auto &e : edges) {
            int ra = find(parent, e[0]);
            int rb = find(parent, e[1]);
            if (ra != rb) {
                // union by size: the smaller tree hangs off the larger's root,
                // keeping trees shallow; sz[root] stays the component's count
                if (sz[ra] < sz[rb])
                    swap(ra, rb);
                parent[rb] = ra;
                sz[ra] += sz[rb];
            }
        }

        // each component is counted exactly once, at its root; its C(s, 2)
        // pairs are mutually reachable, every other pair is not
        // the count can approach 5*10^9 for n = 10^5, hence the long long
        long long reachable = 0;
        for (int v = 0; v < n; v++) {
            if (find(parent, v) == v) {
                reachable += (long long)sz[v] * (sz[v] - 1) / 2;
            }
        }
        return (long long)n * (n - 1) / 2 - reachable;
    }

  private:
    int find(vector<int> &parent, int x) {
        // first pass locates the root, second rewires every visited node
        // directly to it: path compression without recursion
        int root = x;
        while (parent[root] != root) {
            root = parent[root];
        }
        while (parent[x] != root) {
            int next = parent[x];
            parent[x] = root;
            x = next;
        }
        return root;
    }
};
