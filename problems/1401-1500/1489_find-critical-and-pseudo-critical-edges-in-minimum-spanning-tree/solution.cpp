class Solution {
  public:
    vector<vector<int>> findCriticalAndPseudoCriticalEdges(int n, vector<vector<int>> &edges) {
        int m = (int)edges.size();

        // Sort edge indices by weight once; every per-edge test reuses this order.
        vector<int> order(m);
        for (int i = 0; i < m; i++)
            order[i] = i;
        stable_sort(order.begin(), order.end(), [&](int a, int b) { return edges[a][2] < edges[b][2]; });

        // base MST weight
        int baseWeight = 0;
        {
            vector<int> par(n), sz(n, 1);
            for (int i = 0; i < n; i++)
                par[i] = i;
            for (int idx : order) {
                if (uni(par, sz, edges[idx][0], edges[idx][1])) {
                    baseWeight += edges[idx][2];
                }
            }
        }

        vector<int> critical, pseudo;
        // Deletion raising the weight (or disconnecting, seen as INT_MAX)
        // marks an edge critical; the forcing test runs only on survivors,
        // because a critical edge would also pass it.
        for (int i = 0; i < m; i++) {
            if (mstWeight(n, edges, order, i, -1) > baseWeight) {
                critical.push_back(i);
            } else if (mstWeight(n, edges, order, -1, i) == baseWeight) {
                pseudo.push_back(i);
            }
        }
        // loops ascend, so both lists are already sorted
        return {critical, pseudo};
    }

  private:
    // Kruskal skipping edge `skip` (>= 0) and/or forcing edge `force` (>= 0) in first.
    // Returns a huge value when no spanning tree can be formed.
    int mstWeight(int n, vector<vector<int>> &edges, vector<int> &order, int skip, int force) {
        vector<int> par(n), sz(n, 1);
        for (int i = 0; i < n; i++)
            par[i] = i;

        int weight = 0;
        int used = 0;
        if (force >= 0) {
            uni(par, sz, edges[force][0], edges[force][1]);
            weight += edges[force][2];
            used++;
        }
        for (int idx : order) {
            if (idx == skip)
                continue;
            if (uni(par, sz, edges[idx][0], edges[idx][1])) {
                weight += edges[idx][2];
                used++;
            }
        }
        return used == n - 1 ? weight : INT_MAX;
    }

    int findRoot(vector<int> &par, int x) {
        while (par[x] != x) {
            par[x] = par[par[x]];
            x = par[x];
        }
        return x;
    }

    bool uni(vector<int> &par, vector<int> &sz, int a, int b) {
        a = findRoot(par, a);
        b = findRoot(par, b);
        if (a == b)
            return false;
        if (sz[a] < sz[b])
            swap(a, b);
        par[b] = a;
        sz[a] += sz[b];
        return true;
    }
};
