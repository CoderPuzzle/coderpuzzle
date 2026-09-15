class Solution {
  public:
    vector<int> minCost(int n, vector<vector<int>> &roads, vector<int> &appleCost, int k) {
        vector<vector<pair<int, int>>> adj(n + 1);
        for (auto &r : roads) {
            adj[r[0]].push_back({r[1], r[2]});
            adj[r[1]].push_back({r[0], r[2]});
        }

        vector<int> answer(n);
        const int INF = numeric_limits<int>::max();
        // A trip is: reach j, buy, retrace. Any cheaper return path
        // would also be a cheaper outbound path, so the total is
        // appleCost[j] + (k+1)*d(j) with d = shortest distance.
        for (int start = 1; start <= n; start++) {
            // Dijkstra needs the strictly positive road weights; a
            // popped entry older than dist[u] is stale (lazy deletion).
            vector<int> dist(n + 1, INF);
            dist[start] = 0;
            priority_queue<pair<int, int>, vector<pair<int, int>>, greater<pair<int, int>>> heap;
            heap.push({0, start});
            while (!heap.empty()) {
                auto [d, u] = heap.top();
                heap.pop();
                if (d > dist[u])
                    continue;
                for (auto &[v, w] : adj[u]) {
                    int nd = d + w;
                    if (nd < dist[v]) {
                        dist[v] = nd;
                        heap.push({nd, v});
                    }
                }
            }
            // j = start contributes d = 0, so buying locally is always
            // a candidate.
            int best = INF;
            for (int j = 1; j <= n; j++) {
                long long total = (long long)appleCost[j - 1] + (long long)(k + 1) * dist[j];
                if (total < best)
                    best = (int)total;
            }
            answer[start - 1] = best;
        }
        return answer;
    }
};
