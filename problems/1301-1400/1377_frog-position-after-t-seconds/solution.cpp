#include <vector>

class Solution {
  public:
    double frogPosition(int n, std::vector<std::vector<int>> &edges, int t, int target) {
        if (n == 1)
            return 1.0;
        std::vector<std::vector<int>> neighbors(n + 1);
        for (const auto &e : edges) {
            neighbors[e[0]].push_back(e[1]);
            neighbors[e[1]].push_back(e[0]);
        }

        // BFS from vertex 1; probability splits equally among unvisited
        // children. A leaf keeps its probability: the frog stays there forever.
        std::vector<double> prob(n + 1, 0.0);
        std::vector<int> depth(n + 1, 0), childCount(n + 1, 0);
        std::vector<bool> visited(n + 1, false);
        std::vector<int> queue{1};
        prob[1] = 1.0;
        visited[1] = true;
        for (std::size_t head = 0; head < queue.size(); head++) {
            int node = queue[head];
            int children = 0;
            for (int nxt : neighbors[node]) {
                if (!visited[nxt])
                    children++;
            }
            childCount[node] = children;
            if (children > 0) {
                for (int nxt : neighbors[node]) {
                    if (visited[nxt])
                        continue;
                    visited[nxt] = true;
                    depth[nxt] = depth[node] + 1;
                    prob[nxt] = prob[node] / children;
                    queue.push_back(nxt);
                }
            }
        }

        if (depth[target] == t)
            return prob[target];
        if (depth[target] < t && childCount[target] == 0)
            return prob[target];
        return 0.0;
    }
};
