class Solution {
  public:
    vector<long long> placedCoins(vector<vector<int>> &edges, vector<int> &cost) {
        // Per subtree keep the three largest and the two smallest cost
        // values: the maximum product of three distinct nodes is either the
        // three largest or the two smallest times the largest. Subtrees can
        // be one long chain (n up to 2 * 10^4), so the traversal collects
        // parents by BFS and merges children in reverse BFS order.
        int n = (int)cost.size();
        vector<vector<int>> adj(n);
        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        vector<int> parent(n, -1), order;
        order.reserve(n);
        order.push_back(0);
        for (int head = 0; head < (int)order.size(); head++) {
            int u = order[head];
            for (int v : adj[u]) {
                if (v != parent[u]) {
                    parent[v] = u;
                    order.push_back(v);
                }
            }
        }

        vector<long long> ans(n);
        vector<int> size(n, 1);
        vector<array<long long, 3>> top(n);
        vector<array<long long, 2>> bot(n);
        for (int i = 0; i < n; i++) {
            // Padding sentinels sort away from the kept ends; slots only
            // hold real values once the subtree reaches the needed size.
            top[i] = {cost[i], (long long)-4e18, (long long)-4e18};
            bot[i] = {cost[i], (long long)4e18};
        }
        for (int k = n - 1; k >= 0; k--) {
            int u = order[k];
            if (size[u] < 3) {
                ans[u] = 1;
            } else {
                long long best = max(top[u][0] * top[u][1] * top[u][2], bot[u][0] * bot[u][1] * top[u][0]);
                ans[u] = best > 0 ? best : 0;
            }
            int p = parent[u];
            if (p >= 0) {
                size[p] += size[u];
                long long buf[5];
                int cnt = 0;
                for (long long v : top[p])
                    buf[cnt++] = v;
                for (long long v : top[u])
                    buf[cnt++] = v;
                sort(buf, buf + cnt, greater<long long>());
                top[p] = {buf[0], buf[1], buf[2]};
                cnt = 0;
                for (long long v : bot[p])
                    buf[cnt++] = v;
                for (long long v : bot[u])
                    buf[cnt++] = v;
                sort(buf, buf + cnt);
                bot[p] = {buf[0], buf[1]};
            }
        }
        return ans;
    }
};
