class Solution {
  public:
    bool isBipartite(vector<vector<int>> &graph) {
        int n = graph.size();
        // 0 = uncolored, else +1/-1: bipartite iff a proper 2-coloring
        // exists, with each node forced to the opposite of the color it
        // is reached from.
        vector<int> color(n, 0);
        // The graph may be disconnected: start a fresh DFS from every
        // still-uncolored node.
        for (int start = 0; start < n; start++) {
            if (color[start] != 0)
                continue;
            color[start] = 1;
            // Mark-on-push stack discipline: a node is colored when it
            // enters the stack, so it can never be pushed twice.
            vector<int> stack;
            stack.push_back(start);
            while (!stack.empty()) {
                int u = stack.back();
                stack.pop_back();
                for (int v : graph[u]) {
                    // Uncolored neighbor: take the opposite color.
                    if (color[v] == 0) {
                        color[v] = -color[u];
                        stack.push_back(v);
                    } else if (color[v] == color[u]) {
                        // Same-color edge = odd cycle, the sole
                        // obstruction to bipartiteness.
                        return false;
                    }
                }
            }
        }
        // Every component colored cleanly: the two color classes are
        // the required partition.
        return true;
    }
};
