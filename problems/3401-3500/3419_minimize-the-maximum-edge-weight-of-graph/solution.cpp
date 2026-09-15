class Solution {
  public:
    int minMaxWeight(int n, vector<vector<int>> &edges, int threshold) {
        // Invert: "0 reachable from all" becomes "0 reaches all" in rev.
        vector<vector<pair<int, int>>> adj(n);
        int maxw = 0;
        for (auto &e : edges) {
            adj[e[1]].push_back({e[0], e[2]});
            if (e[2] > maxw)
                maxw = e[2];
        }

        vector<char> seen(n);
        vector<int> stack(n);
        auto reachable = [&](int limit) {
            fill(seen.begin(), seen.end(), 0);
            seen[0] = 1;
            int sp = 0, count = 1;
            stack[sp++] = 0;
            while (sp > 0) {
                int x = stack[--sp];
                for (auto &[nxt, w] : adj[x]) {
                    if (!seen[nxt] && w <= limit) {
                        seen[nxt] = 1;
                        count++;
                        stack[sp++] = nxt;
                    }
                }
            }
            return count == n;
        };

        if (!reachable(maxw))
            return -1;
        int lo = 0, hi = maxw;
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (reachable(mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }
};
