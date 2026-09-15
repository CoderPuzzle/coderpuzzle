class Solution {
  public:
    int networkDelayTime(vector<vector<int>> &times, int n, int k) {
        const int INF = 1e8;
        vector<int> dist(n + 1, INF);
        dist[k] = 0;
        // Each round extends shortest paths by one edge, so n-1 rounds suffice.
        for (int round = 0; round < n - 1; ++round) {
            bool changed = false;
            for (const auto &t : times) {
                // The dist[u] finite guard keeps INF + w from overflowing.
                if (dist[t[0]] < INF && dist[t[0]] + t[2] < dist[t[1]]) {
                    dist[t[1]] = dist[t[0]] + t[2];
                    changed = true;
                }
            }
            // A round that relaxes nothing means the distances are final.
            if (!changed)
                break;
        }
        int best = 0;
        for (int i = 1; i <= n; ++i) {
            // Anything still at INF is unreachable from k.
            if (dist[i] >= INF)
                return -1;
            best = max(best, dist[i]);
        }
        return best;
    }
};
