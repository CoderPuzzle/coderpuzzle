class Solution {
  public:
    int minTime(int n, vector<vector<int>> &edges, vector<bool> &hasApple) {
        vector<vector<int>> adjacency(n);
        for (const auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }

        // explicit-stack traversal from the root records parents plus a
        // discovery order — no recursion, safe for deep trees
        vector<int> parent(n, -1);
        vector<int> order;
        order.reserve(n);
        vector<bool> seen(n, false);
        seen[0] = true;
        vector<int> stack;
        stack.push_back(0);
        while (!stack.empty()) {
            int u = stack.back();
            stack.pop_back();
            order.push_back(u);
            for (int v : adjacency[u]) {
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    stack.push_back(v);
                }
            }
        }

        // reversed discovery order finishes every subtree before its parent,
        // so has[u] is true exactly when u or a descendant holds an apple;
        // each such used edge is walked down and back — hence the +2
        vector<bool> has(hasApple.begin(), hasApple.end());
        int time = 0;
        for (auto it = order.rbegin(); it != order.rend(); ++it) {
            int u = *it;
            if (u == 0) {
                continue;
            }
            if (has[u]) {
                time += 2;
                // the parent must now be visited too — push the need upward
                has[parent[u]] = true;
            }
        }
        return time;
    }
};
