class Solution {
  public:
    int findMaxPathScore(vector<vector<int>> &edges, vector<bool> &online, long long k) {
        int n = (int)online.size();
        vector<vector<pair<int, int>>> adj(n);
        vector<int> indeg(n, 0);
        for (auto &e : edges) {
            adj[e[0]].push_back({e[1], e[2]});
            indeg[e[1]] += 1;
        }

        // Kahn's algorithm: the topological order is computed once and reused
        // by every feasibility check below (the graph is a DAG).
        deque<int> queue;
        for (int i = 0; i < n; i++)
            if (indeg[i] == 0)
                queue.push_back(i);
        vector<int> topo;
        while (!queue.empty()) {
            int u = queue.front();
            queue.pop_front();
            topo.push_back(u);
            for (auto &nb : adj[u]) {
                if (--indeg[nb.first] == 0)
                    queue.push_back(nb.first);
            }
        }

        // Feasibility is monotone in the threshold (lowering it only adds
        // edges), so binary-search the sorted distinct edge costs for the
        // largest feasible score.
        set<int> costSet;
        for (auto &e : edges)
            costSet.insert(e[2]);
        vector<int> costs(costSet.begin(), costSet.end());

        const long long INF = LLONG_MAX;
        // feasible(s): a path from 0 to n-1 within budget k exists using only
        // edges of cost >= s and only online nodes. The cheapest such path is
        // the right witness, so distances are minimized in topological order.
        auto feasible = [&](long long s) {
            vector<long long> dist(n, INF);
            dist[0] = 0;
            for (int u : topo) {
                if (dist[u] == INF || !online[u])
                    continue;
                for (auto &nb : adj[u]) {
                    if (nb.second >= s && online[nb.first]) {
                        long long nd = dist[u] + nb.second;
                        if (nd < dist[nb.first])
                            dist[nb.first] = nd;
                    }
                }
            }
            return dist[n - 1] <= k;
        };

        // If even with every edge allowed no budget-feasible path exists, no
        // score is achievable.
        if (!feasible(0))
            return -1;
        if (costs.empty())
            return 0;
        int lo = 0, hi = (int)costs.size() - 1;
        int ans = costs[0];
        while (lo <= hi) {
            int mid = lo + (hi - lo) / 2;
            if (feasible(costs[mid])) {
                ans = costs[mid];
                lo = mid + 1;
            } else {
                hi = mid - 1;
            }
        }
        return ans;
    }
};
