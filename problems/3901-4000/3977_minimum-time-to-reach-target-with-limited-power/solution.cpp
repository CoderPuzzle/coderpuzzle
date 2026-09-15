class Solution {
  public:
    vector<long long> minTimeMaxPower(int n, vector<vector<int>> &edges, int power, vector<int> &cost, int source,
                                      int target) {
        vector<vector<pair<int, int>>> g(n);
        for (auto &e : edges)
            g[e[0]].push_back({e[1], e[2]});
        const long long I = 4e18;
        vector<vector<long long>> d(n, vector<long long>(power + 1, I));
        using T = tuple<long long, int, int>;
        priority_queue<T, vector<T>, greater<T>> q;
        d[source][power] = 0;
        q.push({0, source, power});
        while (!q.empty()) {
            auto [x, u, p] = q.top();
            q.pop();
            if (x != d[u][p])
                continue;
            if (p >= cost[u])
                for (auto [v, t] : g[u])
                    if (x + t < d[v][p - cost[u]]) {
                        d[v][p - cost[u]] = x + t;
                        q.push({x + t, v, p - cost[u]});
                    }
        }
        long long z = *min_element(d[target].begin(), d[target].end());
        if (z == I)
            return {-1, -1};
        for (int p = power; p >= 0; p--)
            if (d[target][p] == z)
                return {z, p};
        return {-1, -1};
    }
};
