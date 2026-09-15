class Solution {
  public:
    vector<int> eventualSafeNodes(vector<vector<int>> &graph) {
        int n = graph.size();
        // Kahn's peel on the reversed graph: a node is safe exactly
        // when every path from it terminates.
        vector<int> outdeg(n);
        vector<vector<int>> radj(n);
        for (int u = 0; u < n; u++) {
            outdeg[u] = graph[u].size();
            for (int v : graph[u]) {
                radj[v].push_back(u);
            }
        }
        // Terminal nodes (out-degree 0) are trivially safe seeds.
        deque<int> queue;
        for (int i = 0; i < n; i++) {
            if (outdeg[i] == 0) {
                queue.push_back(i);
            }
        }
        vector<bool> safe(n, false);
        while (!queue.empty()) {
            int u = queue.front();
            queue.pop_front();
            safe[u] = true;
            // A predecessor queues only once every outgoing neighbor
            // is proven safe — the definition of a safe node.
            for (int v : radj[u]) {
                outdeg[v]--;
                if (outdeg[v] == 0) {
                    queue.push_back(v);
                }
            }
        }
        // Unpeeled nodes are exactly those on, or reaching, a cycle;
        // the ascending scan yields the required sorted order.
        vector<int> result;
        for (int i = 0; i < n; i++) {
            if (safe[i]) {
                result.push_back(i);
            }
        }
        return result;
    }
};
