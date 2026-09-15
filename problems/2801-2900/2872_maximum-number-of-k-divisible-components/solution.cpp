class Solution {
  public:
    int maxKDivisibleComponents(int n, vector<vector<int>> &edges, vector<int> &values, int k) {
        vector<vector<int>> adj(n);
        for (auto &edge : edges) {
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }

        // Iterative DFS from root 0 to get a processing order (parents first).
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<int> stack;
        stack.reserve(n);
        vector<char> visited(n, 0);
        visited[0] = 1;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : adj[u]) {
                if (!visited[v]) {
                    visited[v] = 1;
                    parent[v] = u;
                    stack.push_back(v);
                }
            }
        }

        // Process children before parents; cut an edge whenever the finished
        // subtree sum is divisible by k.
        vector<long long> subtree(n);
        for (int i = 0; i < n; i++)
            subtree[i] = values[i];
        int components = 0;
        for (int i = n - 1; i >= 0; i--) {
            int u = order[i];
            if (u != 0) {
                if (subtree[u] % k == 0) {
                    components++;
                } else {
                    subtree[parent[u]] += subtree[u];
                }
            }
        }
        return components + 1;
    }
};
