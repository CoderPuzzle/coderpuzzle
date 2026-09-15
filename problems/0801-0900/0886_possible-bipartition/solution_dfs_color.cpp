class Solution {
  public:
    bool possibleBipartition(int n, vector<vector<int>> &dislikes) {
        // Dislike is symmetric, so build an undirected adjacency list: a
        // valid two-group split is exactly a 2-coloring of this graph.
        vector<vector<int>> adjacency(n + 1);
        for (auto &d : dislikes) {
            adjacency[d[0]].push_back(d[1]);
            adjacency[d[1]].push_back(d[0]);
        }

        vector<int> color(n + 1, 0); // 0 = uncolored, 1 / -1 = the two groups
        // The dislike graph may be disconnected, so the scan restarts the
        // DFS from every still-uncolored person; each run colors one
        // whole connected component.
        for (int start = 1; start <= n; start++) {
            if (color[start] != 0) {
                continue;
            }
            color[start] = 1;
            // The stack drives a depth-first sweep: pop a person, then
            // push every uncolored neighbor with the opposite color
            // (marking on push); a neighbor already sharing the current
            // color closes an odd cycle, so no split exists.
            vector<int> stack;
            stack.push_back(start);
            while (!stack.empty()) {
                int person = stack.back();
                stack.pop_back();
                for (int neighbor : adjacency[person]) {
                    if (color[neighbor] == 0) {
                        color[neighbor] = -color[person];
                        stack.push_back(neighbor);
                    } else if (color[neighbor] == color[person]) {
                        return false;
                    }
                }
            }
        }
        return true;
    }
};
