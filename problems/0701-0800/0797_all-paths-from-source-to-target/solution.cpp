class Solution {
  public:
    vector<vector<int>> allPathsSourceTarget(vector<vector<int>> &graph) {
        int n = graph.size();
        int target = n - 1;
        vector<vector<int>> paths;
        vector<int> path{0};

        // The graph is acyclic, so every walk from 0 is a simple
        // path and DFS can never loop; at the target, snapshot a
        // copy and stop.
        function<void(int)> dfs = [&](int node) {
            if (node == target) {
                paths.push_back(path);
                return;
            }
            for (int nxt : graph[node]) {
                // Backtrack: pop after returning so sibling branches
                // each see a clean path. No visited set is needed —
                // paths legitimately share prefixes.
                path.push_back(nxt);
                dfs(nxt);
                path.pop_back();
            }
        };

        dfs(0);
        return paths;
    }
};
