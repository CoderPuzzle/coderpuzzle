class Solution {
  public:
    vector<int> treeQueries(int n, vector<vector<int>> &edges, vector<vector<int>> &queries) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            adj[e[1]].push_back({e[0], e[2]});
        }

        vector<int> parent(n + 1, 0);
        vector<long long> up_w(n + 1, 0), base(n + 1, 0);
        vector<int> tin(n + 1, 0), tout(n + 1, 0);
        int timer = 0;
        // entries: {node, parent, weight to parent, state 0=enter / 1=exit}
        vector<array<int, 4>> stack;
        stack.push_back({1, 0, 0, 0});
        while (!stack.empty()) {
            auto top = stack.back();
            stack.pop_back();
            int u = top[0], p = top[1], w = top[2], state = top[3];
            if (state == 0) {
                parent[u] = p;
                up_w[u] = w;
                if (p != 0)
                    base[u] = base[p] + w;
                timer += 1;
                tin[u] = timer;
                stack.push_back({u, p, w, 1});
                for (int i = (int)adj[u].size() - 1; i >= 0; i--) {
                    if (adj[u][i].first != p)
                        stack.push_back({adj[u][i].first, u, adj[u][i].second, 0});
                }
            } else {
                tout[u] = timer;
            }
        }

        int size = n + 2;
        vector<long long> bit(size + 1, 0);
        auto add = [&](int i, long long val) {
            for (; i <= size; i += i & (-i))
                bit[i] += val;
        };
        auto point = [&](int i) {
            long long s = 0;
            for (; i > 0; i -= i & (-i))
                s += bit[i];
            return s;
        };

        vector<int> answer;
        for (auto &query : queries) {
            if (query[0] == 2) {
                int x = query[1];
                answer.push_back((int)(base[x] + point(tin[x])));
            } else {
                int u = query[1], v = query[2], wp = query[3];
                int child = (parent[u] == v) ? u : v;
                long long delta = wp - up_w[child];
                up_w[child] = wp;
                add(tin[child], delta);
                add(tout[child] + 1, -delta);
            }
        }
        return answer;
    }
};
