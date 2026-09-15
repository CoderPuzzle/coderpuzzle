class Solution {
  public:
    vector<int> countSubtreesForEachDiameter(int n, vector<vector<int>> &edges) {
        vector<vector<int>> adj(n + 1);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        auto farthestWithin = [&](int start, int mask) {
            vector<int> dist(n + 1, -1);
            vector<int> queue;
            queue.reserve(n);
            dist[start] = 0;
            queue.push_back(start);
            int farNode = start, farDist = 0, reached = 1;
            for (int head = 0; head < (int)queue.size(); head++) {
                int node = queue[head];
                for (int nxt : adj[node]) {
                    if (((mask >> (nxt - 1)) & 1) && dist[nxt] == -1) {
                        dist[nxt] = dist[node] + 1;
                        reached++;
                        if (dist[nxt] > farDist) {
                            farDist = dist[nxt];
                            farNode = nxt;
                        }
                        queue.push_back(nxt);
                    }
                }
            }
            return make_tuple(farNode, farDist, reached);
        };

        vector<int> ans(n - 1, 0);
        for (int mask = 1; mask < (1 << n); mask++) {
            int size = __builtin_popcount(mask);
            if (size < 2) {
                continue;
            }
            int start = __builtin_ctz(mask) + 1;
            auto [far1, d1, reached] = farthestWithin(start, mask);
            if (reached != size) {
                continue;
            }
            auto [far2, diameter, r2] = farthestWithin(far1, mask);
            ans[diameter - 1]++;
        }
        return ans;
    }
};
