class Solution {
  public:
    vector<int> timeTaken(vector<vector<int>> &edges) {
        // Reroot DP. Moving into node v costs 1 if v is odd, 2 if v is even.
        int n = (int)edges.size() + 1;
        vector<vector<int>> adj(n);
        for (auto &e : edges) {
            adj[e[0]].push_back(e[1]);
            adj[e[1]].push_back(e[0]);
        }

        // Iterative DFS ordering rooted at 0.
        vector<int> parent(n, -1), order;
        order.reserve(n);
        parent[0] = -2; // sentinel distinct from every node id
        vector<int> stack = {0};
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                parent[v] = u;
                stack.push_back(v);
            }
        }

        vector<int> last(n, 0), last_no(n, -1), second(n, 0);
        for (int k = n - 1; k >= 0; k--) {
            int u = order[k];
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                int t = last[v] + (v % 2 == 0 ? 2 : 1);
                if (last[u] < t) {
                    second[u] = last[u];
                    last[u] = t;
                    last_no[u] = v;
                } else if (second[u] < t) {
                    second[u] = t;
                }
            }
        }

        vector<int> answer = last;
        vector<int> up(n, 0); // best time outside u's subtree
        for (int u : order) {
            for (int v : adj[u]) {
                if (v == parent[u])
                    continue;
                int base = (v == last_no[u]) ? second[u] : last[u];
                int pl = max(up[u], base) + (u % 2 == 0 ? 2 : 1);
                up[v] = pl;
                if (pl > answer[v])
                    answer[v] = pl;
            }
        }
        return answer;
    }
};
