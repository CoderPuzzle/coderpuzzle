class Solution {
  public:
    int rootCount(vector<vector<int>> &edges, vector<vector<int>> &guesses, int k) {
        int n = edges.size() + 1;
        vector<vector<int>> graph(n);
        for (auto &e : edges) {
            graph[e[0]].push_back(e[1]);
            graph[e[1]].push_back(e[0]);
        }
        auto key = [](long long a, long long b) { return (a << 32) | (b & 0xFFFFFFFFLL); };
        // Guess set of packed (parent, child) keys gives O(1) direction checks.
        unordered_set<long long> guessSet;
        for (auto &g : guesses) {
            guessSet.insert(key(g[0], g[1]));
        }

        // Iterative DFS from root 0 records each node's parent and an order
        // where parents precede children — rerooting without recursion.
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<bool> visited(n, false);
        vector<int> stack;
        stack.push_back(0);
        visited[0] = true;
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : graph[u]) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    stack.push_back(v);
                }
            }
        }

        vector<int> cnt(n, 0);
        // Correct-guess count for root 0: one point per edge whose
        // (parent, child) direction was guessed.
        for (int v = 1; v < n; v++) {
            if (guessSet.count(key(parent[v], v))) {
                cnt[0]++;
            }
        }

        int ans = cnt[0] >= k ? 1 : 0;
        for (size_t oi = 1; oi < order.size(); oi++) {
            // Moving the root across edge p -> u flips only that one edge:
            // guess (p, u) becomes wrong and reversed guess (u, p) becomes
            // right. Parents come first in `order`, so cnt[p] is final here.
            int u = order[oi];
            int p = parent[u];
            int c = cnt[p];
            if (guessSet.count(key(p, u))) {
                c--;
            }
            if (guessSet.count(key(u, p))) {
                c++;
            }
            cnt[u] = c;
            if (c >= k) {
                ans++;
            }
        }
        return ans;
    }
};
