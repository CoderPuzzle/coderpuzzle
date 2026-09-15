class Solution {
  public:
    vector<vector<int>> validArrangement(vector<vector<int>> &pairs) {
        // Numbers are nodes, pairs are directed edges: the arrangement is an
        // Eulerian path (a walk using every edge exactly once).
        unordered_map<int, vector<int>> adj;
        unordered_map<int, int> indeg;
        unordered_map<int, int> outdeg;
        vector<int> order; // sources in first-appearance order
        for (const auto &p : pairs) {
            int u = p[0], v = p[1];
            if (adj.find(u) == adj.end()) {
                order.push_back(u);
            }
            adj[u].push_back(v);
            outdeg[u]++;
            indeg[v]++;
        }

        // The unique out-in == 1 node must start the walk; when all degrees
        // balance (Eulerian circuit) any edge-bearing node works — pairs[0][0].
        int start = pairs[0][0];
        for (int u : order) {
            if (outdeg[u] - indeg[u] == 1) {
                start = u;
                break;
            }
        }

        // Iterative Hierholzer (explicit stack — 1e5 edges would overflow
        // recursion): deepen while unused edges remain; a node joins `path`
        // only when stuck, so unwinding emits dead-ends first.
        vector<int> stack;
        vector<int> path;
        stack.push_back(start);
        while (!stack.empty()) {
            int u = stack.back();
            if (!adj[u].empty()) {
                int v = adj[u].back();
                adj[u].pop_back();
                stack.push_back(v);
            } else {
                path.push_back(u);
                stack.pop_back();
            }
        }
        // Reversal restores walk order; consecutive nodes are the arranged pairs.
        reverse(path.begin(), path.end());

        vector<vector<int>> res;
        res.reserve(path.size() - 1);
        for (size_t i = 0; i + 1 < path.size(); ++i) {
            res.push_back({path[i], path[i + 1]});
        }
        return res;
    }
};
