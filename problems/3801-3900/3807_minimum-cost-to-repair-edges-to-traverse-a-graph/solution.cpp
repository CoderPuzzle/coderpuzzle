class Solution {
  public:
    int minCost(int n, vector<vector<int>> &edges, int k) {
        int m = (int)edges.size();
        vector<int> heads(n, -1), nxt(2 * m), to(2 * m), wt(2 * m);
        int cnt = 0;
        int maxW = 0;
        for (auto &e : edges) {
            to[cnt] = e[1];
            wt[cnt] = e[2];
            nxt[cnt] = heads[e[0]];
            heads[e[0]] = cnt++;
            to[cnt] = e[0];
            wt[cnt] = e[2];
            nxt[cnt] = heads[e[1]];
            heads[e[1]] = cnt++;
            maxW = max(maxW, e[2]);
        }

        vector<int> dist(n);
        // Budget `money` repairs exactly the edges with w <= money, so raising
        // money only adds usable edges: feasibility is monotone and the
        // answer is binary-searchable.
        auto can = [&](int money) {
            fill(dist.begin(), dist.end(), -1);
            dist[0] = 0;
            vector<int> queue;
            queue.reserve(n);
            queue.push_back(0);
            // BFS explores level by level, so dist[v] is the fewest edges
            // over available paths; nodes already at k are never expanded.
            for (size_t head = 0; head < queue.size(); head++) {
                int u = queue[head];
                if (dist[u] >= k)
                    continue;
                for (int e = heads[u]; e != -1; e = nxt[e]) {
                    int v = to[e];
                    if (wt[e] <= money && dist[v] == -1) {
                        dist[v] = dist[u] + 1;
                        queue.push_back(v);
                    }
                }
            }
            return dist[n - 1] != -1 && dist[n - 1] <= k;
        };

        // If even repairing every edge fails (target unreachable, or every
        // path longer than k), there is no answer; otherwise can(hi) always
        // holds and the loop converges on the smallest feasible amount.
        if (!can(maxW))
            return -1;
        int lo = 0, hi = maxW;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (can(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }
};
