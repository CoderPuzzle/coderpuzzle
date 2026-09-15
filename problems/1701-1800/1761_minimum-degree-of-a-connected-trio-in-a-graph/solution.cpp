class Solution {
  public:
    int minTrioDegree(int n, vector<vector<int>> &edges) {
        // A trio's degree is deg(u) + deg(v) + deg(w) - 6: the three
        // internal edges are exactly the ones double-counted by vertex
        // degrees. Rank the nodes by (degree, id) and keep each node's
        // neighbors as a bitset over those ranks; the cheapest trio
        // through an edge (u, v) uses the minimum-degree common
        // neighbor, which is the lowest set bit of mask[u] & mask[v].
        vector<int> deg(n + 1, 0);
        for (const vector<int> &e : edges) {
            deg[e[0]]++;
            deg[e[1]]++;
        }

        vector<int> order(n);
        for (int i = 0; i < n; ++i) {
            order[i] = i + 1;
        }
        sort(order.begin(), order.end(), [&](int a, int b) {
            if (deg[a] != deg[b]) {
                return deg[a] < deg[b];
            }
            return a < b;
        });
        vector<int> rank(n + 1), degAt(n);
        for (int p = 0; p < n; ++p) {
            rank[order[p]] = p;
            degAt[p] = deg[order[p]];
        }

        int words = (n + 63) / 64;
        vector<vector<unsigned long long>> mask(n + 1, vector<unsigned long long>(words, 0));
        for (const vector<int> &e : edges) {
            mask[e[0]][rank[e[1]] >> 6] |= 1ULL << (rank[e[1]] & 63);
            mask[e[1]][rank[e[0]] >> 6] |= 1ULL << (rank[e[0]] & 63);
        }

        int best = 3 * n;
        for (const vector<int> &e : edges) {
            for (int t = 0; t < words; ++t) {
                unsigned long long common = mask[e[0]][t] & mask[e[1]][t];
                if (common != 0) {
                    int p = (t << 6) + __builtin_ctzll(common);
                    best = min(best, deg[e[0]] + deg[e[1]] + degAt[p] - 6);
                    break;
                }
            }
        }
        return best < 3 * n ? best : -1;
    }
};
