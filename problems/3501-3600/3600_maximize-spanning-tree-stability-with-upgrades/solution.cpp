class Solution {
    vector<int> parent;
    vector<int> sz;

    int find(int a) {
        while (parent[a] != a) {
            parent[a] = parent[parent[a]];
            a = parent[a];
        }
        return a;
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b)
            return false;
        if (sz[a] < sz[b])
            swap(a, b);
        parent[b] = a;
        sz[a] += sz[b];
        return true;
    }

    bool feasible(int x, int n, vector<vector<int>> &edges, int k) {
        parent.resize(n);
        sz.assign(n, 1);
        for (int i = 0; i < n; i++)
            parent[i] = i;

        for (auto &e : edges) {
            if (e[3] == 1) {
                if (e[2] < x)
                    return false;
                if (!unite(e[0], e[1]))
                    return false;
            }
        }
        for (auto &e : edges) {
            if (e[3] == 0 && e[2] >= x)
                unite(e[0], e[1]);
        }
        int upgrades = 0;
        for (auto &e : edges) {
            if (e[3] == 0 && e[2] < x && 2 * e[2] >= x) {
                if (unite(e[0], e[1])) {
                    upgrades++;
                    if (upgrades > k)
                        return false;
                }
            }
        }
        int root = find(0);
        for (int i = 1; i < n; i++) {
            if (find(i) != root)
                return false;
        }
        return true;
    }

  public:
    int maxStability(int n, vector<vector<int>> &edges, int k) {
        if (!feasible(1, n, edges, k))
            return -1;
        int lo = 1, hi = 200001; // si <= 1e5 so 2*si <= 2e5
        while (lo + 1 < hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(mid, n, edges, k))
                lo = mid;
            else
                hi = mid;
        }
        return lo;
    }
};
