class Solution {
  public:
    int countComponents(int n, vector<vector<int>> &edges) {
        // Both directions per edge: the graph is undirected, so each
        // endpoint must list the other among its neighbors.
        vector<vector<int>> adjacency(n);
        for (const auto &e : edges) {
            adjacency[e[0]].push_back(e[1]);
            adjacency[e[1]].push_back(e[0]);
        }
        vector<char> visited(n, 0);
        int components = 0;
        vector<int> stack;
        for (int start = 0; start < n; start++) {
            if (visited[start]) {
                continue;
            }
            // An unvisited node during the sweep starts a new component;
            // this one traversal absorbs exactly one component.
            components++;
            visited[start] = 1;
            stack.push_back(start);
            while (!stack.empty()) {
                int node = stack.back();
                stack.pop_back();
                for (int other : adjacency[node]) {
                    if (!visited[other]) {
                        // Mark at push time so no node is stacked twice;
                        // membership is by visitation, so a node shared by
                        // many edges is still discovered exactly once.
                        visited[other] = 1;
                        stack.push_back(other);
                    }
                }
            }
        }
        return components;
    }
};
