class Solution {
  public:
    int largestPathValue(string colors, vector<vector<int>> &edges) {
        int n = (int)colors.size();
        vector<vector<int>> graph(n);
        vector<int> indeg(n, 0);
        for (auto &e : edges) {
            graph[e[0]].push_back(e[1]);
            indeg[e[1]]++;
        }

        // dp[u][c] = max number of color-c nodes on any path ending at u.
        // Kahn's order guarantees every predecessor of u is finalized before
        // u is processed, so the row pushed out of u is final.
        vector<array<int, 26>> dp(n);
        for (auto &row : dp)
            row.fill(0);

        vector<int> queue;
        queue.reserve(n);
        for (int i = 0; i < n; i++)
            if (indeg[i] == 0)
                queue.push_back(i);
        int head = 0, visited = 0, ans = 0;
        while (head < (int)queue.size()) {
            int u = queue[head++];
            visited++;
            // u extends every incoming path, so count its own color.
            dp[u][colors[u] - 'a']++;
            auto &du = dp[u];
            // A valid path may end at any node — the row's best entry is a
            // candidate (this is what lets single-node paths count).
            for (int c = 0; c < 26; c++)
                ans = max(ans, du[c]);
            for (int v : graph[u]) {
                // Element-wise max-merge into the neighbor's row.
                auto &dv = dp[v];
                for (int c = 0; c < 26; c++)
                    if (du[c] > dv[c])
                        dv[c] = du[c];
                if (--indeg[v] == 0)
                    queue.push_back(v);
            }
        }
        // Nodes on or downstream of a cycle never reach indegree zero.
        if (visited != n)
            return -1;
        return ans;
    }
};
