class Solution {
  public:
    // intersect() counts DISTINCT shared integers, so each row first
    // collapses to a set: [1, 1] and [1, 1] share only the value 1.
    // Pairwise set intersections then spell out the edges, and an iterative
    // stack DFS counts the components.
    int numberOfComponents(vector<vector<int>> &properties, int k) {
        int n = properties.size();
        vector<unordered_set<int>> sets(n);
        for (int i = 0; i < n; ++i) {
            for (int value : properties[i])
                sets[i].insert(value);
        }
        vector<vector<int>> adjacency(n);
        for (int i = 0; i < n; ++i) {
            for (int j = i + 1; j < n; ++j) {
                int shared = 0;
                for (int value : sets[i]) {
                    if (sets[j].count(value))
                        ++shared;
                }
                if (shared >= k) {
                    adjacency[i].push_back(j);
                    adjacency[j].push_back(i);
                }
            }
        }
        vector<bool> seen(n, false);
        int components = 0;
        vector<int> stack;
        for (int start = 0; start < n; ++start) {
            if (seen[start])
                continue;
            ++components;
            // Mark on push so a node never enters the stack twice.
            seen[start] = true;
            stack.push_back(start);
            while (!stack.empty()) {
                int node = stack.back();
                stack.pop_back();
                for (int neighbor : adjacency[node]) {
                    if (!seen[neighbor]) {
                        seen[neighbor] = true;
                        stack.push_back(neighbor);
                    }
                }
            }
        }
        return components;
    }
};
