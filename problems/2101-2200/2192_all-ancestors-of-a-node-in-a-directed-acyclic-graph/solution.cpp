#include <queue>
#include <vector>

class Solution {
  public:
    std::vector<std::vector<int>> getAncestors(int n, std::vector<std::vector<int>> &edges) {
        // Reverse every edge; ancestors of v are exactly the nodes
        // reachable from v in the reversed graph.
        std::vector<std::vector<int>> reverseAdj(n);
        for (const auto &edge : edges) {
            reverseAdj[edge[1]].push_back(edge[0]);
        }
        std::vector<std::vector<int>> answer(n);
        for (int start = 0; start < n; ++start) {
            std::vector<char> seen(n, 0);
            seen[start] = 1;
            std::queue<int> frontier;
            frontier.push(start);
            while (!frontier.empty()) {
                int node = frontier.front();
                frontier.pop();
                for (int prev : reverseAdj[node]) {
                    if (!seen[prev]) {
                        seen[prev] = 1;
                        frontier.push(prev);
                    }
                }
            }
            for (int u = 0; u < n; ++u) {
                if (seen[u] && u != start) {
                    answer[start].push_back(u);
                }
            }
        }
        return answer;
    }
};
