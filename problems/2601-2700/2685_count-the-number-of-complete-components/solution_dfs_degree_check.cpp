class Solution {
  public:
    int countCompleteComponents(int n, vector<vector<int>> &edges) {
        // Both directions per edge: the graph is undirected, so each
        // endpoint must list the other among its neighbors.
        vector<vector<int>> adjacency(n);
        for (auto &edge : edges) {
            adjacency[edge[0]].push_back(edge[1]);
            adjacency[edge[1]].push_back(edge[0]);
        }
        vector<char> visited(n, 0);
        vector<int> stack;
        vector<int> component;
        int complete = 0;
        for (int start = 0; start < n; start++) {
            if (visited[start])
                continue;
            // An unclaimed vertex opens a fresh component; one flood
            // collects exactly that component and nothing else.
            stack.clear();
            component.clear();
            visited[start] = 1;
            stack.push_back(start);
            while (!stack.empty()) {
                int node = stack.back();
                stack.pop_back();
                component.push_back(node);
                for (int other : adjacency[node]) {
                    if (!visited[other]) {
                        // Mark at push time so no vertex is stacked twice.
                        visited[other] = 1;
                        stack.push_back(other);
                    }
                }
            }
            // A component of k vertices is fully wired exactly when every
            // member is adjacent to all k - 1 others.
            int k = (int)component.size();
            bool wired = true;
            for (int node : component) {
                if ((int)adjacency[node].size() != k - 1) {
                    wired = false;
                    break;
                }
            }
            if (wired)
                complete++;
        }
        return complete;
    }
};
