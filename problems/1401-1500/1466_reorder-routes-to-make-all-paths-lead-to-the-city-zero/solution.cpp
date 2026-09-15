class Solution {
  public:
    int minReorder(int n, vector<vector<int>> &connections) {
        vector<vector<pair<int, int>>> adj(n);
        for (auto &conn : connections) {
            int a = conn[0], b = conn[1];
            adj[a].push_back({b, 1}); // original direction a -> b
            adj[b].push_back({a, 0});
        }
        int changed = 0;
        vector<char> visited(n, 0);
        vector<int> stack;
        stack.push_back(0);
        visited[0] = 1;
        while (!stack.empty()) {
            int node = stack.back();
            stack.pop_back();
            for (auto &[nxt, direction] : adj[node]) {
                if (visited[nxt])
                    continue;
                if (direction == 1)
                    changed++;
                visited[nxt] = 1;
                stack.push_back(nxt);
            }
        }
        return changed;
    }
};
