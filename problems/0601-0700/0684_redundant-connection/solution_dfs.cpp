class Solution {
    unordered_map<int, vector<int>> adj;

  public:
    vector<int> findRedundantConnection(vector<vector<int>> &edges) {
        adj.clear();
        // A tree plus one extra edge has exactly one cycle; the first edge
        // that closes it is the one to remove.
        for (const auto &edge : edges) {
            // Probe before inserting: if b is already reachable from a
            // through the edges added so far, this edge closes the cycle.
            if (connected(edge[0], edge[1])) {
                return edge;
            }
            // A safe edge joins two previously separate parts: register it
            // in both directions and keep scanning.
            adj[edge[0]].push_back(edge[1]);
            adj[edge[1]].push_back(edge[0]);
        }
        return {};
    }

  private:
    bool connected(int a, int b) {
        vector<int> stack;
        stack.push_back(a);
        unordered_set<int> seen;
        seen.insert(a);
        // The stack explores depth-first and marks nodes on push, so each
        // node enters it at most once per probe.
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            if (u == b) {
                return true;
            }
            auto it = adj.find(u);
            if (it == adj.end()) {
                continue;
            }
            for (int v : it->second) {
                if (seen.insert(v).second) {
                    stack.push_back(v);
                }
            }
        }
        return false;
    }
};
