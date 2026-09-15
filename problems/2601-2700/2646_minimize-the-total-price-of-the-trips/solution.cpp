class Solution {
  public:
    int minimumTotalPrice(int n, vector<vector<int>> &edges, vector<int> &price, vector<vector<int>> &trips) {
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Undiscounted cost is sum(price[i] * freq[i]), so counting how
        // many trip paths pass through each node decouples routing from
        // the discount choice.
        vector<long long> freq(n, 0);
        for (auto &t : trips) {
            int start = t[0], end = t[1];
            vector<int> parent(n, -1);
            vector<char> visited(n, 0);
            vector<int> stack;
            stack.push_back(start);
            visited[start] = 1;
            while (!stack.empty()) {
                int v = stack.back();
                stack.pop_back();
                if (v == end)
                    break;
                for (int u : adj[v]) {
                    if (!visited[u]) {
                        visited[u] = 1;
                        parent[u] = v;
                        stack.push_back(u);
                    }
                }
            }
            // Walking back from end through parent pointers touches
            // exactly the unique trip path; halting after start also
            // covers the trivial start == end trip.
            int cur = end;
            while (cur != -1) {
                freq[cur]++;
                if (cur == start)
                    break;
                cur = parent[cur];
            }
        }

        // The answer is the better of the two root states.
        auto res = dfs(0, -1, adj, price, freq);
        return (int)min(res.first, res.second);
    }

  private:
    pair<long long, long long> dfs(int v, int p, vector<vector<int>> &adj, vector<int> &price,
                                   vector<long long> &freq) {
        // Classic independent-set tree DP: dfs returns the min subtree
        // cost with v's price kept full (dp0) versus halved (dp1).
        long long dp0 = (long long)price[v] * freq[v];
        long long dp1 = ((long long)price[v] / 2) * freq[v];
        for (int u : adj[v]) {
            if (u == p)
                continue;
            auto c = dfs(u, v, adj, price, freq);
            // A full node accepts children of either state; a halved
            // node forces its children full since discounts apply only
            // to non-adjacent nodes.
            dp0 += min(c.first, c.second);
            dp1 += c.first;
        }
        return make_pair(dp0, dp1);
    }
};
