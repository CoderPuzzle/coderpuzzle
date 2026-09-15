#include <queue>
#include <unordered_set>
#include <vector>

class Solution {
  public:
    int reachableNodes(int n, vector<vector<int>> &edges, vector<int> &restricted) {
        // One breadth-first sweep from node 0 over the tree, never entering a
        // restricted node; every dequeued node is counted exactly once.
        std::unordered_set<int> blocked(restricted.begin(), restricted.end());
        vector<vector<int>> adjacent(n);
        for (const vector<int> &edge : edges) {
            adjacent[edge[0]].push_back(edge[1]);
            adjacent[edge[1]].push_back(edge[0]);
        }
        std::vector<bool> visited(n, false);
        visited[0] = true;
        std::queue<int> queue;
        queue.push(0);
        int reached = 0;
        while (!queue.empty()) {
            int node = queue.front();
            queue.pop();
            ++reached;
            for (int neighbor : adjacent[node]) {
                if (!visited[neighbor] && !blocked.count(neighbor)) {
                    visited[neighbor] = true;
                    queue.push(neighbor);
                }
            }
        }
        return reached;
    }
};
