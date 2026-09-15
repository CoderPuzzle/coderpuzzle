class Solution {
  public:
    long long interactionCosts(int n, vector<vector<int>> &edges, vector<int> &group) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Breadth-first order from the root; parents discovered on the way.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        order.push_back(0);
        for (size_t head = 0; head < order.size(); ++head) {
            int node = order[head];
            for (int nxt : adj[node]) {
                if (nxt != parent[node]) {
                    parent[nxt] = node;
                    order.push_back(nxt);
                }
            }
        }

        // Global size of each group label.
        vector<long long> k(n + 1, 0);
        for (int g : group) {
            k[g]++;
        }

        // Each subtree state carries its group-count map plus
        // A = sum k[g]*cnt[g] and B = sum cnt[g]^2. The deque keeps
        // addresses stable while new states are created.
        struct St {
            unordered_map<int, long long> m;
            long long a = 0;
            long long b = 0;
        };
        deque<St> pool;
        vector<St *> states(n, nullptr);
        long long ans = 0;
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            int pv = parent[v];

            St *base = nullptr;
            for (int c : adj[v]) {
                if (c != pv && (base == nullptr || states[c]->m.size() > base->m.size())) {
                    base = states[c];
                }
            }
            if (base == nullptr) {
                pool.emplace_back();
                base = &pool.back();
            }

            int g = group[v];
            long long old_self = (*base).m[g]++;
            base->a += k[g];
            base->b += 2 * old_self + 1;

            for (int c : adj[v]) {
                if (c == pv || states[c] == base) {
                    continue;
                }
                for (auto &[gg, cc] : states[c]->m) {
                    long long old = base->m[gg];
                    base->a += k[gg] * cc;
                    base->b += 2 * old * cc + cc * cc;
                    base->m[gg] = old + cc;
                }
                states[c]->m.clear();
            }

            if (v != 0) {
                // The edge above v carries sum of cnt*(k-cnt) = a - b.
                ans += base->a - base->b;
            }
            states[v] = base;
        }
        return ans;
    }
};
